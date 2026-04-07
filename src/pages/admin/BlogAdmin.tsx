/**
 * BlogAdmin.tsx — QCT Blog Management Portal
 * Lives at /blogs/admin — excluded from SSG, sitemap, and robots.txt.
 *
 * Auth flow:
 *   1. GET  /api/admin/captcha       → math challenge
 *   2. POST /api/admin/login         → captcha + password → preauthToken (if 2FA on)
 *   3. POST /api/admin/verify-totp   → HMAC-signed TOTP → JWT httpOnly cookie
 */

import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  type CSSProperties,
} from "react";
import { BLOG_CATEGORIES } from "../../data/blogsData";

// ─── Cloudinary logo URLs ─────────────────────────────────────────────────────

const CDN = "https://res.cloudinary.com/dmdpzphcz/image/upload/f_auto,q_auto";
const LOGO_ICON = `${CDN}/Logos/QuasarCyberTech/icononly_transparent_nobuffer`;

// ─── API base ─────────────────────────────────────────────────────────────────

const API =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string;
  read_time: string;
  tags: string[];
  views: number;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Captcha { id: string; question: string }

// ─── API helpers ──────────────────────────────────────────────────────────────

interface Res<T = unknown> { ok: boolean; status: number; data?: T; error?: string; [k: string]: unknown }

async function api<T>(
  path: string,
  opts?: RequestInit,
): Promise<Res<T>> {
  const hasBody = opts?.body != null;
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    ...opts,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...((opts?.headers as Record<string, string>) ?? {}),
    },
  });
  const json = await res.json();
  return { ok: res.ok, status: res.status, ...json };
}

async function hmacSha256Hex(keyHex: string, message: string): Promise<string> {
  const keyBytes = Uint8Array.from(
    keyHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)),
  );
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  burgundy:   "#6B1530",
  burgundyLt: "#8B1E3F",
  gold:       "#D6B05C",
  goldLt:     "#E8C87A",
  dark:       "#040B1D",
  darkMid:    "#06010A",
  text:       "#FFFFFF",
  textSub:    "rgba(255,255,255,0.7)",
  textMuted:  "rgba(255,255,255,0.4)",
  border:     "rgba(255,255,255,0.08)",
  borderGold: "rgba(214,176,92,0.25)",
  glass:      "rgba(255,255,255,0.04)",
  glassMid:   "rgba(255,255,255,0.07)",
  shadow:     "0 20px 60px rgba(0,0,0,0.6)",
  gradient:   "radial-gradient(circle at 20% 60%, rgba(56,8,26,1) 0%, rgba(0,1,18,1) 55%)",
  fontH:      "'Ubuntu', sans-serif",
  fontB:      "'Sora', sans-serif",
};

// ─── Reusable style factories ─────────────────────────────────────────────────

const card = (extra?: CSSProperties): CSSProperties => ({
  background:    T.glass,
  border:        `1px solid ${T.border}`,
  borderRadius:  "16px",
  backdropFilter: "blur(12px)",
  ...extra,
});

const eyebrow: CSSProperties = {
  fontFamily:    T.fontH,
  fontSize:      "10px",
  fontWeight:    700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color:         T.gold,
};

const inputStyle: CSSProperties = {
  width:        "100%",
  background:   "rgba(255,255,255,0.06)",
  border:       `1px solid ${T.border}`,
  borderRadius: "10px",
  padding:      "11px 14px",
  color:        T.text,
  fontSize:     "14px",
  fontFamily:   T.fontB,
  outline:      "none",
  boxSizing:    "border-box",
};

const labelStyle: CSSProperties = {
  ...eyebrow,
  display:      "block",
  marginBottom: "7px",
};

const primaryBtn = (disabled?: boolean): CSSProperties => ({
  background:    disabled
    ? "rgba(107,21,48,0.4)"
    : `linear-gradient(135deg, ${T.burgundy}, ${T.burgundyLt})`,
  border:        `1px solid ${disabled ? T.border : T.burgundy}`,
  borderRadius:  "10px",
  color:         disabled ? T.textMuted : T.text,
  fontFamily:    T.fontH,
  fontWeight:    700,
  fontSize:      "13px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding:       "11px 22px",
  cursor:        disabled ? "not-allowed" : "pointer",
  boxShadow:     disabled ? "none" : "0 4px 20px rgba(107,21,48,0.4)",
  transition:    "all 0.2s",
});

const ghostBtn: CSSProperties = {
  background:   T.glass,
  border:       `1px solid ${T.border}`,
  borderRadius: "10px",
  color:        T.textSub,
  fontFamily:   T.fontH,
  fontWeight:   600,
  fontSize:     "12px",
  letterSpacing: "0.06em",
  padding:      "9px 18px",
  cursor:       "pointer",
};

const dangerBtn: CSSProperties = {
  ...ghostBtn,
  border:  "1px solid rgba(252,165,165,0.25)",
  color:   "#FCA5A5",
};

const publishBtn = (live: boolean): CSSProperties => ({
  ...ghostBtn,
  border: live
    ? `1px solid ${T.border}`
    : "1px solid rgba(134,239,172,0.25)",
  color: live ? T.textMuted : "#86EFAC",
});

const errorBox: CSSProperties = {
  background:   "rgba(127,29,29,0.25)",
  border:       "1px solid rgba(252,165,165,0.2)",
  borderRadius: "10px",
  color:        "#FCA5A5",
  fontSize:     "13px",
  fontFamily:   T.fontB,
  padding:      "11px 15px",
};

const divider: CSSProperties = {
  borderTop: `1px solid ${T.border}`,
  margin:    "20px 0",
};

// ─── Font loader ──────────────────────────────────────────────────────────────

function useFonts() {
  useEffect(() => {
    if (document.getElementById("qct-admin-fonts")) return;
    const link = document.createElement("link");
    link.id   = "qct-admin-fonts";
    link.rel  = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Sora:wght@300;400;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── Step indicator ──────────────────────────────────────────────────────────

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "24px" }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width:        i === step ? "22px" : "6px",
            height:       "6px",
            borderRadius: "3px",
            background:   i === step ? T.gold : T.border,
            transition:   "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

// ─── Login — Step 1: captcha + password ───────────────────────────────────────

function LoginStep({
  onSuccess,
}: {
  onSuccess: (result: { totpRequired: boolean; preauthToken?: string }) => void;
}) {
  const [captcha, setCaptcha]       = useState<Captcha | null>(null);
  const [captchaAns, setCaptchaAns] = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);

  const fetchCaptcha = useCallback(async () => {
    setCaptchaAns("");
    setError("");
    try {
      const res = await api<Captcha>("/api/admin/captcha");
      if (res.ok && res.id) setCaptcha({ id: res.id as string, question: res.question as string });
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchCaptcha(); }, [fetchCaptcha]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captcha || !password) return;
    setLoading(true);
    setError("");
    try {
      const res = await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({
          password,
          captchaId:     captcha.id,
          captchaAnswer: Number(captchaAns),
        }),
      });
      if (res.ok) {
        onSuccess({
          totpRequired:  res.totpRequired as boolean,
          preauthToken:  res.preauthToken as string | undefined,
        });
      } else {
        setError((res.error as string) ?? "Authentication failed.");
        fetchCaptcha();
      }
    } catch {
      setError("Network error. Check that the API server is reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <StepDots step={0} total={2} />

      {/* Captcha */}
      <div
        style={{
          ...card({ padding: "14px 18px" }),
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ ...eyebrow, marginBottom: "5px" }}>Verify you're human</div>
          {captcha ? (
            <div style={{ fontFamily: T.fontH, fontSize: "20px", fontWeight: 700, color: T.text }}>
              {captcha.question} = ?
            </div>
          ) : (
            <div style={{ color: T.textMuted, fontSize: "13px" }}>Loading…</div>
          )}
        </div>
        <input
          value={captchaAns}
          onChange={(e) => setCaptchaAns(e.target.value)}
          placeholder="Answer"
          type="number"
          required
          style={{ ...inputStyle, width: "80px", textAlign: "center", fontSize: "18px", fontWeight: 700 }}
        />
      </div>

      {/* Password */}
      <div>
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          required
          style={inputStyle}
        />
      </div>

      {error && <div style={errorBox}>{error}</div>}

      <button type="submit" disabled={loading || !captcha} style={{ ...primaryBtn(loading || !captcha) }}>
        {loading ? "Verifying…" : "Continue"}
      </button>

      <button
        type="button"
        onClick={fetchCaptcha}
        style={{ ...ghostBtn, fontSize: "11px", textAlign: "center" as const }}
      >
        Refresh captcha
      </button>
    </form>
  );
}

// ─── Login — Step 2: TOTP ─────────────────────────────────────────────────────

function TotpStep({
  preauthToken,
  onSuccess,
  onBack,
}: {
  preauthToken: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [code, setCode]     = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setLoading(true);
    setError("");
    try {
      const ts  = Math.floor(Date.now() / 1000);
      const sig = await hmacSha256Hex(preauthToken, `${code}:${ts}`);
      const res = await api("/api/admin/verify-totp", {
        method: "POST",
        body: JSON.stringify({ preauthToken, code, ts, sig }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError((res.error as string) ?? "Invalid code. Try again.");
        setCode("");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <StepDots step={1} total={2} />

      <div style={{ textAlign: "center" }}>
        <div style={{ ...eyebrow, marginBottom: "8px" }}>Two-factor authentication</div>
        <div style={{ color: T.textSub, fontSize: "13px", fontFamily: T.fontB, lineHeight: 1.6 }}>
          Open your authenticator app and enter<br />the 6-digit code for QuasarCyberTech.
        </div>
      </div>

      <input
        ref={inputRef}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="000000"
        maxLength={6}
        inputMode="numeric"
        required
        style={{
          ...inputStyle,
          textAlign:     "center",
          fontSize:      "28px",
          fontWeight:    700,
          fontFamily:    T.fontH,
          letterSpacing: "0.3em",
        }}
      />

      {error && <div style={errorBox}>{error}</div>}

      <button
        type="submit"
        disabled={loading || code.length !== 6}
        style={primaryBtn(loading || code.length !== 6)}
      >
        {loading ? "Verifying…" : "Verify Code"}
      </button>

      <button type="button" onClick={onBack} style={{ ...ghostBtn, textAlign: "center" as const }}>
        ← Back to login
      </button>
    </form>
  );
}

// ─── Login wrapper ────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [step, setStep]             = useState<"credentials" | "totp">("credentials");
  const [preauthToken, setPreauth]  = useState("");

  const handleCredentialsOk = (result: { totpRequired: boolean; preauthToken?: string }) => {
    if (result.totpRequired && result.preauthToken) {
      setPreauth(result.preauthToken);
      setStep("totp");
    } else {
      onLogin();
    }
  };

  return (
    <div
      style={{
        minHeight:       "100vh",
        background:      T.gradient,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         "24px",
        fontFamily:      T.fontB,
      }}
    >
      <div
        style={{
          ...card({
            width:     "100%",
            maxWidth:  "420px",
            padding:   "40px 36px",
            boxShadow: `${T.shadow}, 0 0 0 1px rgba(107,21,48,0.25), inset 0 1px 0 rgba(255,255,255,0.06)`,
          }),
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img
            src={LOGO_ICON}
            alt="QCT"
            style={{ height: "52px", marginBottom: "16px" }}
          />
          <div
            style={{
              fontFamily:    T.fontH,
              fontWeight:    700,
              fontSize:      "22px",
              color:         T.text,
              letterSpacing: "-0.01em",
            }}
          >
            Admin <span style={{ color: T.gold }}>Portal</span>
          </div>
          <div style={{ ...eyebrow, marginTop: "4px", opacity: 0.7 }}>
            QuasarCyberTech Blog Management
          </div>
        </div>

        <div style={divider} />

        {step === "credentials" ? (
          <LoginStep onSuccess={handleCredentialsOk} />
        ) : (
          <TotpStep
            preauthToken={preauthToken}
            onSuccess={onLogin}
            onBack={() => setStep("credentials")}
          />
        )}

        {/* Security notice */}
        <div
          style={{
            marginTop:  "24px",
            textAlign:  "center",
            color:      T.textMuted,
            fontSize:   "11px",
            fontFamily: T.fontB,
            lineHeight: 1.5,
          }}
        >
          Protected by scrypt · TOTP 2FA · httpOnly JWT
        </div>
      </div>
    </div>
  );
}

// ─── Blog editor toolbar ──────────────────────────────────────────────────────

function EditorToolbar({
  textareaRef,
  value,
  onChange,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (v: string) => void;
}) {
  const [imgPrompt, setImgPrompt] = useState(false);
  const [imgUrl, setImgUrl]       = useState("");
  const [imgAlt, setImgAlt]       = useState("");
  const [imgWidth, setImgWidth]   = useState("");

  const insert = (before: string, after = "", placeholder = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = value.slice(start, end) || placeholder;
    const next  = value.slice(0, start) + before + sel + after + value.slice(end);
    onChange(next);
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd   = start + before.length + sel.length;
    }, 0);
  };

  const insertLine = (prefix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(next);
    setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = lineStart + prefix.length; }, 0);
  };

  const insertImage = () => {
    if (!imgUrl.trim()) return;
    const alt   = imgAlt.trim() || "Image";
    const width = imgWidth.trim();
    const md    = width
      ? `\n![${alt}](${imgUrl.trim()} "${width}")\n`
      : `\n![${alt}](${imgUrl.trim()})\n`;
    const ta   = textareaRef.current;
    const pos  = ta ? ta.selectionStart : value.length;
    onChange(value.slice(0, pos) + md + value.slice(pos));
    setImgPrompt(false);
    setImgUrl("");
    setImgAlt("");
    setImgWidth("");
  };

  const tools: Array<{ label: string; title: string; action: () => void }> = [
    { label: "H2",  title: "Section heading (###)",   action: () => insertLine("### ") },
    { label: "H3",  title: "Sub-heading (####)",       action: () => insertLine("#### ") },
    { label: "B",   title: "Bold",                     action: () => insert("**", "**", "bold text") },
    { label: "I",   title: "Italic",                   action: () => insert("*", "*", "italic") },
    { label: "•",   title: "Bullet point",             action: () => insertLine("* ") },
    { label: "—",   title: "Divider",                  action: () => insert("\n\n---\n\n") },
    { label: "IMG", title: "Insert image",             action: () => setImgPrompt((p) => !p) },
  ];

  const toolBtn: CSSProperties = {
    padding:      "5px 10px",
    background:   T.glass,
    border:       `1px solid ${T.border}`,
    borderRadius: "6px",
    color:        T.textSub,
    fontSize:     "11px",
    fontWeight:   700,
    fontFamily:   T.fontH,
    cursor:       "pointer",
    letterSpacing: "0.04em",
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" as const, marginBottom: "8px" }}>
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            title={t.title}
            onClick={t.action}
            style={t.label === "IMG"
              ? { ...toolBtn, borderColor: T.borderGold, color: T.gold }
              : toolBtn
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {imgPrompt && (
        <div style={{ ...card({ padding: "14px", marginBottom: "8px" }) }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Image URL (Cloudinary or https://…)"
              style={{ ...inputStyle, flex: 3, fontSize: "12px", padding: "7px 10px" }}
            />
            <input
              value={imgAlt}
              onChange={(e) => setImgAlt(e.target.value)}
              placeholder="Alt text"
              style={{ ...inputStyle, flex: 1.5, fontSize: "12px", padding: "7px 10px" }}
            />
            <input
              value={imgWidth}
              onChange={(e) => setImgWidth(e.target.value)}
              placeholder="Width (e.g. 60%)"
              title="Leave blank for full width. Accepts px or % — e.g. 400px or 60%"
              style={{ ...inputStyle, flex: 1, fontSize: "12px", padding: "7px 10px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button type="button" onClick={insertImage} style={primaryBtn(!imgUrl.trim())}>
              Insert
            </button>
            <button type="button" onClick={() => setImgPrompt(false)} style={ghostBtn}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Post form ────────────────────────────────────────────────────────────────

const slugify = (s: string) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);

const EMPTY_FORM = {
  slug: "", title: "", excerpt: "", content: "",
  category: "Cyber Security", author: "QuasarCyberTech",
  image_url: "", read_time: "5 min read", tags: "",
  featured: false, published: false,
};

function PostForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: AdminPost;
  onSave: (p: AdminPost) => void;
  onCancel: () => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial
      ? { ...initial, tags: initial.tags.join(", ") }
      : EMPTY_FORM,
  );
  const [error, setSaveError]   = useState("");
  const [saving, setSaving]     = useState(false);
  const [preview, setPreview]   = useState(false);
  const slugManual              = useRef(isEdit);

  // Close preview on Escape
  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPreview(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);
  const textareaRef             = useRef<HTMLTextAreaElement>(null);

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitle = (v: string) => {
    set("title", v);
    if (!slugManual.current) set("slug", slugify(v));
  };

  const handleSlug = (v: string) => {
    slugManual.current = true;
    set("slug", slugify(v));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveError("");
    setSaving(true);
    const payload = {
      ...form,
      tags: (form.tags as string).split(",").map((t: string) => t.trim()).filter(Boolean),
    };
    try {
      const res = isEdit
        ? await api<AdminPost>(`/api/admin/blogs/${initial!.id}`, { method: "PUT", body: JSON.stringify(payload) })
        : await api<AdminPost>("/api/admin/blogs", { method: "POST", body: JSON.stringify(payload) });
      if (res.ok && res.data) {
        onSave(res.data);
      } else {
        setSaveError(res.status === 409
          ? "That slug is already in use."
          : (res.error as string) ?? "Save failed.");
      }
    } catch {
      setSaveError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  };

  // Markdown preview renderer — also handles images
  const renderMd = (md: string) =>
    md.split("\n").map((line, i) => {
      if (line.startsWith("### "))
        return <h2 key={i} style={{ fontSize: "22px", fontWeight: 700, color: T.text, fontFamily: T.fontH, margin: "24px 0 10px" }}>{line.slice(4)}</h2>;
      if (line.startsWith("#### "))
        return <h3 key={i} style={{ fontSize: "17px", fontWeight: 600, color: T.textSub, fontFamily: T.fontH, margin: "16px 0 6px" }}>{line.slice(5)}</h3>;
      if (line.startsWith("* "))
        return <li key={i} style={{ marginLeft: "20px", color: T.textSub, marginBottom: "4px", fontFamily: T.fontB }}>{line.slice(2)}</li>;
      if (line.trim() === "---")
        return <hr key={i} style={divider} />;
      // Matches: ![alt](url) or ![alt](url "width")
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)"]+?)(?:\s+"([^"]*)")?\)$/);
      if (imgMatch) {
        const [, alt, url, width] = imgMatch;
        return (
          <div key={i} style={{ margin: "20px 0", textAlign: width ? "left" : "left" }}>
            <img
              src={url}
              alt={alt}
              style={{
                width:        width || "100%",
                maxWidth:     "100%",
                borderRadius: "10px",
                border:       `1px solid ${T.border}`,
                display:      "block",
              }}
            />
            {alt && (
              <div style={{ color: T.textMuted, fontSize: "12px", marginTop: "6px", fontFamily: T.fontB }}>
                {alt}{width && <span style={{ color: T.borderGold, marginLeft: "8px" }}>{width}</span>}
              </div>
            )}
          </div>
        );
      }
      if (!line.trim()) return null;
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} style={{ color: T.textSub, lineHeight: 1.75, marginBottom: "12px", fontFamily: T.fontB }}>
          {parts.map((p, pi) =>
            p.startsWith("**") && p.endsWith("**")
              ? <strong key={pi} style={{ color: T.text }}>{p.slice(2, -2)}</strong>
              : p,
          )}
        </p>
      );
    });

  const field = (children: React.ReactNode, fullWidth = false) => (
    <div style={{ gridColumn: fullWidth ? "1 / -1" : undefined }}>{children}</div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "28px", paddingBottom: "20px", borderBottom: `1px solid ${T.border}`,
      }}>
        <div>
          <div style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: "20px", color: T.text }}>
            {isEdit ? "Edit Post" : "New Post"}
          </div>
          {isEdit && (
            <div style={{ color: T.textMuted, fontSize: "11px", fontFamily: T.fontB, marginTop: "3px" }}>
              /blogs/{initial!.slug}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="button" onClick={() => setPreview(true)} style={ghostBtn}>
            Preview
          </button>
          <button type="button" onClick={onCancel} style={ghostBtn}>Cancel</button>
          <button type="submit" disabled={saving} style={primaryBtn(saving)}>
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </div>

      {/* ── Preview modal ── */}
      {preview && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setPreview(false); }}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         200,
            background:     "rgba(4,11,29,0.82)",
            backdropFilter: "blur(6px)",
            display:        "flex",
            justifyContent: "center",
            overflowY:      "auto",
            padding:        "40px 20px",
          }}
        >
          <div
            style={{
              width:        "100%",
              maxWidth:     "780px",
              background:   "radial-gradient(ellipse at 50% 0%, rgba(56,8,26,0.6) 0%, rgba(4,11,29,0.98) 55%)",
              border:       `1px solid ${T.border}`,
              borderRadius: "20px",
              boxShadow:    "0 32px 80px rgba(0,0,0,0.7)",
              overflow:     "hidden",
              alignSelf:    "flex-start",
            }}
          >
            {/* Modal toolbar */}
            <div style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "14px 24px",
              borderBottom:   `1px solid ${T.border}`,
              background:     "rgba(255,255,255,0.02)",
            }}>
              <div style={{ ...eyebrow, color: T.gold }}>Post Preview</div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ color: T.textMuted, fontSize: "11px", fontFamily: T.fontB }}>
                  Press Esc to close
                </span>
                <button
                  type="button"
                  onClick={() => setPreview(false)}
                  style={{
                    background:   "rgba(255,255,255,0.06)",
                    border:       `1px solid ${T.border}`,
                    borderRadius: "8px",
                    color:        T.textSub,
                    fontSize:     "18px",
                    lineHeight:   1,
                    padding:      "4px 10px",
                    cursor:       "pointer",
                    fontFamily:   T.fontH,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Cover image */}
            {(form.image_url as string) && (
              <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                <img
                  src={form.image_url as string}
                  alt={form.title as string}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position:   "absolute",
                  inset:      0,
                  background: "linear-gradient(to bottom, transparent 40%, rgba(4,11,29,0.9) 100%)",
                }} />
              </div>
            )}

            {/* Article content */}
            <div style={{ padding: "36px 48px 52px" }}>
              {/* Meta */}
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" as const }}>
                <span style={{
                  ...eyebrow,
                  background:   `rgba(107,21,48,0.3)`,
                  border:       `1px solid rgba(107,21,48,0.5)`,
                  borderRadius: "20px",
                  padding:      "3px 12px",
                  color:        T.gold,
                }}>
                  {(form.category as string) || "Category"}
                </span>
                <span style={{ color: T.textMuted, fontSize: "12px", fontFamily: T.fontB }}>
                  {(form.read_time as string) || "5 min read"}
                </span>
                <span style={{ color: T.textMuted, fontSize: "12px", fontFamily: T.fontB }}>·</span>
                <span style={{ color: T.textMuted, fontSize: "12px", fontFamily: T.fontB }}>
                  {(form.author as string) || "QuasarCyberTech"}
                </span>
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily:    T.fontH,
                fontSize:      "clamp(24px, 4vw, 34px)",
                fontWeight:    700,
                color:         T.text,
                lineHeight:    1.2,
                letterSpacing: "-0.02em",
                marginBottom:  "14px",
              }}>
                {(form.title as string) || "Untitled Post"}
              </h1>

              {/* Excerpt */}
              {(form.excerpt as string) && (
                <p style={{
                  fontFamily:   T.fontB,
                  fontSize:     "16px",
                  fontWeight:   300,
                  color:        T.textSub,
                  lineHeight:   1.7,
                  marginBottom: "32px",
                  paddingBottom: "28px",
                  borderBottom: `1px solid ${T.border}`,
                }}>
                  {form.excerpt as string}
                </p>
              )}

              {/* Tags */}
              {(form.tags as string) && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const, marginBottom: "32px" }}>
                  {(form.tags as string).split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily:   T.fontB,
                        fontSize:     "11px",
                        color:        T.textMuted,
                        background:   T.glass,
                        border:       `1px solid ${T.border}`,
                        borderRadius: "20px",
                        padding:      "3px 11px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Body */}
              <div style={{ fontFamily: T.fontB }}>
                {renderMd(form.content as string)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          {field(<>
            <label style={labelStyle}>Title *</label>
            <input value={form.title as string} onChange={(e) => handleTitle(e.target.value)} required style={inputStyle} placeholder="Post title" />
          </>, true)}

          {field(<>
            <label style={labelStyle}>Slug *</label>
            <input value={form.slug as string} onChange={(e) => handleSlug(e.target.value)} required style={inputStyle} placeholder="url-slug" />
          </>)}

          {field(<>
            <label style={labelStyle}>Category *</label>
            <select value={form.category as string} onChange={(e) => set("category", e.target.value)} style={{ ...inputStyle }}>
              {BLOG_CATEGORIES.filter((c) => c !== "All Posts").map((c) => (
                <option key={c} value={c} style={{ background: "#1C0D14" }}>{c}</option>
              ))}
            </select>
          </>)}

          {field(<>
            <label style={labelStyle}>Author</label>
            <input value={form.author as string} onChange={(e) => set("author", e.target.value)} style={inputStyle} placeholder="QuasarCyberTech" />
          </>)}

          {field(<>
            <label style={labelStyle}>Read Time</label>
            <input value={form.read_time as string} onChange={(e) => set("read_time", e.target.value)} style={inputStyle} placeholder="5 min read" />
          </>)}

          {field(<>
            <label style={labelStyle}>Cover Image URL (Cloudinary)</label>
            <input value={form.image_url as string} onChange={(e) => set("image_url", e.target.value)} style={inputStyle} placeholder="https://res.cloudinary.com/…" />
            {(form.image_url as string) && (
              <img
                src={form.image_url as string}
                alt="cover"
                style={{ marginTop: "8px", height: "80px", borderRadius: "8px", border: `1px solid ${T.border}`, objectFit: "cover" }}
              />
            )}
          </>, true)}

          {field(<>
            <label style={labelStyle}>Excerpt *</label>
            <textarea
              value={form.excerpt as string}
              onChange={(e) => set("excerpt", e.target.value)}
              required rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: T.fontB, fontSize: "13px", lineHeight: 1.6 }}
              placeholder="Short description shown in the blog listing…"
            />
          </>, true)}

          {field(<>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input value={form.tags as string} onChange={(e) => set("tags", e.target.value)} style={inputStyle} placeholder="AI, SOC, Zero Trust" />
          </>, true)}

          {field(
            <div
              style={{
                ...card({ padding: "14px 18px" }),
                display: "flex", gap: "32px", alignItems: "center",
              }}
            >
              {[
                { key: "featured",  label: "Featured post" },
                { key: "published", label: "Publish immediately" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  style={{
                    display: "flex", alignItems: "center", gap: "9px",
                    cursor: "pointer", color: T.textSub, fontSize: "13px",
                    fontFamily: T.fontB, userSelect: "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form[key as keyof typeof form] as boolean}
                    onChange={(e) => set(key, e.target.checked)}
                    style={{ accentColor: T.burgundy, width: "15px", height: "15px" }}
                  />
                  {label}
                </label>
              ))}
            </div>,
            true,
          )}

          {/* Content editor with toolbar */}
          {field(<>
            <label style={{ ...labelStyle, marginBottom: "10px" }}>Content (Markdown)</label>
            <EditorToolbar
              textareaRef={textareaRef as React.RefObject<HTMLTextAreaElement>}
              value={form.content as string}
              onChange={(v) => set("content", v)}
            />
            <textarea
              ref={textareaRef}
              value={form.content as string}
              onChange={(e) => set("content", e.target.value)}
              rows={28}
              style={{
                ...inputStyle,
                resize:      "vertical",
                fontFamily:  "'Cascadia Code', 'Fira Code', ui-monospace, monospace",
                fontSize:    "13px",
                lineHeight:  1.65,
              }}
              placeholder={`### Section Heading\n\nParagraph text here...\n\n#### Sub-heading\n\n* Bullet point\n\n![Image description](https://res.cloudinary.com/…)\n\n---`}
            />
          </>, true)}

          {error && <div style={{ ...errorBox, gridColumn: "1 / -1" }}>{error}</div>}
        </div>
    </form>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function Stat({ label, value, gold }: { label: string; value: string | number; gold?: boolean }) {
  return (
    <div style={card({
      flex: 1,
      padding: "20px 22px",
      borderColor: gold ? T.borderGold : T.border,
      boxShadow:   gold ? `0 0 24px rgba(214,176,92,0.06)` : "none",
    })}>
      <div style={{ ...eyebrow, color: gold ? T.gold : T.textMuted, marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: T.fontH, fontSize: "28px", fontWeight: 700, color: T.text, letterSpacing: "-0.02em" }}>
        {value}
      </div>
    </div>
  );
}

// ─── Posts table ──────────────────────────────────────────────────────────────

const badge = (live: boolean): CSSProperties => ({
  display:       "inline-block",
  padding:       "3px 10px",
  borderRadius:  "20px",
  fontSize:      "10px",
  fontWeight:    700,
  fontFamily:    "T.fontH",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background:    live ? "rgba(20,83,45,0.35)" : T.glass,
  color:         live ? "#86EFAC" : T.textMuted,
  border:        `1px solid ${live ? "rgba(134,239,172,0.25)" : T.border}`,
});

const fmtDate = (s: string | null) =>
  s ? new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

function PostsTable({
  posts,
  onEdit,
  onDelete,
  onToggle,
}: {
  posts: AdminPost[];
  onEdit: (p: AdminPost) => void;
  onDelete: (id: string) => void;
  onToggle: (p: AdminPost) => void;
}) {
  if (!posts.length) {
    return (
      <div style={card({ padding: "64px", textAlign: "center" })}>
        <div style={{ fontSize: "40px", opacity: 0.15, marginBottom: "16px" }}>✦</div>
        <div style={{ color: T.textMuted, fontFamily: T.fontB }}>
          No posts yet.{" "}
          <span style={{ color: T.gold }}>Create your first article.</span>
        </div>
      </div>
    );
  }

  const thStyle: CSSProperties = {
    textAlign:     "left",
    padding:       "13px 16px",
    ...eyebrow,
    background:    "rgba(255,255,255,0.02)",
    borderBottom:  `1px solid ${T.border}`,
  };

  return (
    <div style={card({ padding: 0, overflow: "hidden" })}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Title", "Category", "Status", "Published", "Views", "Actions"].map((h) => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((p, i) => (
            <tr
              key={p.id}
              style={{
                borderBottom: i < posts.length - 1 ? `1px solid rgba(255,255,255,0.03)` : "none",
              }}
            >
              <td style={{ padding: "14px 16px", maxWidth: "300px" }}>
                <div style={{ fontFamily: T.fontH, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.title}
                </div>
                <div style={{ color: T.textMuted, fontSize: "11px", marginTop: "3px", fontFamily: T.fontB }}>
                  /blogs/{p.slug}
                </div>
              </td>
              <td style={{ padding: "14px 16px", color: T.textSub, fontSize: "13px", fontFamily: T.fontB }}>{p.category}</td>
              <td style={{ padding: "14px 16px" }}><span style={badge(p.published)}>{p.published ? "Live" : "Draft"}</span></td>
              <td style={{ padding: "14px 16px", color: T.textMuted, fontSize: "12px", fontFamily: T.fontB }}>{fmtDate(p.published_at)}</td>
              <td style={{ padding: "14px 16px", color: T.textSub, fontFamily: T.fontH, fontVariantNumeric: "tabular-nums" }}>{p.views.toLocaleString()}</td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button onClick={() => onEdit(p)} style={{ ...ghostBtn, padding: "5px 12px" }}>Edit</button>
                  <button onClick={() => onToggle(p)} style={{ ...publishBtn(p.published), padding: "5px 12px" }}>
                    {p.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => onDelete(p.id)} style={{ ...dangerBtn, padding: "5px 12px" }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

type View = "list" | "new" | "edit";

export default function BlogAdmin() {
  useFonts();

  const [authed, setAuthed]       = useState<boolean | null>(null);
  const [view, setView]           = useState<View>("list");
  const [posts, setPosts]         = useState<AdminPost[]>([]);
  const [editPost, setEditPost]   = useState<AdminPost | undefined>();
  const [loadError, setLoadError] = useState("");

  const loadPosts = useCallback(async () => {
    setLoadError("");
    try {
      const res = await api<AdminPost[]>("/api/admin/blogs");
      if (res.ok && Array.isArray(res.data)) {
        setPosts(res.data);
        setAuthed(true);
      } else if (res.status === 401 || res.status === 403) {
        setAuthed(false);
      } else {
        setLoadError((res.error as string) ?? "Failed to load posts.");
        setAuthed(false);
      }
    } catch {
      setLoadError("Network error. Check that the API server is reachable.");
      setAuthed(false);
    }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleLogout = async () => {
    await api("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setPosts([]);
  };

  const handleSave = async () => {
    await loadPosts();
    setView("list");
    setEditPost(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this post permanently? This cannot be undone.")) return;
    await api(`/api/admin/blogs/${id}`, { method: "DELETE" });
    await loadPosts();
  };

  const handleToggle = async (p: AdminPost) => {
    await api(`/api/admin/blogs/${p.id}`, { method: "PUT", body: JSON.stringify({ published: !p.published }) });
    await loadPosts();
  };

  // Loading
  if (authed === null) {
    return (
      <div style={{ minHeight: "100vh", background: T.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: T.textMuted, fontFamily: T.fontB }}>Initialising…</div>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={() => { setAuthed(true); loadPosts(); }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: T.gradient, fontFamily: T.fontB }}>

      {/* ── Header ── */}
      <div style={{
        background:    "rgba(4,11,29,0.9)",
        backdropFilter: "blur(16px)",
        borderBottom:  `1px solid ${T.border}`,
        padding:       "0 28px",
        height:        "60px",
        display:       "flex",
        alignItems:    "center",
        justifyContent: "space-between",
        position:      "sticky",
        top:           0,
        zIndex:        100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img src={LOGO_ICON} alt="QCT" style={{ height: "32px" }} />
          <div>
            <span style={{ fontFamily: T.fontH, fontWeight: 700, fontSize: "15px", color: T.text }}>
              QCT <span style={{ color: T.gold }}>Admin</span>
            </span>
            <span style={{ color: T.textMuted, fontSize: "12px", marginLeft: "10px", fontFamily: T.fontB }}>
              / Blog Manager
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {view !== "list" ? (
            <button onClick={() => { setView("list"); setEditPost(undefined); }} style={ghostBtn}>
              ← All Posts
            </button>
          ) : (
            <button
              onClick={() => setView("new")}
              style={primaryBtn()}
            >
              + New Post
            </button>
          )}
          <button onClick={handleLogout} style={ghostBtn}>Sign Out</button>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 28px" }}>

        {/* Stats strip */}
        {view === "list" && (
          <div style={{ display: "flex", gap: "14px", marginBottom: "24px" }}>
            <Stat label="Total Posts"  value={posts.length} />
            <Stat label="Published"    value={posts.filter((p) => p.published).length} gold />
            <Stat label="Drafts"       value={posts.filter((p) => !p.published).length} />
            <Stat label="Total Views"  value={posts.reduce((s, p) => s + p.views, 0).toLocaleString()} gold />
          </div>
        )}

        {loadError && (
          <div style={{ ...errorBox, marginBottom: "20px" }}>{loadError}</div>
        )}

        {view === "list" && (
          <PostsTable
            posts={posts}
            onEdit={(p) => { setEditPost(p); setView("edit"); }}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}

        {view === "new" && (
          <div style={card({ padding: "32px" })}>
            <PostForm onSave={handleSave} onCancel={() => setView("list")} />
          </div>
        )}

        {view === "edit" && editPost && (
          <div style={card({ padding: "32px" })}>
            <PostForm
              initial={editPost}
              onSave={handleSave}
              onCancel={() => { setView("list"); setEditPost(undefined); }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

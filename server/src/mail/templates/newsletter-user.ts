const LOGO_DARK_URL = 'https://res.cloudinary.com/dmdpzphcz/image/upload/f_auto,q_auto/Logos/QuasarCyberTech/QuasarCyberTech_Logo_Over';

export function newsletterUserHtml(name?: string): string {
  const greeting = name ? (name.split(' ')[0] ?? name) : 'there';

  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to QCT Intelligence</title>
</head>
<body style="margin:0;padding:0;background:#0C0F1D;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0C0F1D;padding:48px 16px;">
<tr><td align="center">

  <table width="600" cellpadding="0" cellspacing="0" border="0"
         style="max-width:600px;width:100%;border-radius:6px;overflow:hidden;">

    <!-- Dark header with logo -->
    <tr>
      <td style="background:linear-gradient(160deg,#1A0A14 0%,#0C0F1D 100%);padding:40px 48px 36px;border-bottom:1px solid rgba(214,176,92,0.15);">
        <img src="${LOGO_DARK_URL}" alt="QuasarCyberTech" width="190" height="auto"
             style="display:block;width:190px;height:auto;max-width:190px;" />
      </td>
    </tr>

    <!-- Gold accent line -->
    <tr><td style="height:2px;background:linear-gradient(90deg,#D6B05C 0%,rgba(214,176,92,0.2) 100%);"></td></tr>

    <!-- Main body -->
    <tr>
      <td style="background:#11152B;padding:44px 48px 40px;">

        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#D6B05C;">
          Welcome
        </p>

        <h1 style="margin:0 0 24px;font-size:26px;font-weight:700;color:#F9FAFB;line-height:1.3;">
          Good to have you, ${greeting}.
        </h1>

        <p style="margin:0 0 20px;font-size:15px;color:rgba(255,255,255,0.65);line-height:1.8;">
          You're now part of the QCT Intelligence network — a community of security professionals,
          CISOs, and enterprise leaders who stay ahead of the threat landscape.
        </p>

        <p style="margin:0 0 36px;font-size:15px;color:rgba(255,255,255,0.65);line-height:1.8;">
          Once a month, we'll send you original research from our team — no recycled news,
          no vendor fluff.
        </p>

        <!-- What you'll get -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="border:1px solid rgba(214,176,92,0.12);border-radius:4px;background:rgba(214,176,92,0.03);margin-bottom:36px;">
          <tr>
            <td style="padding:24px 28px;">
              <p style="margin:0 0 18px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#D6B05C;">
                What lands in your inbox
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${[
                  ['Threat Intelligence', 'Ransomware campaigns, APT activity, and zero-days affecting Indian enterprises.'],
                  ['VAPT Findings', 'Sanitised case studies from real penetration testing engagements.'],
                  ['Compliance Radar', 'RBI, SEBI, and DPDP Act changes that affect your security posture.'],
                  ['Original Research', 'Vulnerability disclosures and tooling from our security engineers.'],
                ].map(([title, desc]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px;color:rgba(255,255,255,0.55);line-height:1.6;">
                    <span style="font-weight:700;color:#F9FAFB;">${title}</span>
                    <span style="margin-left:4px;">&mdash; ${desc}</span>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#6B1530;border-radius:3px;">
              <a href="https://quasarcybertech.com/blogs"
                 style="display:inline-block;padding:14px 30px;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.04em;">
                Read Latest Research
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#0A0D1A;border-top:1px solid rgba(255,255,255,0.06);padding:24px 48px;">
        <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.3);line-height:1.6;">
          You subscribed at
          <a href="https://quasarcybertech.com" style="color:#D6B05C;text-decoration:none;">quasarcybertech.com</a>.
          To unsubscribe, reply with &ldquo;unsubscribe&rdquo;.
        </p>
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.18);">
          &copy; 2024 &ndash; Present, QuasarCyberTech
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}

export function newsletterUserText(name?: string): string {
  const greeting = name ? (name.split(' ')[0] ?? name) : 'there';
  return `Hi ${greeting}, welcome to QCT Intelligence.

You\u2019ll receive original security research from the QuasarCyberTech team once a month \u2014 threat intelligence, VAPT case studies, compliance updates, and vulnerability disclosures.

No recycled news. No vendor fluff.

Read our latest: https://quasarcybertech.com/blogs

To unsubscribe, reply with "unsubscribe".

\u00A9 2024 \u2013 Present, QuasarCyberTech
`;
}

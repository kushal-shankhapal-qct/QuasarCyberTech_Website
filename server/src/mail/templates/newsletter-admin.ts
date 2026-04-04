const LOGO_URL = 'https://res.cloudinary.com/dmdpzphcz/image/upload/f_auto,q_auto/Logos/QuasarCyberTech/fulllogo_transparent_nobuffer';

export function newsletterAdminHtml(fields: {
  email: string; name?: string; source: string;
  submissionId: string; submittedAt: string;
}): string {
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Subscriber — QuasarCyberTech</title>
</head>
<body style="margin:0;padding:0;background:#F0F2F5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F0F2F5;padding:40px 16px;">
<tr><td align="center">

  <table width="520" cellpadding="0" cellspacing="0" border="0"
         style="max-width:520px;width:100%;background:#FFFFFF;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

    <tr><td style="height:5px;background:#6B1530;"></td></tr>

    <!-- Header -->
    <tr>
      <td style="padding:28px 36px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <img src="${LOGO_URL}" alt="QuasarCyberTech" width="150" height="auto"
                   style="display:block;width:150px;height:auto;" />
            </td>
            <td align="right">
              <span style="display:inline-block;background:#ECFDF5;border:1px solid #6EE7B7;border-radius:3px;padding:5px 12px;font-size:11px;font-weight:700;color:#065F46;letter-spacing:0.06em;text-transform:uppercase;">
                New Subscriber
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr><td style="height:1px;background:#E5E7EB;"></td></tr>

    <!-- Details -->
    <tr>
      <td style="padding:28px 36px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="border:1px solid #E5E7EB;border-radius:3px;border-collapse:collapse;overflow:hidden;">
          <tr>
            <td style="padding:10px 14px;background:#F9FAFB;font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #E5E7EB;width:90px;">Email</td>
            <td style="padding:10px 14px;font-size:13px;color:#111827;border-bottom:1px solid #E5E7EB;">
              <a href="mailto:${fields.email}" style="color:#6B1530;text-decoration:none;">${fields.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background:#F9FAFB;font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #E5E7EB;">Name</td>
            <td style="padding:10px 14px;font-size:13px;color:#111827;border-bottom:1px solid #E5E7EB;">${fields.name ?? '—'}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background:#F9FAFB;font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em;">Source</td>
            <td style="padding:10px 14px;font-size:13px;color:#111827;">${fields.source}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer meta -->
    <tr>
      <td style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:14px 36px;">
        <p style="margin:0;font-size:11px;color:#9CA3AF;">
          ID: <code style="background:#E5E7EB;padding:2px 5px;border-radius:2px;font-size:10px;">${fields.submissionId}</code>
          &nbsp;&middot;&nbsp; ${fields.submittedAt}
          &nbsp;&middot;&nbsp; &copy; 2024 &ndash; Present, QuasarCyberTech
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}

export function newsletterAdminText(fields: {
  email: string; name?: string; source: string;
  submissionId: string; submittedAt: string;
}): string {
  return `NEW NEWSLETTER SUBSCRIBER — QuasarCyberTech
============================================
Email:  ${fields.email}
Name:   ${fields.name ?? '—'}
Source: ${fields.source}
--------------------------------------------
ID: ${fields.submissionId}
${fields.submittedAt}
© 2024 – Present, QuasarCyberTech
`;
}

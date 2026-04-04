const LOGO_URL = 'https://res.cloudinary.com/dmdpzphcz/image/upload/f_auto,q_auto/Logos/QuasarCyberTech/fulllogo_transparent_nobuffer';

export function contactAdminHtml(fields: {
  name: string; company: string; role: string;
  email: string; phone: string; service: string;
  message: string; submissionId: string; submittedAt: string;
}): string {

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;background:#F9FAFB;font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;border-bottom:1px solid #E5E7EB;width:120px;">${label}</td>
      <td style="padding:10px 16px;font-size:13px;color:#111827;border-bottom:1px solid #E5E7EB;">${value}</td>
    </tr>`;

  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead — QuasarCyberTech</title>
</head>
<body style="margin:0;padding:0;background:#F0F2F5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F0F2F5;padding:40px 16px;">
<tr><td align="center">

  <table width="600" cellpadding="0" cellspacing="0" border="0"
         style="max-width:600px;width:100%;background:#FFFFFF;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

    <!-- Top stripe -->
    <tr><td style="height:5px;background:#6B1530;"></td></tr>

    <!-- Header -->
    <tr>
      <td style="padding:28px 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <img src="${LOGO_URL}" alt="QuasarCyberTech" width="150" height="auto"
                   style="display:block;width:150px;height:auto;" />
            </td>
            <td align="right">
              <span style="display:inline-block;background:#FEF3C7;border:1px solid #F59E0B;border-radius:3px;padding:5px 12px;font-size:11px;font-weight:700;color:#92400E;letter-spacing:0.06em;text-transform:uppercase;">
                New Lead
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr><td style="height:1px;background:#E5E7EB;"></td></tr>

    <!-- Title -->
    <tr>
      <td style="padding:28px 40px 20px;">
        <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#111827;">
          ${fields.name}
        </h1>
        <p style="margin:0;font-size:14px;color:#6B7280;">${fields.company} &middot; ${fields.role}</p>
      </td>
    </tr>

    <!-- Details table -->
    <tr>
      <td style="padding:0 40px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="border:1px solid #E5E7EB;border-radius:3px;border-collapse:collapse;overflow:hidden;">
          ${row('Email', `<a href="mailto:${fields.email}" style="color:#6B1530;text-decoration:none;">${fields.email}</a>`)}
          ${row('Phone', fields.phone)}
          ${row('Service', fields.service)}
        </table>
      </td>
    </tr>

    <!-- Message -->
    <tr>
      <td style="padding:0 40px 28px;">
        <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
        <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-left:3px solid #6B1530;border-radius:3px;padding:16px 20px;font-size:14px;color:#374151;line-height:1.75;white-space:pre-wrap;">${fields.message}</div>
      </td>
    </tr>

    <!-- Reply CTA -->
    <tr>
      <td style="padding:0 40px 32px;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#6B1530;border-radius:3px;">
              <a href="mailto:${fields.email}?subject=Re: Your QuasarCyberTech Enquiry&body=Hi ${firstName(fields.name)},"
                 style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;">
                Reply to ${firstName(fields.name)}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Meta footer -->
    <tr>
      <td style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:16px 40px;">
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

function firstName(name: string) {
  return name.split(' ')[0] ?? name;
}

export function contactAdminText(fields: {
  name: string; company: string; role: string;
  email: string; phone: string; service: string;
  message: string; submissionId: string; submittedAt: string;
}): string {
  return `NEW CONTACT LEAD — QuasarCyberTech
=====================================
${fields.name} · ${fields.company} · ${fields.role}
Email:   ${fields.email}
Phone:   ${fields.phone}
Service: ${fields.service}

${fields.message}

-------------------------------------
ID: ${fields.submissionId}
${fields.submittedAt}
© 2024 – Present, QuasarCyberTech
`;
}

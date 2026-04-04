const LOGO_URL = 'https://res.cloudinary.com/dmdpzphcz/image/upload/f_auto,q_auto/Logos/QuasarCyberTech/fulllogo_transparent_nobuffer';
const LOGO_DARK_URL = 'https://res.cloudinary.com/dmdpzphcz/image/upload/f_auto,q_auto/Logos/QuasarCyberTech/QuasarCyberTech_Logo_Over';

export function contactUserHtml(name: string, service: string): string {
  const firstName = name.split(' ')[0] ?? name;

  return /* html */`<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Message received — QuasarCyberTech</title>
</head>
<body style="margin:0;padding:0;background:#F4F5F7;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F5F7;padding:48px 16px;">
<tr><td align="center">

  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

    <!-- Burgundy top stripe -->
    <tr><td style="height:5px;background:#6B1530;"></td></tr>

    <!-- Header -->
    <tr>
      <td style="background:#FFFFFF;padding:36px 48px 28px;">
        <img src="${LOGO_URL}" alt="QuasarCyberTech" width="180" height="auto"
             style="display:block;width:180px;height:auto;max-width:180px;" />
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="height:1px;background:#EEF0F3;margin:0 48px;"></td></tr>

    <!-- Body -->
    <tr>
      <td style="padding:40px 48px 32px;">

        <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.6;">Hi ${firstName},</p>

        <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#111827;line-height:1.3;">
          Your message is with us.
        </h1>

        <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.75;">
          We've received your enquiry about <strong style="color:#111827;">${service}</strong>.
          Our team will review it and get back to you within <strong style="color:#111827;">24 hours</strong>.
        </p>

        <p style="margin:0 0 32px;font-size:15px;color:#374151;line-height:1.75;">
          In the meantime, if anything changes or you'd like to add context, simply reply to this email.
        </p>

        <!-- Timeline block -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background:#FAFAFA;border:1px solid #E5E7EB;border-left:3px solid #D6B05C;border-radius:3px;margin-bottom:36px;">
          <tr>
            <td style="padding:24px 28px;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9CA3AF;">What to expect</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:7px 0;font-size:13px;color:#374151;border-bottom:1px solid #F3F4F6;">
                    <span style="font-weight:600;color:#111827;display:inline-block;width:110px;">Within 2 hrs</span>
                    Assigned to the right specialist
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:13px;color:#374151;border-bottom:1px solid #F3F4F6;">
                    <span style="font-weight:600;color:#111827;display:inline-block;width:110px;">Within 24 hrs</span>
                    A consultant will reach out directly
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:13px;color:#374151;">
                    <span style="font-weight:600;color:#111827;display:inline-block;width:110px;">Discovery call</span>
                    We map your specific security needs
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#6B1530;border-radius:3px;">
              <a href="https://quasarcybertech.com/capabilities"
                 style="display:inline-block;padding:13px 28px;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.03em;">
                Explore Our Services
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:24px 48px;">
        <p style="margin:0 0 6px;font-size:12px;color:#9CA3AF;line-height:1.6;">
          You're receiving this because you submitted an enquiry at
          <a href="https://quasarcybertech.com/contact" style="color:#6B1530;text-decoration:none;">quasarcybertech.com</a>.
          Please do not share passwords or credentials over email.
        </p>
        <p style="margin:0;font-size:12px;color:#D1D5DB;">
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

export function contactUserText(name: string, service: string): string {
  const firstName = name.split(' ')[0] ?? name;
  return `Hi ${firstName},

We've received your enquiry about "${service}".

Someone from our team will be in touch within 24 hours. If you'd like to add anything in the meantime, just reply to this email.

— QuasarCyberTech
https://quasarcybertech.com

© 2024 – Present, QuasarCyberTech
`;
}

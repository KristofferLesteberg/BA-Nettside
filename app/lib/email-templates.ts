export function emailShell(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#1a5276;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="background:#f4f4f4;padding:16px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#6b7280;">
                Dette er en automatisk generert e-post. Ikke svar direkte på denne.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function emailSection(heading: string, rows: string) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr><td style="padding-bottom:8px;border-bottom:2px solid #1a5276;">
      <h2 style="margin:0;font-size:14px;font-weight:700;color:#1a5276;text-transform:uppercase;letter-spacing:0.05em;">${heading}</h2>
    </td></tr>
    ${rows}
  </table>`
}

export function emailRow(label: string, value: string, highlight = false) {
  return `<tr>
    <td style="padding:8px 0 0;font-size:13px;color:#6b7280;width:40%;vertical-align:top;">${label}</td>
    <td style="padding:8px 0 0;font-size:13px;color:${highlight ? '#c0392b' : '#111827'};font-weight:${highlight ? '700' : '400'};vertical-align:top;">${value}</td>
  </tr>`
}

export function emailParagraph(text: string) {
  return `<p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.6;">${text}</p>`
}

export function emailDivider() {
  return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />`
}

export function emailSignOff() {
  return `<p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.8;">
    Med vennlig hilsen,<br>
    <strong>Bygg- og anleggsteknikklinje</strong><br>
    Sam Eyde vgs
  </p>`
}

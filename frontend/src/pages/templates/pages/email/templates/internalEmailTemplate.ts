// HTML email — Comunicação INTERNA (SmarNet)
// Design moderno, minimalista, alto contraste. Compatível com dark mode dos clientes de e-mail.

export interface InternalEmailData {
  recipientName: string;
  date: string;
  category: string;       // "PURCHASE ORDER"
  subject: string;        // "PO P2026/010 · SO 2026/01731"
  intro: string;
  fields: { label: string; value: string }[];
  detailsLabel?: string;  // override "Created by"
  detailsTitle?: string;
  detailsLines?: string[];
  detailsEmail?: string;
  signatureName: string;
  closing?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export const internalEmailSample: InternalEmailData = {
  recipientName: 'Joao Luis Ancheschi',
  date: '22 Apr 2026',
  category: 'Purchase Order',
  subject: 'PO P2026/010 · SO 2026/01731',
  intro: 'A new purchase order was registered today for your area. Review the details below and confirm next steps.',
  fields: [
    { label: 'Division', value: 'Exportação' },
    { label: 'P.O.', value: 'P2026/010' },
    { label: 'S.O.', value: '2026/01731' },
    { label: 'Date', value: '04/22/2026' },
    { label: 'Customer', value: 'SMAR EUROPE BV' },
    { label: 'End User', value: 'SMAR EUROPE BV' },
    { label: 'Country', value: 'Países Baixos' },
    { label: 'Total Order', value: 'US$ 4,011.90' },
    { label: 'IQV', value: '—' },
  ],
  detailsTitle: 'Aparecido Gallo Junior',
  detailsLines: ['NOVA SMAR S/A'],
  detailsEmail: 'gallo@smar.com.br',
  closing: 'Best regards,',
  signatureName: 'Inside Sales',
  ctaLabel: 'Open in SmarNet',
  ctaUrl: '#',
};

// Variante com bloco de DETALHES em destaque (equivalente ao card lateral do sistema legado)
export const internalEmailWithDetailsSample: InternalEmailData = {
  recipientName: 'Equipe de Assistência Técnica',
  date: '18 de maio de 2026',
  category: 'Ordem de Serviço',
  subject: 'O.S. 2026/02154 · VIRALCOOL · Moderado',
  intro:
    'A data de retorno desta O.S. foi alterada para 25/05/2026. Confira os detalhes ao lado e atualize seu planejamento.',
  fields: [
    { label: 'Moderado por', value: 'Carlos Vinicius Toniollo Moi' },
    { label: 'Recebido AC', value: 'Miriam Beatriz Torres Luiz (18/05/2026)' },
    { label: 'Moderado EA', value: 'Carlos Vinicius Toniollo Moi (18/05/2026)' },
    { label: 'Elaborado EA', value: 'Abenoel de Oliveira Polli' },
    { label: 'Notas', value: '—' },
  ],
  detailsLabel: 'DETALHES',
  detailsTitle: 'DETALHES',
  detailsLines: [
    'O.S.: 2026/02154-1',
    'Cliente: VIRALCOOL AÇÚCAR E ÁLCOOL LTDA.',
    'Solicitante: Miriam Beatriz Torres Luiz',
    'Data Solicitação: 18/05/2026',
    'Data Retorno: 25/05/2026',
  ],
  closing: 'Atenciosamente,',
  signatureName: 'SmarNet · Assistência Técnica',
  ctaLabel: 'Abrir O.S. no SmarNet',
  ctaUrl: '#',
};

export function renderInternalEmail(d: InternalEmailData = internalEmailSample, origin = ''): string {
  const fieldsHtml = d.fields
    .map(
      (f) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eef0f4;font-size:13px;color:#6b7280;font-weight:500;width:38%;" class="muted brd">${f.label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eef0f4;font-size:14px;color:#0f172a;font-weight:600;text-align:right;" class="text brd">${f.value}</td>
        </tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>SmarNet · Notification</title>
<style>
  body{margin:0;padding:0;background:#f4f5f7;font-family:'Inter','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;}
  a{color:#1e40af;text-decoration:none;}
  img{border:0;display:block;outline:none;}
  @media (prefers-color-scheme: dark){
    body, .bg-page{background:#0b1220 !important;}
    .card{background:#0f172a !important;}
    .text, .text *{color:#e5e7eb !important;}
    .muted{color:#94a3b8 !important;}
    .brd{border-color:#1e293b !important;}
    .chip{background:#1e293b !important;color:#cbd5e1 !important;}
    .meta-box{background:#111827 !important;}
    .divider{border-color:#1e293b !important;}
    .footer{background:#020617 !important;color:#94a3b8 !important;}
    .link{color:#93c5fd !important;}
    .btn{background:#3b82f6 !important;color:#fff !important;}
  }
  [data-ogsc] body, [data-ogsc] .bg-page{background:#0b1220 !important;}
  [data-ogsc] .card{background:#0f172a !important;}
  [data-ogsc] .text, [data-ogsc] .text *{color:#e5e7eb !important;}
  [data-ogsc] .muted{color:#94a3b8 !important;}
  [data-ogsc] .brd{border-color:#1e293b !important;}
  [data-ogsc] .chip{background:#1e293b !important;color:#cbd5e1 !important;}
  [data-ogsc] .meta-box{background:#111827 !important;}
  [data-ogsc] .footer{background:#020617 !important;color:#94a3b8 !important;}
  [data-ogsc] .link{color:#93c5fd !important;}
  @media only screen and (max-width:600px){
    .px{padding-left:24px !important;padding-right:24px !important;}
    .header-stack{display:block !important;width:100% !important;text-align:left !important;}
    .header-stack + .header-stack{padding-top:12px !important;}
  }
</style>
</head>
<body class="bg-page" style="background:#f4f5f7;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${d.category} · ${d.subject}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-page" style="background:#f4f5f7;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;">

        <!-- Brand row -->
        <tr><td style="padding:0 8px 18px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td align="left" valign="middle">
              <img src="${origin}/email/smar-logo.png" alt="SmarNet Intranet" width="86" style="width:86px;height:auto;" />
            </td>
            <td align="right" valign="middle" style="font-size:11px;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-weight:600;" class="muted">
              SmarNet · Automated
            </td>
          </tr></table>
        </td></tr>

        <!-- Card -->
        <tr><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card" style="background:#ffffff;border-radius:16px;box-shadow:0 1px 2px rgba(15,23,42,0.04),0 8px 24px rgba(15,23,42,0.06);overflow:hidden;">

            <!-- Header strip -->
            <tr><td style="padding:28px 36px 8px 36px;" class="px">
              <span class="chip" style="display:inline-block;background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:6px 10px;border-radius:999px;">${d.category}</span>
              <span class="muted" style="display:inline-block;margin-left:8px;font-size:12px;color:#94a3b8;">${d.date}</span>
            </td></tr>

            <tr><td style="padding:10px 36px 0 36px;" class="px">
              <h1 style="margin:0;font-family:'Manrope','Inter',Arial,sans-serif;font-size:24px;line-height:1.25;color:#0f172a;font-weight:800;letter-spacing:-0.01em;" class="text">${d.subject}</h1>
            </td></tr>

            <tr><td style="padding:16px 36px 0 36px;" class="px">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;" class="text">Hi <strong style="color:#0f172a;">${d.recipientName}</strong>,</p>
              <p style="margin:8px 0 0 0;font-size:14px;line-height:1.65;color:#475569;" class="text">${d.intro}</p>
            </td></tr>

            <!-- Details table -->
            <tr><td style="padding:24px 36px 0 36px;" class="px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fieldsHtml}</table>
            </td></tr>

            <!-- Created by box -->
            ${
              d.detailsTitle
                ? `<tr><td style="padding:24px 36px 0 36px;" class="px">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="meta-box" style="background:#f8fafc;border-radius:12px;">
                      <tr><td style="padding:14px 18px;">
                        <div class="muted" style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#94a3b8;font-weight:700;margin-bottom:6px;">${d.detailsLabel || 'Created by'}</div>
                        ${d.detailsLabel ? '' : `<div class="text" style="font-size:14px;font-weight:700;color:#0f172a;">${d.detailsTitle}</div>`}
                        ${(d.detailsLines || []).map((l) => `<div class="muted" style="font-size:13px;color:#475569;line-height:1.6;">${l}</div>`).join('')}
                        ${d.detailsEmail ? `<div style="font-size:13px;margin-top:4px;"><a href="mailto:${d.detailsEmail}" class="link" style="color:#1d4ed8;">${d.detailsEmail}</a></div>` : ''}
                      </td></tr>
                    </table>
                  </td></tr>`
                : ''
            }

            <!-- CTA -->
            ${
              d.ctaLabel
                ? `<tr><td align="left" style="padding:28px 36px 0 36px;" class="px">
                    <a href="${d.ctaUrl || '#'}" class="btn" style="display:inline-block;background:#0f172a;color:#ffffff;font-size:14px;font-weight:700;padding:12px 22px;border-radius:10px;text-decoration:none;">${d.ctaLabel} →</a>
                  </td></tr>`
                : ''
            }

            <!-- Signature -->
            <tr><td style="padding:28px 36px 32px 36px;" class="px">
              <div class="muted" style="font-size:14px;color:#64748b;" class="text">${d.closing || 'Best regards,'}</div>
              <div class="text" style="font-size:14px;color:#0f172a;font-weight:700;margin-top:2px;">${d.signatureName}</div>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 8px 8px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td class="muted" style="font-size:11px;color:#94a3b8;line-height:1.6;">
              Nova Smar S/A · Rua Dr. Antônio Furlan Junior, 1028 · Sertãozinho/SP · 14.170-480<br/>
              You received this because it was routed to your area in SmarNet.
            </td>
          </tr></table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

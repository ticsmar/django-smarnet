// HTML email — Comunicação EXTERNA (clientes e fornecedores - Smar Technology Company)
// Design institucional moderno, generoso em respiro, hierarquia clara, suporte a dark mode.

export interface ExternalEmailData {
  preheader?: string;
  date: string;
  category: string;     // "Pedido aceito"
  title: string;        // "Aceite do pedido nº 4103884358"
  greeting: string;
  intro: string;
  highlightLabel?: string; // "Prazo de entrega"
  highlightValue?: string; // "19/06/2026"
  highlightNote?: string;  // texto opcional embaixo do valor
  highlightProminent?: boolean; // bloco em destaque cheio (cor sólida + tipografia maior)
  fields: { label: string; value: string }[];
  body: string;
  closing: string;
  signatureName: string;
  signatureRole: string;
  ctaLabel?: string;
  ctaUrl?: string;
  contacts: { dept: string; phone: string; email: string }[];
  address: string;
  copyright: string;
}

export const externalEmailSample: ExternalEmailData = {
  preheader: 'Aceite do seu pedido junto à Smar Technology Company',
  date: '19 de maio de 2026',
  category: 'Pedido aceito',
  title: 'Aceite do pedido nº 4103884358',
  greeting: 'Prezado Sr. Edson Rodrigues,',
  intro:
    'Recebemos seu pedido com sucesso e estamos felizes em confirmar o aceite. Abaixo, os principais dados para o seu acompanhamento.',
  highlightLabel: 'Prazo de entrega',
  highlightValue: '19/06/2026',
  fields: [
    { label: 'Cliente', value: 'BUNGE ALIMENTOS S.A.' },
    { label: 'Contato', value: 'Sr. Edson Rodrigues' },
    { label: 'Assunto', value: 'Aceite de Pedido' },
    { label: 'Referência', value: 'Pedido 4103884358' },
    { label: 'Nossa O.S.', value: '2026/02098' },
    { label: 'Valor (sem impostos)', value: 'R$ 11.542,68' },
  ],
  body:
    'Agradecemos a preferência e permanecemos à disposição para quaisquer esclarecimentos que se fizerem necessários ao longo do processo.',
  closing: 'Atenciosamente,',
  signatureName: 'Fernando Jose Campos Anselmo',
  signatureRole: 'Pós-Venda · Smar Technology Company',
  ctaLabel: 'Acompanhar pedido',
  ctaUrl: '#',
  contacts: [
    { dept: 'Comercial', phone: '+55 16 3946-3599', email: 'orcamento@smar.com.br' },
    { dept: 'Pós-venda', phone: '+55 16 3946-3599', email: 'pedido@smar.com.br' },
    { dept: 'Compras', phone: '+55 16 3946-3599', email: 'divisaodecompras@smar.com.br' },
    { dept: 'Assistência Técnica', phone: '+55 16 3946-3509', email: 'assistencia.tecnica@smar.com.br' },
  ],
  address: 'Rua Dr. Antônio Furlan Junior, 1028 · Sertãozinho/SP · 14.170-480 · Brasil',
  copyright: '© 2026 Nova Smar S/A · Smar Technology Company',
};

// Variante com bloco de DESTAQUE evidenciado (ex.: alteração de prazo / aviso crítico ao cliente)
export const externalEmailWithHighlightSample: ExternalEmailData = {
  preheader: 'Alteração de prazo do seu pedido junto à Smar Technology Company',
  date: '20 de maio de 2026',
  category: 'Atualização de pedido',
  title: 'Nova data de entrega do pedido nº 4103884358',
  greeting: 'Prezado Sr. Edson Rodrigues,',
  intro:
    'Informamos uma atualização importante sobre o prazo do seu pedido. Pedimos a gentileza de revisar o novo cronograma destacado abaixo.',
  highlightLabel: 'Nova data de entrega',
  highlightValue: '25/06/2026',
  highlightNote: 'Reprogramação aprovada · +6 dias úteis em relação ao prazo original (19/06/2026).',
  highlightProminent: true,
  fields: [
    { label: 'Cliente', value: 'BUNGE ALIMENTOS S.A.' },
    { label: 'Contato', value: 'Sr. Edson Rodrigues' },
    { label: 'Pedido', value: '4103884358' },
    { label: 'Nossa O.S.', value: '2026/02098' },
    { label: 'Prazo anterior', value: '19/06/2026' },
    { label: 'Motivo', value: 'Reprogramação de produção' },
    { label: 'Valor (sem impostos)', value: 'R$ 11.542,68' },
  ],
  body:
    'Caso a nova data não atenda à sua operação, fale com seu consultor de Pós-Venda. Reiteramos nosso compromisso com a qualidade e o atendimento que você espera da Smar.',
  closing: 'Atenciosamente,',
  signatureName: 'Fernando Jose Campos Anselmo',
  signatureRole: 'Pós-Venda · Smar Technology Company',
  ctaLabel: 'Confirmar nova data',
  ctaUrl: '#',
  contacts: [
    { dept: 'Comercial', phone: '+55 16 3946-3599', email: 'orcamento@smar.com.br' },
    { dept: 'Pós-venda', phone: '+55 16 3946-3599', email: 'pedido@smar.com.br' },
    { dept: 'Compras', phone: '+55 16 3946-3599', email: 'divisaodecompras@smar.com.br' },
    { dept: 'Assistência Técnica', phone: '+55 16 3946-3509', email: 'assistencia.tecnica@smar.com.br' },
  ],
  address: 'Rua Dr. Antônio Furlan Junior, 1028 · Sertãozinho/SP · 14.170-480 · Brasil',
  copyright: '© 2026 Nova Smar S/A · Smar Technology Company',
};

export function renderExternalEmail(d: ExternalEmailData = externalEmailSample, origin = ''): string {
  const fieldsHtml = d.fields
    .map(
      (f) => `
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #eef0f4;font-size:13px;color:#64748b;font-weight:500;width:42%;" class="muted brd">${f.label}</td>
          <td style="padding:11px 0;border-bottom:1px solid #eef0f4;font-size:14px;color:#0f172a;font-weight:600;text-align:right;" class="text brd">${f.value}</td>
        </tr>`,
    )
    .join('');

  const contactsHtml = d.contacts
    .map(
      (c) => `
        <td class="contact-cell" valign="top" width="25%" style="padding:0 10px;font-family:'Inter',Arial,sans-serif;">
          <div style="font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;" class="dept">${c.dept}</div>
          <div style="font-size:13px;color:#0f172a;margin-bottom:2px;" class="text">${c.phone}</div>
          <div style="font-size:13px;"><a href="mailto:${c.email}" style="color:#1d4ed8;text-decoration:none;" class="link">${c.email}</a></div>
        </td>`,
    )
    .join('');

  return `<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${d.title}</title>
<style>
  body{margin:0;padding:0;background:#f4f5f7;font-family:'Inter','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;}
  a{color:#1d4ed8;text-decoration:none;}
  img{border:0;display:block;outline:none;}
  @media (prefers-color-scheme: dark){
    body, .bg-page{background:#0b1220 !important;}
    .card{background:#0f172a !important;}
    .text, .text *{color:#e5e7eb !important;}
    .muted{color:#94a3b8 !important;}
    .brd{border-color:#1e293b !important;}
    .chip{background:#1e293b !important;color:#93c5fd !important;}
    .hero{background:linear-gradient(135deg,#0a2a5e 0%,#1e40af 100%) !important;}
    .highlight{background:#1e293b !important;}
    .footer-band{background:#020617 !important;}
    .contacts{background:#0f172a !important;}
    .dept{color:#93c5fd !important;}
    .link{color:#93c5fd !important;}
    .btn{background:#3b82f6 !important;color:#fff !important;}
  }
  [data-ogsc] body, [data-ogsc] .bg-page{background:#0b1220 !important;}
  [data-ogsc] .card{background:#0f172a !important;}
  [data-ogsc] .text, [data-ogsc] .text *{color:#e5e7eb !important;}
  [data-ogsc] .muted{color:#94a3b8 !important;}
  [data-ogsc] .brd{border-color:#1e293b !important;}
  [data-ogsc] .chip{background:#1e293b !important;color:#93c5fd !important;}
  [data-ogsc] .hero{background:linear-gradient(135deg,#0a2a5e 0%,#1e40af 100%) !important;}
  [data-ogsc] .highlight{background:#1e293b !important;}
  [data-ogsc] .footer-band{background:#020617 !important;}
  [data-ogsc] .contacts{background:#0f172a !important;}
  [data-ogsc] .dept{color:#93c5fd !important;}
  [data-ogsc] .link{color:#93c5fd !important;}
  @media only screen and (max-width:600px){
    .px{padding-left:24px !important;padding-right:24px !important;}
    .contact-cell{display:block !important;width:100% !important;padding:10px 0 !important;border-bottom:1px solid rgba(255,255,255,0.08);}
    .hero-pad{padding:32px 24px !important;}
  }
</style>
</head>
<body class="bg-page" style="background:#f4f5f7;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${d.preheader || ''}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-page" style="background:#f4f5f7;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;">

        <!-- Brand row -->
        <tr><td style="padding:0 8px 18px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td align="left" valign="middle">
              <img src="${origin}/email/smar-logo.png" alt="Smar Technology Company" width="110" style="width:110px;height:auto;" />
            </td>
            <td align="right" valign="middle" style="font-size:11px;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-weight:600;" class="muted">
              ${d.date}
            </td>
          </tr></table>
        </td></tr>

        <!-- Card -->
        <tr><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card" style="background:#ffffff;border-radius:16px;box-shadow:0 1px 2px rgba(15,23,42,0.04),0 8px 24px rgba(15,23,42,0.06);overflow:hidden;">

            <!-- Hero -->
            <tr><td class="hero hero-pad" style="background:linear-gradient(135deg,#0a2a5e 0%,#1d4ed8 100%);padding:44px 40px;" align="left">
              <span class="chip" style="display:inline-block;background:rgba(255,255,255,0.14);color:#dbeafe;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">${d.category}</span>
              <h1 style="margin:14px 0 0 0;font-family:'Manrope','Inter',Arial,sans-serif;font-size:26px;line-height:1.25;color:#ffffff;font-weight:800;letter-spacing:-0.01em;">${d.title}</h1>
            </td></tr>

            <!-- Greeting -->
            <tr><td style="padding:32px 40px 0 40px;" class="px">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#0f172a;font-weight:600;" class="text">${d.greeting}</p>
              <p style="margin:10px 0 0 0;font-size:14px;line-height:1.7;color:#475569;" class="text">${d.intro}</p>
            </td></tr>

            <!-- Highlight -->
            ${
              d.highlightValue
                ? d.highlightProminent
                  ? `<tr><td style="padding:26px 40px 0 40px;" class="px">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="highlight-strong" style="background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border-radius:14px;border:2px solid #f59e0b;">
                        <tr><td style="padding:22px 26px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                            <td valign="middle" width="44" style="padding-right:14px;">
                              <div style="width:44px;height:44px;border-radius:999px;background:#f59e0b;text-align:center;line-height:44px;font-size:22px;color:#ffffff;font-weight:900;font-family:Arial,sans-serif;">!</div>
                            </td>
                            <td valign="middle">
                              <div class="hl-label" style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#92400e;font-weight:800;">${d.highlightLabel || 'Atenção'}</div>
                              <div class="hl-value" style="font-size:26px;font-weight:900;color:#0f172a;margin-top:4px;line-height:1.15;font-family:'Manrope','Inter',Arial,sans-serif;letter-spacing:-0.01em;">${d.highlightValue}</div>
                              ${d.highlightNote ? `<div class="hl-note" style="font-size:13px;color:#7c2d12;margin-top:6px;line-height:1.5;">${d.highlightNote}</div>` : ''}
                            </td>
                          </tr></table>
                        </td></tr>
                      </table>
                    </td></tr>`
                  : `<tr><td style="padding:22px 40px 0 40px;" class="px">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="highlight" style="background:#fffbeb;border-left:4px solid #f59e0b;border-radius:8px;">
                        <tr><td style="padding:14px 18px;">
                          <div class="muted" style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#92400e;font-weight:700;">${d.highlightLabel || 'Atenção'}</div>
                          <div class="text" style="font-size:18px;font-weight:800;color:#0f172a;margin-top:2px;font-family:'Manrope','Inter',Arial,sans-serif;">${d.highlightValue}</div>
                        </td></tr>
                      </table>
                    </td></tr>`
                : ''
            }

            <!-- Fields -->
            <tr><td style="padding:24px 40px 0 40px;" class="px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fieldsHtml}</table>
            </td></tr>

            <!-- Body -->
            <tr><td style="padding:24px 40px 0 40px;" class="px">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;" class="text">${d.body}</p>
            </td></tr>

            <!-- CTA -->
            ${
              d.ctaLabel
                ? `<tr><td align="left" style="padding:24px 40px 0 40px;" class="px">
                    <a href="${d.ctaUrl || '#'}" class="btn" style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:14px;font-weight:700;padding:13px 24px;border-radius:10px;text-decoration:none;">${d.ctaLabel} →</a>
                  </td></tr>`
                : ''
            }

            <!-- Signature -->
            <tr><td style="padding:32px 40px 36px 40px;" class="px">
              <div class="muted" style="font-size:14px;color:#64748b;" class="text">${d.closing}</div>
              <div class="text" style="font-size:14px;color:#0f172a;font-weight:700;margin-top:6px;">${d.signatureName}</div>
              <div class="muted" style="font-size:13px;color:#64748b;">${d.signatureRole}</div>
            </td></tr>

            <!-- Contacts -->
            <tr><td class="contacts" style="background:#f8fafc;padding:24px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                ${contactsHtml}
              </tr></table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer dark band with social + address -->
        <tr><td style="padding:18px 8px 8px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="footer-band" style="background:#0b1220;border-radius:14px;">
            <tr><td align="center" style="padding:28px 24px 10px 24px;">
              <img src="${origin}/email/smar-logo-white.png" alt="Smar Technology Company" width="120" style="width:120px;height:auto;margin:0 auto 16px;display:block;" />
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>
                <td style="padding:0 6px;"><a href="https://www.linkedin.com/company/nova-smar-s-a/" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#ffffff;border-radius:999px;padding:8px;line-height:0;"><img src="https://img.icons8.com/ios-filled/50/0b1220/linkedin.png" alt="LinkedIn" width="20" height="20" style="display:block;width:20px;height:20px;" /></a></td>
                <td style="padding:0 6px;"><a href="https://www.instagram.com/novasmar_sa/" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#ffffff;border-radius:999px;padding:8px;line-height:0;"><img src="https://img.icons8.com/ios-filled/50/0b1220/instagram-new.png" alt="Instagram" width="20" height="20" style="display:block;width:20px;height:20px;" /></a></td>
                <td style="padding:0 6px;"><a href="https://www.facebook.com/novasmar/?ref=br_rs" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#ffffff;border-radius:999px;padding:8px;line-height:0;"><img src="https://img.icons8.com/ios-filled/50/0b1220/facebook-new.png" alt="Facebook" width="20" height="20" style="display:block;width:20px;height:20px;" /></a></td>
                <td style="padding:0 6px;"><a href="https://twitter.com/smar_br" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#ffffff;border-radius:999px;padding:8px;line-height:0;"><img src="https://img.icons8.com/ios-filled/50/0b1220/twitterx--v1.png" alt="Twitter / X" width="20" height="20" style="display:block;width:20px;height:20px;" /></a></td>
                <td style="padding:0 6px;"><a href="https://www.youtube.com/@novasmarsa5860" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#ffffff;border-radius:999px;padding:8px;line-height:0;"><img src="https://img.icons8.com/ios-filled/50/0b1220/youtube-play.png" alt="YouTube" width="20" height="20" style="display:block;width:20px;height:20px;" /></a></td>
              </tr></table>

            </td></tr>
            <tr><td align="center" style="padding:6px 24px 26px 24px;font-family:'Inter',Arial,sans-serif;font-size:11px;color:#94a3b8;line-height:1.7;">
              ${d.address}<br/>
              ${d.copyright}
            </td></tr>
          </table>
        </td></tr>


      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

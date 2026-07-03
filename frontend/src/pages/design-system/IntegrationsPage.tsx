import { Server, Code2, Globe, Layers, Rocket, Workflow } from 'lucide-react';
import { DSSection, DSCard, DSCode, DoDont } from './_components';

/**
 * Integrações: como reaproveitar este Design System em outros stacks
 * (Laravel/Inertia, Django/Inertia, Next.js, Astro e Remix).
 */
export default function IntegrationsPage() {
  return (
    <>
      <DSSection
        title="Visão geral"
        description="O coração do SmarNet DS são os tokens HSL em index.css, o tailwind.config.ts e os componentes shadcn em src/components/ui. Qualquer stack que rode Tailwind pode consumir esse núcleo — muda apenas a camada de roteamento e renderização."
      >
        <div className="grid md:grid-cols-3 gap-4">
          <DSCard>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                <Layers size={18} />
              </div>
              <h3 className="font-display font-bold">Núcleo portável</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">index.css</code>,{' '}
              <code className="font-mono text-xs">tailwind.config.ts</code> e{' '}
              <code className="font-mono text-xs">components/ui/*</code> são
              independentes de framework.
            </p>
          </DSCard>
          <DSCard>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <Workflow size={18} />
              </div>
              <h3 className="font-display font-bold">Camada do framework</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Cada stack traz roteamento, SSR/SSG e data-fetching próprios.
              O DS não opina sobre isso — só fornece a UI.
            </p>
          </DSCard>
          <DSCard>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-success/15 text-success flex items-center justify-center">
                <Rocket size={18} />
              </div>
              <h3 className="font-display font-bold">Mesma identidade</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Tokens semânticos garantem que dark/light, tipografia Manrope+Inter
              e superfícies se comportem igual em qualquer projeto.
            </p>
          </DSCard>
        </div>
      </DSSection>

      <DSSection
        title="Setup base (qualquer stack)"
        description="Antes de integrar com qualquer framework, copie estes três pilares para o projeto destino."
      >
        <DSCard>
          <ol className="text-sm space-y-2 list-decimal pl-5">
            <li>
              Copie <code className="font-mono text-xs">src/index.css</code> (tokens HSL,
              superfícies, sombras, gradientes).
            </li>
            <li>
              Copie <code className="font-mono text-xs">tailwind.config.ts</code> e{' '}
              <code className="font-mono text-xs">postcss.config.js</code>.
            </li>
            <li>
              Copie a pasta <code className="font-mono text-xs">src/components/ui/</code>{' '}
              (shadcn) e <code className="font-mono text-xs">src/lib/utils.ts</code>.
            </li>
            <li>
              Instale dependências: <code className="font-mono text-xs">tailwindcss</code>,{' '}
              <code className="font-mono text-xs">tailwindcss-animate</code>,{' '}
              <code className="font-mono text-xs">class-variance-authority</code>,{' '}
              <code className="font-mono text-xs">clsx</code>,{' '}
              <code className="font-mono text-xs">tailwind-merge</code>,{' '}
              <code className="font-mono text-xs">lucide-react</code> e os Radix
              correspondentes aos componentes que usar.
            </li>
          </ol>
        </DSCard>
      </DSSection>

      {/* ───────────────────────────── Laravel / PHP ───────────────────────────── */}
      <DSSection
        title="Laravel + Inertia (PHP)"
        description="Inertia.js permite servir páginas React/Vue dentro do Laravel sem montar uma SPA separada. O DS é montado como adapter React."
      >
        <DSCard className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(0_72%_50%/0.15)] text-[hsl(0_72%_50%)] flex items-center justify-center">
              <Server size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold">Stack recomendada</h3>
              <p className="text-xs text-muted-foreground">
                Laravel 11 · Inertia 2 · React 18 · Vite · Tailwind v3
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Instale o starter kit oficial e adicione Tailwind. Substitua o CSS gerado pelo{' '}
            <code className="font-mono text-xs">index.css</code> do SmarNet.
          </p>

          <DSCode>{`composer require laravel/breeze --dev
php artisan breeze:install react --typescript
npm install
# substitua resources/css/app.css pelo index.css do SmarNet
# copie resources/js/components/ui/  ← shadcn`}</DSCode>

          <p className="text-sm text-muted-foreground">
            Páginas Inertia renderizam componentes do DS normalmente:
          </p>

          <DSCode>{`// resources/js/Pages/Dashboard.tsx
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Dashboard({ kpis }: { kpis: any[] }) {
  return (
    <>
      <Head title="Dashboard" />
      <div className="bg-background text-foreground p-6">
        <h1 className="font-display text-3xl font-bold">Operação</h1>
        <Button variant="default">Nova ordem</Button>
      </div>
    </>
  );
}`}</DSCode>

          <p className="text-sm text-muted-foreground">
            Controller PHP injeta dados — o componente continua 100% Tailwind/DS:
          </p>

          <DSCode>{`// app/Http/Controllers/DashboardController.php
return Inertia::render('Dashboard', [
    'kpis' => Kpi::for($user)->get(),
]);`}</DSCode>
        </DSCard>
      </DSSection>

      {/* ───────────────────────────── Django / Python ───────────────────────────── */}
      <DSSection
        title="Django + Inertia (Python)"
        description="Use o adapter django-inertia para servir páginas React/Vue diretamente das views Django, mantendo ORM, admin e auth nativos."
      >
        <DSCard className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(150_60%_35%/0.15)] text-[hsl(150_60%_35%)] flex items-center justify-center">
              <Code2 size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold">Stack recomendada</h3>
              <p className="text-xs text-muted-foreground">
                Django 5 · inertia-django · React 18 · Vite · Tailwind v3
              </p>
            </div>
          </div>

          <DSCode>{`pip install inertia-django
# settings.py
INSTALLED_APPS += ['inertia']
MIDDLEWARE += ['inertia.middleware.InertiaMiddleware']
INERTIA_LAYOUT = 'layout.html'
INERTIA_VERSION = '1.0'`}</DSCode>

          <p className="text-sm text-muted-foreground">
            Estrutura do front (Vite separado em <code className="font-mono text-xs">frontend/</code>):
          </p>

          <DSCode>{`frontend/
├── src/
│   ├── index.css          ← tokens HSL do SmarNet
│   ├── components/ui/     ← shadcn
│   ├── pages/Dashboard.tsx
│   └── main.tsx           ← createInertiaApp({ resolve: name => pages[name] })
└── tailwind.config.ts`}</DSCode>

          <p className="text-sm text-muted-foreground">View Django:</p>

          <DSCode>{`# views.py
from inertia import render

def dashboard(request):
    return render(request, 'Dashboard', props={
        'kpis': list(Kpi.objects.values()),
        'user': request.user.username,
    })`}</DSCode>

          <p className="text-sm text-muted-foreground">
            O componente <code className="font-mono text-xs">Dashboard.tsx</code> é idêntico ao do
            Laravel — o DS não muda entre stacks.
          </p>
        </DSCard>
      </DSSection>

      {/* ───────────────────────────── Django Templates (direto) ───────────────────────────── */}
      <DSSection
        title="Django Templates (direto)"
        description="Use o DS sem React: compile os tokens HSL com Tailwind CLI e sirva templates Django com classes utilitárias. Ideal para CRUDs, admin interno e páginas estáticas."
      >
        <DSCard className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(150_60%_35%/0.15)] text-[hsl(150_60%_35%)] flex items-center justify-center">
              <Server size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold">Stack recomendada</h3>
              <p className="text-xs text-muted-foreground">
                Django 5 · Tailwind CLI v3 · django-compressor (opcional) · WhiteNoise
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            1. Instale o Tailwind CLI e inicialize o projeto de CSS no Django:
          </p>

          <DSCode>{`npm install -g tailwindcss
# ou use npx sem instalar global

cd projeto_django
mkdir -p static/css static/js templates

# crie tailwind.config.js na raiz do projeto Django
npx tailwindcss init`}</DSCode>

          <p className="text-sm text-muted-foreground">
            2. Configure o <code className="font-mono text-xs">tailwind.config.js</code> apontando para seus templates:
          </p>

          <DSCode>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './**/templates/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}`}</DSCode>

          <p className="text-sm text-muted-foreground">
            3. Crie <code className="font-mono text-xs">static/css/input.css</code> com os tokens HSL do SmarNet:
          </p>

          <DSCode>{`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 220 25% 10%;
    --foreground: 210 20% 96%;
    --primary: 195 75% 45%;
    --primary-foreground: 210 20% 96%;
    --secondary: 200 15% 25%;
    --muted: 220 20% 18%;
    --accent: 42 90% 55%;
    --border: 220 15% 22%;
    --surface: 220 22% 14%;
    --surface-container: 220 20% 16%;
    /* ...copie todos os tokens do index.css do SmarNet */
  }
}`}</DSCode>

          <p className="text-sm text-muted-foreground">
            4. Adicione o script de build no <code className="font-mono text-xs">package.json</code>:
          </p>

          <DSCode>{`{
  "scripts": {
    "build:css": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --minify",
    "watch:css": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch"
  }
}`}</DSCode>

          <p className="text-sm text-muted-foreground">
            5. Configure o Django para servir arquivos estáticos com WhiteNoise:
          </p>

          <DSCode>{`# settings.py
INSTALLED_APPS = [
    ...
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← adicione
    ...
]

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

# WhiteNoise em produção
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'`}</DSCode>

          <p className="text-sm text-muted-foreground">
            6. Template base Django usando as classes do DS:
          </p>

          <DSCode>{`<!-- templates/base.html -->
{% load static %}
<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% block title %}SmarNet{% endblock %}</title>
  <link rel="stylesheet" href="{% static 'css/output.css' %}">
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-background text-foreground min-h-screen">
  <div class="flex">
    <!-- sidebar -->
    <aside class="w-64 bg-surface border-r border-border/30 min-h-screen p-4">
      <div class="font-display font-bold text-xl text-primary mb-6">SmarNet</div>
      <nav class="space-y-1">
        <a href="/" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
          Dashboard
        </a>
      </nav>
    </aside>
    <!-- content -->
    <main class="flex-1 p-6">
      {% block content %}{% endblock %}
    </main>
  </div>
</body>
</html>`}</DSCode>

          <p className="text-sm text-muted-foreground">
            7. Exemplo de página estendendo o template base:
          </p>

          <DSCode>{`<!-- templates/dashboard.html -->
{% extends 'base.html' %}

{% block content %}
<h1 class="font-display text-3xl font-bold mb-6">Operação</h1>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  {% for kpi in kpis %}
  <div class="rounded-2xl bg-surface-container p-6 border border-border/30 shadow-ambient">
    <p class="text-xs text-muted-foreground uppercase tracking-wider">{{ kpi.label }}</p>
    <p class="font-display text-2xl font-bold mt-1">{{ kpi.value }}</p>
  </div>
  {% endfor %}
</div>

<button class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity mt-6">
  Nova ordem
</button>
{% endblock %}`}</DSCode>

          <p className="text-sm text-muted-foreground">
            View Django renderizando o template diretamente:
          </p>

          <DSCode>{`# views.py
from django.shortcuts import render

def dashboard(request):
    kpis = [
        {'label': 'Produção', 'value': '94%'},
        {'label': 'OEE', 'value': '87%'},
        {'label': 'Paradas', 'value': '3'},
    ]
    return render(request, 'dashboard.html', {'kpis': kpis})`}</DSCode>

          <p className="text-sm text-muted-foreground">
            8. Build em produção (antes do deploy):
          </p>

          <DSCode>{`npm run build:css        # gera output.css minificado
python manage.py collectstatic --noinput
python manage.py migrate
python manage.py runserver`}</DSCode>

          <div className="grid md:grid-cols-2 gap-3 pt-2">
            <DoDont type="do">
              Use <code className="font-mono text-xs">--watch</code> em desenvolvimento para
              recompilar CSS automaticamente ao editar templates.
            </DoDont>
            <DoDont type="dont">
              Não edite <code className="font-mono text-xs">output.css</code> diretamente —
              ele é gerado. Sempre edite <code className="font-mono text-xs">input.css</code>.
            </DoDont>
          </div>
        </DSCard>
      </DSSection>

      {/* ───────────────────────────── Next.js ───────────────────────────── */}
      <DSSection
        title="Next.js (App Router)"
        description="Cenário mais direto: Next.js usa React + Tailwind nativamente. O DS entra como camada de UI sem fricção, com SSR e RSC opcionais."
      >
        <DSCard className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-foreground/10 text-foreground flex items-center justify-center">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold">Stack recomendada</h3>
              <p className="text-xs text-muted-foreground">
                Next 15 · App Router · React 19 · Tailwind v3 · TypeScript
              </p>
            </div>
          </div>

          <DSCode>{`npx create-next-app@latest smarnet-portal --typescript --tailwind --app
cd smarnet-portal
# substitua app/globals.css pelo index.css do SmarNet
# copie components/ui/ e lib/utils.ts`}</DSCode>

          <p className="text-sm text-muted-foreground">
            Carregue as fontes Manrope/Inter via{' '}
            <code className="font-mono text-xs">next/font</code> e expose como CSS variables:
          </p>

          <DSCode>{`// app/layout.tsx
import { Manrope, Inter } from 'next/font/google';
const display = Manrope({ subsets: ['latin'], variable: '--font-display' });
const body    = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={\`\${display.variable} \${body.variable}\`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}`}</DSCode>

          <p className="text-sm text-muted-foreground">
            Componentes <strong>client</strong> usam Radix/shadcn; componentes{' '}
            <strong>server</strong> renderizam HTML semântico com as mesmas classes Tailwind:
          </p>

          <DSCode>{`// app/dashboard/page.tsx  (Server Component)
import { Card } from '@/components/ui/card';
export default async function Page() {
  const kpis = await db.kpi.findMany();
  return (
    <main className="bg-background text-foreground p-6">
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      {kpis.map(k => <Card key={k.id}>{k.label}</Card>)}
    </main>
  );
}`}</DSCode>
        </DSCard>
      </DSSection>

      {/* ───────────────────────────── Outras stacks ───────────────────────────── */}
      <DSSection
        title="Outras stacks compatíveis"
        description="Qualquer projeto que rode Tailwind + React (ou Vue) consegue consumir o núcleo. Estas duas merecem destaque:"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <DSCard>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-warning/15 text-warning flex items-center justify-center">
                <Rocket size={18} />
              </div>
              <h3 className="font-display font-bold">Astro</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Ideal para portais institucionais e docs. Use a integration{' '}
              <code className="font-mono text-xs">@astrojs/react</code> e importe os
              componentes shadcn como islands com{' '}
              <code className="font-mono text-xs">client:load</code>.
            </p>
            <DSCode>{`npx astro add react tailwind
// src/styles/global.css ← index.css do SmarNet
<Button client:visible>Salvar</Button>`}</DSCode>
          </DSCard>

          <DSCard>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-info/15 text-info flex items-center justify-center">
                <Workflow size={18} />
              </div>
              <h3 className="font-display font-bold">Remix / React Router 7</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Drop-in: estrutura idêntica ao Next.js, com loaders por rota.
              Importe o <code className="font-mono text-xs">index.css</code> em{' '}
              <code className="font-mono text-xs">root.tsx</code> via{' '}
              <code className="font-mono text-xs">links()</code>.
            </p>
            <DSCode>{`import styles from './index.css?url';
export const links = () => [{ rel: 'stylesheet', href: styles }];`}</DSCode>
          </DSCard>
        </div>
      </DSSection>

      <DSSection title="Regras ao portar">
        <div className="grid md:grid-cols-2 gap-3">
          <DoDont type="do">
            Mantenha <code className="font-mono text-xs">index.css</code> e{' '}
            <code className="font-mono text-xs">tailwind.config.ts</code> como
            “source of truth” — versione-os num pacote interno se possível.
          </DoDont>
          <DoDont type="dont">
            Reescrever cores em cada projeto (<code className="font-mono text-xs">#0f1b3d</code>,{' '}
            <code className="font-mono text-xs">bg-blue-900</code>). Sempre via tokens.
          </DoDont>
          <DoDont type="do">
            Carregar Manrope + Inter via mecanismo nativo do framework
            (next/font, @fontsource, link tag).
          </DoDont>
          <DoDont type="dont">
            Misturar bibliotecas de UI concorrentes (MUI, Chakra) — quebra a
            hierarquia de superfícies.
          </DoDont>
        </div>
      </DSSection>
    </>
  );
}

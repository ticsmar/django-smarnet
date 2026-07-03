// Shared chart data + theme tokens for all chart showcases

export const monthly = [
  { name: 'Jan', a: 4200, b: 2400, c: 1800, d: 3200 },
  { name: 'Fev', a: 3800, b: 2900, c: 2100, d: 2800 },
  { name: 'Mar', a: 5100, b: 3400, c: 2400, d: 4100 },
  { name: 'Abr', a: 4700, b: 3900, c: 2900, d: 3700 },
  { name: 'Mai', a: 6200, b: 4500, c: 3300, d: 4900 },
  { name: 'Jun', a: 5800, b: 4200, c: 3700, d: 4500 },
  { name: 'Jul', a: 7100, b: 5100, c: 4200, d: 5600 },
  { name: 'Ago', a: 6800, b: 5400, c: 4500, d: 5300 },
  { name: 'Set', a: 7500, b: 5800, c: 4900, d: 6100 },
  { name: 'Out', a: 8200, b: 6300, c: 5300, d: 6700 },
  { name: 'Nov', a: 7900, b: 6100, c: 5700, d: 6400 },
  { name: 'Dez', a: 9100, b: 6900, c: 6100, d: 7300 },
];

export const pieData = [
  { name: 'Industrial', value: 4200 },
  { name: 'Comercial', value: 3100 },
  { name: 'Residencial', value: 2300 },
  { name: 'Hospitalar', value: 1800 },
  { name: 'Educação', value: 1400 },
];

export const radarData = [
  { skill: 'Pressão', A: 120, B: 110 },
  { skill: 'Vazão', A: 98, B: 130 },
  { skill: 'Temp.', A: 86, B: 130 },
  { skill: 'Vibração', A: 99, B: 100 },
  { skill: 'Umidade', A: 85, B: 90 },
  { skill: 'Energia', A: 65, B: 85 },
];

export const scatterData = Array.from({ length: 30 }, (_, i) => ({
  x: Math.round(20 + Math.random() * 80),
  y: Math.round(20 + Math.random() * 80),
  z: Math.round(50 + Math.random() * 350),
}));

export const candleData = Array.from({ length: 20 }, (_, i) => {
  const open = 100 + Math.random() * 50;
  const close = open + (Math.random() - 0.5) * 20;
  const high = Math.max(open, close) + Math.random() * 10;
  const low = Math.min(open, close) - Math.random() * 10;
  return { day: `D${i + 1}`, open, close, high, low, range: [low, high] as [number, number], body: [Math.min(open, close), Math.max(open, close)] as [number, number] };
});

export const heatmapData = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 24 }, (_, col) => ({
    row, col, value: Math.round(Math.random() * 100),
  })),
).flat();

export const timelineData = [
  { task: 'Planejamento', start: 0, end: 15, color: 'hsl(var(--primary))' },
  { task: 'Design', start: 10, end: 30, color: 'hsl(var(--secondary))' },
  { task: 'Desenvolvimento', start: 25, end: 65, color: 'hsl(var(--accent))' },
  { task: 'Testes', start: 60, end: 80, color: 'hsl(var(--warning))' },
  { task: 'Deploy', start: 78, end: 95, color: 'hsl(var(--success))' },
];

export const funnelData = [
  { stage: 'Visitantes', value: 12500, color: 'hsl(var(--primary))' },
  { stage: 'Interessados', value: 8200, color: 'hsl(var(--secondary))' },
  { stage: 'Leads', value: 5100, color: 'hsl(var(--accent))' },
  { stage: 'Propostas', value: 2800, color: 'hsl(var(--warning))' },
  { stage: 'Clientes', value: 1200, color: 'hsl(var(--success))' },
];

// Color tokens (resolved at runtime via Tailwind / CSS vars)
export const chartColors = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  accent: 'hsl(var(--accent))',
  success: 'hsl(var(--success))',
  warning: 'hsl(var(--warning))',
  alert: 'hsl(var(--alert))',
  destructive: 'hsl(var(--destructive))',
  info: 'hsl(var(--info))',
  muted: 'hsl(var(--muted-foreground))',
};

export const palette = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.accent,
  chartColors.warning,
  chartColors.success,
  chartColors.info,
];

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { ChartsLayout, ChartSection } from './ChartsLayout';
import { monthly, pieData, chartColors } from './chartData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: 'hsl(var(--muted-foreground))',
        font: { size: 12, family: 'Inter, sans-serif' },
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: 'hsl(var(--popover))',
      titleColor: 'hsl(var(--foreground))',
      bodyColor: 'hsl(var(--foreground))',
      borderColor: 'hsl(var(--border))',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { color: 'hsl(var(--border) / 0.4)' },
      ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } },
      border: { display: false },
    },
    y: {
      grid: { color: 'hsl(var(--border) / 0.4)' },
      ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } },
      border: { display: false },
    },
  },
};

const lineData = {
  labels: monthly.map((m) => m.name),
  datasets: [
    {
      label: 'Vendas',
      data: monthly.map((m) => m.a),
      borderColor: chartColors.primary,
      backgroundColor: chartColors.primary,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
    },
    {
      label: 'Custo',
      data: monthly.map((m) => m.b),
      borderColor: chartColors.warning,
      backgroundColor: chartColors.warning,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
    },
  ],
};

const barData = {
  labels: monthly.slice(0, 6).map((m) => m.name),
  datasets: [
    {
      label: 'Receita',
      data: monthly.slice(0, 6).map((m) => m.a),
      backgroundColor: chartColors.secondary,
      borderRadius: 6,
      barPercentage: 0.6,
    },
    {
      label: 'Despesa',
      data: monthly.slice(0, 6).map((m) => m.b),
      backgroundColor: chartColors.accent,
      borderRadius: 6,
      barPercentage: 0.6,
    },
  ],
};

const doughnutData = {
  labels: pieData.map((d) => d.name),
  datasets: [
    {
      data: pieData.map((d) => d.value),
      backgroundColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.accent,
        chartColors.warning,
        chartColors.success,
      ],
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
};

const areaData = {
  labels: monthly.map((m) => m.name),
  datasets: [
    {
      label: 'Vendas',
      data: monthly.map((m) => m.a),
      borderColor: chartColors.primary,
      backgroundColor: (ctx: any) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'hsl(var(--primary) / 0.4)');
        gradient.addColorStop(1, 'hsl(var(--primary) / 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
    {
      label: 'Custo',
      data: monthly.map((m) => m.b),
      borderColor: chartColors.accent,
      backgroundColor: (ctx: any) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'hsl(var(--accent) / 0.4)');
        gradient.addColorStop(1, 'hsl(var(--accent) / 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: 'hsl(var(--muted-foreground))',
        font: { size: 12, family: 'Inter, sans-serif' },
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: 'hsl(var(--popover))',
      titleColor: 'hsl(var(--foreground))',
      bodyColor: 'hsl(var(--foreground))',
      borderColor: 'hsl(var(--border))',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
    },
  },
};

export default function ChartjsShowcase() {
  return (
    <ChartsLayout title="Chart.js Charts" description="Gráficos reais usando Chart.js — renderização via Canvas, animações suaves e tema integrado." category="Chart.js">
      <ChartSection title="Line Chart">
        <div className="h-[300px]">
          <Line data={lineData} options={commonOptions} />
        </div>
      </ChartSection>

      <ChartSection title="Bar Chart">
        <div className="h-[300px]">
          <Bar data={barData} options={commonOptions} />
        </div>
      </ChartSection>

      <ChartSection title="Doughnut">
        <div className="h-[320px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </ChartSection>

      <ChartSection title="Area Chart">
        <div className="h-[300px]">
          <Line data={areaData} options={commonOptions} />
        </div>
      </ChartSection>
    </ChartsLayout>
  );
}

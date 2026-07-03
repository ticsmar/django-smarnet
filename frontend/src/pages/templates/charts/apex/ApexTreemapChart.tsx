import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { palette } from '../chartData';

const treeData = [
  { name: 'Industrial', size: 4200, fill: palette[0] },
  { name: 'Comercial', size: 3100, fill: palette[1] },
  { name: 'Residencial', size: 2300, fill: palette[2] },
  { name: 'Hospitalar', size: 1800, fill: palette[3] },
  { name: 'Educação', size: 1400, fill: palette[4] },
  { name: 'Energia', size: 2700, fill: palette[5] },
  { name: 'Logística', size: 1600, fill: palette[0] },
  { name: 'Agro', size: 2100, fill: palette[1] },
];

export default function ApexTreemapChart() {
  return (
    <ChartsLayout title="Treemap Charts" description="Hierarquia visual proporcional aos valores.">
      <ChartSection title="Distribuição por Setor">
        <ResponsiveContainer width="100%" height={420}>
          <Treemap data={treeData} dataKey="size" stroke="hsl(var(--background))" />
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}

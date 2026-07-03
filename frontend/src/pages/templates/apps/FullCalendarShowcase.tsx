import { useState } from 'react';
import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, CalendarRange } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

type CalEvent = {
  start: number;
  end: number; // inclusive
  title: string;
  color: string; // bg-*
  time?: string;
};

const events: CalEvent[] = [
  { start: 5, end: 5, title: 'Reunião de Sprint', color: 'bg-primary', time: '09:00' },
  { start: 5, end: 5, title: 'Design Review', color: 'bg-secondary', time: '14:00' },
  { start: 7, end: 10, title: 'Sprint Planning Week', color: 'bg-primary', time: 'Todo dia' },
  { start: 12, end: 12, title: 'Deploy v2.5', color: 'bg-destructive', time: '10:00' },
  { start: 14, end: 17, title: 'Workshop UX (4 dias)', color: 'bg-accent', time: '13:00' },
  { start: 18, end: 18, title: 'Planejamento Q3', color: 'bg-primary', time: '09:30' },
  { start: 20, end: 24, title: 'Conferência Anual', color: 'bg-secondary', time: 'Semana toda' },
  { start: 22, end: 22, title: 'Demo para cliente', color: 'bg-secondary', time: '15:00' },
  { start: 25, end: 25, title: 'Retrospectiva', color: 'bg-primary', time: '16:00' },
  { start: 27, end: 29, title: 'Code Freeze', color: 'bg-destructive', time: 'Todo dia' },
];

export default function FullCalendarShowcase() {
  const [currentMonth, setCurrentMonth] = useState(3); // April
  const [currentYear] = useState(2026);
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // split cells into weeks
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // For each week, compute event segments with column span and lane
  type Segment = { ev: CalEvent; colStart: number; span: number; lane: number; continuesLeft: boolean; continuesRight: boolean };
  const weekSegments: Segment[][] = weeks.map(week => {
    const days = week.map(d => d ?? -1);
    const segs: Omit<Segment, 'lane'>[] = [];
    events.forEach(ev => {
      const firstIdx = days.findIndex(d => d >= ev.start && d <= ev.end);
      if (firstIdx === -1) return;
      let lastIdx = firstIdx;
      for (let i = firstIdx; i < 7; i++) {
        if (days[i] >= ev.start && days[i] <= ev.end) lastIdx = i;
        else break;
      }
      segs.push({
        ev,
        colStart: firstIdx,
        span: lastIdx - firstIdx + 1,
        continuesLeft: ev.start < (days[firstIdx] ?? 0),
        continuesRight: ev.end > (days[lastIdx] ?? 0),
      });
    });
    // assign lanes greedy
    const lanes: Segment[][] = [];
    const placed: Segment[] = [];
    segs.forEach(s => {
      let lane = 0;
      while (lanes[lane] && lanes[lane].some(o => !(s.colStart + s.span <= o.colStart || o.colStart + o.span <= s.colStart))) {
        lane++;
      }
      const seg: Segment = { ...s, lane };
      lanes[lane] = lanes[lane] || [];
      lanes[lane].push(seg);
      placed.push(seg);
    });
    return placed;
  });

  return (
    <AppsLayout title="Full Calendar" description="Componente de calendário interativo com eventos, múltiplas visualizações e suporte a marcações de múltiplos dias.">
      <ShowcaseSection title="Calendário Completo">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Eventos podem ocupar um único dia ou se estender por vários dias, exibidos como barras contínuas.</p>
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(m => m > 0 ? m - 1 : 11)}>
                <ChevronLeft size={16} />
              </Button>
              <h2 className="text-lg font-bold text-foreground min-w-[180px] text-center">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(m => m < 11 ? m + 1 : 0)}>
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-border overflow-hidden">
                {(['month', 'week', 'list'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === v ? 'bg-primary text-primary-foreground' : 'bg-surface-container text-muted-foreground hover:text-foreground'}`}>
                    {v === 'month' ? 'Mês' : v === 'week' ? 'Semana' : 'Lista'}
                  </button>
                ))}
              </div>
              <Button size="sm"><Plus size={14} className="mr-1" /> Evento</Button>
            </div>
          </div>

          {view === 'month' && (
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 bg-muted/30">
                {DAYS.map(d => (
                  <div key={d} className="py-2 text-center text-xs font-semibold text-muted-foreground border-b border-border">{d}</div>
                ))}
              </div>
              {weeks.map((week, wIdx) => {
                const segs = weekSegments[wIdx];
                const laneCount = segs.reduce((m, s) => Math.max(m, s.lane + 1), 0);
                const laneH = 20; // px per lane
                const headerH = 28; // day-number area
                return (
                  <div key={wIdx} className="relative grid grid-cols-7" style={{ minHeight: 110 }}>
                    {week.map((day, i) => {
                      const isToday = day === 13;
                      return (
                        <div key={i} className={`border-b border-r border-border p-1.5 ${!day ? 'bg-muted/10' : 'hover:bg-muted/20 cursor-pointer'}`}>
                          {day && (
                            <span className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${isToday ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}>
                              {day}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {/* Event overlay */}
                    <div
                      className="pointer-events-none absolute inset-x-0 grid grid-cols-7"
                      style={{ top: headerH }}
                    >
                      {segs.map((s, i) => {
                        const roundedL = s.continuesLeft ? 'rounded-l-none' : 'rounded-l';
                        const roundedR = s.continuesRight ? 'rounded-r-none' : 'rounded-r';
                        return (
                          <div
                            key={i}
                            className={`${s.ev.color} ${roundedL} ${roundedR} text-[10px] text-primary-foreground px-2 py-0.5 mx-0.5 truncate pointer-events-auto cursor-pointer shadow-sm flex items-center gap-1`}
                            style={{
                              gridColumnStart: s.colStart + 1,
                              gridColumnEnd: `span ${s.span}`,
                              marginTop: s.lane * laneH,
                              height: laneH - 4,
                            }}
                            title={`${s.ev.title} (dia ${s.ev.start}–${s.ev.end})`}
                          >
                            {s.span > 1 && <CalendarRange size={10} className="shrink-0" />}
                            <span className="truncate">{s.ev.title}</span>
                          </div>
                        );
                      })}
                    </div>
                    {laneCount > 0 && <div style={{ height: headerH + laneCount * laneH + 8 }} className="col-span-7 -mt-px pointer-events-none" />}
                  </div>
                );
              })}
            </div>
          )}

          {view === 'week' && (
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 bg-muted/30">
                {DAYS.map((d, i) => (
                  <div key={d} className="py-2 text-center border-b border-border">
                    <span className="text-xs text-muted-foreground">{d}</span>
                    <span className={`block text-sm font-bold ${i + 11 === 13 ? 'text-primary' : 'text-foreground'}`}>{i + 11}</span>
                  </div>
                ))}
              </div>
              {/* All-day / multi-day strip */}
              <div className="relative grid grid-cols-7 border-b border-border bg-muted/10 min-h-[40px]">
                <div className="absolute left-1 top-1 text-[9px] uppercase tracking-wide text-muted-foreground">Dia inteiro</div>
                {(() => {
                  const weekDays = [11, 12, 13, 14, 15, 16, 17];
                  const segs: { ev: CalEvent; colStart: number; span: number; lane: number; cl: boolean; cr: boolean }[] = [];
                  events.filter(e => e.end > e.start || e.time === 'Todo dia' || e.time === 'Semana toda').forEach(ev => {
                    const first = weekDays.findIndex(d => d >= ev.start && d <= ev.end);
                    if (first === -1) return;
                    let last = first;
                    for (let i = first; i < 7; i++) {
                      if (weekDays[i] >= ev.start && weekDays[i] <= ev.end) last = i;
                      else break;
                    }
                    segs.push({ ev, colStart: first, span: last - first + 1, lane: 0, cl: ev.start < weekDays[first], cr: ev.end > weekDays[last] });
                  });
                  // simple lane assignment
                  const lanes: typeof segs[] = [];
                  segs.forEach(s => {
                    let l = 0;
                    while (lanes[l] && lanes[l].some(o => !(s.colStart + s.span <= o.colStart || o.colStart + o.span <= s.colStart))) l++;
                    s.lane = l;
                    lanes[l] = lanes[l] || [];
                    lanes[l].push(s);
                  });
                  return (
                    <>
                      {[0, 1, 2, 3, 4, 5, 6].map(i => <div key={i} className="border-r border-border" />)}
                      <div className="absolute inset-x-0 top-4 grid grid-cols-7 gap-y-1">
                        {segs.map((s, i) => (
                          <div
                            key={i}
                            className={`${s.ev.color} ${s.cl ? 'rounded-l-none' : 'rounded-l'} ${s.cr ? 'rounded-r-none' : 'rounded-r'} text-[10px] text-primary-foreground px-2 py-0.5 mx-0.5 truncate flex items-center gap-1`}
                            style={{ gridColumnStart: s.colStart + 1, gridColumnEnd: `span ${s.span}`, marginTop: s.lane * 20 }}
                          >
                            <CalendarRange size={10} /> <span className="truncate">{s.ev.title}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                <div key={time} className="grid grid-cols-7 border-b border-border">
                  {DAYS.map((_, col) => {
                    const ev = events.find(e => e.start === e.end && e.start === col + 11 && e.time === time);
                    return (
                      <div key={col} className="h-14 border-r border-border p-1 relative">
                        {col === 0 && <span className="text-[10px] text-muted-foreground">{time}</span>}
                        {ev && (
                          <div className={`${ev.color} text-[10px] text-primary-foreground px-1.5 py-0.5 rounded absolute inset-x-1 top-1`}>
                            {ev.title}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {view === 'list' && (
            <div className="space-y-2">
              {[...events].sort((a, b) => a.start - b.start).map((ev, i) => {
                const multi = ev.end > ev.start;
                return (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className={`w-1 h-10 rounded-full ${ev.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                        {ev.title}
                        {multi && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-accent/20 text-accent flex items-center gap-1">
                            <CalendarRange size={10} /> {ev.end - ev.start + 1} dias
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1"><Clock size={10} /> {ev.time}</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {multi ? `${ev.start}–${ev.end} ${MONTHS[currentMonth]}` : `${ev.start} ${MONTHS[currentMonth]}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}

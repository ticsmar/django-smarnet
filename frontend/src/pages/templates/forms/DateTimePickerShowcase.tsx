import { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import {
  FormDatePicker,
  FormDateRangePicker,
  FormInput,
  FormGrid,
} from '@/components/ui/forms';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { format, startOfWeek, endOfWeek, getISOWeek, getISOWeekYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

function getISOWeekString(date: Date) {
  return `${getISOWeekYear(date)}/${getISOWeek(date).toString().padStart(2, '0')}`;
}

export default function DateTimePickerShowcase() {
  const [singleDate, setSingleDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [weekDate, setWeekDate] = useState<Date | undefined>();

  const weekStart = weekDate ? startOfWeek(weekDate, { weekStartsOn: 1 }) : undefined;
  const weekEnd = weekDate ? endOfWeek(weekDate, { weekStartsOn: 1 }) : undefined;

  return (
    <FormsShowcaseLayout
      title="Date, Time Picker"
      subtitle="Form Elements"
      description="Seletores de data, hora, intervalos e semanas ISO."
    >
      <ShowcaseSection title="Data Simples">
        <FormGrid cols={3}>
          <FormDatePicker
            label="Data de Emissão"
            value={singleDate}
            onChange={setSingleDate}
          />
          <FormInput type="date" label="Data (Input nativo)" />
          <FormInput
            type="time"
            label="Hora"
            startIcon={<Clock size={16} />}
          />
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Intervalo de Datas (Range)">
        <FormGrid cols={2}>
          <FormDateRangePicker
            label="Período"
            value={dateRange}
            onChange={setDateRange}
          />
          <div>
            <Label className="text-xs mb-1.5">Dias selecionados</Label>
            <div className="h-10 flex items-center px-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground">
              {dateRange?.from && dateRange?.to
                ? `${Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} dias`
                : '—'}
            </div>
          </div>
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Semana ISO (YYYY/WW)">
        <FormGrid cols={3}>
          <div>
            <Label className="text-xs mb-1.5">Selecionar Semana</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !weekDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon size={16} className="mr-2" />
                  {weekDate ? `Semana ${getISOWeekString(weekDate)}` : 'Selecione a semana'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={weekDate}
                  onSelect={setWeekDate}
                  locale={ptBR}
                  className="p-3 pointer-events-auto"
                  modifiers={{
                    selectedWeek: weekDate
                      ? { from: startOfWeek(weekDate, { weekStartsOn: 1 }), to: endOfWeek(weekDate, { weekStartsOn: 1 }) }
                      : (undefined as any),
                  }}
                  modifiersClassNames={{
                    selectedWeek: 'bg-secondary/15 text-secondary rounded-none',
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Intervalo da Semana</Label>
            <div className="h-10 flex items-center px-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground">
              {weekStart && weekEnd ? `${format(weekStart, 'dd/MM')} a ${format(weekEnd, 'dd/MM/yyyy')}` : '—'}
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Ano ISO / Semana</Label>
            <div className="h-10 flex items-center gap-2 px-3 rounded-lg bg-secondary/10 border border-secondary/20 text-sm font-mono font-bold text-secondary">
              {weekDate ? getISOWeekString(weekDate) : '—'}
            </div>
          </div>
        </FormGrid>
      </ShowcaseSection>

      <ShowcaseSection title="Data e Hora Combinados">
        <FormGrid cols={2}>
          <FormInput type="datetime-local" label="Data e Hora (nativo)" />
          <FormInput type="month" label="Mês" />
        </FormGrid>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}

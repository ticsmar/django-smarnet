import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { FormDatePicker, FormDateRangePicker } from '@/components/ui/forms';
import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
  type PropDef,
} from '../_docs';

/* ---------- Props ---------- */
const calendarProps: PropDef[] = [
  { name: 'mode', type: "'single' | 'range' | 'multiple'", default: "'single'", description: 'Modo de seleção.' },
  { name: 'selected', type: 'Date | DateRange | Date[]', description: 'Data(s) selecionada(s).' },
  { name: 'onSelect', type: '(value) => void', description: 'Callback de seleção.' },
  { name: 'numberOfMonths', type: 'number', default: '1', description: 'Quantidade de meses visíveis.' },
  { name: 'disabled', type: 'Matcher | Matcher[]', description: 'Datas desabilitadas (matcher do react-day-picker).' },
  { name: 'locale', type: 'Locale', default: 'ptBR', description: 'Locale do date-fns para tradução.' },
  { name: 'showOutsideDays', type: 'boolean', default: 'true', description: 'Exibe dias de meses adjacentes.' },
];

const datePickerProps: PropDef[] = [
  { name: 'label', type: 'ReactNode', description: 'Label do campo.' },
  { name: 'value', type: 'Date', description: 'Data selecionada.' },
  { name: 'onChange', type: '(date: Date | undefined) => void', required: true, description: 'Callback de mudança.' },
  { name: 'placeholder', type: 'string', default: "'Selecione uma data'", description: 'Texto do trigger vazio.' },
  { name: 'formatStr', type: 'string', default: "'dd/MM/yyyy'", description: 'Formato de exibição (date-fns).' },
  { name: 'numberOfMonths', type: 'number', default: '1', description: 'Meses visíveis no popover.' },
  { name: 'error', type: 'ReactNode', description: 'Mensagem de erro.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o campo.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marca como obrigatório.' },
];

const dateRangeProps: PropDef[] = [
  { name: 'label', type: 'ReactNode', description: 'Label do campo.' },
  { name: 'value', type: 'DateRange', description: 'Intervalo selecionado ({ from, to }).' },
  { name: 'onChange', type: '(range: DateRange | undefined) => void', required: true, description: 'Callback de mudança.' },
  { name: 'placeholder', type: 'string', default: "'Selecione o período'", description: 'Texto do trigger vazio.' },
  { name: 'formatStr', type: 'string', default: "'dd/MM/yyyy'", description: 'Formato de exibição.' },
  { name: 'numberOfMonths', type: 'number', default: '2', description: 'Meses visíveis lado a lado.' },
  { name: 'error', type: 'ReactNode', description: 'Mensagem de erro.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o campo.' },
];

export default function CalendarPage() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [pickerDate, setPickerDate] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <ComponentDoc
      summary="Componentes de calendário e seleção de data. Inclui o Calendar primitivo (react-day-picker) e os blocos de alto nível FormDatePicker e FormDateRangePicker."
      importPath="@/components/ui/calendar · @/components/ui/forms"
    >
      {/* ===== Calendar ===== */}
      <DocSection title="Calendar" description="Primitivo de calendário baseado em react-day-picker. Usado internamente pelos date-pickers.">
        <VariantSection
          title="Single"
          description="Seleção de data única."
          preview={
            <Calendar
              mode="single"
              selected={singleDate}
              onSelect={setSingleDate}
              className="rounded-xl border border-border/30 pointer-events-auto"
            />
          }
          code={`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-xl border border-border/30"
/>`}
        />

        <VariantSection
          title="Dois meses"
          description="Exibe dois meses lado a lado."
          preview={
            <Calendar
              mode="single"
              selected={singleDate}
              onSelect={setSingleDate}
              numberOfMonths={2}
              className="rounded-xl border border-border/30 pointer-events-auto"
            />
          }
          code={`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  numberOfMonths={2}
/>`}
        />

        <PropsTable rows={calendarProps} title="Calendar Props" />
      </DocSection>

      {/* ===== FormDatePicker ===== */}
      <DocSection title="FormDatePicker" description="Date picker de data única com Popover, integrado ao FormFieldShell (label, erro, hint).">
        <VariantSection
          title="Padrão"
          preview={
            <div className="max-w-xs">
              <FormDatePicker
                label="Data de nascimento"
                value={pickerDate}
                onChange={setPickerDate}
              />
            </div>
          }
          code={`<FormDatePicker
  label="Data de nascimento"
  value={date}
  onChange={setDate}
/>`}
        />

        <VariantSection
          title="Com erro e required"
          preview={
            <div className="max-w-xs">
              <FormDatePicker
                label="Data de entrega"
                required
                value={undefined}
                onChange={() => {}}
                error="Campo obrigatório"
              />
            </div>
          }
          code={`<FormDatePicker
  label="Data de entrega"
  required
  error="Campo obrigatório"
  value={undefined}
  onChange={setDate}
/>`}
        />

        <VariantSection
          title="Desabilitado"
          preview={
            <div className="max-w-xs">
              <FormDatePicker
                label="Bloqueado"
                disabled
                value={new Date()}
                onChange={() => {}}
              />
            </div>
          }
          code={`<FormDatePicker label="Bloqueado" disabled value={new Date()} onChange={() => {}} />`}
        />

        <PropsTable rows={datePickerProps} title="FormDatePicker Props" />
      </DocSection>

      {/* ===== FormDateRangePicker ===== */}
      <DocSection title="FormDateRangePicker" description="Seletor de intervalo de datas com dois meses lado a lado.">
        <VariantSection
          title="Padrão"
          preview={
            <div className="max-w-sm">
              <FormDateRangePicker
                label="Período do relatório"
                value={range}
                onChange={setRange}
              />
            </div>
          }
          code={`<FormDateRangePicker
  label="Período do relatório"
  value={range}
  onChange={setRange}
/>`}
        />

        <VariantSection
          title="Com erro"
          preview={
            <div className="max-w-sm">
              <FormDateRangePicker
                label="Período"
                value={undefined}
                onChange={() => {}}
                error="Selecione um período válido"
              />
            </div>
          }
          code={`<FormDateRangePicker
  label="Período"
  error="Selecione um período válido"
  value={undefined}
  onChange={setRange}
/>`}
        />

        <PropsTable rows={dateRangeProps} title="FormDateRangePicker Props" />
      </DocSection>

      <UsageNote type="tip">
        Prefira <code className="font-mono text-xs">FormDatePicker</code> e{' '}
        <code className="font-mono text-xs">FormDateRangePicker</code> em formulários — eles já incluem
        label, erro e popover. Use <code className="font-mono text-xs">Calendar</code> diretamente apenas
        quando precisar de um calendário inline sem trigger.
      </UsageNote>
    </ComponentDoc>
  );
}

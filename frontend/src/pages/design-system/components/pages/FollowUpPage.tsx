import { useState } from 'react';
import { ComponentDoc, DocSection, VariantSection, UsageNote, PropsTable } from '../_docs';
import {
  FollowUpAlarmBadge,
  FollowUpForm,
  FollowUpList,
  FollowUpStatusIcon,
  type FollowUpFormValue,
} from '@/components/ui/follow-up';
import type { FollowUpItem } from '@/modules/followup/types';

const sampleItems: FollowUpItem[] = [
  {
    pre_codigo: 1,
    tre_codigo: 20,
    tre_descricao: 'Comercial',
    tre_tipo_canc: false,
    usu_chapa: 10,
    usu_nome: 'Ana Silva',
    mensagem: 'Retornar ligação do comprador.',
    pre_data: '2026-08-20T10:00:00',
    pre_dt_alarm: '2026-09-02T08:00:00',
    pre_dt_baixa: null,
    mot_codigo: null,
    mot_descricao: null,
    can_edit: true,
    alarm_nivel: 'future',
  },
  {
    pre_codigo: 2,
    tre_codigo: 20,
    tre_descricao: 'Comercial',
    tre_tipo_canc: false,
    usu_chapa: 11,
    usu_nome: 'Bruno Costa',
    mensagem: 'Proposta enviada.<br />Aguardar retorno.',
    pre_data: '2026-08-18T15:30:00',
    pre_dt_alarm: '2026-08-19T08:00:00',
    pre_dt_baixa: null,
    mot_codigo: null,
    mot_descricao: null,
    can_edit: false,
    alarm_nivel: 'overdue',
  },
];

function StatusPreview() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-foreground">
      <span className="inline-flex items-center gap-2">
        <FollowUpStatusIcon nivel="none" /> nenhum
      </span>
      <span className="inline-flex items-center gap-2">
        <FollowUpStatusIcon nivel="ok" /> ok
      </span>
      <span className="inline-flex items-center gap-2">
        <FollowUpStatusIcon nivel="warning" /> warning
      </span>
      <span className="inline-flex items-center gap-2">
        <FollowUpAlarmBadge nivel="future" /> futuro
      </span>
      <span className="inline-flex items-center gap-2">
        <FollowUpAlarmBadge nivel="overdue" /> vencido
      </span>
    </div>
  );
}

function ListPreview() {
  return (
    <FollowUpList
      items={sampleItems}
      onEdit={() => undefined}
      onBaixa={() => undefined}
    />
  );
}

function FormPreview() {
  const [value, setValue] = useState<FollowUpFormValue>({
    mensagem: '',
    mot_codigo: '',
    alarm_data: undefined,
    alarm_hora: '08:00',
  });
  return (
    <FollowUpForm
      tipo={{ tre_codigo: 20, tre_descricao: 'Comercial', tre_tipo_canc: false }}
      motivos={[]}
      value={value}
      onChange={setValue}
      onSubmit={() => undefined}
    />
  );
}

export default function FollowUpPage() {
  return (
    <ComponentDoc
      summary="Follow-up genérico do Smarnet (lista + formulário do recado.php e ícone de alerta). Tokens semânticos; o produto usa sistema + filtro, não um CRUD paralelo por tela. O modal tem abas porque pode manter mais de um host aberto."
      importPath="import { FollowUpTrigger } from '@/modules/followup'"
    >
      <DocSection
        title="Ícone de status"
        description="none (sem recado aberto), ok (há recado) e warning (alarme aberto até SYSDATE+3). No header Cliente o gatilho mostra o ícone + rótulo Follow-up."
      >
        <VariantSection
          title="FollowUpStatusIcon"
          description="Usado no botão do header. FollowUpAlarmBadge marca alerta futuro ou vencido na lista."
          preview={<StatusPreview />}
          code={`<FollowUpStatusIcon nivel="warning" />
<FollowUpAlarmBadge nivel="overdue" />`}
        />
      </DocSection>

      <DocSection
        title="Lista e formulário"
        description="Lista agrupada por tipo (Referência). Mensagem HTML sanitizada (br/b/i). Só o autor altera; baixa de alerta com change_recado."
      >
        <VariantSection
          title="FollowUpList"
          description="Cabeçalho do tipo, data/autor, alerta e ações Alterar / Baixar."
          preview={<ListPreview />}
          code={`<FollowUpList items={items} onEdit={startEdit} onBaixa={handleBaixa} />`}
        />
        <VariantSection
          title="FollowUpForm"
          description="Novo Follow-up substitui a lista: mensagem, Alarme, Hora (30 min) e Inserir na mesma faixa. Cancelar fica no rodapé do modal. Motivo só se TRE_TIPO_CANC."
          preview={<FormPreview />}
          code={`<FollowUpForm tipo={tipo} motivos={motivos} value={form} onChange={setForm} onSubmit={save} />`}
        />
      </DocSection>

      <DocSection
        title="Produto (host)"
        description="FollowUpTrigger abre o modal. Props sistema + filtro escopam SIAOS.PROP_RECADO (PRE_SISTEMA / PRE_FILTRO). FollowUpDialog recebe hosts[] — cada item vira uma aba (Cliente: 5415). O follow-up específico do Cliente (FOLLOW_CLIENTE) está descontinuado e não entra nesta tela."
      >
        <PropsTable
          rows={[
            { name: 'sistema', type: 'number', required: true, description: 'PRE_SISTEMA / sit_codigo (cadastro em /settings/follow-up). Cliente = 117 (não é PAR_SISTEMA=7).' },
            { name: 'filtro', type: 'string', required: true, description: 'PRE_FILTRO — PK do registro host (INTEGER no Oracle).' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueia incluir, alterar e baixa; listar continua.' },
            { name: 'hosts', type: 'FollowUpHostTab[]', required: true, description: 'FollowUpDialog: uma aba por { sistema, filtro }. Na grid de Clientes, o ⋮ acrescenta aba se o cliente ainda não estiver aberto.' },
          ]}
        />
        <UsageNote type="tip">
          Host Cliente: <code>{'<FollowUpTrigger sistema={SISTEMA_CLIENTE_FOLLOWUP} filtro={String(cliente.codigo)} />'}</code>.
          Tokens do DS; não clonar o visual PHP.
        </UsageNote>
        <UsageNote type="warning">
          Não use o código do gerenciador de arquivos (<code>7</code>) como follow-up de Cliente.
          Follow-up de Cliente é <code>117</code>. Em visualizar, passe <code>disabled</code>.
          Não reexibir o post-it <code>FOLLOW_CLIENTE</code>.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}

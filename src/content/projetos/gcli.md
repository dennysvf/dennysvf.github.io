---
title: GCli
tagline: Sistema de gestão para clínicas
summary: Plataforma web que cobre o ciclo completo do atendimento em clínicas, da agenda multiprofissional ao prontuário, da cobrança ao fechamento de caixa.
repo: https://github.com/dennysvf/GCli
stack: [Next.js, TypeScript, PostgreSQL, Prisma, pg-boss, Better Auth, Tailwind, shadcn/ui, Vitest, Playwright]
status: em andamento
startedAt: 2026-09-28
order: 1
featured: true
stats:
  - { value: '14', label: 'features entregues' }
  - { value: '38+', label: 'ADRs registradas' }
  - { value: '0', label: 'linhas escritas à mão' }
---

## O problema

Clínicas de pequeno e médio porte costumam funcionar com planilhas, agenda de papel e WhatsApp espalhados entre recepção, profissionais e financeiro. O **GCli** junta tudo num sistema só, que pode ser configurado para diferentes especialidades (médica, odontológica, fisioterapia, psicologia, estética) sem ficar preso a um único modelo de negócio.

## O que já funciona

- Autenticação com 4 perfis de acesso (Administrador, Gestor, Recepção e Profissional)
- Unidades, salas e catálogo de serviços configuráveis
- Agenda multirrecurso (profissional × sala × unidade) com verificação de conflito, encaixe e séries recorrentes
- Prontuário eletrônico com trava temporal e adendos
- Documentos gerados a partir de modelos (atestado, declaração, receituário)
- Cobrança, pagamentos parciais e pacotes de sessões pré-pagos
- Caixa diário por unidade e controle de despesas
- Painel de gestão e relatórios exportáveis em CSV e PDF
- Internacionalização com perfis de país

## Arquitetura

Um **monólito modular** com fronteiras entre módulos verificadas por lint, isolamento por organização (pronto para SaaS), autorização centralizada, auditoria transacional e restrições no próprio banco contra agendamento duplo. As tarefas em segundo plano usam o pg-boss, uma fila dentro do próprio PostgreSQL. Cada decisão relevante fica registrada como ADR.

## Como foi construído

Nenhuma linha foi escrita por mim. O projeto começou com um **PRD completo**: 15 funcionalidades, personas, métricas de sucesso e um grafo de dependências organizado em ondas de execução. Para cada funcionalidade, o agente gera uma **spec**, um **plano** e implementa em commits por etapa. A IA também escreve os testes de integração (Testcontainers) e os testes E2E (Playwright).

O repositório tem um **diário de bordo** em português e inglês com as lições de cada etapa, além de um design system próprio, o "Tinta e Papel", com contraste medido no padrão WCAG 2.2 AA.

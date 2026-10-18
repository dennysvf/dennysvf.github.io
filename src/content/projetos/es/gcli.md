---
title: GCli
tagline: Sistema de gestión para clínicas
summary: Plataforma web que cubre el ciclo completo de atención en clínicas, desde la agenda multiprofesional hasta la historia clínica, desde el cobro hasta el cierre de caja.
repo: https://github.com/dennysvf/GCli
stack: [Next.js, TypeScript, PostgreSQL, Prisma, pg-boss, Better Auth, Tailwind, shadcn/ui, Vitest, Playwright]
status: em andamento
startedAt: 2026-09-28
order: 1
featured: true
stats:
  - { value: '14', label: 'funcionalidades entregadas' }
  - { value: '38+', label: 'ADRs registradas' }
  - { value: '0', label: 'líneas escritas a mano' }
---

## El problema

Las clínicas pequeñas y medianas suelen funcionar con hojas de cálculo, agendas de papel y WhatsApp repartidos entre recepción, profesionales y finanzas. **GCli** lo reúne todo en un solo sistema, configurable para distintas especialidades (medicina, odontología, fisioterapia, psicología, estética) sin quedar atado a un único modelo de negocio.

## Lo que ya funciona

- Autenticación con 4 perfiles de acceso (Administrador, Gestor, Recepción y Profesional)
- Unidades, salas y catálogo de servicios configurables
- Agenda multirrecurso (profesional × sala × unidad) con verificación de conflictos, turnos extra y series recurrentes
- Historia clínica electrónica con bloqueo temporal y adendas
- Documentos generados a partir de plantillas (certificado, constancia, receta)
- Cobros, pagos parciales y paquetes de sesiones prepagos
- Caja diaria por unidad y control de gastos
- Panel de gestión e informes exportables en CSV y PDF
- Internacionalización con perfiles de país

## Arquitectura

Un **monolito modular** con fronteras entre módulos verificadas por lint, aislamiento por organización (listo para SaaS), autorización centralizada, auditoría transaccional y restricciones en la propia base de datos contra la doble reserva. Las tareas en segundo plano usan pg-boss, una cola dentro del propio PostgreSQL. Cada decisión relevante queda registrada como ADR.

## Cómo se construyó

No escribí ni una línea. El proyecto empezó con un **PRD completo**: 15 funcionalidades, personas, métricas de éxito y un grafo de dependencias organizado en olas de ejecución. Para cada funcionalidad, el agente genera una **spec** y un **plan**, y la implementa en commits por etapa. La IA también escribe las pruebas de integración (Testcontainers) y las pruebas E2E (Playwright).

El repositorio tiene un **diario de a bordo** en portugués e inglés con las lecciones de cada etapa, además de un design system propio, "Tinta y Papel", con contraste medido según WCAG 2.2 AA.

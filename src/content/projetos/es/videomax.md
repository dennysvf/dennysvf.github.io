---
title: videomax
tagline: Transcripción y resumen de videos con IA
summary: Subes tus videos y recibes una transcripción con marcas de tiempo y un resumen generado por IA, en un reproductor de tres paneles con búsqueda dentro del video.
repo: https://github.com/dennysvf/videomax
stack: [Fastify, Next.js 16, React 19, TypeScript, PostgreSQL, Prisma, OpenAI Whisper, ffmpeg, Tailwind 4]
status: em andamento
startedAt: 2026-05-02
order: 2
featured: true
stats:
  - { value: '12', label: 'funcionalidades en el PRD' }
  - { value: '8', label: 'aprobadas por el evaluador' }
  - { value: '0', label: 'líneas escritas a mano' }
---

## El problema

Revisar una grabación de una hora lleva una hora. Los reproductores comunes no permiten buscar una frase hablada, y las herramientas de transcripción limitan la duración del video, cobran por minuto o entregan solo un archivo de texto suelto, sin reproductor ni resumen.

## La solución

Tras subir el archivo arrastrándolo, un **pipeline en segundo plano** lo valida, lo transcribe con **OpenAI Whisper** (detectando el idioma automáticamente) y genera un resumen estructurado. El resultado aparece en un reproductor de tres paneles:

- el video a la izquierda
- la transcripción a la derecha, donde cada fragmento con marca de tiempo es clicable y el desplazamiento acompaña al video
- el resumen abajo, con una visión general y los temas principales

La biblioteca personal tiene carpetas, etiquetas y vista en cuadrícula o lista. También se pueden descargar los subtítulos en VTT, SRT o TXT. Un área `/admin` permite gestionar usuarios y seguir el uso de la plataforma.

## Arquitectura

Monorepo con `apps/backend` (Fastify 5 + Prisma, en **clean architecture**) y `apps/web` (Next.js 16). Las capas `domain ← usecase ← infra` se verifican con dependency-cruiser y con un script de chequeo de arquitectura. Los gateways externos (ffmpeg, Whisper, almacenamiento) tienen versiones falsas en memoria para las pruebas.

## Cómo se construyó

Este proyecto usa un ciclo de **implementar y evaluar** totalmente automatizado:

1. Un PRD define las funcionalidades F01–F12, organizadas en olas de dependencia.
2. Cada funcionalidad recibe `spec.md`, `plan.md` y un **contrato de comportamiento**.
3. Un agente implementa la funcionalidad y otro agente, el **evaluador**, prueba cada ítem del contrato vía HTTP, navegador y base de datos.
4. Si algún ítem falla, entra un agente de corrección y el ciclo se repite hasta cumplir el contrato o agotar el límite de intentos.

Cada ronda queda registrada en `docs/prd_progress.json`, con el número de ciclos y el informe de evaluación de cada funcionalidad.

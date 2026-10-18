---
title: videomax
tagline: Transcrição e resumo de vídeos com IA
summary: Você faz upload dos seus vídeos e recebe uma transcrição com marcação de tempo e um resumo gerado por IA, num player de três painéis com busca dentro do vídeo.
repo: https://github.com/dennysvf/videomax
stack: [Fastify, Next.js 16, React 19, TypeScript, PostgreSQL, Prisma, OpenAI Whisper, ffmpeg, Tailwind 4]
status: em andamento
startedAt: 2026-05-02
order: 2
featured: true
stats:
  - { value: '12', label: 'features no PRD' }
  - { value: '8', label: 'aprovadas pelo avaliador' }
  - { value: '0', label: 'linhas escritas à mão' }
---

## O problema

Revisar uma gravação de uma hora leva uma hora. Players comuns não permitem buscar uma frase falada, e as ferramentas de transcrição limitam a duração do vídeo, cobram por minuto ou entregam só um arquivo de texto solto, sem player e sem resumo.

## A solução

Depois do upload por arrastar e soltar, um **pipeline em segundo plano** valida o arquivo, transcreve com o **OpenAI Whisper** (detectando o idioma automaticamente) e gera um resumo estruturado. O resultado aparece num player de três painéis:

- o vídeo à esquerda
- a transcrição à direita, em que cada trecho com marcação de tempo é clicável e a rolagem acompanha o vídeo
- o resumo embaixo, com uma visão geral e os tópicos principais

A biblioteca pessoal tem pastas, tags e visualização em grade ou lista. Também dá para baixar as legendas em VTT, SRT ou TXT. Uma área `/admin` permite gerenciar usuários e acompanhar o uso da plataforma.

## Arquitetura

Monorepo com `apps/backend` (Fastify 5 + Prisma, em **clean architecture**) e `apps/web` (Next.js 16). As camadas `domain ← usecase ← infra` são verificadas por dependency-cruiser e por um script de checagem de arquitetura. Os gateways externos (ffmpeg, Whisper, armazenamento) têm versões falsas em memória para os testes.

## Como foi construído

Este projeto usa um ciclo de **implementar e avaliar** totalmente automatizado:

1. Um PRD define as features F01–F12, organizadas em ondas de dependência.
2. Cada feature recebe `spec.md`, `plan.md` e um **contrato de comportamento**.
3. Um agente implementa a feature, e outro agente, o **avaliador**, testa cada item do contrato via HTTP, navegador e banco de dados.
4. Se algum item falha, um agente de correção entra em ação e o ciclo se repete até o contrato ser cumprido ou o limite de tentativas acabar.

Cada rodada fica registrada em `docs/prd_progress.json`, com o número de ciclos e o relatório de avaliação de cada feature.

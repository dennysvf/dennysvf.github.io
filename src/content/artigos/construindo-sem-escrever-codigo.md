---
title: Construindo software sem escrever uma linha de código
description: Como organizo projetos reais, do PRD ao deploy, deixando 100% da implementação a cargo de agentes de IA.
pubDate: 2026-10-18
tags: [ia, engenharia, processo]
# Rascunho: revise o texto e mude para false para publicar.
draft: true
---

> **Rascunho gerado como ponto de partida.** Revise, ajuste com a sua voz e mude `draft: false` para publicar.

Nos meus projetos mais recentes, o [GCli](/projetos/gcli) e o [videomax](/projetos/videomax), adotei uma regra simples: **eu não edito nenhuma linha de código**. Toda alteração passa por um agente de IA. Meu trabalho é decidir *o que* construir, definir *como saber se ficou certo* e revisar o resultado.

## Por que essa regra

Se eu corrijo o código à mão, o agente não aprende nada e o processo continua frágil. Quando a regra é passar tudo pela IA, cada falha vira uma melhoria no processo: um contrato mais claro, uma regra nova no `CLAUDE.md`, um teste que faltava.

## O fluxo

1. **PRD**: requisitos completos, com personas, métricas e funcionalidades organizadas em ondas de dependência.
2. **Spec, plano e contrato**: para cada funcionalidade, um documento técnico e uma lista de comportamentos que dá para testar.
3. **Implementação**: o agente implementa em commits por etapa.
4. **Avaliação**: um segundo agente testa cada item do contrato de verdade, via HTTP, navegador e banco.
5. **Correção**: se algo falha, um agente de correção trabalha até o contrato ser cumprido.

## O que aprendi até aqui

- A qualidade do resultado depende mais da especificação do que do modelo.
- Guardrails automáticos (lint de arquitetura, checagem de tipos, testes) valem mais do que instruções em prosa.
- Um diário de bordo das lições evita que o mesmo erro se repita na próxima feature.

*(continue a partir daqui…)*

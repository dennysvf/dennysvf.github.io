---
title: videomax
tagline: AI video transcription and summaries
summary: Upload your videos and get a timestamped transcript plus an AI-generated summary, in a three-panel player with in-video search.
repo: https://github.com/dennysvf/videomax
stack: [Fastify, Next.js 16, React 19, TypeScript, PostgreSQL, Prisma, OpenAI Whisper, ffmpeg, Tailwind 4]
status: em andamento
startedAt: 2026-05-02
order: 2
featured: true
stats:
  - { value: '12', label: 'features in the PRD' }
  - { value: '8', label: 'approved by the evaluator' }
  - { value: '0', label: 'hand-written lines' }
---

## The problem

Reviewing a one-hour recording takes an hour. Regular players can't search for a spoken phrase, and transcription tools cap video length, charge per minute or hand you a loose text file with no player and no summary.

## The solution

After a drag-and-drop upload, a **background pipeline** validates the file, transcribes it with **OpenAI Whisper** (detecting the language automatically) and generates a structured summary. The result shows up in a three-panel player:

- the video on the left
- the transcript on the right, where every timestamped segment is clickable and scrolling follows the video
- the summary below, with an overview and the key topics

The personal library has folders, tags and grid or list views. You can also download subtitles as VTT, SRT or TXT. An `/admin` area lets you manage users and track platform usage.

## Architecture

A monorepo with `apps/backend` (Fastify 5 + Prisma, in **clean architecture**) and `apps/web` (Next.js 16). The `domain ← usecase ← infra` layers are checked by dependency-cruiser and by an architecture-check script. External gateways (ffmpeg, Whisper, storage) have in-memory fakes for testing.

## How it was built

This project runs a fully automated **implement-and-evaluate** loop:

1. A PRD defines features F01–F12, organized into dependency waves.
2. Each feature gets a `spec.md`, a `plan.md` and a **behavior contract**.
3. One agent implements the feature, and another agent, the **evaluator**, tests every contract item over HTTP, the browser and the database.
4. If an item fails, a fixing agent steps in and the loop repeats until the contract is met or the retry budget runs out.

Every round is logged in `docs/prd_progress.json`, with the number of cycles and the evaluation report for each feature.

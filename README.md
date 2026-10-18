# Portfólio · Dennys Viana Freire

Site pessoal (portfólio, currículo e artigos) feito com [Astro](https://astro.build) e publicado no GitHub Pages.

## Rodar localmente

```sh
npm install
npm run dev      # http://localhost:4321 (rascunhos aparecem só aqui)
npm run build    # gera dist/
```

## Onde editar

| O quê | Onde |
| --- | --- |
| Nome, e-mail, links | `src/consts.ts` |
| Projetos | `src/content/projetos/*.md` (um arquivo por projeto) |
| Artigos | `src/content/artigos/*.md`, com `externalUrl` para posts do LinkedIn ou texto no corpo para posts locais |
| Currículo | `src/pages/sobre.astro` (+ `public/curriculo.pdf`) |
| Cores e fontes | `src/styles/global.css` |

Artigos com `draft: true` não entram no build de produção.

## Deploy

1. Crie o repositório **`dennysvf.github.io`** no GitHub e faça push na branch `main`.
2. Em **Settings → Pages → Build and deployment**, escolha **Source: GitHub Actions**.
3. Cada push na `main` publica em https://dennysvf.github.io (workflow em `.github/workflows/deploy.yml`).

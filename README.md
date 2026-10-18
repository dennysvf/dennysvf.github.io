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
| Textos da interface e currículo (pt/en/es) | `src/i18n/ui.ts` |
| Projetos | `src/content/projetos/{pt,en,es}/*.md` (o mesmo nome de arquivo em cada idioma) |
| Artigos | `src/content/artigos/*.md`, com `externalUrl` para posts do LinkedIn e `translations` para título/resumo em en/es |
| PDF do currículo | `public/curriculo.pdf` (e descomente o botão em `src/views/AboutView.astro`) |
| Cores e fontes | `src/styles/global.css` |

Artigos com `draft: true` não entram no build de produção.

## Idiomas

- Português na raiz (`/`), inglês em `/en/` e espanhol em `/es/`, com URLs traduzidas.
- Na primeira visita, quem chega na versão em português é levado ao idioma do navegador (sem correspondência → inglês). Robôs de busca não são redirecionados.
- A escolha feita no seletor do topo fica salva no navegador e passa a valer em todas as visitas.

## Deploy

1. Crie o repositório **`dennysvf.github.io`** no GitHub e faça push na branch `main`.
2. Em **Settings → Pages → Build and deployment**, escolha **Source: GitHub Actions**.
3. Cada push na `main` publica em https://dennysvf.github.io (workflow em `.github/workflows/deploy.yml`).

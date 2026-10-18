export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';

export const LOCALE_META: Record<Locale, { label: string; short: string; htmlLang: string }> = {
  pt: { label: 'Português', short: 'PT', htmlLang: 'pt-BR' },
  en: { label: 'English', short: 'EN', htmlLang: 'en' },
  es: { label: 'Español', short: 'ES', htmlLang: 'es' },
};

// Segmentos de URL traduzidos. O português fica na raiz, sem prefixo.
const ROUTES = {
  home: { pt: '', en: '', es: '' },
  projects: { pt: 'projetos', en: 'projects', es: 'proyectos' },
  articles: { pt: 'artigos', en: 'articles', es: 'articulos' },
  about: { pt: 'sobre', en: 'about', es: 'sobre-mi' },
} satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export function localizedPath(locale: Locale, route: RouteKey, slug?: string): string {
  const parts = [locale === DEFAULT_LOCALE ? '' : locale, ROUTES[route][locale], slug ?? ''].filter(Boolean);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

export function alternatesFor(route: RouteKey, slug?: string): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, localizedPath(l, route, slug)])) as Record<Locale, string>;
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(LOCALE_META[locale].htmlLang, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const pt = {
  role: 'Engenheiro de software · desenvolvimento orientado por IA',
  siteDescription:
    'Portfólio, currículo e artigos de Dennys Viana Freire. Projetos construídos inteiramente por agentes de IA, sem nenhuma linha escrita à mão.',
  nav: { projects: 'Projetos', articles: 'Artigos', about: 'Sobre', main: 'Principal' },
  themeToggle: 'Alternar tema claro/escuro',
  language: 'Idioma',
  email: 'E-mail',
  home: {
    heroLine1: 'Eu não escrevo código.',
    heroLine2: 'Eu projeto o que a IA escreve.',
    lead: (name: string) =>
      `Sou ${name}. Construo software de verdade, com arquitetura, testes e deploy, usando agentes de IA para 100% da implementação. Meu trabalho é especificar, definir critérios de aceitação e revisar.`,
    ctaProjects: 'Ver projetos',
    terminalAria: 'Linhas de código escritas manualmente: zero',
    terminalCmd: 'git log --author=humano --numstat | soma',
    terminalOut: '→ 0 linhas',
    projectsTitle: 'Projetos',
    allProjects: 'todos os projetos →',
    howTitle: 'Como eu trabalho',
    steps: [
      { name: 'PRD', text: 'Requisitos completos: personas, métricas e funcionalidades organizadas em ondas de dependência.' },
      { name: 'Spec + contrato', text: 'Para cada funcionalidade, um plano técnico e uma lista de comportamentos que dá para testar.' },
      { name: 'Implementação', text: 'Um agente de IA implementa em commits por etapa, dentro de guardrails de arquitetura.' },
      { name: 'Avaliação', text: 'Um segundo agente testa cada item do contrato via HTTP, navegador e banco. Se falhar, corrige e repete.' },
    ],
    articlesTitle: 'Artigos',
    allArticles: 'todos os artigos →',
  },
  emptyArticles: 'Os primeiros textos estão a caminho. Acompanhe pelo',
  projects: {
    metaDescription: 'Projetos construídos inteiramente por agentes de IA.',
    eyebrow: 'Projetos',
    title: 'Software real,',
    titleEm: 'zero linhas à mão.',
    lead: 'Cada projeto aqui foi especificado por mim e implementado por agentes de IA, sem edição manual de código. Os repositórios são públicos: o histórico de commits conta a história inteira.',
    viewProject: 'Ver projeto',
    aiBadge: '100% IA',
    aiBadgeLong: '100% IA · 0 linhas manuais',
    back: '← projetos',
    since: 'desde',
    repo: 'Repositório ↗',
    demo: 'Demo ↗',
    stack: 'Stack',
    status: { 'em andamento': 'em andamento', 'concluído': 'concluído', pausado: 'pausado' },
  },
  articles: {
    metaDescription: 'Textos sobre desenvolvimento orientado por IA, arquitetura e processo.',
    eyebrow: 'Artigos',
    title: 'Notas de quem',
    titleEm: 'delega o teclado.',
    lead: 'Processo, arquitetura e lições aprendidas construindo software só com agentes de IA.',
    back: '← artigos',
    readHere: 'ler aqui →',
    updated: 'atualizado em',
    draft: 'rascunho',
    inLanguage: { pt: 'em português', en: 'em inglês', es: 'em espanhol' },
    otherVersion: { pt: 'Versão em português ↗', en: 'English version ↗', es: 'Versión en español ↗' },
  },
  about: {
    metaDescription: (name: string) => `Currículo e trajetória de ${name}.`,
    eyebrow: 'Sobre',
    lead: 'Construo software especificando com precisão o que deve ser feito e deixando a implementação com agentes de IA. Escrevo sobre PRDs, design systems e o processo de desenvolver com IA.',
    contact: 'Entrar em contato',
    downloadCv: 'Baixar currículo (PDF)',
    experience: 'Experiência',
    skills: 'Competências',
    languages: 'Idiomas',
    // TODO: substituir pelos dados do currículo.
    jobs: [{ period: 'atual', role: 'Cargo', company: 'Autotrend', text: 'Descreva aqui suas responsabilidades e principais resultados.' }],
    skillList: [
      'Desenvolvimento orientado por IA (Claude Code, agentes, skills)',
      'Engenharia de requisitos: PRD, specs e contratos de comportamento',
      'Clean architecture e monólito modular',
      'TypeScript, Node.js, Next.js, Fastify',
      'PostgreSQL e Prisma',
      'Testes automatizados (Vitest, Playwright, Testcontainers)',
      'Design systems',
    ],
    languageList: [
      { name: 'Português', level: 'nativo' },
      { name: 'Inglês', level: 'intermediário' },
      { name: 'Espanhol', level: 'básico' },
    ],
  },
  notFound: { title: 'Página não encontrada', tagline: 'nenhum agente gerou esta página', back: '← voltar para o início' },
};

type Dictionary = typeof pt;

const en: Dictionary = {
  role: 'Software engineer · AI-driven development',
  siteDescription:
    'Portfolio, résumé and articles by Dennys Viana Freire. Projects built entirely by AI agents, without a single hand-written line of code.',
  nav: { projects: 'Projects', articles: 'Articles', about: 'About', main: 'Main' },
  themeToggle: 'Toggle light/dark theme',
  language: 'Language',
  email: 'Email',
  home: {
    heroLine1: "I don't write code.",
    heroLine2: 'I design what the AI writes.',
    lead: (name: string) =>
      `I'm ${name}. I build real software, with architecture, tests and deployment, using AI agents for 100% of the implementation. My job is to specify, define acceptance criteria and review.`,
    ctaProjects: 'See projects',
    terminalAria: 'Lines of code written by hand: zero',
    terminalCmd: 'git log --author=human --numstat | sum',
    terminalOut: '→ 0 lines',
    projectsTitle: 'Projects',
    allProjects: 'all projects →',
    howTitle: 'How I work',
    steps: [
      { name: 'PRD', text: 'Complete requirements: personas, metrics and features organized into dependency waves.' },
      { name: 'Spec + contract', text: 'For each feature, a technical plan and a list of testable behaviors.' },
      { name: 'Implementation', text: 'An AI agent implements it in step-by-step commits, inside architecture guardrails.' },
      { name: 'Evaluation', text: 'A second agent tests every contract item over HTTP, browser and database. If anything fails, it fixes and repeats.' },
    ],
    articlesTitle: 'Articles',
    allArticles: 'all articles →',
  },
  emptyArticles: 'The first posts are on the way. Follow along via',
  projects: {
    metaDescription: 'Projects built entirely by AI agents.',
    eyebrow: 'Projects',
    title: 'Real software,',
    titleEm: 'zero hand-written lines.',
    lead: 'I specified every project here and AI agents implemented them, with no manual code edits. The repositories are public: the commit history tells the whole story.',
    viewProject: 'View project',
    aiBadge: '100% AI',
    aiBadgeLong: '100% AI · 0 manual lines',
    back: '← projects',
    since: 'since',
    repo: 'Repository ↗',
    demo: 'Demo ↗',
    stack: 'Stack',
    status: { 'em andamento': 'in progress', 'concluído': 'completed', pausado: 'paused' },
  },
  articles: {
    metaDescription: 'Writing on AI-driven development, architecture and process.',
    eyebrow: 'Articles',
    title: 'Notes from someone who',
    titleEm: 'hands over the keyboard.',
    lead: 'Process, architecture and lessons learned building software with AI agents only.',
    back: '← articles',
    readHere: 'read here →',
    updated: 'updated on',
    draft: 'draft',
    inLanguage: { pt: 'in Portuguese', en: 'in English', es: 'in Spanish' },
    otherVersion: { pt: 'Portuguese version ↗', en: 'English version ↗', es: 'Spanish version ↗' },
  },
  about: {
    metaDescription: (name: string) => `Résumé and background of ${name}.`,
    eyebrow: 'About',
    lead: 'I build software by specifying precisely what needs to be done and leaving the implementation to AI agents. I write about PRDs, design systems and the process of building with AI.',
    contact: 'Get in touch',
    downloadCv: 'Download résumé (PDF)',
    experience: 'Experience',
    skills: 'Skills',
    languages: 'Languages',
    jobs: [{ period: 'current', role: 'Role', company: 'Autotrend', text: 'Describe your responsibilities and key results here.' }],
    skillList: [
      'AI-driven development (Claude Code, agents, skills)',
      'Requirements engineering: PRDs, specs and behavior contracts',
      'Clean architecture and modular monoliths',
      'TypeScript, Node.js, Next.js, Fastify',
      'PostgreSQL and Prisma',
      'Automated testing (Vitest, Playwright, Testcontainers)',
      'Design systems',
    ],
    languageList: [
      { name: 'Portuguese', level: 'native' },
      { name: 'English', level: 'intermediate' },
      { name: 'Spanish', level: 'basic' },
    ],
  },
  notFound: { title: 'Page not found', tagline: 'no agent generated this page', back: '← back to home' },
};

const es: Dictionary = {
  role: 'Ingeniero de software · desarrollo guiado por IA',
  siteDescription:
    'Portafolio, currículum y artículos de Dennys Viana Freire. Proyectos construidos íntegramente por agentes de IA, sin ninguna línea escrita a mano.',
  nav: { projects: 'Proyectos', articles: 'Artículos', about: 'Sobre mí', main: 'Principal' },
  themeToggle: 'Cambiar tema claro/oscuro',
  language: 'Idioma',
  email: 'Correo',
  home: {
    heroLine1: 'Yo no escribo código.',
    heroLine2: 'Diseño lo que la IA escribe.',
    lead: (name: string) =>
      `Soy ${name}. Construyo software de verdad, con arquitectura, pruebas y despliegue, usando agentes de IA para el 100% de la implementación. Mi trabajo es especificar, definir criterios de aceptación y revisar.`,
    ctaProjects: 'Ver proyectos',
    terminalAria: 'Líneas de código escritas a mano: cero',
    terminalCmd: 'git log --author=humano --numstat | suma',
    terminalOut: '→ 0 líneas',
    projectsTitle: 'Proyectos',
    allProjects: 'todos los proyectos →',
    howTitle: 'Cómo trabajo',
    steps: [
      { name: 'PRD', text: 'Requisitos completos: personas, métricas y funcionalidades organizadas en olas de dependencia.' },
      { name: 'Spec + contrato', text: 'Para cada funcionalidad, un plan técnico y una lista de comportamientos que se pueden probar.' },
      { name: 'Implementación', text: 'Un agente de IA implementa en commits por etapa, dentro de guardrails de arquitectura.' },
      { name: 'Evaluación', text: 'Un segundo agente prueba cada ítem del contrato vía HTTP, navegador y base de datos. Si algo falla, corrige y repite.' },
    ],
    articlesTitle: 'Artículos',
    allArticles: 'todos los artículos →',
  },
  emptyArticles: 'Los primeros textos están en camino. Síguelos por',
  projects: {
    metaDescription: 'Proyectos construidos íntegramente por agentes de IA.',
    eyebrow: 'Proyectos',
    title: 'Software real,',
    titleEm: 'cero líneas a mano.',
    lead: 'Cada proyecto aquí lo especifiqué yo y lo implementaron agentes de IA, sin edición manual de código. Los repositorios son públicos: el historial de commits cuenta toda la historia.',
    viewProject: 'Ver proyecto',
    aiBadge: '100% IA',
    aiBadgeLong: '100% IA · 0 líneas manuales',
    back: '← proyectos',
    since: 'desde',
    repo: 'Repositorio ↗',
    demo: 'Demo ↗',
    stack: 'Stack',
    status: { 'em andamento': 'en curso', 'concluído': 'terminado', pausado: 'pausado' },
  },
  articles: {
    metaDescription: 'Textos sobre desarrollo guiado por IA, arquitectura y proceso.',
    eyebrow: 'Artículos',
    title: 'Notas de quien',
    titleEm: 'delega el teclado.',
    lead: 'Proceso, arquitectura y lecciones aprendidas construyendo software solo con agentes de IA.',
    back: '← artículos',
    readHere: 'leer aquí →',
    updated: 'actualizado el',
    draft: 'borrador',
    inLanguage: { pt: 'en portugués', en: 'en inglés', es: 'en español' },
    otherVersion: { pt: 'Versión en portugués ↗', en: 'English version ↗', es: 'Versión en español ↗' },
  },
  about: {
    metaDescription: (name: string) => `Currículum y trayectoria de ${name}.`,
    eyebrow: 'Sobre mí',
    lead: 'Construyo software especificando con precisión lo que se debe hacer y dejando la implementación a agentes de IA. Escribo sobre PRDs, design systems y el proceso de desarrollar con IA.',
    contact: 'Contactar',
    downloadCv: 'Descargar currículum (PDF)',
    experience: 'Experiencia',
    skills: 'Competencias',
    languages: 'Idiomas',
    jobs: [{ period: 'actual', role: 'Cargo', company: 'Autotrend', text: 'Describe aquí tus responsabilidades y principales resultados.' }],
    skillList: [
      'Desarrollo guiado por IA (Claude Code, agentes, skills)',
      'Ingeniería de requisitos: PRD, specs y contratos de comportamiento',
      'Clean architecture y monolito modular',
      'TypeScript, Node.js, Next.js, Fastify',
      'PostgreSQL y Prisma',
      'Pruebas automatizadas (Vitest, Playwright, Testcontainers)',
      'Design systems',
    ],
    languageList: [
      { name: 'Portugués', level: 'nativo' },
      { name: 'Inglés', level: 'intermedio' },
      { name: 'Español', level: 'básico' },
    ],
  },
  notFound: { title: 'Página no encontrada', tagline: 'ningún agente generó esta página', back: '← volver al inicio' },
};

const DICTIONARIES: Record<Locale, Dictionary> = { pt, en, es };

export function useTranslations(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

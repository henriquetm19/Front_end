# Plataforma ONG — Entrega Final

Este repositório contém a implementação completa de uma plataforma web para ONGs, criada como entrega final de disciplina. O projeto inclui HTML5 semântico, CSS3 modular (design system), JavaScript modular (SPA, templates, validação), e práticas profissionais para versionamento, acessibilidade e deploy.

---

## Estrutura do repositório

```
/css
  design-system.css
  layout.css
  components.css
  dark.css
  high-contrast.css
/js
  app.js
  templates.js
  validation.js
  state.js
  ui.js
  masks.js
  accessibility.js
/images
index.html
projetos.html
cadastro.html
README.md
CONTRIBUTING.md
.github/
  workflows/
  PULL_REQUEST_TEMPLATE.md
  ISSUE_TEMPLATE/
```

---

## Como usar (local)

Requisitos: `node` (para scripts opcionais), `npm`.

1. Clonar o repositório:
```bash
git clone https://github.com/<seu-usuario>/plataforma-ong.git
cd plataforma-ong
```

2. Visualizar localmente:
- Abra `index.html` no navegador ou use um servidor estático (recomendado):
```bash
npx serve .
# ou
python -m http.server 8080
```

3. Build (minificação e otimização) — scripts opcionais com `npx` (ex.: `html-minifier`, `terser`, `postcss`):
```bash
# Exemplo (requer ferramentas instaladas):
npm run build
```

---

## Git & GitHub (GitFlow recomendado)

Estratégia sugerida (GitFlow simplificado):
- `main` — branch de produção (deploy automático via GitHub Actions).
- `develop` — branch de integração (pré-produção).
- `feature/*` — desenvolvimento de uma nova funcionalidade a partir de `develop`.
- `release/*` — preparo de release a partir de `develop` para `main`.
- `hotfix/*` — correções emergenciais diretamente em `main`.

Commits semânticos (convensão):
```
feat(scope): descrição curta
fix(scope): descrição curta
docs: documentação
chore: tarefas de manutenção
style: mudanças de estilo que não afetam lógica
refactor: refatoração
test: testes
```
Use tags semânticas para releases: `v1.0.0`, `v1.1.0` etc.

---

## Acessibilidade (WCAG 2.1 AA)

Principais implementações:
- Skip link (pular para o conteúdo) visível ao focar via teclado.
- Navegação por teclado para menu, submenu, toasts e modal.
- ARIA: `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-live` para toasts/erros.
- Contraste: arquivo `css/high-contrast.css` e `css/dark.css` inclusos (modo acessível e modo escuro).
- Mensagens inline e `aria-invalid` para campos de formulário.
- Estrutura semântica: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.

Faça a auditoria com ferramentas como **axe**, **WAVE** ou Lighthouse (Accessibility).

---

## Otimização para produção

Incluídos arquivos/scripts sugeridos para minificação e otimização:
- `tools/minify.sh` — script de exemplo que usa `npx` para minificar CSS/JS/HTML e converter imagens para WebP. (Requer instalação das ferramentas).

Dicas práticas:
- Ativar HTTPS no host (GitHub Pages fornece HTTPS).
- Habilitar compressão gzip/brotli no servidor.
- Utilizar `srcset` e WebP para imagens responsivas.

---

## Deploy automático (GitHub Actions)

O fluxo de CI/CD sugerido está em `.github/workflows/build-and-deploy.yml` — ao fazer push na `main` o site é construído e publicado (ex.: GitHub Pages).

---

## Documentação técnica

- Veja `CONTRIBUTING.md` para regras de contribuição, branching e como abrir PRs.
- Veja `.github/PULL_REQUEST_TEMPLATE.md` e `.github/ISSUE_TEMPLATE/bug.md` para templates usados em PRs e issues.

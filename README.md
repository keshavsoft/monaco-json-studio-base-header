# monaco-json-studio-base-header

Handlebars (`.hbs`) header region primitives and `dom-primitive-bindings` actions (`title`, `file-picker`, `select`, `actions`).

- **npm**: [https://www.npmjs.com/package/monaco-json-studio-base-header](https://www.npmjs.com/package/monaco-json-studio-base-header)
- **GitHub**: [https://github.com/keshavsoft/monaco-json-studio-base-header](https://github.com/keshavsoft/monaco-json-studio-base-header)
- **Suite Story & Docs**: [https://keshavsoft.github.io/monaco-json-studio-docs/base-header.html](https://keshavsoft.github.io/monaco-json-studio-docs/base-header.html)
- **Repo Docs**: [./docs/index.html](./docs/index.html) | [https://keshavsoft.github.io/monaco-json-studio-base-header/](https://keshavsoft.github.io/monaco-json-studio-base-header/)

## Why It Exists

Header UIs evolve quickly (labels, file pickers, dataset dropdowns, toolbar buttons). Keeping all `.hbs` templates, CSS, and `bindings.json`/`actions.js` in one focused package allows independent reuse across any HTML builder or studio layout.

## CLI (`npx`)

```bash
npx monaco-json-studio-base-header file-picker
npx monaco-json-studio-base-header select
npx monaco-json-studio-base-header actions --html
```

## Programmatic (`npm`)

```js
import { renderHeader, generateHeaderPreview } from 'monaco-json-studio-base-header';

const html = renderHeader({ type: 'file-picker', label: 'Input JSON' });
```

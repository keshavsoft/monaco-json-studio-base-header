# monaco-json-studio-base-header

Handlebars (.hbs) header region primitives paired with dom-primitive-bindings and optional extraButtons.

- **npm**: [https://www.npmjs.com/package/monaco-json-studio-base-header](https://www.npmjs.com/package/monaco-json-studio-base-header)
- **GitHub**: [https://github.com/keshavsoft/monaco-json-studio-base-header](https://github.com/keshavsoft/monaco-json-studio-base-header)
- **Docs**: [https://keshavsoft.github.io/monaco-json-studio-base-header/](https://keshavsoft.github.io/monaco-json-studio-base-header/) ([Story](./docs/story.html) · [npx](./docs/npx-usage.html) · [npm](./docs/npm-usage.html) · [Dependencies](./docs/dependencies.html))
- **Suite**: [Base Docs](https://keshavsoft.github.io/monaco-json-studio-base-docs/base-header.html)

## CLI (`npx`)

```bash
npx monaco-json-studio-base-header file-picker
npx monaco-json-studio-base-header select
npx monaco-json-studio-base-header actions --html
```

## Programmatic (`npm`)

```bash
npm install monaco-json-studio-base-header
```

```js
import { renderHeader, generateHeaderPreview, HEADER_TYPES } from 'monaco-json-studio-base-header';

const html = renderHeader({
  type: 'file-picker',
  label: 'JSON Studio',
  extraButtons: [{ text: 'Render', action: 'renderOutput', icon: 'bi-play-fill' }]
});
```

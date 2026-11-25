#!/usr/bin/env node
import { HEADER_TYPES, renderHeader, generateHeaderPreview } from '../src/index.js';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Monaco JSON Studio · Base Header

Usage:
  npx monaco-json-studio-base-header [type] [--html]

Types:
  ${HEADER_TYPES.join(' | ')} (default: file-picker)

Examples:
  npx monaco-json-studio-base-header file-picker
  npx monaco-json-studio-base-header select
  npx monaco-json-studio-base-header actions --html
`);
    process.exit(0);
}

const htmlOnly = args.includes('--html');
const type = args.find((a) => !a.startsWith('-')) ?? 'file-picker';

try {
    if (htmlOnly) {
        console.log(renderHeader({ type }));
    } else {
        const dir = generateHeaderPreview({ type });
        console.log(`Generated Header preview (${type}).`);
        console.log(`Open: ${dir}/index.html`);
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}

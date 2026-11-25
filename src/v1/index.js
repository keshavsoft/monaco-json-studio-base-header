import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
export const assetsDir = path.resolve(moduleDir, '..', '..', 'assets', 'v1');
const templatesDir = path.join(assetsDir, 'templates');
const compiled = new Map();

export const HEADER_TYPES = ['title', 'file-picker', 'select', 'actions'];

function compile(templateName) {
    if (!compiled.has(templateName)) {
        const src = fs.readFileSync(path.join(templatesDir, templateName), 'utf8');
        compiled.set(templateName, Handlebars.compile(src));
    }
    return compiled.get(templateName);
}

function resolveUniqueDir(baseDir) {
    const resolved = path.resolve(process.cwd(), baseDir);
    if (!fs.existsSync(resolved)) return resolved;
    let i = 1;
    while (fs.existsSync(`${resolved}-${i}`)) i += 1;
    return `${resolved}-${i}`;
}

export function normalizeHeaderConfig(raw = {}) {
    const cfg = typeof raw === 'string' ? { type: raw } : (raw ?? {});
    const type = cfg.type ?? 'title';
    if (!HEADER_TYPES.includes(type)) {
        throw new TypeError(`header type must be one of: ${HEADER_TYPES.join(', ')}`);
    }

    const index = cfg.paneNumber ?? 1;
    const key = cfg.key ?? `pane${index}`;

    return {
        type,
        key,
        label: cfg.label ?? 'Monaco Header',
        badge: cfg.badge ?? '',
        fileName: cfg.fileName ?? `${key}.json`,
        fileBtnId: `openFileBtn${index}`,
        fileInputId: `fileInput${index}`,
        fileNameId: `fileName${index}`,
        selectId: `paneSelect${index}`,
        statusId: `headerStatus${index}`,
        options: cfg.options ?? [
            { label: 'Sample A', value: 'sampleA', selected: true },
            { label: 'Sample B', value: 'sampleB', selected: false }
        ],
        buttons: cfg.buttons ?? [
            { text: 'Format', action: 'format', icon: 'bi-braces' },
            { text: 'Copy', action: 'copy', icon: 'bi-clipboard' }
        ]
    };
}

export function renderHeader(rawConfig = {}) {
    const config = normalizeHeaderConfig(rawConfig);
    return compile(`${config.type}.hbs`)(config);
}

export function generateHeaderPreview(rawConfig = {}) {
    const config = normalizeHeaderConfig(rawConfig);
    const targetDir = resolveUniqueDir(rawConfig.outputDir ?? `./header-${config.type}`);
    const cssDir = path.join(targetDir, 'css');
    const jsDir = path.join(targetDir, 'js');
    [cssDir, jsDir].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

    const headerHtml = renderHeader(config);
    const html = compile('document.hbs')({
        title: `Header · ${config.type}`,
        type: config.type,
        headerHtml: new Handlebars.SafeString(headerHtml)
    });

    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
    fs.copyFileSync(path.join(assetsDir, 'css', 'header.css'), path.join(cssDir, 'header.css'));
    ['bindings.json', 'actions.js', 'index.js'].forEach((file) => {
        fs.copyFileSync(path.join(assetsDir, 'js', file), path.join(jsDir, file));
    });

    return targetDir;
}

export default { HEADER_TYPES, renderHeader, generateHeaderPreview, assetsDir };

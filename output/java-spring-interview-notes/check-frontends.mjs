import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { compile } from '@tailwindcss/node';

const base = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const markdown = fs.readFileSync(path.join(base, 'technical-notes.md'), 'utf8');
const blocks = [...markdown.matchAll(/^```([^\n]*)\n([\s\S]*?)^```/gm)].map(match => ({lang: match[1], text: match[2]}));
const jsx = blocks.filter(block => block.lang === 'jsx');
for (const [i, block] of jsx.entries()) {
  const result = ts.transpileModule(block.text, {
    fileName: `Example${i}.jsx`,
    compilerOptions: {allowJs: true, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext},
    reportDiagnostics: true,
  });
  const errors = result.diagnostics?.filter(d => d.category === ts.DiagnosticCategory.Error) ?? [];
  if (errors.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(errors, {
    getCurrentDirectory: () => process.cwd(), getCanonicalFileName: f => f, getNewLine: () => '\n',
  }));
}
const page = blocks.find(block => block.lang === 'html' && block.text.startsWith('<!doctype html>')).text;
for (const script of page.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
const uiBlocks = blocks.filter(block => ['html', 'jsx'].includes(block.lang));
const candidates = new Set(uiBlocks.flatMap(block => [...block.text.matchAll(/class(?:Name)?="([^"]*)"/g)].flatMap(match => match[1].split(/\s+/)).filter(Boolean)));
const compiler = await compile('@import "tailwindcss";', {base: process.cwd(), onDependency: () => {}});
const css = compiler.build([...candidates]);
fs.writeFileSync(path.join(base, 'frontend-utilities.css'), css);
for (const name of ['.grid', '.flex', '.bg-indigo-600', '.rounded-lg', '.w-full']) {
  if (!css.includes(name)) throw new Error(`Missing compiled utility ${name}`);
}
console.log(JSON.stringify({jsxBlocksParsed: jsx.length, chatInlineScriptSyntax: 'passed', tailwindCandidates: candidates.size, generatedCssBytes: Buffer.byteLength(css)}, null, 2));

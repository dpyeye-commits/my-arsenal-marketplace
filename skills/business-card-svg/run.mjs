#!/usr/bin/env node
// business-card-svg v0.2.0 — 90×50mm 한국 명함 SVG 생성
// 사용: node run.mjs --org "회사명" --name "홍길동" --title "대표" --phone "010-..." --email "..." [--side front|back|both]

import { argv, exit } from 'node:process';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const args = parseArgs(argv.slice(2));
const required = ['org', 'name', 'title', 'phone', 'email'];
const missing = required.filter(k => !args[k]);
if (missing.length) {
  console.error(`Missing: ${missing.join(', ')}\nUsage: node run.mjs --org X --name X --title X --phone X --email X [--addr X] [--side front|back|both]`);
  exit(1);
}

const W = 96, H = 56;
const side = args.side ?? 'both';

const front = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="3" y="3" width="${W - 6}" height="${H - 6}" fill="none" stroke="#e5e5e5" stroke-width="0.1" stroke-dasharray="0.5"/>
  <text x="${W / 2}" y="22" text-anchor="middle" font-family="맑은 고딕, Malgun Gothic, sans-serif" font-size="6" font-weight="700" fill="#1a1a1a" letter-spacing="-0.3">${esc(args.org)}</text>
  <line x1="${W / 2 - 12}" y1="26" x2="${W / 2 + 12}" y2="26" stroke="#1a1a1a" stroke-width="0.2"/>
  <text x="${W / 2}" y="33" text-anchor="middle" font-family="맑은 고딕" font-size="3" fill="#666">${esc(args.title)}</text>
  <text x="${W / 2}" y="40" text-anchor="middle" font-family="맑은 고딕" font-size="5" font-weight="600" fill="#1a1a1a" letter-spacing="-0.2">${esc(args.name)}</text>
  <text x="${W / 2}" y="46" text-anchor="middle" font-family="맑은 고딕" font-size="2.2" fill="#444" letter-spacing="-0.12">T. ${esc(args.phone)} · ${esc(args.email)}</text>
  ${args.addr ? `<text x="${W / 2}" y="49" text-anchor="middle" font-family="맑은 고딕" font-size="2" fill="#666" letter-spacing="-0.12">${esc(args.addr)}</text>` : ''}
</svg>`;

const back = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#1a1a1a"/>
  <text x="${W / 2}" y="${H / 2 + 1}" text-anchor="middle" font-family="맑은 고딕" font-size="4" font-weight="300" fill="#ffffff" letter-spacing="2">${esc(args.slogan ?? args.org)}</text>
</svg>`;

const slug = args.org.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').slice(0, 30);
const outDir = join('output', slug);
await mkdir(outDir, { recursive: true });

if (side === 'front' || side === 'both') {
  await writeFile(join(outDir, 'front.svg'), front);
  console.log(`✅ ${join(outDir, 'front.svg')}`);
}
if (side === 'back' || side === 'both') {
  await writeFile(join(outDir, 'back.svg'), back);
  console.log(`✅ ${join(outDir, 'back.svg')}`);
}
console.log('\n📋 입고 가이드: 96×56mm (90×50mm + Bleed 3mm) · CMYK 변환 필수 · 300dpi');

function esc(s) { return String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])); }
function parseArgs(arr) {
  const out = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith('--')) out[arr[i].slice(2)] = arr[i + 1];
  }
  return out;
}

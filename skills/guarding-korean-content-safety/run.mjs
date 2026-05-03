#!/usr/bin/env node
// k-content-safety-guard v0.2.0 — 한국어 콘텐츠 안전 검사
// 사용: node run.mjs --file path/to/script.txt  또는  echo "..." | node run.mjs

import { argv, stdin, exit } from 'node:process';
import { readFile } from 'node:fs/promises';

const args = parseArgs(argv.slice(2));
const text = args.file ? await readFile(args.file, 'utf8') : await readStdin();
if (!text.trim()) { console.error('No input.'); exit(1); }

const RULES = [
  { id: 'suicide-method', regex: /(목매|투신|음독|할복|뛰어내|투신자살|약물 과다)/g, level: 'CRITICAL', msg: '자살 방법 구체 묘사 — 한국 자살 미디어 가이드 위반' },
  { id: 'suicide-place', regex: /(한강 다리|마포대교|아파트 옥상)/g, level: 'CRITICAL', msg: '자살 장소 명시 — 모방 위험' },
  { id: 'clinical-diagnose', regex: /(이것은 우울증|당신은 ADHD|이건 양극성|당신은 조현)/g, level: 'HIGH', msg: '임상 단정 — "전문가 상담을 권합니다"로 전환' },
  { id: 'clinical-cure', regex: /(완치|반드시 낫|100% 치료)/g, level: 'HIGH', msg: '치료 효과 단정 — 의료법 위반 가능' },
  { id: 'trauma-graphic', regex: /(피가 튀|살이 찢|뼈가 부서)/g, level: 'MEDIUM', msg: '트라우마 트리거 — Trigger Warning 추가 권고' },
  { id: 'no-helpline', regex: /(자살|극단적 선택|죽고 싶)/g, level: 'INFO', msg: '자살 언급 시 1393 안내 의무 (자살예방상담전화)' },
];

const findings = [];
for (const rule of RULES) {
  const matches = [...text.matchAll(rule.regex)];
  if (matches.length === 0) continue;
  if (rule.id === 'no-helpline' && /1393|자살예방상담/.test(text)) continue;
  findings.push({ ...rule, count: matches.length, samples: matches.slice(0, 3).map(m => m[0]) });
}

const critical = findings.filter(f => f.level === 'CRITICAL').length;
const high = findings.filter(f => f.level === 'HIGH').length;
const verdict = critical ? '❌ BLOCK' : high ? '⚠️  WARN' : findings.length ? '🔵 INFO' : '✅ PASS';

console.log(`\nVerdict: ${verdict}`);
console.log(`CRITICAL: ${critical}, HIGH: ${high}, MEDIUM: ${findings.filter(f => f.level === 'MEDIUM').length}, INFO: ${findings.filter(f => f.level === 'INFO').length}\n`);

for (const f of findings) {
  console.log(`[${f.level}] ${f.id}: ${f.msg}`);
  console.log(`  matches (${f.count}): ${f.samples.join(', ')}\n`);
}

if (verdict.includes('BLOCK')) exit(2);

async function readStdin() {
  let data = '';
  for await (const chunk of stdin) data += chunk;
  return data;
}
function parseArgs(arr) {
  const out = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith('--')) out[arr[i].slice(2)] = arr[i + 1];
  }
  return out;
}

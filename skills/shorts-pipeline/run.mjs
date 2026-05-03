#!/usr/bin/env node
// shorts-pipeline v0.2.0 — 5+1 단계 숏폼 양산 실행 골격
// 사용: node run.mjs --topic "주제" --channel "youngsang-chiyu-lab" --duration 60

import { argv, env, exit } from 'node:process';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const args = parseArgs(argv.slice(2));
if (!args.topic) {
  console.error('Usage: node run.mjs --topic "주제" [--channel <slug>] [--duration 60]');
  exit(1);
}

const CHANNEL_PRESETS = {
  'youngsang-chiyu-lab': { tone: '심리 치유 애니메이션', style: 'Studio Ghibli, cel-shading' },
  'economics-shorts': { tone: '경제 클레이', style: 'claymation, stop-motion' },
};

const channel = CHANNEL_PRESETS[args.channel] ?? { tone: '일반', style: 'cinematic' };
const duration = Number(args.duration ?? 60);
const cuts = Math.ceil(duration / 4);

const slug = args.topic.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').slice(0, 40);
const outDir = join('output', slug);
await mkdir(outDir, { recursive: true });

const brief = {
  topic: args.topic,
  channel: args.channel ?? 'general',
  duration,
  cuts,
  preset: channel,
  hookRules: [
    '3초 룰',
    '오픈 루프 3개',
    '숫자 1개 이상',
    '2인칭 호명',
    '부정→긍정 플립',
  ],
  stages: {
    1: { name: 'YouTube 검색', api: 'YouTube Data API v3', requires: ['YOUTUBE_API_KEY'] },
    2: { name: '제목 10안', model: 'gemini-2.5-flash', enforces: '후킹 5규칙' },
    3: { name: '60초 대본 3막', structure: { hook: '0~10s', body: '10~45s', cta: '45~60s' } },
    4: { name: 'TTS', engines: ['edge_tts (free)', 'google-cloud-tts', 'gpt-sovits'] },
    5: { name: `이미지 ${cuts}컷`, model: 'imagen-4.0-generate-001', ratio: '9:16' },
    6: { name: '썸네일 3안', variants: ['후킹 텍스트 大', '캐릭터 정면', '숫자 강조'] },
  },
};

await writeFile(join(outDir, 'brief.json'), JSON.stringify(brief, null, 2));
console.log(`✅ Brief saved: ${join(outDir, 'brief.json')}`);
console.log(`Channel preset: ${channel.tone} (${channel.style})`);
console.log(`Cuts: ${cuts} (${duration}s ÷ 4s)`);
console.log('\nNext: 각 단계는 무기고 본 파이프라인(skills/youtube/shorts-pipeline-app.md)에 위임.');

function parseArgs(arr) {
  const out = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith('--')) out[arr[i].slice(2)] = arr[i + 1];
  }
  return out;
}

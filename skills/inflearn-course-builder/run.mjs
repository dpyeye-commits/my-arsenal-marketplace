#!/usr/bin/env node
// inflearn-course-builder v0.2.0 — 12장 강의 PROPOSAL 자동 골격
// 사용: node run.mjs --title "강의명" --target "입문" --hours 12 --price 99000

import { argv, exit } from 'node:process';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const args = parseArgs(argv.slice(2));
if (!args.title) { console.error('Usage: node run.mjs --title <X> [--target 입문|중급|실무] [--hours 12] [--price 99000]'); exit(1); }

const target = args.target ?? '입문';
const hours = Number(args.hours ?? 12);
const price = Number(args.price ?? 99000);

const chapters = [
  { n: 1, name: '도구 환경 셋업', goals: ['설치', '기본 명령어', '첫 실행'] },
  { n: 2, name: '핵심 개념', goals: ['용어 정의', '아키텍처', '워크플로우'] },
  { n: 3, name: '기초 실습 1', goals: ['Hello World', '첫 산출물', '검증'] },
  { n: 4, name: '기초 실습 2', goals: ['응용 1', '응용 2', '디버깅'] },
  { n: 5, name: '중급 패턴', goals: ['패턴 A', '패턴 B', '비교'] },
  { n: 6, name: '임상·안전 가드', goals: ['안전 룰', '검증 절차', '책임 한계'] },
  { n: 7, name: '실전 프로젝트 1', goals: ['기획', '구현', '배포'] },
  { n: 8, name: '양산 운영', goals: ['반복 자동화', '품질 관리', '봇 운영'] },
  { n: 9, name: '5표면 재활용', goals: ['숏폼', '롱폼', '블로그·인스타·뉴스레터'] },
  { n: 10, name: '외주·컨설팅', goals: ['포트폴리오', '단가 산정', '계약'] },
  { n: 11, name: '플러그인·SaaS', goals: ['패키징', '마켓플레이스 등재', '수익 분배'] },
  { n: 12, name: '수익화·다음 단계', goals: ['시장 분석', '브랜딩', '확장 전략'] },
];

const lines = [];
lines.push(`# ${args.title} — 인프런 강의 PROPOSAL\n`);
lines.push(`> 대상: ${target} · 총 ${hours}시간 · 정가 ₩${price.toLocaleString()}\n`);
lines.push(`> 추정 매출: ₩${(price * 0.5 * 1000).toLocaleString()} (1,000명) ~ ₩${(price * 0.5 * 5000).toLocaleString()} (5,000명, 분배 50%)\n`);
lines.push(`\n## 12장 구성\n`);
for (const ch of chapters) {
  lines.push(`\n### ${ch.n}장. ${ch.name}\n`);
  lines.push(`**학습 목표**:\n`);
  for (const g of ch.goals) lines.push(`- ${g}\n`);
  lines.push(`\n**실습**: TBD\n`);
}
lines.push(`\n## 부록\n- 5종 인용 양식 변환 (APA·시카고·MLA·Harvard·Vancouver)\n- 실습 코드 GitHub 레포\n- 마케팅 자료 (썸네일·예고편)\n`);

const slug = args.title.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').slice(0, 40);
const outDir = join('output', slug);
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'PROPOSAL.md'), lines.join(''));
console.log(`✅ ${join(outDir, 'PROPOSAL.md')}`);
console.log(`12장 골격 생성 완료. 각 장 실습은 사용자 도메인 자산에서 채울 것.`);

function parseArgs(arr) {
  const out = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith('--')) out[arr[i].slice(2)] = arr[i + 1];
  }
  return out;
}

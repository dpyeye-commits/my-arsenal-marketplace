# my-arsenal-marketplace

최감독 무기고(Arsenal HQ) Claude Code 플러그인 마켓플레이스 — **5종 스킬 v0.1.0**

**한 줄**: 박사·영상·디자인·콘텐츠 안전·강의 양산 5 영역의 한국 시장 특화 Claude Code 스킬.

---

## 수록 스킬 5종

| # | 스킬 | 설명 |
|---|---|---|
| 1 | **shorts-pipeline** | 5+1 단계 숏폼 양산 (검색·제목 10안·60초 대본·TTS·15컷·썸네일 3안) |
| 2 | **phd-citation-verifier** | APA 7 한국어 14종 + CrossRef DOI 보강 + CopyKiller 99 룰 |
| 3 | **business-card-svg** | 한국 명함 90×50mm·CMYK·11직군 매트릭스·후가공 8기법 |
| 4 | **k-content-safety-guard** | 자살 미디어 가이드 + 임상 단정 금지 + 트라우마 안전 |
| 5 | **inflearn-course-builder** | 12장 PROPOSAL·슬라이드·실습 코드·5종 인용 부록 |

---

## 설치

### 마켓플레이스 추가
```bash
/plugin marketplace add <github-username>/my-arsenal-marketplace
```

### 개별 플러그인 설치
```bash
/plugin install shorts-pipeline@my-arsenal-marketplace
/plugin install phd-citation-verifier@my-arsenal-marketplace
/plugin install business-card-svg@my-arsenal-marketplace
/plugin install k-content-safety-guard@my-arsenal-marketplace
/plugin install inflearn-course-builder@my-arsenal-marketplace
```

### 전체 일괄 설치
```bash
/plugin install --all my-arsenal-marketplace
```

---

## 사용

설치 후 Claude Code 세션에서 자연어 요청:
- "이 주제로 60초 쇼츠 만들어줘" → `shorts-pipeline` 자동 발동
- "이 인용 APA 7로 검증해줘" → `phd-citation-verifier`
- "한국 표준 명함 SVG 만들어줘" → `business-card-svg`
- "이 콘텐츠 자살 미디어 가이드 검사" → `k-content-safety-guard`
- "인프런 강의 12장 기획" → `inflearn-course-builder`

---

## 수익 분배 (검토 후 결정)

| 채널 | 분배율 | 결제 | 비고 |
|---|---|---|---|
| **Agent37** | 80% | Stripe 직접 | 직판 — 추천 |
| **Agensi** | 별도 | — | SKILL.md 메인 마켓 |
| **SkillsMP** | 별도 | — | Claude·Codex·ChatGPT 통합 |
| **자체 GitHub 무료 + 유료 컨설팅 결합** | 100% | — | 컨설팅 깔때기 |

---

## 로드맵

- **v0.1.0 (현재)**: 5종 스킬 골격 + frontmatter
- **v0.2.0**: 각 스킬 실행 코드(node·python) + 사전 확인 ask_user_input
- **v0.3.0**: 한국 결제(토스·카카오) 연동 + 라이선스 키
- **v1.0.0**: Agent37 등재 + 인프런 강의 동시 출시

---

## 라이선스

MIT (잠정) — v1.0.0 등재 시 듀얼 라이선스(MIT + 상업) 검토.

---

## 작성

- 작성자: 최재용 (Jaeyong Choi, dpyeye@gmail.com)
- 무기고: `/Users/jaeyongchoi/Desktop/main/`
- 작성: 2026-05-04
- 페어: [reference_claude_code_monetization_2026.md](../../../.claude/projects/-Users-jaeyongchoi-Desktop-main/memory/reference_claude_code_monetization_2026.md)

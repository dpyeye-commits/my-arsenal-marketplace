---
name: producing-shorts
description: Produces 5+1 stage YouTube Shorts (search, 10 title variants, 60s script with 5 hook rules, TTS, 15-cut image prompts, 3 thumbnail variants). Use when the user requests 쇼츠, 숏폼 영상 기획, 유튜브 쇼츠, or 60초 대본.
type: skill
---

# Shorts Pipeline (5+1 단계)

## 0단계 사전 확인 (환각 방지)
- 채널 (영상치유lab / 경제학 / 기타) — 톤·페르소나 분기
- 주제 키워드 1~2개
- 목표 길이 (기본 60초)

## 1단계 — YouTube 검색
- YouTube Data API v3 (`search.list` + `videos.list`)
- 상위 10개 제목·설명·조회수·게시일

## 2단계 — 제목 10안 (후킹 5규칙 강제)
1. 3초 룰 (첫 3초 안에 후킹)
2. 오픈 루프 3개
3. 숫자 1개 이상
4. 2인칭 ("당신")
5. 부정 → 긍정 플립

## 3단계 — 60초 대본 (3막 압축)
- 1막(0~10초): 후킹 + 갈등 제시
- 2막(10~45초): 우화·예시·핵심 메시지
- 3막(45~60초): 학술 인용 + CTA

## 4단계 — TTS
- edge_tts (msedge-tts npm) 무료
- Google Cloud TTS (Neural2)
- GPT-SoVITS (1분 클로닝)

## 5단계 — 이미지 프롬프트 15컷
- 60초 ÷ 4초 = 15컷
- 각 컷: 장면·캐릭터 시드·카메라·조명·스타일
- 스타일 락 (영상치유lab=Studio Ghibli 애니 / 경제학=클레이)

## 6단계 — 썸네일 3안
- A: 후킹 텍스트 大
- B: 캐릭터 정면
- C: 숫자·통계 강조

## 추측 금지
- 데이터에 없는 통계·인용 절대 생성 X
- peer-review 인용은 CrossRef DOI 검증 후만

## 무기고 페어
- skills/youtube/shorts-pipeline-app.md
- skills/youtube/youtube-shorts-strategy.md
- skills/cinema/screenplay-writing.md

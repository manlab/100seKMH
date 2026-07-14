# 백세한방병원 홈페이지 리뉴얼 설계

## 목적

제공된 2026-07-14 콘텐츠 원고를 기준으로 백세한방병원 홈페이지의 정보구조를 7개 GNB로 재편한다. 기존 검색 유입과 환자 북마크는 영구 리다이렉트로 보존하고, 확정되지 않았거나 의료광고 사전 검토가 필요한 정보는 공개 문구와 분리한다.

## 확정 정보구조

1. **백세한방병원**: 인사말, 의료진 소개, 층별 안내, 오시는 길
2. **암 통합치료**: 수술 후 회복, 항암 부작용 관리, 전이·재발 관리
3. **교통사고**: 교통사고 후유증, 자동차보험 진료절차, 치료 프로세스
4. **자율신경실조증**: 자율신경실조증이란, 자가진단, 치료 안내
5. **척추관절통증**: 추나치료, 도수치료, 디스크·협착증·오십견·무릎·스포츠손상
6. **다이어트**: 다이어트 소개, 비만의 원인, 다이어트가 필요한 경우
7. **커뮤니티**: 공지사항, 온라인 상담, 자주 묻는 질문, 비급여 항목, 서류 발급 안내

`한약·탕전 안내`, `입원 안내`, `진료시간`은 병원소개의 보조 페이지로 유지하되 GNB의 2depth에는 노출하지 않는다. `여성·소아` 임상 콘텐츠는 원고에 이관 대상이 없으므로 기존 URL은 즉시 삭제하거나 건강·진료 효과를 단정하는 새 카테고리에 임의로 편입하지 않는다. 운영 확인 전에는 기존 경로를 유지한다.

## URL과 SEO 전략

신규 공개 URL은 아래와 같이 사용한다.

| 새 URL | 역할 |
| --- | --- |
| `/cancer` | 암 통합치료 소개 |
| `/cancer/post-surgery` | 수술 후 회복 안내 |
| `/cancer/chemo-care` | 항암 부작용 관리 안내 |
| `/cancer/recurrence-care` | 전이·재발 관리 안내 |
| `/autonomic` | 자율신경실조증 소개 |
| `/autonomic/self-check` | 자가 확인 항목 |
| `/autonomic/care` | 진료 안내 |
| `/spine-joint` | 척추관절통증 소개 |
| `/spine-joint/chuna` | 추나치료 안내 |
| `/spine-joint/manual-therapy` | 도수치료 안내 |
| `/diet` | 다이어트 소개 |
| `/diet/causes` | 비만의 원인 |
| `/diet/guide` | 다이어트가 필요한 경우 |

아래 기존 URL은 사용자를 가장 가까운 새 안내 페이지로 `308` 영구 리다이렉트한다.

| 기존 URL | 이관 URL |
| --- | --- |
| `/spine` | `/spine-joint` |
| `/spine/disc` | `/spine-joint/disc` |
| `/spine/stenosis` | `/spine-joint/stenosis` |
| `/spine/shoulder` | `/spine-joint/shoulder` |
| `/spine/knee` | `/spine-joint/knee` |
| `/spine/sports` | `/spine-joint/sports` |
| `/posture` | `/spine-joint/chuna` |
| `/posture/scoliosis` | `/spine-joint/chuna` |
| `/posture/forward-head` | `/spine-joint/chuna` |
| `/posture/pelvis` | `/spine-joint/chuna` |
| `/posture/postnatal` | `/spine-joint/chuna` |
| `/immunity/sleep` | `/autonomic` |

`/immunity`, `/immunity/rhinitis`, `/immunity/fatigue`, `/immunity/cold-hand-foot`, `/women-kids` 및 그 하위 경로는 원고의 확정된 대응 카테고리가 없으므로, 이번 배포에서는 기존 페이지와 canonical URL을 유지한다. 이들은 GNB에서는 제거하지만 sitemap에는 계속 남긴다.

신규 페이지는 `pageMeta`로 canonical, Open Graph, Twitter 메타데이터를 만들고 sitemap에 추가한다. 각 기존 URL은 리다이렉트만 반환하며 canonical을 별도로 내보내지 않는다.

## 화면과 컴포넌트

- `navigation.ts`를 GNB, 모바일 드로어, LNB, 푸터의 단일 정보원으로 유지한다.
- 신규 카테고리 랜딩 페이지는 기존 `SubLayout`, `SubVisual`, `Lnb`, `Reveal`, `InContentCta`를 재사용한다.
- 원고의 핵심 정보는 요약, 진료 안내 범위, 진료 과정, 관련 페이지, 상담 CTA 순으로 배치한다.
- 자가 확인 항목은 진단 도구가 아니며, 결과 판정·점수·질병 확정 문구를 만들지 않는다.
- 모바일에서도 모든 GNB 하위 링크에 키보드와 스크린 리더로 접근할 수 있어야 한다.

## 의료광고 검토 게이트

다음 문구는 실제 공개 전 병원 책임자와 의료광고 검토 담당자의 승인을 받아야 한다.

- 암 통합치료의 수술 후 회복, 항암 부작용 관리, 전이·재발 관리 관련 치료 효과 표현
- 자율신경실조증의 자가 확인, 치료 기간·횟수·비용, 질병명 확정 표현
- 다이어트의 요요 감소, 체질 개선, 안전성, 감량 결과·기간 표현
- 추나·도수치료의 적용 대상, 자격·전문성, 효과·재발 방지 표현
- 의료진 경력, 진료 협력기관, 층별 시설·장비, 입원실 구성, 지도 서비스 제공자

구현에서는 치료를 보장하거나 비교 우위를 주장하지 않는 설명형 문구만 사용한다. 현행 [의료법 제56조](https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032849787)를 기준으로 최종 공개 전 별도 검토를 진행한다.

## 미확정 운영 정보

- 층별 안내와 입원실 구성은 현재 사이트의 실제 사진·정보를 유지하고, 원고와 충돌하는 항목은 운영 담당자 확인 전 수정하지 않는다.
- 지도는 현재 Google 임베드를 유지한다. 네이버 지도 전환 여부는 운영 승인이 필요하다.
- 암 통합치료 관련 병원 사진과 협력기관 표기는 제공받은 확정 자산·문구가 있을 때만 추가한다.
- 원고의 `물리치료` 용어 정리 요청과 교통사고 치료 항목의 `전기치료·온열치료` 표기는 임상·운영 확인 후 결정한다.

## 완료 기준

- 데스크톱과 모바일에서 7개 GNB, 메가 메뉴, 모바일 드로어, 푸터가 같은 경로 정보를 사용한다.
- 신규 페이지와 이관 페이지의 메타데이터, canonical, sitemap, 308 리다이렉트가 일관된다.
- 의료광고 검토 대상과 운영 미확정 정보가 추적 문서에 분리돼 있다.
- 접근성 확인, `npm run type-check`, `npm run lint`, `npm run build`가 통과한다.
- Vercel 프로덕션 배포 후 신규 URL, 기존 리다이렉트, sitemap을 확인한다.

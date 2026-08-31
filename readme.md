# Re-bin

> 송도 지역의 자원순환 수거함을 지도에서 찾고, 이동 경로와 올바른 분리배출 방법까지 안내하는 위치 기반 웹 서비스

[서비스 바로가기](https://rebin-e8883.firebaseapp.com/) · [트러블슈팅](./TROUBLESHOOTING.md)

## 프로젝트 설명

폐의약품·폐건전지·플라스틱처럼 배출 방법과 수거 장소가 제각각인 자원을 사용자가 쉽게 처리하도록 돕기 위해 만들었습니다. 사용자는 현재 위치를 기준으로 수거함을 탐색하고, 목적지까지의 이동 경로를 확인하며, 챗봇을 통해 품목별 배출 방법을 안내받을 수 있습니다.

## 핵심 기능

- **지도 기반 수거함 탐색**: Google Maps에서 수거함 위치를 마커·클러스터로 표시하고, 현재 위치와 지도 경계에 맞는 정보를 제공합니다.
- **경로 안내**: 선택한 수거함까지의 도보 경로와 거리·예상 시간을 보여줍니다.
- **관심 장소 관리**: Google 로그인 후 관심 수거함을 저장하고 마이페이지에서 다시 확인할 수 있습니다.
- **분리배출 안내 챗봇**: 폐기물 종류에 따라 처리 방법을 선택해 확인할 수 있습니다.
- **서비스 가능 지역 안내**: 지원 지역 밖에서는 오류 대신 체험 흐름을 안내합니다.

## 기술 구성

| 영역 | 기술 |
| --- | --- |
| Frontend | React, TypeScript, Vite, React Router |
| 상태·데이터 | Zustand, TanStack Query, Firebase Auth / Firestore |
| 지도·경로 | Google Maps, OpenRouteService |
| UI | Tailwind CSS, Framer Motion |
| 배포 | Firebase Hosting, Vercel |

## 설계 포인트

- 지도·선택 장소·경로 표시 상태를 Zustand로 분리해 여러 화면과 지도 컴포넌트가 같은 상태를 사용합니다.
- 라우트를 `React.lazy`와 `Suspense`로 분리해 초기 진입에서 모든 화면 코드를 내려받지 않도록 구성했습니다.
- 인증 상태가 확인된 뒤에만 관심 장소와 현재 위치를 조회해 비로그인 상태의 불필요한 요청을 막았습니다.

## 실행 방법

```bash
npm install
npm run dev
```

Google Maps, Firebase, OpenRouteService 연동에는 별도의 환경 변수 설정이 필요합니다.

## 문서

- [트러블슈팅](./TROUBLESHOOTING.md): OAuth 리디렉션, 위치 상태, 번들 크기 개선 과정

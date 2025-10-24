# 🌌 Global Stock Market Wave Dashboard

미국과 한국 증시를 3D 우주 시각화로 표현한 대시보드

![Dashboard Preview](https://img.shields.io/badge/Three.js-v0.160.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Updates](https://img.shields.io/badge/updates-automatic-brightgreen)

## ✨ 특징

- 🚀 **완전 무료** - 비용 없이 자동 업데이트
- 🎨 **3D 시각화** - Three.js 기반 우주 테마
- 📊 **실시간 데이터** - 주요 지수 자동 업데이트
- 🌍 **글로벌 시장** - 미국 & 한국 증시
- ⚡ **빠른 성능** - 60 FPS 렌더링
- 📱 **반응형** - 모든 디바이스 지원

## 🎯 데이터 자동 업데이트 방식

### 방식 1: 클라이언트 사이드 API (실시간) ✅
- Yahoo Finance API 사용 (무료)
- 페이지 로드 시마다 최신 데이터
- 서버 불필요
- **비용: $0**

### 방식 2: GitHub Actions (자동화) ✅
- 매일 자동으로 데이터 수집
- 자동 커밋 & 배포
- Public repo 무료 (월 2,000분)
- **비용: $0**

## 🚀 빠른 시작

### 1. 로컬에서 실행
```bash
# 저장소 클론
git clone https://github.com/bubilife1202/three.js-dashboard.git
cd three.js-dashboard

# 브라우저에서 열기
open index.html
# 또는
python -m http.server 8000
```

### 2. GitHub Pages로 배포
1. **Settings** → **Pages**
2. **Source**: 브랜치 선택 (main 또는 claude/...)
3. **Save**
4. `https://[username].github.io/three.js-dashboard/` 접속

## 📊 지원 데이터

### 미국 시장
- S&P 500 (^GSPC)
- NASDAQ (^IXIC)
- DOW JONES (^DJI)

### 한국 시장
- KOSPI (^KS11)
- KOSDAQ (^KQ11)

### 추가 데이터
- 일일 상승률 Top 5
- 연초 대비(YTD) Top 7

## 🎮 사용법

### 마우스 컨트롤
- **드래그**: 3D 뷰 회전
- **스크롤**: 줌 인/아웃
- **호버**: 상세 정보 표시
- **클릭**: 카메라 포커스 이동

### 컨트롤 패널
- 🇺🇸 **US Market**: 미국 시장 토글
- 🇰🇷 **Korea Market**: 한국 시장 토글
- ⏸️ **Pause**: 애니메이션 일시정지
- 🔄 **Reset**: 카메라 위치 초기화

## 🛠️ 기술 스택

- **Three.js** v0.160.0 - 3D 렌더링
- **WebGL** - GPU 가속
- **Yahoo Finance API** - 무료 시장 데이터
- **GitHub Actions** - 자동화 CI/CD
- **Vanilla JavaScript** - 의존성 최소화

## 📈 성능

- **렌더링**: 60 FPS
- **파티클**: 25,000+ 개
- **로딩 시간**: < 2초
- **메모리**: ~50 MB

## 🔄 자동 업데이트 설정

### GitHub Actions 활성화
1. 저장소 **Actions** 탭 이동
2. "Update Stock Market Data" 워크플로우 확인
3. 자동 실행 (매일 9 AM UTC)
4. 수동 실행 가능 ("Run workflow" 버튼)

### 업데이트 주기 변경
`.github/workflows/update-data.yml` 파일에서 cron 수정:
```yaml
schedule:
  - cron: '0 9 * * *'  # 매일 9 AM UTC
  # - cron: '0 */6 * * *'  # 6시간마다
  # - cron: '0 9 * * 1-5'  # 평일만
```

## 📁 파일 구조

```
three.js-dashboard/
├── index.html              # 메인 애플리케이션
├── api.js                  # API 통합 모듈
├── market-data.json        # 캐시된 데이터
├── README.md               # 이 파일
└── .github/
    └── workflows/
        └── update-data.yml # 자동 업데이트 설정
```

## 🎨 커스터마이징

### 색상 변경
```javascript
const marketData = {
  us: {
    indices: [
      { name: 'S&P 500', color: '#00CED1' },  // 여기 수정
      ...
    ]
  }
}
```

### 새로운 시장 추가
```javascript
// 1. 데이터 추가
const marketData = {
  jp: {  // 일본 시장
    indices: [
      { name: 'NIKKEI', value: 0, change: 0, color: '#FF6B6B' }
    ]
  }
}

// 2. 성운 생성
marketData.jp.indices.forEach((index, i) => {
  const nebula = createNebula(index, x, z, i);
  nebula.userData.market = 'jp';
  nebulas.push(nebula);
});
```

## 🌐 무료 API 한도

### Yahoo Finance
- ✅ 무제한 요청
- ✅ API 키 불필요
- ⚠️ 비공식 (언제든 변경 가능)

### 대안 API
| API | 무료 한도 | API 키 | 비고 |
|-----|----------|--------|------|
| Alpha Vantage | 5 req/min | 필요 | 안정적 |
| Finnhub | 60 req/min | 필요 | 추천 |
| Twelve Data | 8 req/min | 필요 | 제한적 |

## 🐛 문제 해결

### 데이터가 업데이트되지 않음
1. GitHub Actions가 활성화되어 있는지 확인
2. 워크플로우 로그 확인
3. 수동으로 "Run workflow" 실행

### CORS 오류
- GitHub Pages에서 호스팅하면 해결
- 또는 CORS 프록시 사용

### 성능 문제
- 파티클 수 줄이기 (`particleCount`)
- 별 개수 줄이기
- 낮은 품질 설정 사용

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🙏 크레딧

- **Three.js** - 3D 라이브러리
- **Yahoo Finance** - 시장 데이터
- **GitHub Actions** - 자동화
- **Claude Code** - 개발 지원

## 📧 문의

이슈나 제안사항은 GitHub Issues에 등록해주세요!

---

Made with ❤️ and Three.js | 완전 무료 🎉 | 자동 업데이트 🤖

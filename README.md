# 팀 주간 보고 프로젝트
<p align="center">
  <img src="https://github.com/user-attachments/assets/2000ad33-dc30-4797-8b45-3635dd560cd4" alt="userName" width="250"/>
  <img src="https://github.com/user-attachments/assets/a92b7fe7-8bac-4db6-8d08-2a974208179f" alt="welcome" width="250"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d385f845-5621-4b95-a13a-022eaa3e1789" alt="notSelectedProject" width="250"/>
  <img src="https://github.com/user-attachments/assets/653d67dc-4f9b-40dc-89c6-7bc6c45fd5d4" alt="newProject" width="250"/>
  <img src="https://github.com/user-attachments/assets/aa32994a-de9f-4d0e-ba6a-1e05f288f27b" alt="detaildProject" width="250"/>
</p>
## 프로젝트 소개
이 프로젝트는 회사에서 매주 주간 업무를 엑셀로 작성하여 보고하는 방식에서 벗어나, **웹 어플리케이션**으로 이를 관리하고자 만들어졌습니다. 주간 업무 보고는 많은 팀원들이 각자 업무를 기록하고 제출하는 과정에서 비효율적인 부분이 많았습니다. 이를 개선하기 위해 팀과 이름을 선택하고, 주간 업무를 작성하는 기능을 가진 웹 애플리케이션을 개발하게 되었습니다.

## 프로젝트 링크
- [주간 보고 앱 링크](https://weekly-project-app.vercel.app/)

## 사용된 기술
### Frontend
- **React Hooks**: `useEffect`, `useRef`, `useState`, `useMemo`
- **CSS**: TailwindCSS

### Backend
- **Node.js**: Express Framework

### Database
- **MongoDB**: Mongoose

### Deployment
- **Vercel**: Frontend
- **Render**: Backend

## 주요 기능
- **팀 선택 화면**
  - 팀 추가/수정/삭제
  - 사용자 추가/수정/삭제
  - 유효성 검사 및 팀 명 또는 이메일 중복 검사
  - 데이터 삽입, 수정, 삭제 (Node.js와 MongoDB의 Mongoose 이용)

- **주간 보고 작성**
  - 작성 Form: 날짜, 내용, 비고
  - 날짜 유효성 검증
  - 내용 및 비고 길이 체크 (내용이 너무 길면 작성 불가)
  - 작성된 보고서 리스트 형태로 표시
  - 작성된 보고서 리스트 수정/삭제 가능 (Node.js와 MongoDB의 Mongoose 이용)

## 문제 해결 능력
처음에 Vercel에 backend 소스와 frontend 소스를 같이 배포하려니 동작이 원활하지 않았습니다. 이를 해결하기 위해 backend와 frontend의 Root Directory를 각각 Vercel(frontend)과 Render(backend)에 배포하였고, 이로 인해 동작이 원활하게 되었습니다.

# 팀 주간 보고 프로젝트
<p align="center">
  <img src="https://github.com/user-attachments/assets/af8b5999-0c3f-4eaf-a9b8-290bb4fcdbc0" alt="userName" width="250" height="210"/>
  <img src="https://github.com/user-attachments/assets/0606ae7a-2181-4a43-bf6e-07b5792d4426" alt="welcome" width="250" height="210"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7bf8cc75-b6f6-47ff-b4bc-9993d092b720" alt="notSelectedProject" width="250" height="210"/>
  <img src="https://github.com/user-attachments/assets/dd53ab67-3a2d-4aee-a414-03585878284a" alt="newProject" width="250" height="210"/>
  <img src="https://github.com/user-attachments/assets/6bce57f1-92eb-4ea2-b6cc-1bfc6860e2d7" alt="detaildProject" width="250" height="210"/>
</p>

## 프로젝트 소개
이 프로젝트는 회사에서 매주 주간 업무를 엑셀로 작성하여 보고하는 방식에서 벗어나, **웹 어플리케이션**으로 이를 관리하고자 만들어졌습니다. 주간 업무 보고는 많은 팀원들이 각자 업무를 기록하고 제출하는 과정에서 비효율적인 부분이 많았습니다. 이를 개선하기 위해 팀과 이름을 선택하고, 주간 업무를 작성하는 기능을 가진 웹 애플리케이션을 개발하게 되었습니다.

## 프로젝트 링크
- [주간 보고 앱 링크](https://weekly-project-app.vercel.app/)

## 사용된 기술
### Frontend
- **React Hooks**: `useEffect`, `useRef`, `useState`, `useMemo`
- **CSS**: TailwindCSS
- **State Management**: Redux Toolkit

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
  - 내용 및 비고 길이 체크 (내용 1000자, 비고 500자 제한)
  - 작성된 보고서 리스트 형태로 표시
  - 작성된 보고서 리스트 수정/삭제 가능 (Node.js와 MongoDB의 Mongoose 이용)

## 개선할 점 
- 처음 로드 시 팀 선택 API 호출 Response가 오래걸림
- 사용자 수정 시 바뀌지 않음

## 문제 해결
처음에 Vercel에 backend 소스와 frontend 소스를 같이 배포하려니 동작이 원활하지 않았습니다. 이를 해결하기 위해 backend와 frontend의 Root Directory를 각각 Vercel(frontend)과 Render(backend)에 배포하였고, 이로 인해 동작이 원활하게 되었습니다.

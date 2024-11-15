# 주간 보고 프로젝트

## 만든 배경
이 프로젝트는 회사에서 매주 주간 업무를 엑셀로 작성하여 보고하는 방식에서 벗어나, **웹 어플리케이션**으로 이를 관리하고자 만들어졌습니다. 주간 업무 보고는 많은 팀원들이 각자 업무를 기록하고 제출하는 과정에서 비효율적인 부분이 많았습니다. 이를 개선하기 위해 팀과 이름을 선택하고, 주간 업무를 작성하는 기능을 가진 웹 애플리케이션을 개발하게 되었습니다.

## 현재 진행 상황
현재 프로젝트의 첫 화면은 팀과 이름을 선택하는 UI로 구성되어 있습니다. 사용자가 **팀 선택**과 **이름 선택**을 완료하고 **확인 버튼**을 클릭하면, 선택한 팀과 이름이 화면에 표시됩니다. 

### 앞으로의 계획:
- **팀 추가 기능**과 **선택된 팀에 사원 추가하는 기능**을 추가할 예정입니다.
- 추후 **LocalStorage**를 활용하여 선택된 사원의 이메일, 이름, 팀 정보를 저장하고, 해당 정보를 불러와 **주간 보고** 내용과 날짜를 작성할 수 있도록 할 계획입니다.
- 작성된 데이터를 **FormData**를 활용하여 주간 보고 객체에 넣고, 이를 **LocalStorage**에 관리하여 리스트 형식으로 불러올 수 있도록 할 예정입니다.
- 나중에는 **백엔드**와 연동하여 실제 데이터를 서버에서 활용할 수 있도록 개발할 계획입니다.

## 이미지

![image](https://github.com/user-attachments/assets/6880608f-4ce1-4735-8abb-70f946ee328d)

> (위 이미지는 앱의 첫 화면을 보여주는 스크린샷입니다.)

## 향후 계획
1. **팀 및 사원 관리 기능**: 팀을 추가하고 각 팀에 사원을 추가하는 로직을 구현할 예정입니다.
2. **LocalStorage 연동**: 선택된 팀과 사원의 정보, 주간 업무 내용을 **LocalStorage**에 저장하고 불러오는 기능을 추가할 예정입니다.
3. **백엔드 통합**: 최종적으로, 서버에서 데이터를 관리할 수 있도록 **백엔드**와 연동하는 작업을 진행할 예정입니다.

---

이 **주간 보고 프로젝트**는 팀원들이 효율적으로 주간 업무를 기록하고 관리할 수 있는 시스템을 제공하기 위해 점진적으로 개선될 예정입니다.

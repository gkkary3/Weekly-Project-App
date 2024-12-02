import React, { useEffect, useRef, useState } from "react";

export default function Header({ submitTeamData, handleHeight }) {
  const [currentTime, setCurrentTime] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0); // Header의 높이를 상태로 관리
  const assignHeight = useRef();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000); // 매초 시간 업데이트

    return () => clearInterval(timer); // 컴포넌트가 언마운트되면 타이머 정리
  }, []);

  // Header의 높이를 계산하고 업데이트
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (assignHeight.current) {
        setHeaderHeight(assignHeight.current.offsetHeight);
      }
    };

    // 초기 헤더 높이 설정
    updateHeaderHeight();

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", updateHeaderHeight);

    // 컴포넌트 언마운트 시 리스너 정리
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []); // 컴포넌트 마운트 시 한 번 실행, 이후 화면 크기 변경 시마다 실행

  // headerHeight 값이 변경될 때마다 handleHeight 호출
  useEffect(() => {
    if (headerHeight !== 0) {
      handleHeight(headerHeight);
    }
  }, [headerHeight, handleHeight]); // headerHeight 값이 변경될 때마다 호출

  return (
    <header
      ref={assignHeight}
      className="fixed top-0 left-0 z-50 w-full text-white bg-gray-800 shadow-md"
    >
      <div className="flex flex-col items-center justify-between p-4 mx-auto md:flex-row">
        {/* 팀 정보 */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-blue-400">
            {submitTeamData.team.name}
          </h1>
          <p className="text-sm text-gray-300">
            사용자:{" "}
            <span className="font-medium">{submitTeamData.userInfo.name}</span>
          </p>
          <p className="text-sm text-gray-300">
            이메일:{" "}
            <span className="font-medium">{submitTeamData.userInfo.email}</span>
          </p>
        </div>

        {/* 현재 시간 */}
        <div className="w-full mt-6 text-center md:mt-0 md:absolute md:bottom-2 md:right-4 md:w-auto md:text-right">
          <p className="text-sm text-gray-300">현재 시간</p>
          <p className="text-lg font-medium">{currentTime}</p>
        </div>
      </div>
    </header>
  );
}

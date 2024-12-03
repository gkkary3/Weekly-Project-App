import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Header({ submitTeamData, handleHeight }) {
  const [currentTime, setCurrentTime] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const assignHeight = useRef();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    if (assignHeight.current) {
      setHeaderHeight(assignHeight.current.offsetHeight);
    }
  }, [currentTime]); // DOM 렌더링 완료 후 실행

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (assignHeight.current) {
        setHeaderHeight(assignHeight.current.offsetHeight);
      }
    };

    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    if (headerHeight !== 0) {
      handleHeight(headerHeight);
    }
  }, [headerHeight, handleHeight]);

  return (
    <header
      ref={assignHeight}
      className="fixed top-0 left-0 z-50 w-full text-white bg-gray-800 shadow-md"
    >
      <div className="flex flex-col items-center justify-between max-w-screen-lg p-4 mx-auto md:flex-row">
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

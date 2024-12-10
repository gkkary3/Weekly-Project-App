import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function Header({
  submitTeamData,
  handleHeight,
  handleLeaveTeam,
}) {
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
  }, [currentTime]);

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
      <div className="relative flex items-start justify-between p-4 mx-auto">
        {/* 팀 정보 */}
        <div className="mt-2 mb-4 text-left">
          <h1 className="text-xl font-bold text-blue-400">
            {submitTeamData.team.name}
          </h1>
          <p className="text-sm text-white">
            {/* 사용자 정보 */}
            <span className="font-semibold">
              {submitTeamData.userInfo.name}({submitTeamData.userInfo.email})
            </span>
          </p>
        </div>
        {/* 현재 시간 */}
        <div className="absolute top-2 right-4 md:top-4">
          <p className="text-sm text-gray-300 md:text-lg">{currentTime}</p>
        </div>
        <div className="absolute bottom-2 right-4 md:bottom-4">
          <button
            onClick={handleLeaveTeam} // 뒤로가기 동작 처리 함수
            className="flex items-center p-2 text-gray-300 hover:text-blue-500 focus:outline-none"
          >
            <ArrowLeftIcon
              className="w-5 h-5 md:w-6 md:h-6"
              aria-hidden="true"
            />
            <span className="sr-only">뒤로가기</span> {/* 접근성 텍스트 */}
          </button>
        </div>
      </div>
    </header>
  );
}

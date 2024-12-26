import React, { useEffect, useState } from "react";
import "./index.css"; // Tailwind CSS 파일

import SelectTeam from "./components/SelectTeam.jsx";
import Header from "./components/Header.jsx";
import WeeklyReportForm from "./components/WeeklyReportForm.jsx";
import WeeklyReportList from "./components/WeeklyReportList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { enterActions } from "./store/enter.js";

function App() {
  const [teamSubmitData, setTeamSubmitData] = useState(false);
  const [submitTeamData, setSubmitTeamData] = useState(null);
  // const [teamIsSubmit, setTeamIsSubmit] = useState(false);
  const [heightApply, setHeightApply] = useState(0);
  const [fetchResult, setFetchResult] = useState(false);
  const dispatch = useDispatch();
  const isEnter = useSelector((state) => state.enter.isEntered);

  useEffect(() => {
    const data = window.localStorage.getItem("submitTeam");
    if (data) {
      setTeamSubmitData(true);
      setSubmitTeamData(JSON.parse(data)); // 로컬 스토리지에서 데이터 파싱
    }
  }, []);

  const handleTeamSubmit = (submitTeam) => {
    setSubmitTeamData(submitTeam);
    // setTeamIsSubmit(true);
    setTeamSubmitData(true);
    dispatch(enterActions.enter());
  };

  const handleHeight = (headerHeight) => {
    setHeightApply(headerHeight);
  };

  const handlefetchResult = () => {
    setFetchResult((prev) => !prev);
  };

  const handleLeaveTeam = () => {
    // setTeamIsSubmit(false);
    dispatch(enterActions.exit());
  };

  return teamSubmitData && isEnter && submitTeamData.team.name ? (
    <>
      <Header
        submitTeamData={submitTeamData}
        handleHeight={handleHeight}
        handleLeaveTeam={handleLeaveTeam}
      />
      <div
        className="flex flex-col w-full gap-4 p-4 bg-gray-800 md:h-screen md:flex-row sm:pt-24"
        style={{ paddingTop: `${heightApply}px` }} // Header 높이에 맞춰 여백 추가
      >
        {/* 작성 컴포넌트 */}
        <div className="flex-grow md:flex-1">
          <WeeklyReportForm handlefetchResult={handlefetchResult} />
        </div>
        {/* 리스트 컴포넌트 */}
        <div className="flex-grow md:flex-1">
          <WeeklyReportList
            handlefetchResult={handlefetchResult}
            fetchResult={fetchResult}
          />
        </div>
      </div>
    </>
  ) : (
    <SelectTeam
      handleTeamSubmit={handleTeamSubmit}
      handlefetchResult={handlefetchResult}
    />
  );
}

export default App;

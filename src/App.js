import React, { useEffect, useState } from "react";
import "./index.css"; // Tailwind CSS 파일

import SelectTeam from "./components/SelectTeam.jsx";
import Header from "./components/Header.jsx";
import WeeklyReportForm from "./components/WeeklyReportForm.jsx";
import WeeklyReportList from "./components/WeeklyReportList.jsx";

function App() {
  const [teamSubmitData, setTeamSubmitData] = useState(false);
  const [submitTeamData, setSubmitTeamData] = useState(null);
  const [teamIsSubmit, setTeamIsSubmit] = useState(false);
  const [heightApply, setHeightApply] = useState(0);

  useEffect(() => {
    const data = window.localStorage.getItem("submitTeam");
    if (data) {
      setTeamSubmitData(true);
      setSubmitTeamData(JSON.parse(data)); // 로컬 스토리지에서 데이터 파싱
    }
  }, []);

  const handleTeamSubmit = (submitTeam) => {
    setSubmitTeamData(submitTeam);
    setTeamIsSubmit(true);
  };

  const handleHeight = (headerHeight) => {
    setHeightApply(headerHeight);
  };

  return teamSubmitData && teamIsSubmit && submitTeamData.team.name ? (
    <>
      <Header submitTeamData={submitTeamData} handleHeight={handleHeight} />
      <div
        className="flex flex-col w-full gap-4 p-4 bg-gray-800 md:h-screen md:flex-row sm:pt-24"
        style={{ paddingTop: `${heightApply}px` }} // Header 높이에 맞춰 여백 추가
      >
        {/* 작성 컴포넌트 */}
        <div className="flex-grow md:flex-1">
          <WeeklyReportForm />
        </div>
        {/* 리스트 컴포넌트 */}
        <div className="flex-grow md:flex-1">
          <WeeklyReportList />
        </div>
      </div>
    </>
  ) : (
    <SelectTeam handleTeamSubmit={handleTeamSubmit} />
  );
}

export default App;

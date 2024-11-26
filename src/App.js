import React, { useEffect, useState } from "react";
import "./index.css"; // Tailwind CSS 파일

import SelectTeam from "./components/SelectTeam.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [teamSubmitData, setTeamSubmitData] = useState(false);
  const [submitTeamData, setSubmitTeamData] = useState(null);
  // const [teamIsSubmit, setTeamIsSubmit] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("submitTeam");
    if (data) {
      setTeamSubmitData(true);
      setSubmitTeamData(JSON.parse(data)); // 로컬 스토리지에서 데이터 파싱
    }
  }, [submitTeamData]);

  const handleTeamSubmit = (submitTeam) => {
    setSubmitTeamData(submitTeam);
  };

  return teamSubmitData ? (
    <Header submitTeamData={submitTeamData} />
  ) : (
    <SelectTeam handleTeamSubmit={handleTeamSubmit} />
  );
}

export default App;

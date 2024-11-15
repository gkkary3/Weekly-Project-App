import React, { useState } from 'react';
import teamsData from './resource/data.js';

function App() {
  // 상태 변수
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [userOptions, setUserOptions] = useState([]);

  // 팀 선택 시 해당 팀에 맞는 유저 목록을 업데이트
  const handleTeamChange = (event) => {
    const team = event.target.value;
    setSelectedTeam(team);
    setSelectedName(''); // 팀 변경 시 이전에 선택된 이름 초기화

    // 선택된 팀에 맞는 사용자 목록을 업데이트
    if (team && teamsData[team]) {
      setUserOptions(Object.values(teamsData[team].users));
    } else {
      setUserOptions([]);
    }
  };

  // 이름 선택
  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  // 확인 버튼 클릭 시
  const handleSubmit = () => {
    if (!selectedTeam || !selectedName) {
      alert('팀과 이름을 모두 선택해주세요.');
    } else {
      alert(`팀: ${teamsData[selectedTeam].name}, 이름: ${selectedName}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">주간 보고 프로젝트</h1>

        {/* 팀 선택 */}
        <div className="mb-4">
          <label htmlFor="team" className="block text-lg font-medium text-gray-700">팀 선택</label>
          <select
            id="team"
            name="team"
            value={selectedTeam}
            onChange={handleTeamChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">팀을 선택하세요</option>
            {Object.keys(teamsData).map((teamKey) => (
              <option key={teamKey} value={teamKey}>
                {teamsData[teamKey].name}
              </option>
            ))}
          </select>
        </div>

        {/* 이름 선택 */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">이름 선택</label>
          <select
            id="name"
            name="name"
            value={selectedName}
            onChange={handleNameChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedTeam}
          >
            <option value="">이름을 선택하세요</option>
            {userOptions.map((user) => (
              <option key={user.email} id={user.email} value={user.name}>
                {user.name}({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* 확인 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

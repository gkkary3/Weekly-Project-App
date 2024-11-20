import React, { useEffect, useRef, useState } from "react";
import teamsData from "../resource/data.js";
import Modal from "./Modal.jsx";
import { v4 as uuidv4 } from "uuid";

export default function SelectTeam() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
  });
  const [submitTeam, setSubmitTeam] = useState({
    team: {
      name: "",
      id: "",
    },
    userInfo: {
      name: "",
      email: "",
    },
  });
  const [userOptions, setUserOptions] = useState([]);
  const [teamData, setTeamData] = useState(() => {
    const teamData = window.localStorage.getItem("teamData");
    return teamData ? JSON.parse(teamData) : { ...teamsData };
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 모달 타입: "team" or "user"
  const [emailIsInvalid, setEmailIsInvalid] = useState();
  const [actionButtonsVisible, setActionButtonsVisible] = useState({
    team: false,
    user: false,
  });

  const assignTeam = useRef();
  const assignUserName = useRef();
  const assignUserEmail = useRef();

  useEffect(() => {
    if (selectedTeam && teamData[selectedTeam]) {
      setUserOptions(Object.values(teamData[selectedTeam].users));
    } else {
      setUserOptions([]);
    }
  }, [teamData, selectedTeam]); // teamData나 selectedTeam이 변경될 때마다 실행

  useEffect(() => {
    window.localStorage.setItem("teamData", JSON.stringify(teamData));
  }, [teamData]);

  useEffect(() => {
    window.localStorage.setItem("submitTeam", JSON.stringify(submitTeam));
  }, [submitTeam]);

  const handleNameChange = (event) => {
    var userEmail = event.target.value;
    var selectedUser = userOptions.find((user) => user.email === userEmail);
    setSelectedUser((prevSelectedUser) => ({
      ...prevSelectedUser,
      name: selectedUser ? selectedUser.name : "",
      email: selectedUser ? selectedUser.email : "",
    }));
  };

  const handleSubmit = () => {
    if (!selectedTeam || !selectedUser) {
      alert("팀과 이름을 모두 선택해주세요.");
    } else {
      setSubmitTeam((prevSubmitTeam) => ({
        ...prevSubmitTeam,
        team: {
          name: teamData[selectedTeam].name,
          id: selectedTeam,
        },
        userInfo: {
          name: selectedUser.name,
          email: selectedUser.email,
        },
      }));
    }
  };

  const handleTeamChange = (event) => {
    const team = event.target.value;
    setSelectedTeam(team);
    setSelectedUser({
      name: "",
      email: "",
    });
    if (team && teamData[team]) {
      setUserOptions(Object.values(teamData[team].users));
    } else {
      setUserOptions([]);
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
    setActionButtonsVisible(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setEmailIsInvalid(false);
    setModalType("");
  };

  const handleAddTeam = () => {
    var teamName = assignTeam.current.value;

    if (teamName.trim().length === 0) {
      alert("팀 이름을 확인해 주세요.");
      return;
    }
    const newTeamKey = `team-${uuidv4()}`;
    // setTeamData((teamData[newTeamKey] = { name: teamName, users: {} }));
    setTeamData((prevData) => ({
      ...prevData, // 기존 데이터를 유지
      [newTeamKey]: { name: teamName, users: {} }, // 새로운 팀 추가
    }));
    handleCloseModal();
  };

  const handleAddUser = () => {
    const userName = assignUserName.current.value;
    const userEmail = assignUserEmail.current.value;

    const emailIsvalid = userEmail.includes("@");
    if (!emailIsvalid) {
      setEmailIsInvalid(true);
      return;
    }
    if (!userName.trim() || !userEmail.trim()) {
      alert("사용자 이름과 이메일을 모두 입력해주세요.");
      return;
    }

    if (!selectedTeam) {
      alert("팀을 선택해주세요.");
      return;
    }

    const userKey = userEmail.split("@")[0]; // 이메일에서 @ 기준으로 왼쪽 추출

    setTeamData((prevData) => {
      // 중복 사용자 확인
      if (prevData[selectedTeam].users[userKey]) {
        alert("이미 존재하는 사용자입니다.");
        return prevData;
      }

      // 새로운 사용자 추가
      return {
        ...prevData, // 기존 데이터를 유지
        [selectedTeam]: {
          ...prevData[selectedTeam], // 선택된 팀 데이터를 유지
          users: {
            ...prevData[selectedTeam].users, // 기존 사용자 데이터 유지
            [userKey]: { email: userEmail, name: userName }, // 새로운 사용자 추가
          },
        },
      };
    });
    setEmailIsInvalid(false);
    handleCloseModal();
  };

  const renderModalContent = () => {
    if (modalType === "team") {
      return (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-blue-400">팀 추가</h2>
          <input
            type="text"
            placeholder="새 팀 이름을 입력하세요"
            className="w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={assignTeam}
          />
          <button
            onClick={handleAddTeam}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            추가
          </button>
        </div>
      );
    } else if (modalType === "user") {
      return (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-blue-400">
            사용자 추가
          </h2>
          <input
            type="text"
            placeholder="새 사용자 이름을 입력하세요"
            className="w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={assignUserName}
          />
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            className="w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={assignUserEmail}
          />
          <div className="control-error">
            {emailIsInvalid && (
              <p className="mb-3 text-sm text-red-500">
                유효한 이메일 주소를 입력해주세요.
              </p>
            )}
          </div>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            추가
          </button>
        </div>
      );
    }
    return null;
  };

  // toggleActionButtons 함수 수정
  const toggleActionButtons = (type) => {
    setActionButtonsVisible((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-blue-400">
          팀 주간 보고
        </h1>

        <div className="flex items-center mb-4">
          <div className="flex-grow">
            <label
              htmlFor="team"
              className="block text-lg font-medium text-gray-300"
            >
              팀 선택
            </label>
            <select
              id="team"
              name="team"
              value={selectedTeam}
              onChange={handleTeamChange}
              className="w-full p-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">팀을 선택하세요</option>
              {Object.keys(teamData).map((teamKey) => (
                <option key={teamKey} value={teamKey}>
                  {teamData[teamKey].name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative inline-block">
            <button
              onClick={() => toggleActionButtons("team")}
              className="ml-4 mt-8 p-2 h-[42px] bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
            >
              +
            </button>
            {actionButtonsVisible.team && (
              <div className="absolute right-0 flex p-2 mb-2 space-x-2 bg-transparent rounded-md bottom-8">
                <button
                  onClick={handleOpenModal.bind(null, "team")}
                  className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
                >
                  추가
                </button>
                <button className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">
                  수정
                </button>
                <button className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex-grow">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-300"
            >
              이름 선택
            </label>
            <select
              id="name"
              name="name"
              value={selectedUser.email}
              onChange={handleNameChange}
              className="w-full p-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={!selectedTeam}
            >
              <option value="">이름을 선택하세요</option>
              {userOptions.map((user) => (
                <option key={user.email} id={user.email} value={user.email}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div className="relative inline-block">
            <button
              onClick={() => toggleActionButtons("user")}
              className="ml-4 mt-8 p-2 h-[42px] bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
            >
              +
            </button>
            {actionButtonsVisible.user && (
              <div className="absolute right-0 flex p-2 mb-2 space-x-2 bg-transparent rounded-md bottom-8">
                <button
                  onClick={handleOpenModal.bind(null, "user")}
                  className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
                >
                  추가
                </button>
                <button className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">
                  수정
                </button>
                <button className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            확인
          </button>
        </div>
      </div>
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
}

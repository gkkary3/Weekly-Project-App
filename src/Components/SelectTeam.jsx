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
  const [modalType, setModalType] = useState({ type: "", action: "" }); // type: team/user  , action: add, update, delete
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

      alert(
        "팀 이름:" +
          submitTeam.team.name +
          ", 이름: " +
          submitTeam.userInfo.name +
          "(" +
          submitTeam.userInfo.email +
          ")"
      );
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

  const handleOpenModal = (type, action) => {
    if (
      (action === "update" && type === "team" && !selectedTeam) ||
      (action === "update" && type === "user" && !selectedUser.email)
    ) {
      type === "team"
        ? alert("팀을 선택해주세요.")
        : alert("이름을 선택해주세요.");
      return;
    }
    setModalType((prevData) => ({ ...prevData, type, action }));
    setModalIsOpen(true);
    setActionButtonsVisible((prevData) => ({ ...prevData, [type]: false }));
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setEmailIsInvalid(false);
    setModalType({ type: "", action: "" });
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

  const handleUpdateData = (identifier, type) => {
    if (type === "team") {
      const teamName = assignTeam.current.value;
      setTeamData((prevData) => ({
        ...prevData,
        [identifier]: {
          ...prevData[identifier],
          name: teamName, // 팀 이름 업데이트
        },
      }));
    } else if (type === "user") {
      const userName = assignUserName.current.value;
      const userEmail = assignUserEmail.current.value;

      setTeamData((prevData) => {
        const oldKey = identifier.email.split("@")[0];
        const newKey = userEmail.split("@")[0];

        const updatedUsers = { ...prevData[selectedTeam].users };

        // 이메일이 변경되었는지 확인
        if (oldKey === newKey) {
          // 이메일이 동일한 경우: 키 유지, 값만 업데이트
          updatedUsers[oldKey] = {
            ...updatedUsers[oldKey],
            name: userName,
            email: userEmail, // 혹시 이메일 필드도 업데이트 필요하다면 포함
          };
        } else {
          // 이메일이 변경된 경우: 기존 키 삭제, 새 키 추가
          delete updatedUsers[oldKey];
          updatedUsers[newKey] = {
            name: userName,
            email: userEmail,
          };
        }

        return {
          ...prevData,
          [selectedTeam]: {
            ...prevData[selectedTeam],
            users: updatedUsers,
          },
        };
      });
    }

    handleCloseModal();
  };

  const handleDeleteData = (type) => {
    if (selectedTeam && type === "team") {
      if (Object.keys(teamData[selectedTeam].users).length > 0) {
        alert("사용자가 존재합니다.");
      } else {
        setTeamData((prevData) => {
          const updateDate = { ...prevData };
          delete updateDate[selectedTeam];
          return updateDate;
        });
      }
    } else if (selectedTeam && selectedUser.email && type === "user") {
      setTeamData((prevData) => {
        const updatedUsers = { ...prevData[selectedTeam].users };
        const userKey = selectedUser.email.split("@")[0];
        delete updatedUsers[userKey];
        // 상위 teamData에 반영
        return {
          ...prevData,
          [selectedTeam]: {
            ...prevData[selectedTeam],
            users: updatedUsers,
          },
        };
      });
    }
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
    // const userKey = userEmail; // 이메일에서 @ 기준으로 왼쪽 추출

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

  // function handleInputChange(type, value) {
  //   if (type === "team" && assignTeam.current) {
  //     // 현재 ref의 value 값을 가져오거나 변경
  //     assignTeam.current.value = assignTeam.current.value;
  //   }
  // }

  const renderModalContent = () => {
    const { type, action } = modalType;
    if (action === "add" || action === "update") {
      if (type === "team") {
        return (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-blue-400">
              {action === "add" ? "팀 추가" : "팀 수정"}
            </h2>
            <input
              type="text"
              // onChange={(e) => handleInputChange("team", e.target.value)}
              placeholder="새 팀 이름을 입력하세요"
              className="w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ref={assignTeam}
              {...(action === "update" && {
                defaultValue: teamData[selectedTeam].name,
              })}
            />
            <button
              onClick={
                action === "add"
                  ? () => handleAddTeam()
                  : () => handleUpdateData(selectedTeam, type)
              }
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {action === "add" ? "추가" : "수정"}
            </button>
          </div>
        );
      } else if (type === "user") {
        return (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-blue-400">
              {action === "add" ? "사용자 추가" : "사용자 수정"}
            </h2>
            <input
              type="text"
              placeholder="새 사용자 이름을 입력하세요"
              className="w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ref={assignUserName}
              {...(action === "update" && {
                defaultValue:
                  teamData[selectedTeam].users[selectedUser.email.split("@")[0]]
                    .name,
              })}
            />
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ref={assignUserEmail}
              {...(action === "update" && {
                defaultValue:
                  teamData[selectedTeam].users[selectedUser.email.split("@")[0]]
                    .email,
              })}
            />
            <div className="control-error">
              {emailIsInvalid && (
                <p className="mb-3 text-sm text-red-500">
                  유효한 이메일 주소를 입력해주세요.
                </p>
              )}
            </div>
            <button
              onClick={
                action === "add"
                  ? () => handleAddUser()
                  : () => handleUpdateData(selectedUser, type)
              }
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {action === "add" ? "추가" : "수정"}
            </button>
          </div>
        );
      }
    }
    return null;
  };

  // toggleActionButtons 함수 수정
  const toggleActionButtons = (type) => {
    if (type === "user" && !selectedTeam) {
      alert("팀을 선태해주세요.");
      return;
    }
    setActionButtonsVisible((prevState) => {
      const updatedState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === type ? !prevState[key] : false;
        return acc;
      }, {});
      return updatedState;
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="mb-6 text-3xl font-semibold text-center text-blue-400">
          팀 주간 보고
        </h1>
        {(actionButtonsVisible.team || actionButtonsVisible.user) && (
          <div className="flex justify-end space-x-2 bg-transparent rounded-md">
            <button
              onClick={handleOpenModal.bind(
                null,
                actionButtonsVisible.user ? "user" : "team",
                "add"
              )}
              className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
            >
              추가
            </button>
            <button
              onClick={handleOpenModal.bind(
                null,
                actionButtonsVisible.user ? "user" : "team",
                "update"
              )}
              className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
            >
              수정
            </button>
            <button
              onClick={() =>
                handleDeleteData(actionButtonsVisible.user ? "user" : "team")
              }
              className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
            >
              삭제
            </button>
          </div>
        )}
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

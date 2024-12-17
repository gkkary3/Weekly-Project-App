import React, { useEffect, useRef, useState, useMemo } from "react";
import Modal from "./Modal.jsx";
import { v4 as uuidv4 } from "uuid";
import {
  addTeam,
  addUser,
  deleteTeam,
  deleteUser,
  getTeamList,
  getUserList,
  updateTeam,
  updateUser,
} from "../http.js";
export default function SelectTeam({ handleTeamSubmit, handlefetchResult }) {
  const [selectedTeam, setSelectedTeam] = useState({
    teamId: "",
    name: "",
  });
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    teamId: "",
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
  const [teamData, setTeamData] = useState([]);
  const [fetchResult, setFetchResult] = useState(false);
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

  const submitTeamData = useMemo(() => {
    const storedData = window.localStorage.getItem("submitTeam");
    return storedData ? JSON.parse(storedData) : null;
  }, []); // 빈 배열을 사용해 한 번만 계산

  useEffect(() => {
    const fetchTeamList = async () => {
      try {
        const teamList = await getTeamList();
        setTeamData(teamList);
      } catch (error) {
        console.error("Failed to fetch team list:", error);
      }
    };

    fetchTeamList();
  }, [fetchResult]);

  useEffect(() => {
    if (submitTeamData) {
      setSelectedTeam(submitTeamData.team.id);

      var userInfo = submitTeamData.userInfo;
      setSelectedUser((prevSelectedUser) => ({
        ...prevSelectedUser,
        name: userInfo ? userInfo.name : "",
        email: userInfo ? userInfo.email : "",
      }));
    }
  }, [submitTeamData]);

  useEffect(() => {
    if (selectedTeam) {
      const fetchUserList = async () => {
        try {
          const userList = await getUserList(selectedTeam.teamId);
          setUserOptions(userList);
        } catch (error) {
          console.error("Failed to fetch user list:", error);
        }
      };
      fetchUserList();
    } else {
      setUserOptions([]);
    }
  }, [selectedTeam, fetchResult]); // teamData나 selectedTeam이 변경될 때마다 실행

  useEffect(() => {
    window.localStorage.setItem("teamData", JSON.stringify(teamData));
  }, [teamData]);

  useEffect(() => {
    if (submitTeam.team.name || submitTeam.userInfo.name) {
      window.localStorage.setItem("submitTeam", JSON.stringify(submitTeam));

      handleTeamSubmit(submitTeam);
      handlefetchResult();
    }
  }, [submitTeam, handleTeamSubmit, handlefetchResult]);

  const handleNameChange = (event) => {
    var userEmail = event.target.value;
    var selectedUser = userOptions.find((user) => user.email === userEmail);
    setSelectedUser((prevSelectedUser) => ({
      ...prevSelectedUser,
      id: selectedUser ? selectedUser._id : "",
      teamId: selectedUser ? selectedUser.teamId : "",
      name: selectedUser ? selectedUser.name : "",
      email: selectedUser ? selectedUser.email : "",
    }));
  };

  const handleSubmit = () => {
    if (!selectedTeam || !selectedUser.email) {
      alert("팀과 이름을 모두 선택해주세요.");
    } else {
      setSubmitTeam((prevSubmitTeam) => ({
        ...prevSubmitTeam,
        team: {
          name: selectedTeam.name,
          id: selectedTeam.teamId,
        },
        userInfo: {
          name: selectedUser.name,
          email: selectedUser.email,
        },
      }));
    }
  };

  const handleTeamChange = async (event) => {
    const teamId = event.target.value;
    const name = event.target.options[event.target.selectedIndex].text;
    setSelectedTeam({ teamId, name });

    // await getUserList(teamId);
    // setSelectedUser({
    //   name: "",
    //   email: "",
    // });
    // if (teamId && teamData[teamId]) {
    //   setUserOptions(Object.values(teamData[team].users));
    // } else {
    //   setUserOptions([]);
    // }
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

  const handleAddTeam = async () => {
    try {
      var teamName = assignTeam.current.value;

      if (teamName.trim().length === 0) {
        alert("팀 이름을 확인해 주세요.");
        return;
      }
      if (teamData.filter((team) => team.name === teamName).length > 0) {
        alert("팀 이름이 존재합니다.");
        return;
      }

      const newTeamKey = `team-${uuidv4()}`;

      await addTeam(teamName, newTeamKey);
      setFetchResult((prev) => !prev);
      handleCloseModal();
    } catch (error) {
      console.error("Error add Team:", error);
      alert("팀을 저장하는 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateData = async (identifier, type) => {
    if (type === "team") {
      try {
        const teamName = assignTeam.current.value;
        if (teamData.filter((team) => team.name === teamName)) {
          alert("팀 이름이 존재합니다.");
          return;
        }
        await updateTeam(identifier, teamName);
        setSelectedUser((prev) => {
          if (prev.teamId === identifier) {
            return {
              ...prev,
              name: teamName,
            };
          }
          return prev;
        });
      } catch (error) {
        console.error("Error update Team:", error);
        alert("팀을 수정하는 중 오류가 발생했습니다.");
      }
    } else if (type === "user") {
      try {
        const userName = assignUserName.current.value;
        const userEmail = assignUserEmail.current.value;
        if (userOptions.filter((user) => user.email === userEmail)) {
          alert("사용자가 존재합니다.");
          return;
        }
        await updateUser(
          selectedUser.id,
          selectedUser.teamId,
          userName,
          userEmail
        );
        setSelectedUser((prev) => {
          if (prev.id === selectedUser.id) {
            return {
              ...prev,
              name: assignUserName.current.value,
              email: assignUserEmail.current.value,
            };
          }
          return prev;
        });
      } catch (error) {
        console.error("Error update User:", error);
      }
    }
    setFetchResult((prev) => !prev);
    handleCloseModal();
  };

  const handleDeleteData = async (type) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) return;
    if (selectedTeam && type === "team") {
      try {
        await deleteTeam(selectedTeam.teamId);
        setSelectedTeam(null);
      } catch (error) {
        console.error("Error delete Team:", error);
        alert("팀을 삭제하는 중 오류가 발생했습니다.");
      }
    } else if (selectedTeam && selectedUser.email && type === "user") {
      try {
        await deleteUser(selectedUser.email);
        // setUserOptions(null);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error delete User:", error);
        alert("사용자를 삭제하는 중 오류가 발생했습니다.");
      }
    }
    setFetchResult((prev) => !prev);
  };

  const handleAddUser = async () => {
    const userName = assignUserName.current.value;
    const userEmail = assignUserEmail.current.value;

    if (userOptions.filter((user) => user.email === userEmail)) {
      alert("사용자가 존재합니다.");
      return;
    }
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
    await addUser(userName, userEmail, selectedTeam.teamId);
    setFetchResult((prev) => !prev);
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
                defaultValue: selectedTeam.name,
              })}
            />
            <button
              onClick={
                action === "add"
                  ? () => handleAddTeam()
                  : () => handleUpdateData(selectedTeam.teamId, type)
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
                defaultValue: selectedUser?.name,
              })}
            />
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ref={assignUserEmail}
              {...(action === "update" && {
                defaultValue: selectedUser?.email,
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
              value={selectedTeam?.teamId}
              onChange={handleTeamChange}
              className="w-full p-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">팀을 선택하세요</option>
              {teamData.map((team) => (
                <option key={team.teamId} value={team.teamId}>
                  {team.name}
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

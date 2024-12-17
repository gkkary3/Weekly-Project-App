export function getSubmitTeamData() {
  const submitTeam = JSON.parse(localStorage.getItem("submitTeam")) || {};
  return {
    id: submitTeam.userInfo?.id,
    teamId: submitTeam.team?.id,
    email: submitTeam.userInfo?.email,
    submitTeam,
  };
}

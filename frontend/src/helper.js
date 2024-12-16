export function getSubmitTeamData() {
  const submitTeam = JSON.parse(localStorage.getItem("submitTeam")) || {};
  return {
    teamId: submitTeam.team?.id,
    email: submitTeam.userInfo?.email,
    submitTeam,
  };
}

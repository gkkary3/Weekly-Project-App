const submitTeam = JSON.parse(localStorage.getItem("submitTeam"));

// export async function getWeeklyReport() {
//   try {
//     const response = await fetch(
//       `http://localhost:5000/Weekly-Project-App/user-report?teamId=${submitTeam.team.id}&email=${submitTeam.userInfo.email}`
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch reports");
//     }
//     return await response.json(); // 필터링된 데이터 반환
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     return [];
//   }
// }

export async function updateWeeklyReport(formData) {
  const teamId = submitTeam?.team?.id;
  const email = submitTeam?.userInfo?.email;

  if (!teamId || !email) {
    throw new Error("No valid team or user information found");
  }

  const response = await fetch(
    "http://localhost:5000/Weekly-Project-App/user-report",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, teamId, email }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update report");
  }

  return response.json();
}

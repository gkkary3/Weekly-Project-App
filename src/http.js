const submitTeam = JSON.parse(localStorage.getItem("submitTeam")) || {};

const teamId = submitTeam.team?.id;
const email = submitTeam.userInfo?.email;

export async function getWeeklyReport() {
  try {
    if (!teamId || !email) {
      throw new Error("Missing teamId or email");
    }

    const response = await fetch(
      `https://weekly-project-app.vercel.app/api/Weekly-Project-App/user-report?teamId=${teamId}&email=${email}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }
    return await response.json(); // 필터링된 데이터 반환
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
}

export async function updateWeeklyReport(formData, reportId) {
  if (!teamId || !email) {
    throw new Error("No valid team or user information found");
  }

  const response = await fetch(
    "https://weekly-project-app.vercel.app/Weekly-Project-App/user-report",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, teamId, email, reportId }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update report");
  }

  return response.json();
}

export async function addWeeklyReport(formData) {
  if (!teamId || !email) {
    throw new Error("No valid team or user information found");
  }

  const response = await fetch(
    "https://weekly-project-app.vercel.app/Weekly-Project-App/user-report",
    {
      method: "POST",
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

export async function deleteWeeklyReport(reportId) {
  try {
    const response = await fetch(
      `https://weekly-project-app.vercel.app/Weekly-Project-App/delete-report/${reportId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the report");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
}

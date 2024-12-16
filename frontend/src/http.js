const submitTeam = JSON.parse(localStorage.getItem("submitTeam")) || {};

const teamId = submitTeam.team?.id;
const email = submitTeam.userInfo?.email;

/* 주간보고 */
export async function getWeeklyReport() {
  try {
    if (!teamId || !email) {
      throw new Error("Missing teamId or email");
    }

    const response = await fetch(
      `https://weekly-project-app.onrender.com/api/Weekly-Project-App/user-report?teamId=${teamId}&email=${email}`
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
    "https://weekly-project-app.onrender.com/api/Weekly-Project-App/user-report",
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
    "https://weekly-project-app.onrender.com/api/Weekly-Project-App/user-report",
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
      `https://weekly-project-app.onrender.com/api/Weekly-Project-App/user-report/${reportId}`,
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

/* 팀 */
export async function getTeamList() {
  try {
    const response = await fetch(
      `https://weekly-project-app.onrender.com/api/Weekly-Project-App/getTeamList`
      // "http://localhost:3000/api/Weekly-Project-App/getTeamList"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch getTeamList");
    }
    return await response.json(); // 필터링된 데이터 반환
  } catch (error) {
    console.error("Error fetching getTeamList:", error);
    return [];
  }
}

export async function addTeam(name, teamId) {
  const response = await fetch(
    "https://weekly-project-app.onrender.com/api/Weekly-Project-App/addTeam",
    // "http://localhost:3000/api/Weekly-Project-App/addTeam",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, teamId }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add team");
  }

  return response.json();
}

export async function updateTeam(teamId, name) {
  const response = await fetch(
    "https://weekly-project-app.onrender.com/api/Weekly-Project-App/updateTeam",
    // "http://localhost:3000/api/Weekly-Project-App/updateTeam",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId, name }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update report");
  }

  return response.json();
}

export async function deleteTeam(teamId) {
  try {
    const response = await fetch(
      `https://weekly-project-app.onrender.com/api/Weekly-Project-App/deleteTeam/${teamId}`,
      // `http://localhost:3000/api/Weekly-Project-App/deleteTeam/${teamId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the team");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
}

/* 사용자 */
export async function getUserList(teamId) {
  try {
    const response = await fetch(
      `https://weekly-project-app.onrender.com/api/Weekly-Project-App/getUserList?teamId=${teamId}`
      // `http://localhost:3000/api/Weekly-Project-App/getUserList?teamId=${teamId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch getUserList");
    }
    return await response.json(); // 필터링된 데이터 반환
  } catch (error) {
    console.error("Error fetching getUserList:", error);
    return [];
  }
}

export async function addUser(name, email, teamId) {
  const response = await fetch(
    "https://weekly-project-app.onrender.com/api/Weekly-Project-App/addUser",
    // "http://localhost:3000/api/Weekly-Project-App/addUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, teamId }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add team");
  }

  return response.json();
}

export async function updateUser(id, teamId, name, email) {
  const response = await fetch(
    "https://weekly-project-app.onrender.com/api/Weekly-Project-App/updateUser",
    // "http://localhost:3000/api/Weekly-Project-App/updateTeam",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, teamId, name, email }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update user");
  }

  return response.json();
}

export async function deleteUser(email) {
  try {
    const response = await fetch(
      `https://weekly-project-app.onrender.com/api/Weekly-Project-App/deleteUser/${email}`,
      // `http://localhost:3000/api/Weekly-Project-App/deleteTeam/${teamId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the team");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
}

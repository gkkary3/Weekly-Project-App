export default function Header({ submitTeamData }) {
  return (
    <header className="p-4 text-white bg-blue-500">
      <h1 className="text-2xl font-bold">
        팀 이름: {submitTeamData.team.name}
      </h1>
      <p>팀 ID: {submitTeamData.team.id}</p>
      <p>사용자: {submitTeamData.userInfo.name}</p>
      <p>이메일: {submitTeamData.userInfo.email}</p>
    </header>
  );
}

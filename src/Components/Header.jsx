export default function Header({ submitTeamData }) {
  return (
    <header className="flex flex-col max-w-md p-6 mx-auto space-y-4 text-gray-800 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-semibold text-gray-900">
        {submitTeamData.team.name}
      </h1>
      <div className="flex flex-col space-y-2 text-sm">
        <p className="text-gray-600">
          사용자:{" "}
          <span className="font-medium">{submitTeamData.userInfo.name}</span>
        </p>
        <p className="text-gray-600">
          이메일:{" "}
          <span className="font-medium">{submitTeamData.userInfo.email}</span>
        </p>
        <p className="hidden">{submitTeamData.team.id}</p> {/* Hide 팀 ID */}
      </div>
    </header>
  );
}

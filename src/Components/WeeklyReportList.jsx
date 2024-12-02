import React from "react";

function WeeklyReportList() {
  const reports = [
    {
      startDate: "2024-11-25",
      endDate: "2024-12-01",
      content: "주간 프로젝트 완료 및 보고서 작성.",
      note: "다음 주는 새로운 프로젝트 시작.",
    },
    {
      startDate: "2024-11-18",
      endDate: "2024-11-24",
      content: "클라이언트 회의 및 요구사항 분석.",
      note: "클라이언트 요청 사항 추가 반영 예정.",
    },
  ];

  return (
    <div className="flex-grow p-6 bg-white rounded-lg shadow-xl bg-opacity-70">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        작성된 보고 리스트
      </h2>

      {/* 리스트 */}
      <ul className="space-y-4">
        {reports.map((report, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded-lg shadow-md bg-opacity-90"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {report.startDate} ~ {report.endDate}
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              <strong>내용:</strong> {report.content}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <strong>비고:</strong> {report.note}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeeklyReportList;

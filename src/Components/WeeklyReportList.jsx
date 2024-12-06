import React, { useState } from "react";
// import { getWeeklyReport } from "../http.js";

export default function WeeklyReportList() {
  const [reports, setReports] = useState([]);

  // useEffect(() => {
  //   // 비동기로 데이터 가져오기
  //   const fetchReports = async () => {
  //     try {
  //       const { reports: fetchedReports } = await getWeeklyReport();
  //       setReports(fetchedReports); // 데이터 상태 업데이트
  //     } catch (error) {
  //       console.error("Failed to fetch reports:", error);
  //     }
  //   };

  //   fetchReports();
  // }, []);

  return (
    <div className="flex-grow p-6 bg-white rounded-lg shadow-xl bg-opacity-20">
      <h2 className="mb-4 text-xl font-bold text-white">작성된 보고 리스트</h2>

      {/* 조건부 렌더링 */}
      {reports.length > 0 ? (
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
      ) : (
        <p className="text-sm text-gray-400">작성된 보고 리스트가 없습니다.</p>
      )}
    </div>
  );
}

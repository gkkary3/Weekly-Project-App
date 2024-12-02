import React from "react";

export default function WeeklyReportForm() {
  return (
    <div className="flex-grow p-6 bg-white rounded-lg shadow-xl bg-opacity-70">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        팀 주간 보고 작성
      </h2>

      {/* 날짜 선택 */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-2 text-sm font-medium text-gray-700">
            시작 날짜
          </label>
          <input
            type="date"
            className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="mb-2 text-sm font-medium text-gray-700">
            종료 날짜
          </label>
          <input
            type="date"
            className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 내용 작성 */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium text-gray-700">내용</label>
        <textarea
          rows="4"
          className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="내용을 입력하세요..."
        ></textarea>
      </div>

      {/* 비고 작성 */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium text-gray-700">비고</label>
        <textarea
          rows="2"
          className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비고를 입력하세요..."
        ></textarea>
      </div>

      {/* 제출 버튼 */}
      <button className="w-full p-2 text-white bg-blue-800 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        제출
      </button>
    </div>
  );
}

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function WeeklyReportForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <div className="flex-grow p-6 bg-white rounded-lg shadow-xl bg-opacity-20">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        팀 주간 보고 작성
      </h2>

      {/* 날짜 선택 */}
      <div className="flex flex-nowrap gap-4 mb-4 flex-col-xs">
        {/* 시작 날짜 */}
        <div className="flex flex-col flex-1 min-w-[100px]">
          <label className="mb-2 text-sm font-medium text-white">
            시작 날짜
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full h-12 p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="시작 날짜를 선택하세요"
          />
        </div>

        {/* 종료 날짜 */}
        <div className="flex flex-col flex-1 min-w-[100px]">
          <label className="mb-2 text-sm font-medium text-white">
            종료 날짜
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full h-12 p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="종료 날짜를 선택하세요"
          />
        </div>
      </div>

      {/* 내용 작성 */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium text-white">내용</label>
        <textarea
          rows="4"
          className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="내용을 입력하세요..."
        ></textarea>
      </div>

      {/* 비고 작성 */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium text-white">비고</label>
        <textarea
          rows="2"
          className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비고를 입력하세요..."
        ></textarea>
      </div>

      {/* 제출 버튼 */}
      <button className="w-full p-2 text-white bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
        제출
      </button>
    </div>
  );
}

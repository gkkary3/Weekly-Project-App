import React, { useEffect, useState, memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addWeeklyReport } from "../http.js";

const WeeklyReportForm = memo(({ handlefetchResult }) => {
  // 상태 초기화
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    content: "",
    note: "",
  });

  useEffect(() => {
    if (formData.endDate && formData.startDate > formData.endDate) {
      alert("종료 날짜를 확인해주세요.");
      setFormData((prev) => ({ ...prev, endDate: null }));
    }
  }, [formData.endDate, formData.startDate]);

  // 상태 업데이트 핸들러
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.endDate || !formData.startDate) {
        alert("날짜를 확인해주세요.");
        return;
      }

      if (!formData.content) {
        alert("내용을 확인해주세요.");
        return;
      }

      if (formData.content.length > 1000) {
        alert("내용은 최대 1000글자까지 가능합니다.");
        return;
      }

      if (formData.note.length > 500) {
        alert("비고는 최대 500글자까지 가능합니다.");
        return;
      }

      await addWeeklyReport(formData);
      alert("보고서가 성공적으로 저장되었습니다!");
      setFormData((prev) => ({
        ...prev,
        startDate: null,
        endDate: null,
        content: "",
        note: "",
      }));
      handlefetchResult();
    } catch (error) {
      console.error("Error updating report:", error);
      alert("보고서를 저장하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex-grow h-full p-6 overflow-y-auto bg-white rounded-lg shadow-xl scrollbar-custom min-h-30rem bg-opacity-20">
      <h2 className="mb-4 text-xl font-bold text-white">팀 주간 보고 작성</h2>

      {/* 날짜 선택 */}
      <div className="flex gap-4 mb-4 flex-nowrap flex-col-xs">
        {/* 시작 날짜 */}
        <div className="flex flex-col flex-1 min-w-[100px]">
          <label className="mb-2 text-sm font-medium text-white">
            시작 날짜
          </label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleChange("startDate", date)}
            className="w-full h-12 p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="시작 날짜"
            portalId="root-portal" // 포탈을 사용하여 Viewport 안으로 렌더링
            popperPlacement="bottom-end" // 달력 위치 조정
            dateFormat="yyyy.MM.dd" // 원하는 날짜 형식
          />
        </div>

        {/* 종료 날짜 */}
        <div className="flex flex-col flex-1 min-w-[100px]">
          <label className="mb-2 text-sm font-medium text-white">
            종료 날짜
          </label>
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => handleChange("endDate", date)}
            className="w-full h-12 p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="종료 날짜"
            portalId="root-portal" // 포탈을 사용하여 Viewport 안으로 렌더링
            popperPlacement="bottom-end" // 달력 위치 조정
            dateFormat="yyyy.MM.dd" // 원하는 날짜 형식
          />
        </div>
      </div>

      {/* 내용 작성 */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium text-white">내용</label>
        <textarea
          rows="5"
          style={{ resize: "none" }}
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          className="p-2 text-gray-800 bg-white border border-gray-300 rounded scrollbar-custom bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="내용을 입력하세요..."
        ></textarea>
        <div
          className={`text-right text-sm mt-1 ${
            formData.content.length > 1000 ? "text-red-500" : "text-white"
          }`}
        >
          {formData.content.length}/1000
        </div>
      </div>

      {/* 비고 작성 */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium text-white">비고</label>
        <textarea
          rows="2.5"
          style={{ resize: "none" }}
          value={formData.note}
          onChange={(e) => handleChange("note", e.target.value)}
          className="p-2 text-gray-800 bg-white border border-gray-300 rounded scrollbar-custom bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비고를 입력하세요..."
        ></textarea>
        <div
          className={`text-right text-sm mt-1 ${
            formData.note.length > 500 ? "text-red-500" : "text-white"
          }`}
        >
          {formData.note.length}/500
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        onClick={() => handleSubmit()}
        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        제출
      </button>
    </div>
  );
});

export default WeeklyReportForm;

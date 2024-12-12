import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  getWeeklyReport,
  deleteWeeklyReport,
  updateWeeklyReport,
} from "../http.js";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid"; // Import X icon for cancel
import { format } from "date-fns";

export default function WeeklyReportList({ handlefetchResult, fetchResult }) {
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null); // Track the report being edited
  const [editedData, setEditedData] = useState({}); // Track edited data
  useEffect(() => {
    // 비동기로 데이터 가져오기
    const fetchReports = async () => {
      try {
        const fetchedReports = await getWeeklyReport(); // 배열 반환
        setReports(fetchedReports); // 데이터 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, [fetchResult]);

  const handleDelete = async (id) => {
    try {
      const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
      if (!isConfirmed) return;

      await deleteWeeklyReport(id); // 서버에 삭제 요청
      // setReports((prevReports) =>
      //   prevReports.filter((report) => report.id !== id)
      // ); // 로컬 상태 업데이트
      handlefetchResult();
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  const handleEdit = (report) => {
    setEditingReport(report._id); // Set editing report
    setEditedData({
      startDate: report.startDate,
      endDate: report.endDate,
      content: report.content,
      note: report.note,
    });
  };

  const handleCancelEdit = () => {
    setEditingReport(null); // Reset editing state
    setEditedData({}); // Clear edited data
  };

  const handleSaveEdit = async () => {
    try {
      await updateWeeklyReport(editedData, editingReport);
      setEditingReport(null); // Reset editing state
      setEditedData({}); // Clear edited data
      handlefetchResult();
    } catch (error) {
      console.error("Error updating report:", error);
      alert("보고서를 수정하는 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (key, value) => {
    setEditedData((editedData) => ({
      ...editedData,
      [key]: value,
    }));
  };

  return (
    <div
      className={`flex-grow p-6 bg-white rounded-lg shadow-xl bg-opacity-20 ${
        reports.length > 0 ? "h-full" : ""
      }`}
    >
      <h2 className="mb-4 text-xl font-bold text-white">작성된 보고 리스트</h2>

      {/* 조건부 렌더링 */}
      {reports.length > 0 ? (
        <ul className="p-2 overflow-y-auto rounded-lg shadow-md sm:p-4 max-h-30rem bg-gray-50 scrollbar-custom">
          {reports.map((report, index) => (
            <li
              key={index}
              className="p-2 mb-3 bg-white rounded-lg shadow-md sm:p-4 bg-opacity-90"
            >
              {/* editing 조건부 렌더링 */}
              {editingReport === report._id ? (
                <div className="flex items-center justify-between">
                  <div className="relative w-full">
                    {/* 취소 button (X) */}
                    <button
                      className="absolute top-[-0.5rem] right-[-0.5rem] text-red-500 p-[0.3rem]  rounded hover:bg-gray-200"
                      onClick={handleCancelEdit}
                      aria-label="취소"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>

                    {/* Date Inputs */}
                    <div className="flex gap-4 mb-4">
                      <div className="flex flex-col flex-1 min-w-[100px]">
                        <label className="mb-2 text-sm font-medium text-gray-800">
                          시작 날짜
                        </label>
                        <DatePicker
                          type="date"
                          name="startDate"
                          selected={editedData.startDate}
                          onChange={(date) => handleChange("startDate", date)}
                          className="w-full h-12 p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholderText="시작 날짜"
                          portalId="root-portal" // 포탈을 사용하여 Viewport 안으로 렌더링
                          popperPlacement="bottom-end" // 달력 위치 조정
                          dateFormat="yyyy.MM.dd"
                        />
                      </div>
                      <div className="flex flex-col flex-1 min-w-[100px]">
                        <label className="mb-2 text-sm font-medium text-gray-800">
                          종료 날짜
                        </label>
                        <DatePicker
                          type="date"
                          name="endDate"
                          selected={editedData.endDate}
                          onChange={(date) => handleChange("endDate", date)}
                          className="w-full h-12 p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholderText="시작 날짜"
                          portalId="root-portal" // 포탈을 사용하여 Viewport 안으로 렌더링
                          popperPlacement="bottom-end" // 달력 위치 조정
                          dateFormat="yyyy.MM.dd"
                        />
                      </div>
                    </div>

                    {/* 내용 Textarea */}
                    <div className="flex flex-col mb-4">
                      <label className="mb-2 text-sm font-medium text-gray-800">
                        내용:
                      </label>
                      <textarea
                        rows="4"
                        style={{ resize: "none" }}
                        name="content"
                        defaultValue={editedData.content}
                        onChange={(e) =>
                          handleChange("content", e.target.value)
                        }
                        className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="내용을 입력하세요..."
                      ></textarea>
                    </div>

                    {/* 비고 Textarea */}
                    <div className="flex flex-col mb-4">
                      <label className="mb-2 text-sm font-medium text-gray-800">
                        비고:
                      </label>
                      <textarea
                        rows="2"
                        style={{ resize: "none" }}
                        name="note"
                        defaultValue={editedData.note}
                        onChange={(e) => handleChange("note", e.target.value)}
                        className="p-2 text-gray-800 bg-white border border-gray-300 rounded bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="비고를 입력하세요..."
                      ></textarea>
                    </div>

                    {/* 저장 Button */}
                    <div className="flex justify-center">
                      <button
                        className="w-1/3 p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => handleSaveEdit()}
                      >
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // edting 아닐 떄 렌더링
                <>
                  <div className="flex items-center justify-between">
                    {/* 날짜 부분 */}
                    <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                      {format(
                        new Date(report.formData.startDate),
                        "yyyy-MM-dd"
                      )}{" "}
                      ~{" "}
                      {format(new Date(report.formData.endDate), "yyyy-MM-dd")}
                    </h3>

                    {/* 버튼들 */}
                    <div className="flex ml-4">
                      <button
                        className="p-2 text-blue-500 rounded hover:bg-blue-200 sm:p-1 "
                        onClick={() => handleEdit(report)}
                        aria-label="수정"
                      >
                        <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        className="p-2 text-red-500 rounded hover:bg-red-200 sm:p-1 "
                        onClick={() => handleDelete(report._id)}
                        aria-label="삭제"
                      >
                        <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* 내용 및 비고 */}
                  <p
                    className="mt-2 text-sm text-gray-700 break-words sm:text-base"
                    style={{ maxWidth: "100%", wordBreak: "break-word" }}
                  >
                    <strong>내용:</strong> {report.content}
                  </p>
                  <p
                    className="mt-2 text-sm text-gray-700 break-words sm:text-base"
                    style={{ maxWidth: "100%", wordBreak: "break-word" }}
                  >
                    <strong>비고:</strong> {report.note}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">작성된 보고 리스트가 없습니다.</p>
      )}
    </div>
  );
}

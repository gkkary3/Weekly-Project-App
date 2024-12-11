/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      maxHeight: {
        "30rem": "30rem", // 사용자 정의 값 추가
      },
    },
  },
  plugins: [],
};

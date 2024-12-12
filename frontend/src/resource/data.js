// data.js
import { v4 as uuidv4 } from "uuid";

const teams = {
  [`team-${uuidv4()}`]: {
    name: "클라우드 애플리케이션 팀",
    users: {
      psangmin: { email: "psangmin@gmail.com", name: "박상민" },
      // lee12: { email: "lee12@gmail.com", name: "이수정" },
    },
  },
  // [`team-${uuidv4()}`]: {
  //   name: "팀 B",
  //   users: {
  //     park12: { email: "park12@gmail.com", name: "박철수" },
  //     choi2: { email: "choi2@gmail.com", name: "최은정" },
  //   },
  // },
  // [`team-${uuidv4()}`]: {
  //   name: "팀 C",
  //   users: {
  //     jang12: { email: "jang12@gmail.com", name: "장윤아" },
  //     seo12: { email: "seo12@gmail.com", name: "서태수" },
  //   },
  // },
  // [`team-${uuidv4()}`]: {
  //   name: "팀 D",
  //   users: {
  //     hwang12: { email: "hwang12@gmail.com", name: "황민수" },
  //   },
  // },
};

export default teams;

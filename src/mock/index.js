import Mock from "mockjs";

import getUserMenu from "./getUserMenu";

const mockList = [
  {
    exp: /\/getUserMenu/,
    mockModule: getUserMenu
  }
];

mockList.forEach(item => {
  Mock.mock(item.exp, item.mockModule);
});

export default Mock;

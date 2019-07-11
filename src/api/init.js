import API from "@libs/api";

export const getUserMenu = () => {
  return API({
    url: "/getUserMenu",
    method: "get"
  });
};

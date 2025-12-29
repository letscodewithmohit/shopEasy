import api from "../../api/axios"; // your axios instance

export const fetchUserProfile = () => {
  return api.get("/user/profile");
};

export const updateUserProfileApi = (data) => {
  return api.put("/user/profile", data);
};

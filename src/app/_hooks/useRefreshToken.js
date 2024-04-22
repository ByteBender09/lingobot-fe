import { axiosClientHost } from "../_api/axios";
import authRepository from "@/app/utils/auth";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      console.log(authRepository.getRefreshToken());
      const response = await axiosClientHost.post("/api/token/refresh/", {
        refresh: authRepository.getRefreshToken(),
      });

      authRepository.setAccessToken(response.data.data.access);
      console.log(response.data);
      return response.data.data.access;
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return refresh;
};

export default useRefreshToken;

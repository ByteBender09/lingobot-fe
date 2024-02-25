import { axiosPrivateHost } from "../api/axios";
import auth from "@/app/utils/auth";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axiosPrivateHost.get("/token/refresh/");

    auth.setAccessToken(response.data.access_token);
    return response.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;

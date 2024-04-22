import { useEffect } from "react";
import { axiosPrivate } from "../_api/axios";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/const";
import authRepository from "@/app/utils/auth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const router = useRouter();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.authorization) {
          config.headers.authorization = `Bearer ${authRepository.getAccessToken()}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("cc", error);
        const prevRequest = error.config;
        if (error.response?.status === 403 || error.response?.status === 401) {
          const newAccessToken = await refresh();
          console.log("newAccessToken", newAccessToken);
          if (newAccessToken === "") {
            // Refresh token expired
            authRepository.logout();
            router.push(PATH.LOGIN);
          }
          prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authRepository.getAccessToken(), refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;

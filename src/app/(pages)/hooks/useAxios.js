import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosClient } from "../api/axios";

const useAxios = (method, api, body, options, deps) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const axiosController = new AbortController();

  useEffect(() => {
    if (isLoading === false) {
      setLoading(true);

      axiosClient[method](api, body, {
        ...options,
        signal: axiosController.signal,
      })
        .then((response) => {
          setResponse(response);
        })
        .catch((error) => {
          setError(error);
        })
        .then(() => {
          setLoading(false);
        });
    }

    return () => {
      if (isLoading === true) {
        axiosController.abort();
        setLoading(false);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return [response, error, isLoading];
};

useAxios.propTypes = {
  method: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  body: PropTypes.object,
  options: PropTypes.object,
  deps: PropTypes.array.isRequired,
};

useAxios.defaultProps = {
  body: {},
  options: {},
};

export default useAxios;

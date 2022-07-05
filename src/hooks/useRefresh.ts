import { useContext } from "react";
import { RefreshContext } from "../context/RefreshContext";

const useRefresh = () => {
  const { value } = useContext(RefreshContext);
  return { refresh: value };
};

export default useRefresh;

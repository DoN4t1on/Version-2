import { useQuery } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useGetApiInfo = () => {
  return useQuery(
    "apiInfo",
    () => {
      return fetchWrapper(`apiInfo/checkApiLimit`);
    },
    {
      onError: (err) => {
        toast.error("Unable to fetch data", err);
      },
    }
  );
};

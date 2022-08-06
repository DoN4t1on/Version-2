import { useQuery } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useGetChildAccountInfo = () => {
  return useQuery(
    "childAccountInfo",
    () => {
      return fetchWrapper(`account/getChildAccountInfo`);
    },
    {
      onError: (err) => {
        toast.error("Unable to fetch child account info", err);
      },
    }
  );
};

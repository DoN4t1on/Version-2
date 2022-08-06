import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useGetAnotherApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return fetchWrapper(`apiInfo/addApiInfo`);
    },
    {
      onSuccess: () => toast.success("Successfully added another API Key"),
      onError: (err) => {
        toast.error("Unable added another API Key", err);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["apiInfo"]);
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );
};

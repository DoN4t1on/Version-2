import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useUpdateApiInfoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (apiKey) => {
      return fetchWrapper(
        "GET",
        `apiInfo/updateApiInfo`,
        undefined,
        undefined,
        { api_key: apiKey }
      );
    },
    {
      onSuccess: () => toast.success("Successfully updated API Info status"),
      onError: (err) => {
        toast.error("Unable to update API Key status", err);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["apiInfo"]);
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );
};

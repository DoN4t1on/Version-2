import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useCreatePlanInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (body) => {
      return fetchWrapper("POST", `apiPlans/createApiPlans`, body);
    },
    {
      onSuccess: () => toast.success("Successfully created API Plan"),
      onError: (err) => {
        toast.error("Unable to create Api Plan", err);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["childAccountInfo"]);
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );
};

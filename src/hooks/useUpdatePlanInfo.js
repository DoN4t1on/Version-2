import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useUpdatePlanInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `apiPlans/updateApiPlanInfo`, body);
    },
    {
      onSuccess: () => toast.success('API-Plan erfolgreich aktualisiert'),
      onError: (err) => {
        toast.error('API-Plan kann nicht aktualisiert werden ', err);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['childAccountInfo']);
        queryClient.invalidateQueries(['userInfo']);
      },
    }
  );
};

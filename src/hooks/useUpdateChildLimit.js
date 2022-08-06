import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useUpdateChildLimit = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body) => {
      return fetchWrapper('POST', `account/updateChildAccountUsageLimit`, body);
    },
      {
        onSuccess: () => toast.success('Kinderlimit erfolgreich aktualisiert'),
        onError: (err) => {
          toast.error('Unable to update Child Limit', err);
        },
        onSettled: () => {
          queryClient.invalidateQueries(['childAccountInfo']);
          queryClient.invalidateQueries(['apiInfo']);
          queryClient.invalidateQueries(['userInfo']);
        },
      };
  );
};

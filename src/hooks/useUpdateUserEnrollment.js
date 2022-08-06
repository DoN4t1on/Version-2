import { useMutation } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useUpdateUserEnrollment = () => {
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `enrollUserToPlan/enrollUser`, body);
    },
    {
      onSuccess: () =>
        toast.success('Registrieren Sie den Benutzer erfolgreich bei Plan '),
      onError: (err) => {
        toast.error('Benutzer kann nicht registriert werden', err);
      },
    }
  );
};

import { useMutation, useQueryClient } from 'react-query';
import { fetchWrapper } from '../services/restApi';
import { toast } from 'react-toastify';
import ErrorService from '../services/formatError/ErrorService';
import { storeLocalData } from '../services/auth/localStorageData';
export const useCreateEmailAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `userAuth/registerByEmail`, body);
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          toast.success('Bitte bestätigen Sie Ihre Registrierung in der Mail die wir Ihnen geschickt haben');
        }
      },
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};

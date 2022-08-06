import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "services/restApi";
import { toast } from "react-toastify";

export const useGetMockData = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      console.log('hello mock data');
      return fetchWrapper(`sampleData/getAllSampleData`);
    },
    {
      onSuccess: () => toast.success('Daten erfolgreich abrufen'),
      onError: (err) => {
        toast.error('Daten können nicht abgerufen werden', err);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['apiInfo']);
        queryClient.invalidateQueries(['userInfo']);
      },
    }
  );
};

import { useQuery } from 'react-query';
import { fetchWrapper } from '../services/restApi';
import { toast } from 'react-toastify';
import { updatelocalData } from '../services/auth/localStorageData';

export const useGetUserInfo = () => {
  return useQuery('userInfo', async () => {
    console.log('hello refresh data');
    const userInfo = await fetchWrapper(`account/getUserInfo`);
    updatelocalData(userInfo.accountInfo);

    return userInfo;
  });
};

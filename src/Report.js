import { NavbarBottom } from './NavbarBottom';
import { useMutation, useQuery } from 'react-query';
import { ImageEndPoint } from './config/config';
import { localStorageData, Logout } from './services/auth/localStorageData';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
export const Report = () => {
  let navigate = useNavigate();

  const location = useLocation();

  ////const { name, Id, link } = location.state;

  const { link } = location.state;

  console.log(location.state);

  // const { Id } = useParams();
  const sendReport = useMutation(
    (NewReport) =>
      userServices.commonPostService('/post/sendReport', NewReport),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        ///console.log(res.data.isNew);
        //// getComments.refetch();

        toast.success('Der Beitrag wurde gemeldet');
        navigate('/');
      },
    }
  );

  return (
    <div>
      <br />
      <br />
      <button
        onClick={() => {
          sendReport.mutate({
            ////postId: Id,
            /// name: name,
            link: link,
          });
        }}
        className='btn btn-success btn-lg button border-black'
      >
        Melden
      </button>

      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};;

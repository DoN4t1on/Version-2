import { NavbarBottom } from './NavbarBottom';

import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { baseUrl } from './config/config';
export const Share = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state.id);

  let urlToSend = state.url;

  return (
    <div>
       <div className='casual-header-div '>
            <button className='back-button-button' onClick={() => navigate(-1)}>
             
              <img
                className='back-button-icon'
                src={require('./img/arrow-left-short.svg')}
              />
            </button>
            <h4 className=' headline headline-with-back-button '> Teilen </h4>
          </div>
      <div className='casual-menu'>
        <div style={{ float: 'right' }}>
          <a
            onClick={() => {
              navigator.clipboard.writeText(baseUrl + urlToSend);
              toast.success('Link kopiert');
            }}
          >
            <button className='btn btn-success share-button-link border-black'>
              Link kopieren
            </button>
          </a>
          <br /> <br />
          <a
            href={`https://twitter.com/share?url=${baseUrl}` + urlToSend}
            target='_blank'
          >
            <button className='btn btn-success share-button-link border-black'>
              Twitter
            </button>
          </a>
          <br /> <br />
          <a
            href={`whatsapp://send?text=${baseUrl}` + urlToSend}
            data-action='share/whatsapp/share'
          >
            <button className='btn btn-success share-button-link border-black'>
              WhatsApp
            </button>
          </a>
          <br /> <br />
          <a href={`https://t.me/share/url?url=${baseUrl}` + urlToSend}>
            <button className='btn btn-success share-button-link border-black'>
              Telegram
            </button>
          </a>
          <br /> <br />
          <a
            href={`https://www.linkedin.com/shareArticle?url=${baseUrl}${urlToSend}&title=Lokalspende`}
          >
            <button className='btn btn-success share-button-link border-black'>
              LinkedIn
            </button>
          </a>
          <br /> <br />
          <a
            href={`https://reddit.com/submit?url=${baseUrl}${urlToSend}&title=Lokalspende`}
          >
            <button className='btn btn-success share-button-link border-black'>
              Reddit
            </button>
          </a>
          <br /> <br />
          <a
            href={
              `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}` +
              urlToSend
            }
            target='_blank'
          >
            <button className='btn btn-success share-button-link border-black'>
              Facebook
            </button>
          </a>
          <br /> <br />
          {/* <a href='' target='_blank'>
            <button className='btn btn-success share-button-link'>
              Generate
            </button>
          </a> */}
        </div>
      </div>

      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};

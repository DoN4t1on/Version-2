import { NavbarBottom } from './NavbarBottom';

import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export const Share = () => {
  const { state } = useLocation();
  console.log(state.id);

  let urlToSend = `/geteilte-petition/${state.id}`;

  return (
    <div>
      <div className='casual-header-div '>
        <Link to='/'>
          {' '}
          <img
            className='back-button'
            src={require('./img/arrow-left-short.svg')}
          />{' '}
        </Link>
        <h4 className=' headline headline-with-back-button '> Teilen </h4>
      </div>


      <div className='casual-menu'>
        <div style={{ float: 'right' }}>
          <a
            onClick={() => {
              navigator.clipboard.writeText(
                'https://app.lokalpetition.de' + urlToSend
              );
              toast.success('Link kopiert');
            }}
          >
            <button className='btn btn-success share-button-link'>
              Link kopieren
            </button>
          </a>
          <br /> <br />
          <a
            href={
              'https://twitter.com/share?url=https://app.lokalpetition.de' +
              urlToSend
            }
            target='_blank'
          >
            <button className='btn btn-success share-button-link'>
              Twitter
            </button>
          </a>
          <br /> <br />
          <a
            href={
              'whatsapp://send?text=https://app.lokalpetition.de' + urlToSend
            }
            data-action='share/whatsapp/share'
          >
            <button className='btn btn-success share-button-link'>
              WhatsApp
            </button>
          </a>
          <br /> <br />
          <a
            href={
              'https://t.me/share/url?url=https://app.lokalpetition.de' +
              urlToSend
            }
          >
            <button className='btn btn-success share-button-link'>
              Telegram
            </button>
          </a>
          <br /> <br />
          <a
            href={`https://www.linkedin.com/shareArticle?url=https://app.lokalpetition.de${urlToSend}&title=Lokalpetition`}
          >
            <button className='btn btn-success share-button-link'>
              LinkedIn
            </button>
          </a>
          <br /> <br />
          <a
            href={`https://reddit.com/submit?url=https://app.lokalpetition.de${urlToSend}&title=Lokalpetition`}
          >
            <button className='btn btn-success share-button-link'>
              Reddit
            </button>
          </a>

          <br /> <br />
          <a
            href={
              'https://www.facebook.com/sharer/sharer.php?u=app.lokalpetition.de' +
              urlToSend
            }
            target='_blank'
          >
            <button className='btn btn-success share-button-link'>
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

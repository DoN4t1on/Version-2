import { NavbarBottom } from './NavbarBottom';

import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

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
        <div className='sharing-right'>
          <a
            onClick={() => {
              navigator.clipboard.writeText(baseUrl + urlToSend);
              toast.success('Link kopiert');
            }}
          >
            <button className='btn btn-success share-icon-link round-borders'>
              Link kopieren <img src={require('./img/link-white.svg')} />

            </button>
          </a>
          <br />
          <a

            href={`https://twitter.com/share?url=${baseUrl}` + urlToSend}
            target='_blank'
          >
            <TwitterIcon size={75} round={true} className='share-icon' /> </a>
          <br />
          <a
            href={`whatsapp://send?text=${baseUrl}` + urlToSend}
            data-action='share/whatsapp/share'
          > <WhatsappIcon size={75} round={true} className='share-icon' /> </a>
          <br />

          <a
            href={`https://t.me/share/url?url=${baseUrl}` + urlToSend}
            data-action='share/whatsapp/share'
          > <TelegramIcon size={75} round={true} className='share-icon' /> </a>
          <br />

          <a
            href={`https://www.linkedin.com/shareArticle?url=${baseUrl}${urlToSend}&title=Lokalspende`}
            data-action='share/whatsapp/share'
          > <LinkedinIcon className='share-icon' size={75} round={true} /> </a>
          <br />

          <a
            href={`https://reddit.com/submit?url=${baseUrl}${urlToSend}&title=Lokalspende`}
            data-action='share/whatsapp/share'
          > <RedditIcon className='share-icon' size={75} round={true} /> </a>
          <br />

          <a
            href={
              `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}` +
              urlToSend
            }
          > <FacebookIcon className='share-icon' size={75} round={true} /> </a>
          {/* <a href='' target='_blank'>
            <button className='btn btn-success share-icon-link'>
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

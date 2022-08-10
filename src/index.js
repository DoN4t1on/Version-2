import ReactDOM from 'react-dom';

import './css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import CookieConsent from 'react-cookie-consent';
import { Petitions } from './Petitions';
import { PetitionsActiveNewest } from './PetitionsActiveNewest';
import { PetitionsActiveMostPopular } from './PetitionsActiveMostPopular';

import { PetitionsSingle } from './PetitionsSingle';

import { PetitionsAccepted } from './PetitionsAccepted';
import { PetitionsAcceptedNewest } from './PetitionsAcceptedNewest';
import { PetitionsAcceptedMostPopular } from './PetitionsAcceptedMostPopular';

import { PetitionsRejected } from './PetitionsRejected';
import { PetitionsRejectedNewest } from './PetitionsRejectedNewest';
import { PetitionsRejectedMostPopular } from './PetitionsRejectedMostPopular';

import { Crowdfunding } from './Crowdfunding';

import { SetLocation } from './SetLocation';

import { CrowdfundingActiveNewest } from './CrowdfundingActiveNewest';

import { CrowdfundingSuccessful } from './CrowdfundingSuccessful';
import { CrowdfundingSuccessfulNewest } from './CrowdfundingSuccessfulNewest';

import { Filter } from './Filter';

import { Map } from './Map';

import { Profile } from './Profile';

import { Report } from './Report';

import { Supporters } from './Supporters';

import { Upvoter } from './Upvoter';

import { UpvoterComments } from './UpvoterComments';
import { DownvoterComments } from './DownvoterComments';

import { Downvoter } from './Downvoter';

import { Donators } from './Donators';
import 'react-toastify/dist/ReactToastify.css';
import { Questions } from './Questions';

import { Comments } from './Comments';
import { CommentsMostPopular } from './CommentsMostPopular';

import { Share } from './Share';

import { Info } from './Info';
import { Agb } from './Agb';

import { Search } from './Search';

import { CreateAPetition } from './CreateAPetition';

import { Activity } from './aktivitat';

import { PetitionActivity } from './PetitionActivity';
import { PetitionActivitySupported } from './PetitionActivitySupported';
import { PetitionActivityCreated } from './PetitionActivityCreated';

import { CrowdfundingActivity } from './CrowdfundingActivity';
import { CrowdfundingActivitySupported } from './CrowdfundingActivitySupported';

import { YourProfile } from './YourProfile';

import { Imprint } from './Imprint';

import { Privacy } from './Privacy';

import { Settings } from './Settings';

import { VotingFilter } from './VotingFilter';

import { CreationFilter } from './CreationFilter';

import { Notificationsettings } from './Notificationsettings';
import { store } from './reactStore/MainStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Test from './Test';
import Agb from './Agb';

const queryClient = new QueryClient();
const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Petitions />} />
          <Route
            path='/antrage-aktiv-neuste'
            element={<PetitionsActiveNewest />}
          />
          <Route
            path='/antrage-aktiv-am-beliebtesten'
            element={<PetitionsActiveMostPopular />}
          />

          <Route path='/geteilter-antrag/:Id' element={<PetitionsSingle />} />

          <Route
            path='/antrage-akzeptiert'
            element={<PetitionsAccepted />}
          />
          <Route
            path='/antrage-akzeptiert-neuste'
            element={<PetitionsAcceptedNewest />}
          />
          <Route
            path='/antrage-akzeptiert-am-beliebtesten'
            element={<PetitionsAcceptedMostPopular />}
          />

          <Route path='/antrage-abgelehnt' element={<PetitionsRejected />} />
          <Route
            path='/antrage-abgelehnt-neuste'
            element={<PetitionsRejectedNewest />}
          />
          <Route
            path='/antrage-abgelehnt-am-beliebtesten'
            element={<PetitionsRejectedMostPopular />}
          />

          <Route path='/crowdfunding' element={<Crowdfunding />} />
          <Route
            path='/crowdfunding-aktiv-neuste'
            element={<CrowdfundingActiveNewest />}
          />

          <Route
            path='/crowdfunding-erfolgreich'
            element={<CrowdfundingSuccessful />}
          />
          <Route
            path='/crowdfunding-erfolgreich-neuste'
            element={<CrowdfundingSuccessfulNewest />}
          />

          <Route path='/filter' element={<Filter />} />

          <Route path='/karte' element={<SetLocation />} />

          <Route path='/profil/:Id' element={<Profile />} />

          <Route path='/melden' element={<Report />} />

          <Route path='/spendenzusagen/:Id' element={<Supporters />} />

          <Route path='/upvoter/:Id' element={<Upvoter />} />
          <Route path='/downvoter/:Id' element={<Downvoter />} />

          <Route path='/upvoter-comments/:Id' element={<UpvoterComments />} />
          <Route
            path='/downvoter-comments/:Id'
            element={<DownvoterComments />}
          />

          <Route path='/neuste-kommentare/:Id' element={<Comments />} />
          <Route
            path='/beliebteste-kommentare'
            element={<CommentsMostPopular />}
          />

          <Route path='/teilen' element={<Share />} />

          <Route path='/info' element={<Info />} />

          <Route path='/suche' element={<Search />} />

          <Route path='/antrag-erstellen' element={<CreateAPetition />} />

          <Route path='/aktivitat' element={<Activity />} />

          <Route path='/antrag-activity' element={<PetitionActivity />} />

          <Route
            path='/antrag-activity-unterstutzt'
            element={<PetitionActivitySupported />}
          />

          <Route
            path='/antrag-activity-erstellt'
            element={<PetitionActivityCreated />}
          />

          <Route
            path='/crowdfunding-aktivitat'
            element={<CrowdfundingActivity />}
          />

          <Route
            path='antrag-activitat-unterstutzt'
            element={<CrowdfundingActivitySupported />}
          />

          <Route path='/dein-profil' element={<YourProfile />} />

          <Route path='/impressum' element={<Imprint />} />

          <Route path='/datenschutz' element={<Privacy />} />

          <Route path='/spender' element={<Donators />} />

          <Route path='/fragen' element={<Questions />} />

          <Route path='/einstellungen' element={<Settings />} />

          <Route path='/abstimmfilter' element={<VotingFilter />} />

          <Route path='/erstellzeit-filter' element={<CreationFilter />} />

          <Route
            path='/benachrichtigungseinstellungen'
            element={<Notificationsettings />}
          />
          <Route path='/agb' element={<Agb />} />

          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent
        location='bottom'
        disableStyles={true}
        cookieName='myAwesomeCookieName3'
        expires={999}
        buttonClasses='btn btn-success btn-lg button btn-cookies'
        containerClasses='conatiner-cookies'
        buttonText='Ich verstehe'
        contentClasses='content-cookies'
        overlay
      >
        Diese Webseite benutzt Cookies.
      </CookieConsent>
      <ToastContainer limit={1} />
    </QueryClientProvider>
  </Provider>,
  app
);

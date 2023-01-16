import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

import './css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import CookieConsent from 'react-cookie-consent';
import { Suggestions } from './Suggestions';
import { SuggestionsActiveNewest } from './SuggestionsActiveNewest';
import { SuggestionsActiveMostPopular } from './SuggestionsActiveMostPopular';

import { SuggestionsSingle } from './SuggestionsSingle';




import { SuggestionsApprove } from './SuggestionsApprove';

import { SuggestionsAccepted } from './SuggestionsAccepted';
import { SuggestionsAcceptedNewest } from './SuggestionsAcceptedNewest';
import { SuggestionsAcceptedMostPopular } from './SuggestionsAcceptedMostPopular';

import { SuggestionsRejected } from './SuggestionsRejected';
import { SuggestionsRejectedNewest } from './SuggestionsRejectedNewest';
import { SuggestionsRejectedMostPopular } from './SuggestionsRejectedMostPopular';

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

import { CreateASuggestion } from './CreateASuggestion';

import { Activity } from './Activity';

import { SuggestionsActivity } from './SuggestionsActivity';
import { SuggestionsActivitySupported } from './SuggestionsActivitySupported';
import { SuggestionsActivityCreated } from './SuggestionsActivityCreated';

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
          <Route path='/' element={<Suggestions />} />
          <Route
            path='/antrage-aktiv-neuste'
            element={<SuggestionsActiveNewest />}
          />
          <Route
            path='/antrage-aktiv-am-beliebtesten'
            element={<SuggestionsActiveMostPopular />}
          />

          <Route path='/geteilter-antrag/:Id' element={<SuggestionsSingle />} />

          <Route path='/post-verify/:Id' element={<SuggestionsApprove />} />

          <Route path='/antrage-akzeptiert' element={<SuggestionsAccepted />} />
          <Route
            path='/antrage-akzeptiert-neuste'
            element={<SuggestionsAcceptedNewest />}
          />
          <Route
            path='/antrage-akzeptiert-am-beliebtesten'
            element={<SuggestionsAcceptedMostPopular />}
          />

          <Route path='/antrage-abgelehnt' element={<SuggestionsRejected />} />
          <Route
            path='/antrage-abgelehnt-neuste'
            element={<SuggestionsRejectedNewest />}
          />
          <Route
            path='/antrage-abgelehnt-am-beliebtesten'
            element={<SuggestionsRejectedMostPopular />}
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

          <Route path='/antrag-erstellen' element={<CreateASuggestion />} />

          <Route path='/aktivitat' element={<Activity />} />

          <Route path='/antrag-activity' element={<SuggestionsActivity />} />

          <Route
            path='/antrag-activity-unterstutzt'
            element={<SuggestionsActivitySupported />}
          />

          <Route
            path='/antrag-activity-erstellt'
            element={<SuggestionsActivityCreated />}
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
        Diese Webseite benutzt Cookies.{' '}
        <a
          href='https://app.lokalspende.org/datenschutz'
          style={{ color: '#28a745' }}
        >
          Hier
        </a>{' '}
        können Sie die Datenschutzerklärung einsehen.
      </CookieConsent>
      <ToastContainer limit={1} />
    </QueryClientProvider>
  </Provider>,
  app
);

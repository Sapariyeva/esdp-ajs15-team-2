import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import App from './containers/App.tsx';
import LineChart from './components/Chart/Chart.tsx';
import ExcelComponent from './components/ExcelConverter/ExcelConverter.tsx';
import TextToSpeech from './components/Speak/Speak.tsx';
import NotificationMessage from './components/NotificationMessage/NotificationMessage.tsx';
import Onboard from './components/Onboard/Onboard.tsx';
import Share from './components/Share/Share.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <LineChart />
      <TextToSpeech />
      <ExcelComponent />
      <NotificationMessage />
      <Onboard />
      <Share />
    </PersistGate>
  </Provider>
)
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import App from './containers/App.tsx';
import LineChart from './components/Chart/Chart.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <LineChart />
    </PersistGate>
  </Provider>
)
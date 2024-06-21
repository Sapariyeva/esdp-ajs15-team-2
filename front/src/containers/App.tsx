import IsTab from '@/components/UI/IsTab';
import { Routes } from '@/components/routes/routes';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const tabIdentifier = "uniqueTabIdentifier";
  const isTabActive = localStorage.getItem(tabIdentifier);

  useEffect(() => {

    if (isTabActive) {
      window.close();
    } else {
      localStorage.setItem(tabIdentifier, "active");

      window.addEventListener("beforeunload", () => {
        localStorage.removeItem(tabIdentifier);
      });
    }
  }, []);

  if (isTabActive) {
    return <IsTab />
  }

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App;
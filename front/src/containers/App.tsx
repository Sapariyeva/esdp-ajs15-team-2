import { BrowserRouter} from 'react-router-dom';
import { Suspense } from "react";
import { Routes } from '@/components/routes/routes';
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";

const App = () => {
  
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LanguageSwitcher />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
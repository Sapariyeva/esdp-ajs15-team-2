import { BrowserRouter} from 'react-router-dom';
import { Suspense } from "react";
import { AppRoutes } from '@/components/routes/AppRoutes';
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";

const App = () => {
  
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LanguageSwitcher />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
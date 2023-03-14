/** Libs */
import { Navigate, Route, Routes } from 'react-router-dom';

/** Components */
import { Sidebar } from 'components';
/** Pages */
import {Login, NotFound,Dashboard, Request, CreateRequest} from './pages'

/** Assets */
import './App.css';
import { useAuth } from 'hooks/auth';

export default function App() {
  // State  

  // hooks
  const { isLoggedIn } = useAuth();
  // Func
  
  // Handler        

  // useEffect  
  return (
    <div className="App">
      {isLoggedIn ?
        <>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Dashboard />} />

            {/* request path */}
            <Route path='/request' element={<Request />} />
            <Route path='/request/create' element={<CreateRequest />} />
            <Route path='/request/:id' element={<Request />} />

            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/not-found' replace />} />
          </Routes>
        </>
        :
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      }
    </div>
  );
}


/** Libs */
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

/** Components */
import { Sidebar } from 'components';
/** Pages */
import {Login, NotFound,Dashboard, Request, CreateRequest, Approval,DetailApproval, ListUser, CreateUser} from './pages'

/** Assets */
import './App.css';


export default function App() {
  const {isLogin} = useSelector((state) => state.auth);

  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const isAuthentication = Cookies.get("token");

  useEffect(() => {
    if (isAuthentication) {
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, [isAuthentication,isLogin])

  return (
    <div>
      {isLoggedIn ?
        <>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Dashboard />} />

            {/* request path */}
            <Route path='/request' element={<Request />} />
            <Route path='/request/create' element={<CreateRequest />} />
            <Route path='/request/:id' element={<Request />} />

            {/* approval path */}
            <Route path='/approval' element={<Approval />} />
            <Route path='/approval/:id' element={<DetailApproval />} />

            {/* Management User */}
            <Route path='/management-users' element={<ListUser />} />
            <Route path='/management-users/create' element={<CreateUser />} />


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


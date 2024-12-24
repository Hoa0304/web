import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SignUp from './pages/SignUp';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Dashboard />} />
      </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
import './App.css';
import * as React from 'react';
import SignIn from './components/login/login';
import { Route, Routes } from 'react-router';
import SignUp from './components/login/signUp';
import Navbar from './components/screens/appBar';
import "bootstrap/dist/css/bootstrap.css"
import CknContext, { authContext } from './context/context';
import Table from './components/screens/table';
function App() {
  let navShow = localStorage.getItem("navShow") == "true" ? true : false;
  const { navbarShow } = React.useContext(authContext);
  React.useEffect(() => {
    navShow = localStorage.getItem("navShow") == "true" ? true : false;
  }, [navbarShow]);

  return (

    <div className="">
      <div className={navShow == true ? "d-block" : "d-none"} >
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/appBar" element={<Navbar />} />
        <Route path="/table" element={<Table />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </div>

  );
}

export default App;

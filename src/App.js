import { Routes,Route } from 'react-router-dom';
import './App.css';
import ForgetPage from './components/Pages/ForgetPage';
import Login from './components/LoginPage/Login';
import SignUp from './components/SignUp/SignUp';
import Wellcome from './components/Pages/Wellcome';

function App() {
  return (
    <div>
    <Routes>
      <Route exact path='/' element={<SignUp/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/welcome' element={<Wellcome/>}/>
      <Route exact path='/forgetpage' element={<ForgetPage/>}/>
    </Routes>
     
     
    </div>
  );
}

export default App;

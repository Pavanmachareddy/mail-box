import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/Pages/LoginPage/Login';
import SignUp from './components/Pages/SignUp/SignUp';
import Wellcome from './components/Pages/Wellcome';

function App() {
  return (
    <div>
    <Routes>
      <Route exact path='/' element={<SignUp/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/welcome' element={<Wellcome/>}/>
    </Routes>
     
     
    </div>
  );
}

export default App;

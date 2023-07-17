import './App.css';
import Navbar from './components/navbar/Navbar';
import Register from "./components/register/Register"
import { Routes, Route } from 'react-router-dom'
import Login from './components/login/LoginForm'
import Form from './components/form/Form';
import ProtectedRoute from './components/ProtectedRoute';
import ShowTask from './components/showTask/ShowTask';
import UpdateData from './components/updateData/UpdateData';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/task' element={<Form />} />
          <Route path='/viewTask' element={<ShowTask />} />
          <Route path='/updateTask/:id' element={<UpdateData />} />
          <Route path='*' element={<h1>404 - page not found</h1>} />
        </Route>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </>
  );
}

export default App;

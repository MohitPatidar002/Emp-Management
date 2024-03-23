
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginFrom'
import SignupForm from './components/SignupForm'
import Home from './components/Home'
import Profile from './components/Profile'
import EmployeeDetails from './components/EmployeeDetails'
import CreateDepartment from './components/CreateDepartment'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<LoginForm />}/>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/signup' element={<SignupForm/>}/>

        <Route path = '/home' element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        } />
        <Route path = '/profile' element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        } />
        <Route path = '/employee-data' element={
          <PrivateRoute>
            <EmployeeDetails/>
          </PrivateRoute>
        } />
        <Route path = '/createDeparment' element={
          <PrivateRoute>
            <CreateDepartment/>
          </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default App

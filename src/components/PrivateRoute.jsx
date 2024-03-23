
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
console.log(token)
  
  if ( token !== null) {
    return children
  } 
  else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute






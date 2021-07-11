import React,{useEffect,createContext,useReducer,useContext} from "react"

import "./App.css"
import {BrowserRouter,Route,Switch,useHistory,useLocation} from "react-router-dom"
import Home from "./screens/Home"
import Navbar from "./components/Navbarcomp"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Createpost from "./screens/Createpost"

import {reducer,initialState} from "./reducers/userReducer" 


export const UserContext=createContext()
const Routings=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  const location = useLocation();

useEffect(()=>{
const user=JSON.parse(localStorage.getItem("user"))
if(user){
  dispatch({type:"USER",payload:user})
  history.push(location.pathname)
 
}else{
  history.push("/login")
}
},[history,dispatch])

  return (
    <Switch>
<Route path="/" exact><Home /></Route>

<Route path="/login"><Login /></Route>
<Route path="/create"><Createpost /></Route>
<Route path="/signup"><Signup /></Route>
</Switch>  )
}

function App() {
const [state,dispatch]=useReducer(reducer,initialState)
return (
  <UserContext.Provider value={{state,dispatch}}>
<BrowserRouter>
<Navbar />
<Routings />

</BrowserRouter>  
  
  </UserContext.Provider>
  
 
)


}
    


export default App;

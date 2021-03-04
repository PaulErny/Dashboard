import React, { useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css";
import Login from './components/login/login.js'
import NavBar from './components/navbar/navbar.js'
import Dashboards from './components/dashboards/dashboards.js'
import Home from './components/home/home.js'

export const IsLoggedContext = React.createContext()

export default function App() {

  // const [isLogged, setIsLogged] = useState(false);
  const initialState = false
  const [isLogged, dispatch] = useReducer( (state, action) => {
    return action
  }, initialState)

  return (
    <IsLoggedContext.Provider value={{isLoggedState: isLogged, isLoggedDispatch: dispatch}} >
      <Router>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          {/* <Route path='/login'
            exact
            render={(props) => (
              <Login {...props} isLogged={isLogged} />
            )}
          /> */}
          <Route path="/dashboards" exact component={Dashboards} />
        </div>
      </Router>
    </IsLoggedContext.Provider>
  );
}
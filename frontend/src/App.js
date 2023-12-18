import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import { authContext } from "./context/authContext";


function App() {
  const { user } = useContext(authContext);
  return (
   <Router>
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Register />}
      </Route>
      <Route exact path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/signUp">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route exact path="/profile/:username">
        <Profile />
      </Route>
      <Route exact path="/chat">
        {user ? <Chat /> : <Redirect to="/signUp" />}
      </Route>
    </Switch>
   </Router>
  );
};

export default App;

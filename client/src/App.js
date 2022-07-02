import './App.css';
import { Route } from "react-router";
import LandingPage from './components/LandinPage/LandingPage';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      {/* <h1>Henry Food</h1> */}
      <Route exact path = "/" component = {LandingPage}/>
      <Route path = "/home" component = {Home}/>
    </div>
  );
}

export default App;

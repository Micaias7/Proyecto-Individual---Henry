import './App.css';
import { Route } from "react-router";
import LandingPage from './components/LandinPage/LandingPage';

function App() {
  return (
    <div className="App">
      {/* <h1>Henry Food</h1> */}
      <Route exact path = "/" component = {LandingPage}/>
    </div>
  );
}

export default App;

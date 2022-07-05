import './App.css';
import { Route } from "react-router";
import LandingPage from './components/LandinPage/LandingPage';
import Home from './components/Home/Home';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';

function App() {
  return (
    <div className="App">
      {/* <h1>Henry Food</h1> */}
      <Route exact path = "/" component = {LandingPage}/>
      <Route path = "/home" component = {Home}/>
      <Route path = "/recipe/creation" component={CreateRecipe}/>
      <Route path = "/recipe/detail/:id" component={RecipeDetail}/>
    </div>
  );
}

export default App;

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import BootstrapNavbar from './BootstrapNavbar.js';
import Company from './Components/Company';
import Stock from './Components/Stock';

function App() {
  return (
    <div className="App">
      <BootstrapNavbar/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Company />
          </Route>
          <Route exact path="/stock">
            <Stock />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

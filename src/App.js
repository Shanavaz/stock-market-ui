import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import BootstrapNavbar from './BootstrapNavbar.js';
import Company from './Components/Company';

function App() {
  return (
    <div className="App">
      <BootstrapNavbar/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Company />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

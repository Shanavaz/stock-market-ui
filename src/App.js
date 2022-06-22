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
import StockList from './Components/StockList';
import CompanyList from './Components/CompanyList';

function App() {
  return (
    <div className="App">
      <BootstrapNavbar />
      <Router>
        <Switch>
          <Route exact path="/"><Company /></Route>
          <Route path="/company/create"><Company /></Route>
          <Route path="/stock/create"><Stock /></Route>
          <Route path="/company/list"><CompanyList /></Route>
          <Route path="/stock/list"><StockList /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

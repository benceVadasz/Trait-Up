import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Jobs from './Components/Jobs';

const App = props => {
  return (
    <Router>
        <Switch>
        <Route exact path='/jobs' render={(props) => <Jobs {...props}/>}></Route>
      </Switch>
    </Router>

  );
}

export default App;

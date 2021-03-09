import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Jobs from './Components/Jobs';
import {JobsProvider} from './Contexts/JobsContext';

const App = props => {
  return (
    <JobsProvider>
      <Router>
          <Switch>
          <Route exact path='/jobs' render={(props) => <Jobs {...props}/>}></Route>
        </Switch>
      </Router>
    </JobsProvider>

  );
}

export default App;

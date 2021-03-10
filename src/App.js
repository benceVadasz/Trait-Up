import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import JobList from './Components/JobList';
import JobDetail from './Components/JobDetail';
import {JobsProvider} from './Contexts/JobsContext';

const App = props => {
  return (
    <JobsProvider>
      <Router>
          <Switch>
          <Route exact path='/jobs' render={(props) => <JobList {...props}/>}></Route>
          <Route
                  exact
                  path='/jobs/:jobId'
                  render={(props) => <JobDetail {...props}/>}>
                </Route>
        </Switch>
      </Router>
    </JobsProvider>

  );
}

export default App;

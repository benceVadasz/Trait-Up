import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import JobList from './Components/JobList';
import {JobsProvider} from './Contexts/JobsContext';

const App = props => {
  return (
    <JobsProvider>
      <Router>
          <Switch>
          <Route exact path='/jobs' render={(props) => <JobList {...props}/>}></Route>
        </Switch>
      </Router>
    </JobsProvider>

  );
}

export default App;

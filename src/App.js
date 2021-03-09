import './App.css';
import {Button} from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={(props) => (
          <>
            <h1>Hello</h1>
              <Button href="/profile" variant="contained" color="primary" >Profile</Button>
          </>
        )} />

        <Route exact path="/profile" render={(props) => (
          <>
            <ProfilePage />
          </>
        )} />
      </div>
    </Router>
  );
}

export default App;

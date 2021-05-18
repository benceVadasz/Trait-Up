import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import {createBrowserHistory} from 'history';
import jobModel from "./models/jobModel";
import favouriteModel from "./models/favouriteModel";
import applicationModel from "./models/applicationModel";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <jobModel.Provider>
        <favouriteModel.Provider>
          <applicationModel.Provider>
            <App/>
          </applicationModel.Provider>
        </favouriteModel.Provider>
      </jobModel.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

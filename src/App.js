
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import JobList from './Components/JobList';
import JobDetail from './Components/JobDetail';
import {JobsProvider} from './Contexts/JobsContext';
import {JobProvider} from './Contexts/JobDetailContext';
import "./App.css";
import Navbar from "./components/Navbar";
import HomeBody from "./components/HomeBody";
import React from "react";
import Register from "./components/Register";

const App = props => {
  return (
    <JobsProvider>
      <JobProvider>
        <Router>
      
            <Navbar />
            <Route exact path="/" children={<HomeBody />} />
            <Route exact path="/register" children={<Register />} />
            <Route exact path='/jobs' render={(props) => <JobList {...props}/>}></Route>
            <Route
                    exact
                    path='/jobs/:jobId'
                    render={(props) => <JobDetail {...props}/>}>
            </Route>
         
        </Router>
      </JobProvider>
    </JobsProvider>

// =======
// import "./App.css";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomeBody from "./components/HomeBody";
// import React from "react";
// import Register from "./components/Register";

// function App() {

//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <Route exact path="/" children={<HomeBody />} />
//         <Route exact path="/register" children={<Register />} />
//       </Router>
//     </div>
// >>>>>>> master
  );
}

export default App;

import {action, createContextStore, thunk} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "../constants";


const applicationModel = createContextStore({
  applications: [],
  setApplications: action((state, applications) => {
    state.applications = applications;
  }),
  getApplications: thunk(async actions => {
    const result = await axios.get(`${BASE_URL}/Trait-Up-Backend/public/api/readUsersApplications`,
      {headers: {Authorization: "Bearer " + sessionStorage.getItem("token")}, params: {limit: 50}})
    let applicationRes = await result.data.application;
    actions.setApplications(applicationRes);
  })
});


export default applicationModel;
import {action, createContextStore, thunk} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "../constants";


const jobModel = createContextStore({
  token: sessionStorage.getItem("token"),
  jobs: [],
  uniqueLocations: [],
  loading: false,
  setLoading: action((state) => {
    state.loading = !state.loading;
  }),
  fetchJobs: thunk(async actions => {
    const result = await axios.get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`, {params: {limit: 50}})
    const jobs = await JSON.parse(result.data.jobs);
    actions.filterUniqueLocations(jobs)
    actions.setJobs(jobs)
  }),
  setJobs: action((state, jobs) => {
    state.jobs = jobs;
  }),
  filterUniqueLocations: action((state, jobs) => {
    jobs.forEach(job => {
      if (!state.uniqueLocations.includes(job.location)) {
        state.uniqueLocations.push(job.location);
      }
    })
  }),
  filter: thunk(async (actions, payload) => {
    const result = await axios.get(`${BASE_URL}/Trait-Up-Backend/public/api/filter`,
      {params: {value: payload}});
    actions.setJobs(JSON.parse(result.data.jobs))
  }),
})

export default jobModel;
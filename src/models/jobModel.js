import {action, createContextStore, thunk} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "../constants";


const jobModel = createContextStore({
  token: sessionStorage.getItem("token"),
  jobs: [],
  uniqueLocations: [],
  typeFilter: "",
  locationFilter: "",
  loading: false,
  toggleLoading: action((state) => {
    state.loading = !state.loading;
  }),
  fetchJobs: thunk(async (actions, page=1) => {
    actions.toggleLoading()
    const result = await axios.get(`${BASE_URL}/Trait-Up-Backend/public/api/jobs`, {params: {limit: 50, page}})
    actions.toggleLoading()
    const jobs = result.data;
    actions.filterUniqueLocations(jobs)
    actions.setJobs(jobs)
  }),
  setJobs: action((state, jobs) => {
    state.jobs = jobs;
  }),
  setTypeFilter: action((state, query) => {
    state.typeFilter = query;
  }),
  setLocationFilter: action((state, query) => {
    state.locationFilter = query;
  }),
  filterUniqueLocations: action((state, jobs) => {
    const uniqueLocations = []
    jobs.forEach(job => {
      if (!uniqueLocations.includes(job.location)) {
        uniqueLocations.push(job.location);
      }
    })
    state.uniqueLocations = uniqueLocations;
  }),
  filter: thunk(async (actions, payload) => {
    actions.toggleLoading()
    const result = await axios.get(`${BASE_URL}/Trait-Up-Backend/public/api/filter`,
      {params: {value: payload}});
    actions.toggleLoading()
    actions.setJobs(result.data)
  }),
})

export default jobModel;
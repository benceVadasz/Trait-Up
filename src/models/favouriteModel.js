import {action, createContextStore, thunk} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "../constants";


const favouriteModel = createContextStore({
  favourites: [],
  addToFavourites: action((state, job) => {
    state.favourites = [...state.favourites, job];
    saveAsFavourite(job);
  }),
  setFavourites: action((state, favourites) => {
    state.favourites = favourites;
  }),
  removeFromFavourites: action((state, id) => {
    state.favourites = state.favourites.filter(job => job.job_id !== id)
    removeFromSavedJobs(id);
  }),
  saveAsFavourite: thunk((state, job) => {
    saveAsFavourite(job);
  }),
  getFavourites: thunk(async actions => {
    const result = await axios.get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
      {headers: {Authorization: "Bearer " + sessionStorage.getItem("token")}, params: {limit: 50}})
    const favourites = result.data.jobs;
    actions.setFavourites(favourites)
  })
});

const saveAsFavourite = (job) => {

  if (!favouriteModel.token) {
    return Promise.resolve(false)
  } else {
    const {
      id, type, created_at, company, location, title, company_logo
    } = job;
    axios({
      method: "post",
      url:
        `${BASE_URL}/Trait-Up-Backend/public/api/addToFavourites`,
      headers: {Authorization: "Bearer " + sessionStorage.getItem('token')},
      params: {
        id, type, created_at, company, location, title, company_logo,
      }
    }).then(() => {
      return Promise.resolve();
    })
      .catch(() => {
        return Promise.reject();
      });
  }
}
const removeFromSavedJobs = (id) => {
  axios({
    method: "post",
    url:
      `${BASE_URL}/Trait-Up-Backend/public/api/removeFromFavourites`,
    headers: {Authorization: "Bearer " + sessionStorage.getItem('token')},
    params: {
      id
    }
  }).then(() => {
    return Promise.resolve();
  })
    .catch(() => {
      return Promise.reject();
    });
}

export default favouriteModel;
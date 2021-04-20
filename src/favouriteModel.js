import {action} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "./constants";


const favouriteModel = {
  token: sessionStorage.getItem("token"),
  favourites: [],
  addToFavourites: action((state, job) => {
    saveAsFavourite(job);
    state.favourites = [...state.favourites, job];
  }),
  setFavourites: action((state, favourites) => {
    state.favourites = favourites;
    console.log(state.favourites)
  }),
  removeFromFavourites: action((state, id) => {
    state.favourites = state.favourites.filter(savedJob => savedJob.id !== id);
    removeFromSavedJobs(id);
})
};

const saveAsFavourite = (job) => {

  if (!favouriteModel.token) alert("Please log in to like jobs")
  else {
    const {
      job_id, type, created_at, company, location, title, company_logo
    } = job;
      axios({
        method: "post",
        url:
          `${BASE_URL}/Trait-Up-Backend/public/api/addToFavourites`,
        headers: {Authorization: "Bearer " + favouriteModel.token},
        params: {
          job_id, type, created_at, company, location, title, company_logo,
        }
      }).then((res) => {
        alert('job added to favourites')
      })
        .catch(function (error) {
          alert('You have to log in to add jobs to your favourites');
        });
  }
}
const removeFromSavedJobs = (id) => {
  axios({
    method: "post",
    url:
      `${BASE_URL}/Trait-Up-Backend/public/api/removeFromFavourites`,
    headers: {Authorization: "Bearer " + favouriteModel.token},
    params: {
      id
    }
  }).then((res) => {
  })
    .catch(function (error) {
      alert('You have to log in to add jobs to your favourites');
    });
}

export default favouriteModel;
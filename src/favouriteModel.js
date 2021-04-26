import {action} from "easy-peasy";
import axios from "axios";
import {BASE_URL} from "./constants";


const favouriteModel = {
  token: sessionStorage.getItem("token"),
  favourites: [],
  addToFavourites: action((state, job) => {
    state.favourites = [...state.favourites, job];
    saveAsFavourite(job);
  }),
  setFavourites: action((state, favourites) => {
    state.favourites = favourites;
  }),
  removeFromFavourites: action((state, id) => {
    removeFromSavedJobs(id);
}),
  isLiked: action((state, id) => {
    return state.favourites.filter(savedJob => savedJob.id === id).length > 0;
  })
};

const saveAsFavourite = (job) => {

  if (!favouriteModel.token){
    alert("Please log in to like jobs");
    return false;
  }
  else {
    const {
      id, type, created_at, company, location, title, company_logo
    } = job;
      axios({
        method: "post",
        url:
          `${BASE_URL}/Trait-Up-Backend/public/api/addToFavourites`,
        headers: {Authorization: "Bearer " + favouriteModel.token},
        params: {
          job_id: id, type, created_at, company, location, title, company_logo,
        }
      }).then((res) => {
        return true;
      })
        .catch(function (error) {
          alert('You have to log in to add jobs to your favourites');
          return false;
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
    return true;
  })
    .catch(function (error) {
      alert('You have to log in to add jobs to your favourites');
      return false;
    });
}

export default favouriteModel;
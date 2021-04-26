import React, {useEffect} from 'react'
import Welcome from './Welcome'
import Features from './Features'
import Join from './Join'
import axios from "axios";
import {BASE_URL} from "../constants";
import {useStoreActions} from "easy-peasy";

function HomeBody() {

  const token = sessionStorage.getItem("token");
  const setFaves = useStoreActions((actions) => actions.setFavourites);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Trait-Up-Backend/public/api/getFavouritesOfUser`,
        {headers: {Authorization: "Bearer " + token}})
      .then((response) => {
        setFaves(response.data.jobs);
      });
  }, []);
    return (
        <div>
            <Welcome/>
            <Features/>
            <Join/>
        </div>
    )
}

export default HomeBody;

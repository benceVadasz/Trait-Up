import React, {useEffect} from 'react'
import Welcome from './Welcome'
import Features from './Features'
import Join from './Join'
import favouriteModel from "../models/favouriteModel";

function HomeBody() {

  const getFavouritesOfUser = favouriteModel.useStoreActions(actions => actions.getFavourites);

  useEffect(() => {
    if (sessionStorage.getItem('token')) getFavouritesOfUser()

    // eslint-disable-next-line
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

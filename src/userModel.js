import {action} from "easy-peasy";
  
const userModel = {
  user: {},
  addUser: action((state, user) => {
    state.user = user;
  })
};


export default userModel;

const initialState = {
    users: null
  };
  
  const SET_USERS = "SET_USERS";
  
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_USERS:
      console.log(action.payload)
        return { ...state, users: action.payload };
      default:
        return state;
    }
    
  }
  
  export function setUsers(users) {
    return {
      type: SET_USERS,
      payload: users
    };
  }
  
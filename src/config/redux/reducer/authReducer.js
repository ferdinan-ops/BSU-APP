const initialState = { currentUser: null, isLoading: false }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: action.payload };
    case "AUTH":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null };
    default:
      return { ...state };
  }
}

export default authReducer;
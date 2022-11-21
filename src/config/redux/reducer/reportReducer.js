const initialState = {
  message: "",
  isLoading: false,
}

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE_REPORT":
      return { ...state, message: action.payload };
    case "LOADING_REPORT":
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
}

export default reportReducer;
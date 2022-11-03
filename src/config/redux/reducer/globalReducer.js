const initialState = { isLoadingAll: false };

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_ALL":
      return { ...state, isLoadingAll: action.payload };
    default:
      return { ...state };
  }
}

export default globalReducer;
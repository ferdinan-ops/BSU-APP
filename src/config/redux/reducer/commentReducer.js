const initialState = { comments: [], formComment: "", isLoading: false };

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_COMMENTS":
      return { ...state, comments: action.payload };
    case "FORM_COMMENT":
      return { ...state, formComment: action.payload };
    case "SET_BUTTON_COMMENT":
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
}

export default commentReducer;



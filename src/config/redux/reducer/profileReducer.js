const initialState = { profile: {}, myQuestions: [], savedQuestions: [] };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_MY_QUESTIONS":
      return { ...state, myQuestions: action.payload };
    case "SET_SAVED_QUESTIONS":
      return { ...state, savedQuestions: action.payload };
    default:
      return { ...state };
  }
}

export default profileReducer;
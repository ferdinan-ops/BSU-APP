const initialState = {
  profile: {},
  myQuestions: {
    data: [],
    counts: "",
    isLoading: false,
  },
  savedQuestions: {
    data: [],
    counts: "",
    isLoading: false,
  },
  isLoading: false,
  formProfile: {
    username: "",
    photo: "",
    file: ""
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_MY_QUESTIONS":
      return { ...state, myQuestions: { ...state.myQuestions, [action.type]: action.value } };
    case "SET_SAVED_QUESTIONS":
      return { ...state, savedQuestions: { ...state.savedQuestions, [action.type]: action.value } };
    case "SET_PROFILE_FORM":
      return { ...state, formProfile: { ...state.formProfile, [action.formType]: action.formValue } };
    case "SET_PROFILE_BUTTON":
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
}

export default profileReducer;
const initialState = {
  profile: {},
  myQuestions: [],
  savedQuestions: [],
  isLoading: false,
  formProfile: {
    username: "",
    photo: ""
  },
  imgFile: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_MY_QUESTIONS":
      return { ...state, myQuestions: action.payload };
    case "SET_SAVED_QUESTIONS":
      return { ...state, savedQuestions: action.payload };
    case "SET_PROFILE_FORM":
      return { ...state, formProfile: { ...state.formProfile, [action.formType]: action.formValue } };
    case "SET_PROFILE_BUTTON":
      return { ...state, isLoading: action.payload };
    case "SET_PROFILE_FILE":
      return { ...state, imgFile: action.payload };
    default:
      return { ...state };
  }
}

export default profileReducer;
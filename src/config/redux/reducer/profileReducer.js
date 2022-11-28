const initialState = {
  profile: {},
  profileQuestions: {
    data: [],
    counts: 0,
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
    case "SET_PROFILE_QUESTIONS":
      return { ...state, profileQuestions: { ...state.profileQuestions, [action.questType]: action.questValue } };
    case "SET_PROFILE_FORM":
      return { ...state, formProfile: { ...state.formProfile, [action.formType]: action.formValue } };
    case "SET_PROFILE_BUTTON":
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
}

export default profileReducer;
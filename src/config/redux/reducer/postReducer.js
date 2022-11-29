import { allCategories, allFakultas, allSemester } from "../../../utils/listData";

const initialState = {
  questions: {
    data: [],
    counts: "",
    isLoading: false,
  },
  question: {},
  filtered: [],
  form: {
    mataKuliah: "",
    fakultas: allFakultas[4],
    programStudi: "",
    tahunAjaran: "",
    semester: allSemester[0],
    kategori: allCategories[2],
    dosen: "",
    images: [],
    imgUpdated: [],
    userId: "",
  },
  allMataKuliah: [],
  isLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUESTION_FORM":
      return { ...state, form: { ...state.form, [action.formType]: action.formValue } };
    case "SET_BTN_LOADING_POST":
      return { ...state, isLoading: action.payload };
    case "SET_QUESTION":
      return { ...state, questions: { ...state.questions, [action.questionsType]: action.questionsValue } };
    case "SET_FILTERED_QUESTION":
      return { ...state, filtered: action.payload };
    case "SET_DETAIL_QUESTION":
      return { ...state, question: action.payload };
    case "SET_MATAKULIAH":
      return { ...state, allMataKuliah: action.payload };
    default:
      return { ...state };
  }
};

export default postReducer;

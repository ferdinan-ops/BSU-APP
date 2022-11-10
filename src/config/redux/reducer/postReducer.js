import { allCategories, allFakultas, allSemester } from "../../../utils/listData";

const initialState = {
  questions: [],
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
    userId: "",
  },
  imgFile: [],
  imgPreview: [],
  isLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUESTION_FORM":
      return { ...state, form: { ...state.form, [action.formType]: action.formValue } };
    case "SET_BTN_LOADING_POST":
      return { ...state, isLoading: action.payload };
    case "SET_IMG_PREVIEW":
      return { ...state, imgPreview: action.payload };
    case "SET_IMG_FILE":
      return { ...state, imgFile: action.payload };
    case "SET_ALL_QUESTION":
      return { ...state, questions: action.payload };
    case "SET_FILTERED_QUESTION":
      return { ...state, filtered: action.payload };
    case "SET_DETAIL_QUESTION":
      return { ...state, question: action.payload };
    default:
      return { ...state };
  }
};

export default postReducer;

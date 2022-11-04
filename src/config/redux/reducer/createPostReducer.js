import { allCategories, allFakultas, allSemester } from "../../../utils/listData";

const initialState = {
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

const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return {
        ...state,
        form: { ...state.form, [action.formType]: action.formValue },
      };
    case "SET_BTN_LOADING_POST":
      return { ...state, isLoading: action.payload };
    case "SET_IMG_PREVIEW":
      return { ...state, imgPreview: action.payload };
    case "SET_IMG_FILE":
      return { ...state, imgFile: action.payload };
    default:
      return { ...state };
  }
};

export default createPostReducer;

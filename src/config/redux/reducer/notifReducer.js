const initialState = {
  notif: {
    data: [],
    isLoading: false,
    counts: 0
  }
};

const notifReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, notif: { ...state.notif, [action.notifType]: action.notifValue } };
    default:
      return { ...state };
  }
}

export default notifReducer;
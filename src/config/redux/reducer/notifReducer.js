const initialState = { notif: [] };

const notifReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATION":
      return { ...state, notif: action.payload };
    default:
      return { ...state };
  }
}

export default notifReducer;
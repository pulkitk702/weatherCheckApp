// import { Set_User_Number } from "./action";
const initialNameState = {
  whishList: [],
};

function userReducer(state = initialNameState, action) {
  switch (action.type) {
    case "SET_WHISHLIST":
      return {
        ...state,
        whishList: [...state.whishList, { ...action.payload }],
      };
    case "SET_REMOVE":
      return {
        ...state,
        whishList: action.payload,
      };

    default:
      return { ...state };
  }
}
export default userReducer;

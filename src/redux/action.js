// export const Set_User_Number = "9719066997";
export const setWhishList = (whishList) => async (dispatch) => {
  console.log("Action hitt", whishList);
  dispatch({ type: "SET_WHISHLIST", payload: whishList });
};
export const setRemove = (tempData) => async (dispatch, getState) => {
  console.log("Action hitt", whishList);
  const whishList = getState().userReducer.whishList;
  dispatch({
    type: "SET_REMOVE",
    payload: whishList.filter((item) => tempData.name !== item.name),
  });
};

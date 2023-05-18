import { publicRequest, userRequest } from "../makeRequest";
import { addItem, removeItem } from "./cartReducer";
import { loginFailure, loginStart, loginSuccess } from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const addCart = async (dispatch, items) => {
  console.log(items);
  try {
    const res = await publicRequest.post("/cart", items)
    console.log(res)
    dispatch(addItem(res.data.items[0]))
    console.log('done and dusted')
  } catch (err) {
    console.log(err, 'na here ooo') 
  }
}

export const removeItemFromCart = async (dispatch, item) => {
  // console.log(item)

  try {
    const res = await userRequest.delete("/cart", item)
    console.log(res.data)
    dispatch(removeItem(res.data.itemId))
    console.log('done and dusted')
  } catch (err) {
    console.log(err, 'na here ooo')
  }
}
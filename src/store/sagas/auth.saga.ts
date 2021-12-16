import { takeEvery, put } from "redux-saga/effects";
import {
  SIGNIN,
  SignInAction,
  signInFailure,
  signInSuccess,
  SIGNUP,
  SignUpAction,
  signUpFailure,
  signUpSuccess,
} from "../actions/auth.action";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";

function* handleSignUp(action: SignUpAction) {
  try {
    yield axios.post(`${API}/signup`, action.payload);
    yield put(signUpSuccess());
  } catch (error: any) {
    yield put(signUpFailure(error.response.data.error));
  }
}

function* handleSignIn(action: SignInAction) {
  try {
    let response: AxiosResponse = yield axios.post(
      `${API}/signin`,
      action.payload
    );
    localStorage.setItem("jwt", JSON.stringify(response.data));
    yield put(signInSuccess(response.data));
  } catch (error: any) {
    yield put(signInFailure(error.response.data.error));
  }
}

export default function* authSaga() {
  // 注册
  yield takeEvery(SIGNUP, handleSignUp);
  // 登录
  yield takeEvery(SIGNIN, handleSignIn);
}

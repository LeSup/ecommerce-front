import axios, { AxiosResponse } from "axios";
import { takeEvery, put } from "redux-saga/effects";
import { API } from "../../config";
import { getCategorySuccess, GET_CATEGORY } from "../actions/category.action";
import { Category } from "../models/category";

function* handleGetCategory() {
  const response: AxiosResponse<Category[]> = yield axios.get(
    `${API}/categories`
  );
  yield put(getCategorySuccess(response.data));
}

export default function* categorySaga() {
  yield takeEvery(GET_CATEGORY, handleGetCategory);
}

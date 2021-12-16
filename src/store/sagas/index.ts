import { all } from "redux-saga/effects";
import authSaga from "./auth.saga";
import categorySaga from "./category.saga";
import productSaga from "./product.saga";

export default function* rootSage() {
  yield all([authSaga(), categorySaga(), productSaga()]);
}

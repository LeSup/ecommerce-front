import { Jwt } from "../models/auth";

/**
 * 注册
 */
export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const RESET_SIGNUP = "RESET_SIGNUP";

export interface SignUpPayload {
  name: string;
  password: string;
  email: string;
}

export interface SignUpAction {
  type: typeof SIGNUP;
  payload: SignUpPayload;
}

export interface SignUpSuccessAction {
  type: typeof SIGNUP_SUCCESS;
}

export interface SignUpFailureAction {
  type: typeof SIGNUP_FAILURE;
  message: string;
}

export interface ResetSignUpAction {
  type: typeof RESET_SIGNUP;
}

export const signUp = (payload: SignUpPayload): SignUpAction => ({
  type: SIGNUP,
  payload,
});

export const signUpSuccess = (): SignUpSuccessAction => ({
  type: SIGNUP_SUCCESS,
});

export const signUpFailure = (message: string): SignUpFailureAction => ({
  type: SIGNUP_FAILURE,
  message,
});

export const resetSignUp = (): ResetSignUpAction => ({
  type: RESET_SIGNUP,
});

/**
 * 登录
 */

export const SIGNIN = "SIGNIN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInAction {
  type: typeof SIGNIN;
  payload: SignInPayload;
}

export interface SignInSuccessAction {
  type: typeof SIGNIN_SUCCESS;
  payload: Jwt;
}

export interface SignInFailureAction {
  type: typeof SIGNIN_FAILURE;
  message: string;
}

export const signIn = (payload: SignInPayload): SignInAction => ({
  type: SIGNIN,
  payload,
});

export const signInSuccess = (payload: Jwt): SignInSuccessAction => ({
  type: SIGNIN_SUCCESS,
  payload,
});

export const signInFailure = (message: string): SignInFailureAction => ({
  type: SIGNIN_FAILURE,
  message,
});

export type AuthUnionType =
  | SignUpAction
  | SignUpSuccessAction
  | SignUpFailureAction
  | ResetSignUpAction
  | SignInAction
  | SignInSuccessAction
  | SignInFailureAction;

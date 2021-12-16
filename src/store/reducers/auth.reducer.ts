import {
  AuthUnionType,
  RESET_SIGNUP,
  SIGNIN,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "../actions/auth.action";
import { Jwt } from "../models/auth";

export interface AuthState {
  jwt: boolean | Jwt;
  signUp: {
    loaded: boolean;
    success: boolean;
    message: string;
  };
  signIn: {
    loaded: boolean;
    success: boolean;
    message: string;
  };
}

const initialState: AuthState = {
  jwt: false,
  signUp: {
    loaded: false,
    success: false,
    message: "",
  },
  signIn: {
    loaded: false,
    success: false,
    message: "",
  },
};

const jwt = localStorage.getItem("jwt");
if (jwt) {
  initialState.jwt = JSON.parse(jwt);
}

export default function authReducer(
  state = initialState,
  action: AuthUnionType
): AuthState {
  switch (action.type) {
    case SIGNUP:
    case RESET_SIGNUP: {
      return {
        ...state,
        signUp: {
          loaded: false,
          success: false,
          message: "",
        },
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        signUp: {
          loaded: true,
          success: true,
          message: "",
        },
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        signUp: {
          loaded: true,
          success: false,
          message: action.message,
        },
      };
    }
    case SIGNIN: {
      return {
        ...state,
        jwt: false,
        signIn: {
          loaded: false,
          success: false,
          message: "",
        },
      };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        jwt: action.payload,
        signIn: {
          loaded: true,
          success: true,
          message: "",
        },
      };
    }
    case SIGNIN_FAILURE: {
      return {
        ...state,
        jwt: false,
        signIn: {
          loaded: true,
          success: false,
          message: action.message,
        },
      };
    }
    default:
      return state;
  }
}

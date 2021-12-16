import {
  FILTER_PRODUCT,
  FILTER_PRODUCT_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_SUCCESS,
  ProductUnionType,
  SEARCH_PRODUCT_SUCCESS,
} from "../actions/product.action";
import { Product } from "../models/product";

export interface ProductState {
  createdAt: {
    loaded: boolean;
    success: boolean;
    products: Product[];
  };
  sold: {
    loaded: boolean;
    success: boolean;
    products: Product[];
  };
  search: Product[];
  filter: {
    loaded: boolean;
    success: boolean;
    result: {
      size: number;
      data: Product[];
    };
  };
  product: {
    loaded: boolean;
    success: boolean;
    result: Product;
  };
}

const initialState: ProductState = {
  createdAt: {
    loaded: false,
    success: false,
    products: [],
  },
  sold: {
    loaded: false,
    success: false,
    products: [],
  },
  search: [],
  filter: {
    loaded: false,
    success: false,
    result: {
      size: 0,
      data: [],
    },
  },
  product: {
    loaded: false,
    success: false,
    result: {
      _id: "",
      name: "",
      price: 0,
      description: "",
      category: {
        name: "",
        _id: "",
      },
      quantity: 0,
      sold: 0,
      photo: new FormData(),
      shipping: false,
      createdAt: "",
    },
  },
};

export default function productReducer(
  state = initialState,
  action: ProductUnionType
): ProductState {
  switch (action.type) {
    case GET_PRODUCT: {
      return {
        ...state,
        [action.sortBy]: {
          ...state[action.sortBy],
          loaded: false,
          success: false,
        },
      };
    }
    case GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        [action.sortBy]: {
          loaded: true,
          success: true,
          products: action.payload,
        },
      };
    }
    case SEARCH_PRODUCT_SUCCESS: {
      return {
        ...state,
        search: action.products,
      };
    }
    case FILTER_PRODUCT: {
      return {
        ...state,
        filter: {
          loaded: false,
          success: false,
          result: {
            size: 0,
            data: state.filter.result.data,
          },
        },
      };
    }
    case FILTER_PRODUCT_SUCCESS: {
      const data =
        action.skip === 0
          ? action.payload.data
          : state.filter.result.data.concat(action.payload.data);
      return {
        ...state,
        filter: {
          loaded: true,
          success: true,
          result: {
            size: action.payload.size,
            data,
          },
        },
      };
    }
    case GET_PRODUCT_BY_ID: {
      return {
        ...state,
        product: {
          ...state.product,
          loaded: false,
          success: false,
        },
      };
    }
    case GET_PRODUCT_BY_ID_SUCCESS: {
      return {
        ...state,
        product: {
          loaded: true,
          success: true,
          result: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
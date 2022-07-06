type AuthState = {
  token: string | null;
  loading: boolean;
  error: Error | null;
};

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

type PENDINGAction = {
  type: 'userAuth/PENDING';
};
type SUCCESSAction = {
  type: 'userAuth/SUCCESS';
  payload: string; // token
};

type FAILAction = {
  type: 'userAuth/FAIL';
  payload: any;
};

export type AuthAction = SUCCESSAction | FAILAction | PENDINGAction;

export const userAuth = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'userAuth/PENDING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'userAuth/SUCCESS':
      return {
        token: action.payload,
        loading: true,
        error: null,
      };
    case 'userAuth/FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export interface ScoreCounterProps {}

type LoginCheckData = {
  userId: string | undefined;
  email: string;
  role: string;
  userName: string;
  oauth: string;
  passwordReset: boolean;
  profileImage: string;
  plan: string;
};

type LoginState = {
  state: boolean;
  loginData?: LoginCheckData;
};

const initialState: LoginState = {
  state: false,
  loginData: {
    userId: "",
    email: "",
    role: "",
    userName: "",
    oauth: "",
    passwordReset: false,
    profileImage: "",
    plan: "",
  },
};

const ActionTypes = {
  LOGIN: "USER/LOGIN",
  LOGOUT: "USER/LOGOUT",
};

type ActionType = keyof typeof ActionTypes;

export function loginCheckReducer(
  state = initialState,
  action: { type: ActionType; payload?: LoginCheckData }
) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { state: true, loginData: action.payload };
    case ActionTypes.LOGOUT:
      return { state: false };

    default:
      return { ...state };
  }
}

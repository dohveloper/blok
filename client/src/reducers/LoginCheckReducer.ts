type LoginCheckData = {
  userId: string;
  email: string;
  role: string;
  userName: string;
  oauth: string;
  passwordReset: boolean;
  profileImage: string;
  plan: string;
};

type LoginState = {
  loginState: boolean;
  loginData: LoginCheckData;
};

const initialState: LoginState = {
  loginState: false,
  loginData: {
    userId: '',
    email: '',
    role: '',
    userName: '',
    oauth: '',
    passwordReset: false,
    profileImage: '',
    plan: '',
  },
};

type LOGINACTION = {
  type: 'USER/LOGIN';
  payload: LoginCheckData;
};

type LOGOUTACTION = {
  type: 'USER/LOGOUT';
};

type LoginCheckAction = LOGINACTION | LOGOUTACTION;

export const loginCheckReducer = (
  state: LoginState = initialState,
  action: LoginCheckAction
): LoginState => {
  switch (action.type) {
    case 'USER/LOGIN':
      return { ...state, loginState: true, loginData: action.payload };
    case 'USER/LOGOUT':
      return { ...state, loginState: false, loginData: initialState.loginData };
    default:
      return { ...state };
  }
};

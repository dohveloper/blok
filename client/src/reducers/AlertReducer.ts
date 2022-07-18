type AlertState = {
  state: boolean;
  alertData: any;
};

const initialState: AlertState = {
  state: false,
  alertData: '',
};

export function alertReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'alertOn':
      return { state: true, alertData: action.payload };
    case 'alertOff':
      return { state: false, alertData: action.payload };

    default:
      return { ...state };
  }
}

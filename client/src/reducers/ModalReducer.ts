type ConfirmDataType = {
  title: string;
  msg: string;
  action: string;
};

type ModalState = {
  isTemplateModal: boolean;
  isConfirmModal: boolean;
  confirmData?: ConfirmDataType;
  confirmState: boolean;
};

const initialState: ModalState = {
  isTemplateModal: false,
  isConfirmModal: false,
  confirmData: {
    title: "",
    msg: "",
    action: "",
  },
  confirmState: false,
};

// 액션 타입 정의
const ActionTypes = {
  TEMPLATE_ON: "TEMPLATE/MODAL_ON",
  TEMPLATE_OFF: "TEMPLATE/MODAL_OFF",
  CONFIRM_ON: "CONFIRM/MODAL_ON",
  CONFIRM_OFF: "CONFIRM/MODAL_OFF",
  CONFIRM_YES: "CONFIRM/CONFIRM_YES",
  CONFIRM_RESET: "CONFIRM/CONFIRM_RESET",
};

type ActionType = keyof typeof ActionTypes;

export const modalReducer = (
  state = initialState,
  action: { type: ActionType; payload?: ConfirmDataType }
) => {
  switch (action.type) {
    case ActionTypes.TEMPLATE_ON:
      return { ...state, isTemplateModal: true };
    case ActionTypes.TEMPLATE_OFF:
      return { ...initialState };
    case ActionTypes.CONFIRM_ON:
      return { ...state, isConfirmModal: true, confirmData: action.payload };
    case ActionTypes.CONFIRM_OFF:
      return { ...initialState };
    case ActionTypes.CONFIRM_YES:
      return { ...state, confirmState: true };
    case ActionTypes.CONFIRM_RESET:
      return { ...state, confirmState: false };
    default:
      return { ...state };
  }
};

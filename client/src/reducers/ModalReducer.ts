type ConfirmDataType = {
  title: string;
  msg: string;
  onConfirm?: (props?: string) => void;
};

type ModalState = {
  isTemplateModal: boolean;
  templateData?: string;
  isConfirmModal: boolean;
  isAddModal: boolean;
  confirmData?: ConfirmDataType;
};

const initialState: ModalState = {
  isTemplateModal: false,
  templateData: '',
  isConfirmModal: false,
  isAddModal: false,
  confirmData: {
    title: '',
    msg: '',
  },
};

// 액션 타입 정의

const ActionTypes = {
  TEMPLATE_ON: 'TEMPLATE/MODAL_ON',
  TEMPLATE_OFF: 'TEMPLATE/MODAL_OFF',
  CONFIRM_ON: 'CONFIRM/MODAL_ON',
  CONFIRM_OFF: 'CONFIRM/MODAL_OFF',
  ADD_ON: 'ADD/MODAL_ON',
  ADD_OFF: 'ADD/MODAL_OFF',
};

type ActionType = keyof typeof ActionTypes;

export const modalReducer = (
  state = initialState,
  action: { type: ActionType; payload?: ConfirmDataType; template?: string }
) => {
  switch (action.type) {
    case ActionTypes.TEMPLATE_ON:
      return { ...state, isTemplateModal: true, templateData: action.template };
    case ActionTypes.TEMPLATE_OFF:
      return { ...initialState };
    case ActionTypes.CONFIRM_ON:
      return { ...state, isConfirmModal: true, confirmData: action.payload };
    case ActionTypes.CONFIRM_OFF:
      return { ...initialState };
    case ActionTypes.ADD_ON:
      return { ...state, isAddModal: true };
    case ActionTypes.ADD_OFF:
      return { ...initialState };
    default:
      return { ...state };
  }
};

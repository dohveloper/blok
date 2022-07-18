const toolList = ["Block", "Appearance", "Setting"];

type ToolType = string;

const initialState = toolList[0];

export function sidetabReducer(state = initialState, action: {type: ToolType}) {
  switch (action.type) {
    case toolList[0]:
      return state = toolList[0];

    case toolList[1]:
      return state = toolList[1];

    case toolList[2]:
      return state = toolList[2];
      
    default:
      return state;
  }
}

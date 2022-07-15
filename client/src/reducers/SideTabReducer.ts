const toolList = ["Block", "Appearance", "Setting"];

export function sidetabReducer(state = "", action: any) {
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

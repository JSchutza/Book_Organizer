




import { TRIGGER_RENDER } from "../types";



const triggerRenderReducer = (state = { trigger: null }, action) => {
  switch (action.type){
    case TRIGGER_RENDER:
      return { ...state, trigger: action.trigger };
    default:
      return state;
  }
};




export {
  triggerRenderReducer,

}

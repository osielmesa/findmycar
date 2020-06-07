import {THEME_TOGGLE} from "./ActionTypes";

const initialState={
  theme:'light'
}

const CommonReducer = (state=initialState,action) =>{
 switch (action.type) {
   case THEME_TOGGLE:
     return {...state, theme:state.theme === 'light' ? 'dark' : 'light'}
   default:
     return state
 }
}

export default CommonReducer
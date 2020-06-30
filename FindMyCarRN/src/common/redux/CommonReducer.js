import {CHANGE_THEME} from './ActionTypes';

const initialState={
  themeType:'light'
}

export default function CommonReducer(state=initialState,action){
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, themeType: action.payload}
    default:
      return state
  }
}

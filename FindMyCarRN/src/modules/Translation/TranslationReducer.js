import { CHANGE_TRANSLATION } from './TranslationActionTypes';
import {translations} from './translations';

const initialState={
  translation: translations.en
}

export default function CommonReducer(state=initialState,action){
  switch (action.type) {
    case CHANGE_TRANSLATION:
      if(action.payload === 'es'){
        return {...state, translation: translations.es}
      }
      if(action.payload === 'sr'){
        return {...state, translation: translations.sr}
      }
      return {...state, translation: translations.en}
    default:
      return state
  }
}

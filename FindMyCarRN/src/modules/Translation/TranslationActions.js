import {CHANGE_TRANSLATION} from './TranslationActionTypes';

export const changeTranslation = (translation) => ({
  type: CHANGE_TRANSLATION,
  payload: translation
})

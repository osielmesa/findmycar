import React from 'react';
import {getObjectFromLocalStorage, saveObjectLocalStorage} from './Utils';

const storeKey = '@MyUserSettingsStore:key'

export const settingsKey = {
  language:'language'
}

export const saveSettingInLocalStorage = async (key, value) => {
  try {
    let settings = await loadSettingsFromLocalStorage()

    if (settings) {
      settings[key] = value;
    } else {
      settings = {[key]:value};
    }
    await saveObjectLocalStorage(settings,storeKey)
    return true;
  } catch (e) {
    console.log('Error saving settings: ', e);
    throw e;
  }
}

export const loadSettingsFromLocalStorage = async () => {
  try {
    const settingsObject = await getObjectFromLocalStorage(storeKey)
    return settingsObject;
  } catch (e) {
    console.log('Error loading settings: ', e);
    throw e;
  }
}

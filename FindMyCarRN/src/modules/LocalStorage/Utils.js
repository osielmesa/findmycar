import AsyncStorage from '@react-native-community/async-storage';

export const saveObjectLocalStorage = async (obj, key) => {
  try {
    const serializedObj = await JSON.stringify(obj);
    await AsyncStorage.setItem(key, serializedObj);
    return true;
  } catch (e) {
    console.log('Error saving object: ', e);
    return false;
  }
}

export const getObjectFromLocalStorage = async (key) => {
  try{
    const objString = await AsyncStorage.getItem(key)
    if(objString){
      const obj = JSON.parse(objString)
      return obj
    }
    return null;
  } catch (e) {
    console.log('Error getting object', e)
    return null;
  }
}

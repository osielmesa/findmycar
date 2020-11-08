import {getObjectFromLocalStorage, saveObjectLocalStorage} from './Utils';

const locationkey = '@LAST_LOCATION'

export const saveLocationData = async (locationInfoObject) => {
  try{
    await saveObjectLocalStorage(locationInfoObject, locationkey)
    return true;
  }catch (e) {
    console.log('Error saving location: ', e);
    throw e;
  }
};

export const loadLocationData = async () => {
  try{
    const location = await getObjectFromLocalStorage(locationkey)
    if(location){
      return location;
    }
    throw new Error('Location was not saved before')
  }catch (e) {
    console.log('Error loading location: ', e);
    throw e;
  }
}

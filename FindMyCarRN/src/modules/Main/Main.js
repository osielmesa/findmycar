import React, { useEffect, useLayoutEffect, useContext, } from 'react';
import {SafeAreaView, ScrollView, Linking, PermissionsAndroid, Platform, StyleSheet, Image, Alert} from 'react-native';
import {Card, Button, Icon, Text, ThemeContext, Divider} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import {check,request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { useTheme } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

//Local
import CardHeader from '../../common/components/CardHeader';
import {loadSettingsFromLocalStorage} from '../LocalStorage/UserSettings';
import {changeTranslation} from '../Translation/TranslationActions';
import {loadLocationData, saveLocationData} from '../LocalStorage/Location';
import {getHeaderStyle} from '../../common/Theme';

const styles = StyleSheet.create({
  divider:{
    marginBottom:20
  },
  description:{
    marginTop:10
  },
  logo:{
    width:200,
    height:200,
    alignSelf:'center',
    marginTop:30,
    marginBottom:30
  }
})

function Main(props) {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.translation)
  const {navigation} = props
  const { theme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const logo = require('../../resources/playstore.png')

  const loadSavedLanguage = () => {
    loadSettingsFromLocalStorage().then(loadedSettings => {
      if(loadedSettings && loadedSettings.language){
        dispatch(changeTranslation(loadedSettings.language))
      }
    }).catch(error => {
      console.log('Error loading settings', error);
    })
  }

  const executeFunctionWithLocationAndPermissionVerification = (funcCallback) => {
    if(Platform.OS === 'android'){
      requestLocationPermission().then(res =>{
        if (res === true){
          Geolocation.getCurrentPosition(info => {
            funcCallback(info)
          });
        }else{
          alert(translation.ENABLE_LOCATION)
        }
      })
    }else{
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              checkLocationPermissionOnlyWhenInUse(funcCallback);
              break;
            case RESULTS.DENIED:
              checkLocationPermissionOnlyWhenInUse(funcCallback);
              break;
            case RESULTS.GRANTED:
              Geolocation.getCurrentPosition(info => {
                funcCallback(info)
              });
              break;
            case RESULTS.BLOCKED:
              checkLocationPermissionOnlyWhenInUse(funcCallback);
              break;
          }
        })
        .catch(error => {
          alert(translation.ENABLE_LOCATION)
        });
    }
  }

  const checkLocationPermissionOnlyWhenInUse = (funcCallback) => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert(translation.ENABLE_LOCATION)
            break;
          case RESULTS.DENIED:
            alert(translation.ENABLE_LOCATION)
            break;
          case RESULTS.GRANTED:
            Geolocation.getCurrentPosition(info => {
              funcCallback(info)
            });
            break;
          case RESULTS.BLOCKED:
            alert(translation.ENABLE_LOCATION)
            break;
        }
      })
      .catch(error => {
        alert(translation.ENABLE_LOCATION)
      });
  }

  const requestLocationPermission = async () => {
    if(Platform.OS === 'android'){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Find My Car',
            'message': translation.PERMISSION_REQUIRED_TITLE
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          console.log("location permission denied")
          return false;
        }
      } catch (err) {
        console.error(err)
        return false
      }
    }else {
      try {
        const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        switch (result) {
          case RESULTS.UNAVAILABLE:
            return false
          case RESULTS.DENIED:
            return false
          case RESULTS.GRANTED:
            return true
          case RESULTS.BLOCKED:
            return false
        }
      }catch (err) {
        console.error(err)
        return false
      }
    }
  }

  const saveLocation = (location) => {
    if(location){
      saveLocationData(location).then(
        alert(translation.LOCATION_SAVED)
      ).catch(error => {
        alert(translation.ERROR_SAVING + error.message);
      })
    }else{
      executeFunctionWithLocationAndPermissionVerification(saveLocation)
    }
  }

  const findCarAction = (currentLocation) => {
    if(currentLocation){
      loadLocationData().then(savedLocation =>{
        const url = 'https://www.google.com/maps/dir/?api=1&origin='+currentLocation.coords.latitude+','+currentLocation.coords.longitude+'&destination='+savedLocation.coords.latitude+','+savedLocation.coords.longitude+'&travelmode=walking'
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url).then(res => {

            }).catch(error => {
              alert(translation.WEB_NAVIGATION_NOT_SUPPORTED)
            })
          } else {
            alert(translation.WEB_NAVIGATION_NOT_SUPPORTED)
          }
        });
      }).catch(error => {
        alert(translation.SAVE_FIRST_LOAD_AFTER)
      })
    }else{
      executeFunctionWithLocationAndPermissionVerification(findCarAction)
    }
  }

  //Equivalent to componentDidMount
  useEffect(() => {
    loadSavedLanguage()
    requestLocationPermission().then(res => {
      console.log(res)
    }).catch(error=>{
      console.log(error)
    })
  }, [])

  //It runs immediately after the DOM has been updated, but before "painting" the changes.
  useLayoutEffect(() => {
    navigation.setOptions({
      title:translation.HOME,
      headerRight: () => (
        <Button type="clear" onPress={() => {onSettingTouched()}} icon={<Icon name='settings' color={colors.text} onPress={() => {onSettingTouched()}} />}/>
      ),
      headerStyle: getHeaderStyle(),
    });
  }, [navigation, translation]);

  useEffect(() => {
    navigation.setOptions({
      title:translation.HOME,
    })
  }, [translation])

  const onSettingTouched = () => {
    navigation.navigate('Settings')
  }

  const saveLocationClickHandler = () => {
    Alert.alert(
      translation.ARE_YOU_SURE_SAVE,
      translation.THIS_WILL_REPLACE_PREV_LOCATION,
      [
        {
          text: translation.CANCEL,
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: translation.SAVE,
          onPress: () => {
            saveLocation()
          }
        }
      ],
      { cancelable: true }
    );
  }

  return(
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Image source={logo} style={styles.logo} />
        <Card title={<CardHeader icon={<Icon name="save" size={25} color={theme.colors.primary}/>} title={translation.SAVE_LOCATION_AFTER_PARKING} onPress={saveLocationClickHandler}/> }
              onPress={saveLocationClickHandler}
        >
          <Divider style={{ ...styles.divider,backgroundColor: theme.colors.primary }} />
          <Button title={translation.SAVE_MY_LOCATION} color='white' onPress={saveLocationClickHandler}/>
          <Text style={styles.description}>{translation.SAVE_LOCATION_DESCRIPTION}</Text>
        </Card>
        <Card title={<CardHeader icon={<Icon type={'material-community'} name="map-marker" size={25} color={'white'}/>}
                                 title={translation.LETS_FIND_CAR} onPress={() => findCarAction()}
                                 titleStyle={{color:'white'}}/> }
              onPress={()=>findCarAction()} containerStyle={{backgroundColor:theme.colors.primary}}
        >
          <Divider style={{...styles.divider, backgroundColor: 'white' }} />
          <Button containerStyle={{backgroundColor:'white'}} type={'outline'} title={translation.FIND_MY_CAR} onPress={() => findCarAction()}/>
          <Text style={{...styles.description, color:'white'}}>{translation.FIND_CAR_DESCRIPTION}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Main

import React, { useEffect, useLayoutEffect, useContext, } from 'react';
import {SafeAreaView, ScrollView, Linking, PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import {Card, Button, Icon, Text, ThemeContext, Divider} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import {check,request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage'
import { useTheme } from '@react-navigation/native';

import CardHeader from '../../common/components/CardHeader';

const styles = StyleSheet.create({})

function Main(props) {
  const {navigation} = props
  const { theme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const storeLocationData = async (locationInfoObject) => {
    await AsyncStorage.setItem('@LAST_LOCATION', JSON.stringify(locationInfoObject));
  };

  const getLocationData = async () => {
    const location = await AsyncStorage.getItem('@LAST_LOCATION')
    if(location !== null) {
      return location
    }
  }

  const executeFunctionWithLocationAndPermissionVerification = (func) => {
    if(Platform.OS === 'android'){
      requestLocationPermission().then(res =>{
        if (res === true){
          Geolocation.getCurrentPosition(info => {
            console.log(info)
            func(info)
          });
        }else{
          alert("Enable location permission for this app in settings!")
        }
      })
    }else{
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              alert("Enable location permission for this app in settings!")
              break;
            case RESULTS.DENIED:
              alert("Enable location permission for this app in settings!")
              break;
            case RESULTS.GRANTED:
              Geolocation.getCurrentPosition(info => {
                console.log(info)
                func(info)
              });
              break;
            case RESULTS.BLOCKED:
              alert("Enable location permission for this app in settings!")
              break;
          }
        })
        .catch(error => {
          alert("Enable location permission for this app in settings!")
        });
    }
  }

  const requestLocationPermission = async () => {
    if(Platform.OS === 'android'){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Find My Car',
            'message': 'Find My Car app requires location permission in order to find your car!'
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

  const saveLocationAction = (location) => {
    if(location){
      storeLocationData(location).then(
        alert("Location saved!")
      ).catch(error => {
        alert("There was an error saving your location. "+error.message);
      })
    }else{
      executeFunctionWithLocationAndPermissionVerification(saveLocationAction)
    }
  }

  const findCarAction = (currentLocation) => {
    if(currentLocation){
      getLocationData().then(locationString =>{
        const savedLocation = JSON.parse(locationString);
        const url = 'https://www.google.com/maps/dir/?api=1&origin='+currentLocation.coords.latitude+','+currentLocation.coords.longitude+'&destination='+savedLocation.coords.latitude+','+savedLocation.coords.longitude+'&travelmode=walking'
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            alert("Navego a webview with router")
          }
        });
      }).catch(error => {
        alert("You need to save location first in order to find your car after!")
      })
    }else{
      executeFunctionWithLocationAndPermissionVerification(findCarAction)
    }
  }

  //Equivalent to componentDidMount
  useEffect(() => {
    requestLocationPermission().then(res => {
      console.log(res)
    }).catch(error=>{
      console.log(error)
    })
  }, [])

  //It runs immediately after the DOM has been updated, but before "painting" the changes.
  useLayoutEffect(() => {
    navigation.setOptions({
      title:'Home',
      headerRight: () => (
        <Button type="clear" onPress={() => {onSettingTouched()}} icon={<Icon name='settings' color={colors.text} onPress={() => {onSettingTouched()}} />}/>
      ),
    });
  }, [navigation]);

  const onSettingTouched = () => {
    navigation.navigate('Settings')
  }


  return(
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Card title={<CardHeader icon={<Icon name="save" size={25} color={theme.colors.primary}/>} title={'Save location after parking'} onPress={() => saveLocationAction()}/> }
              onPress={() => saveLocationAction()}
        >
          <Divider style={{ backgroundColor: theme.colors.primary, marginBottom:20 }} />
          <Button title="SAVE MY LOCATION" color='white' onPress={() => saveLocationAction()}/>
          <Text style={{marginTop:10}}>Let know to the app where you parked right now, so It will be remembered in the future!</Text>
        </Card>
        <Card title={<CardHeader icon={<Icon type={'material-community'} name="map-marker" size={25} color={'white'}/>}
                                 title={'Let´s find your car.'} onPress={() => findCarAction()}
                                 titleStyle={{color:'white'}}/> }
              onPress={()=>findCarAction()} containerStyle={{backgroundColor:theme.colors.primary}}
        >
          <Divider style={{ backgroundColor: 'white', marginBottom:20 }} />
          <Button containerStyle={{backgroundColor:'white'}} type={'outline'} title="FIND MY CAR" onPress={() => findCarAction()}/>
          <Text style={{marginTop:10, color:'white'}}>Find your car based on the last location saved!</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Main

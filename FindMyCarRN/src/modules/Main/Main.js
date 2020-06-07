import React, { useEffect,useState } from 'react';
import {SafeAreaView, ScrollView, Linking, PermissionsAndroid, Platform} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content, Card, CardItem, Text  } from 'native-base'
import Geolocation from '@react-native-community/geolocation';
import {check,request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage'

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
      const url = 'https://www.google.com/maps/dir/?api=1&origin='+currentLocation.coords.latitude+','+currentLocation.coords.longitude+'&destination='+savedLocation.coords.latitude+','+savedLocation.coords.longitude+'&&travelmode=walking'
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          alert("Navego a webview with router")
        }
      });
    }).catch(error => {
      alert("An error occurred getting last saved location.")
    })
  }else{
    executeFunctionWithLocationAndPermissionVerification(findCarAction)
  }
}

function Main() {

  //Equivalent to componentDidMount
  useEffect( () => {
    requestLocationPermission().then(r => {
      console.log('location permission requested')
    }).catch(error =>{
      console.log('Error requesting location permission: '+error)
    })
  }, [])

  return(
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Container>
          <Header>
            <Left>
              <Button transparent >
                <Icon type={'MaterialCommunityIcons'} name='home' />
              </Button>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon type={'MaterialCommunityIcons'} name='settings' onPress={() => {}} />
              </Button>
            </Right>
          </Header>
          <Content padder>
            <Card>
              <CardItem header button onPress={() => saveLocationAction()}>
                <Text >Save your current location</Text>
              </CardItem>
              <CardItem button onPress={() => saveLocationAction()}>
                <Body>
                  <Button iconLeft onPress={() => saveLocationAction()}>
                    <Icon type={'MaterialCommunityIcons'} name='content-save' />
                    <Text>SAVE LOCATION</Text>
                  </Button>
                </Body>
              </CardItem>
              <CardItem footer button onPress={() => saveLocationAction()}>
                <Text>Let know to the app where you parked right now, so It will be remembered in the future!</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header button onPress={() => findCarAction()} style={{backgroundColor:'red'}}>
                <Text style={{color:'white'}}>Let´s find your car.</Text>
              </CardItem>
              <CardItem button onPress={() => findCarAction()} style={{backgroundColor:'red'}}>
                <Body>
                  <Button iconLeft onPress={ () => findCarAction()} style={{backgroundColor:'white'}}>
                    <Icon type={'MaterialCommunityIcons'} name={'map-marker'} style={{color:'red'}} />
                    <Text style={{color:'red'}}>FIND MY CAR</Text>
                  </Button>
                </Body>
              </CardItem>
              <CardItem footer button onPress={ () => findCarAction()} style={{backgroundColor:'red'}}>
                <Text style={{color:'white'}} >Find your car based on the last location saved!</Text>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Main

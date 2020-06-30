import React,{useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Icon, Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

function Settings(props) {
  const {navigation} = props
  const { colors } = useTheme();

  //It runs immediately after the DOM has been updated, but before "painting" the changes.
  useLayoutEffect(() => {
    navigation.setOptions({
      title:'Settings',
      headerRight: () => (
        <Button type="clear" onPress={() => {onHomeTouched()}} icon={<Icon name='home' color={colors.text} onPress={() => {onHomeTouched()}} />}/>
      ),
      headerLeft:null
    });
  }, [navigation]);

  const onHomeTouched = () => {
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text >Settings</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;

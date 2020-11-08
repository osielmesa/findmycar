import React, {useEffect, useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Linking} from 'react-native';
import {Text, Icon, Button, ListItem, Avatar} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';

//Local
import {changeTranslation} from '../Translation/TranslationActions';
import {saveSettingInLocalStorage, settingsKey} from '../LocalStorage/UserSettings';
import {getHeaderStyle} from '../../common/Theme';

function Settings(props) {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.translation)
  const {navigation} = props
  const { colors } = useTheme();

  const flagEN = require('../../resources/lang/en.png')
  const flagES = require('../../resources/lang/es.png')
  const flagSR = require('../../resources/lang/sr.png')

  const onLanguageItemPress = (lang) => {
    dispatch(changeTranslation(lang));
    saveSettingInLocalStorage(settingsKey.language,lang).then(res => {

    }).catch(error => {
      console.log('Error saving lang in local storage', error)
    })
  }

  //It runs immediately after the DOM has been updated, but before "painting" the changes.
  useLayoutEffect(() => {
    navigation.setOptions({
      title:translation.SETTINGS,
      headerRight: () => (
        <Button type="clear" onPress={() => {onHomeTouched()}} icon={<Icon name='home' color={colors.text} onPress={() => {onHomeTouched()}} />}/>
      ),
      headerLeft:null,
      headerStyle: getHeaderStyle(),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title:translation.SETTINGS,
    })
  }, [translation])

  const onHomeTouched = () => {
    navigation.navigate('Home')
  }

  const openUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url).then(res => {

        }).catch(error => {
          console.log('Error opening url', error)
        })
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={{...styles.title, color:colors.title}}>{translation.LANGUAGE}</Text>
        <ListItem
          bottomDivider
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.80}
          onPress={() => onLanguageItemPress('en')}
        >
          <Avatar source={flagEN} title={'EN'} />
          <ListItem.Content>
            <ListItem.Title>{'EN'}</ListItem.Title>
          </ListItem.Content>
          {translation.LANG === 'en' && <Icon name='check' color={colors.primary} />}
        </ListItem>
        <ListItem
          bottomDivider
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.80}
          onPress={() => onLanguageItemPress('es')}
        >
          <Avatar source={flagES} title={'ES'} />
          <ListItem.Content>
            <ListItem.Title>{'ES'}</ListItem.Title>
          </ListItem.Content>
          {translation.LANG === 'es' && <Icon name='check' color={colors.primary} />}
        </ListItem>
        <ListItem
          bottomDivider
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.80}
          onPress={() => onLanguageItemPress('sr')}
        >
          <Avatar source={flagSR} title={'SR'}/>
          <ListItem.Content>
            <ListItem.Title>{'SR'}</ListItem.Title>
          </ListItem.Content>
          {translation.LANG === 'sr' && <Icon name='check' color={colors.primary} />}
        </ListItem>
        <Text style={{...styles.title, color:colors.title}}>{translation.CONTACT}</Text>
        <ListItem
          bottomDivider
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.80}
          onPress={() => openUrl('https://www.linkedin.com/in/osiel')}
        >
          <Icon name='linkedin' type={'material-community'} color='red'/>
          <ListItem.Content>
            <ListItem.Title>{'Linkedin'}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          bottomDivider
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.80}
          onPress={() => openUrl('https://osiellima.com/')}
        >
          <Icon name='web' type={'material-community'} color='red'/>
          <ListItem.Content>
            <ListItem.Title>{'osiellima.com'}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize:20,
    marginTop:15,
    marginBottom:10,
    marginLeft:5
  }
})

export default Settings;

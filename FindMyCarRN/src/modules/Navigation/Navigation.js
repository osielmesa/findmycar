import React from 'react';
import {SafeAreaView} from 'react-native';
import {Body, Button, Container, Header, Icon, Left, Right, Title} from 'native-base';
import { WebView } from 'react-native-webview';

function Navigation() {
  return(
    <SafeAreaView>
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon type={'MaterialCommunityIcons'} name='home' />
              </Button>
            </Left>
            <Body>
              <Title>Navigation</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon type={'MaterialCommunityIcons'} name='menu' />
              </Button>
            </Right>
          </Header>
          <WebView source={{ uri: 'https://www.google.com/maps/dir/?api=1&origin=28.6139,77.2090&destination=28.5139,77.1090&&travelmode=walking' }}
                   scrollEnabled={true}
                   geolocationEnabled={true}
          />
        </Container>
    </SafeAreaView>
  )
}

export default Navigation

//https://www.google.com/maps/search/?api=1&query=28.6139,77.2090

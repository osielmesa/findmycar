import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { Text} from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  cardTitlediv:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between'
  }
})

function CardHeader(props) {
  const {title, icon, onPress, containerStyle, titleStyle} = props
  console.log(titleStyle)
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{...styles.cardTitlediv, ...containerStyle}}>
        <Text style={titleStyle} >{title}</Text>
        {icon}
      </View>
    </TouchableWithoutFeedback>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  titleStyle: PropTypes.object
}

CardHeader.defaultProps = {
  onPress: () => {},
  containerStyle: {},
  titleStyle:{}
}

export default CardHeader;

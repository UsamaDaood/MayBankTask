// Global loader for whole application //

import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';
import {PRIMARY_FONT_MEDIUM} from '../../constants/fonts';
import Color from '../../libs/Colors';

interface ButtonProps {
  btnString: string;
  onClick: any;
  btnStyle: ViewStyle;
}

const CustomButton = ({btnString, onClick, btnStyle}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.btnStyle, btnStyle]} onPress={onClick}>
      <Text style={styles.btnTextStyle}>{btnString}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 15,
  },
  btnStyle: {
    backgroundColor: Color.primaryColor,
    padding: 10,
    borderRadius: 7,
  },
  btnTextStyle: {
    color: Color.whiteColor,
    alignSelf: 'center',
    fontFamily: PRIMARY_FONT_MEDIUM,
  },
});

export default CustomButton;

// Global loader for whole application //

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  TextInputProps,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import Color from '../../libs/Colors';
import {ImageSourcePropType} from 'react-native';
import Colors from '../../libs/Colors';
import {StyleProp} from 'react-native';
interface CustomInputProps {
  leftIcon?: ImageSourcePropType;
  placeholder?: string;
  RightIcon?: ImageSourcePropType;
  RightFirstIcon?: ImageSourcePropType;
  callBackLeftImage?: any;
  callBackRightImage?: any;
  callBackRightFirstImage?: any;
  onChangeText?: any;
  onSubmitEditing?: any;
  keyboardType?: any;
  inputValue?: string;
  backgroundViewColor?: string;
  editable?: boolean;
  isPassword?: boolean;
  viewStyle?: ViewStyle;
  inputStyle?: TextInputProps;
  rightFirstIconStyle?: StyleProp<ImageStyle>;
}

const CustomInput = ({
  leftIcon,
  placeholder,
  RightIcon,
  callBackLeftImage,
  callBackRightImage,
  onChangeText,
  onSubmitEditing,
  keyboardType,
  inputValue,
  backgroundViewColor,
  editable,
  isPassword,
  viewStyle,
  inputStyle,
  RightFirstIcon,
  callBackRightFirstImage,
  rightFirstIconStyle,
}: CustomInputProps) => {
  return (
    <View
      style={[
        styles.container,
        viewStyle,
        {
          backgroundColor: backgroundViewColor
            ? backgroundViewColor
            : Colors.colorGray,
        },
      ]}>
      {leftIcon && (
        <View style={{flex: 0.1, alignSelf: 'center', marginLeft: 5}}>
          <TouchableOpacity onPress={callBackLeftImage}>
            <Image
              style={[
                styles.cartIconStyle,
                {alignSelf: 'flex-start', marginLeft: 10},
              ]}
              source={leftIcon}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{flex: 0.9}}>
        <TextInput
          placeholder={placeholder}
          multiline={true}
          placeholderTextColor="grey"
          style={[inputStyle, {padding: 10}]}
          keyboardType={keyboardType ? keyboardType : 'default'}
          value={inputValue}
          onChangeText={text => onChangeText(text)}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          selectTextOnFocus={false}
          secureTextEntry={isPassword}
        />
      </View>

      {RightFirstIcon && (
        <View style={{flex: 0.1, alignSelf: 'center'}}>
          <TouchableOpacity onPress={callBackRightFirstImage}>
            <Image
              style={[styles.cartIconStyle, rightFirstIconStyle]}
              source={RightFirstIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      )}

      {RightIcon && (
        <View
          style={{
            flex: 0.1,
            alignSelf: 'center',
            marginRight: 10,
          }}>
          <TouchableOpacity onPress={callBackRightImage}>
            <Image
              style={[styles.cartIconStyle]}
              source={RightIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorGray,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartIconStyle: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
});

export default CustomInput;

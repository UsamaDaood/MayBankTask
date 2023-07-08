import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Share,
  FlatList,
} from 'react-native';
import Colors from '../../libs/Colors';
import {useSelector} from 'react-redux';
import CustomHeader from '../../common/Components/CustomHeader';
import {toastShow} from '../../libs/toast';
import CustomButton from '../../common/Components/CustomButton';

interface SearchHistoryProps {
  navigation: any;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({navigation}) => {
  const BACK_ICON = require('../../../assets/images/back_icon/back_icon.png');
  const EMPTY_ICON = require('../../../assets/images/ic_no_record.png');

  const {searchResult_1} = useSelector((state: {searchResult_1: any}) => state);

  // render Header
  const renderHeader = () => {
    return (
      <CustomHeader
        headerTitle="Your History"
        leftIcon={BACK_ICON}
        callBackLeftImage={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const IC_SHARE_GRAY = require('../../../assets/images/ic_share_gray/ic_share_gray.png');
  // render FlatList to display All searches with results

  const onShare = async (message: string) => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      toastShow('error', 'something went wrong');
    }
  };

  const renderNNoRecord = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Image
          source={EMPTY_ICON}
          resizeMode={'contain'}
          style={{width: 350, height: 350, alignSelf: 'center'}}
        />
        <CustomButton
          btnString={"Let's Start Searching Places"}
          btnStyle={{marginTop: 20, marginHorizontal: 30}}
          onClick={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  };

  const renderListSearches = () => {
    return (
      <View style={{flexDirection: 'column', marginHorizontal: 20}}>
        <FlatList
          // style={{height: 450}}
          showsVerticalScrollIndicator={false}
          data={searchResult_1?.searchResultArr}
          ListEmptyComponent={
            <View style={{}}>
              <Text>No Record Found</Text>
            </View>
          }
          renderItem={({item, index, separators}) => {
            return (
              <View style={styles.histryItem}>
                <Text style={{color: Colors.black, flex: 0.9}}>
                  {item?.searchKey}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const lat =
                      item?.searchdetail?.result?.geometry?.location?.lat;
                    const long =
                      item?.searchdetail?.result?.geometry?.location?.lng;
                    console.log('LOG:: OKAY NN ' + lat + ' ' + long);
                    const locationLink =
                      'https://maps.google.com/?q=' + lat + ',' + long;
                    const message =
                      "I'm sharing a location searched\n\n" +
                      'Location Name: ' +
                      item?.searchKey +
                      '\n\n' +
                      'Location Link' +
                      '\n\n' +
                      locationLink;
                    onShare(message);
                  }}>
                  <Image
                    source={IC_SHARE_GRAY}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.centered}>
      {/* Render Custom Header */}
      {renderHeader()}
      {/* search Histry */}
      {searchResult_1?.searchResultArr.length > 0
        ? renderListSearches()
        : renderNNoRecord()}
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  britainTextStyle: {
    color: Colors.primaryColor,
  },
  title: {
    fontSize: 38,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 2,
  },
  histryItem: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Colors.subTextClr,
    backgroundColor: Colors.backGroundLowWhiteColor,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
});

export default SearchHistory;

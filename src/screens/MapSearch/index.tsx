import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Colors from '../../libs/Colors';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../../common/Components/CustomInput';
import {toastShow} from '../../libs/toast';
import {
  getPlaceDetailAsync,
  searchPlaceAsync,
} from '../../features/searchPlaces/thunks';
import _, {debounce} from 'underscore';
import {searchResult} from '../../features/searchPlaces/searchSlice';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface MapSearchProps {
  navigation: any;
}

const MapSearchScreen: React.FC<MapSearchProps> = ({navigation}) => {
  const {searchResult_1} = useSelector((state: {searchResult_1: any}) => state);
  const dispatch = useDispatch<any>();
  const [searchResultArr, setSearchResultArr] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [isSearchView, setIsSearchView] = useState<boolean>(false);
  const [lat, setLat] = useState<any>(),
    [long, setLong] = useState<any>();

  const CROSS_ICON = require('../../../assets/images/ic_search_cross/ic_search_cross.png');
  const SEARCH_ICON = require('../../../assets/images/ic_search/ic_search.png');

  useEffect(() => {
    console.log('LOG:: OKAY NN ' + JSON.stringify(searchResult_1));
  }, []);

  const searching = async (search: string) => {
    debouncedSearch(search);
  };

  const debouncedSearch = useCallback(
    debounce((text: string) => searcbAPIPlaces(text), 500),
    [],
  );

  const searcbAPIPlaces = (search: string) => {
    const searchPlace = {
      searchKey: search,
    };
    dispatch(searchPlaceAsync(searchPlace))
      .unwrap()
      .then((result: any) => {
        console.log('LOG:: SEARCH RESULT ' + JSON.stringify(result));
        if (result?.status == 'OK') {
          // if all result okay found
          const Arr = result?.predictions;
          setSearchResultArr(Arr);
        }
      })
      .catch(() => {
        toastShow('error', 'Something wrong');
      });
  };

  // Saved SearchKeyword and Result to Redux
  const savedSearchResult = (searchKey: string, result: any) => {
    let ChangeObj = {
      searchKey: searchKey,
      searchdetail: result,
    };
    dispatch(searchResult(ChangeObj));
  };

  // render FlatList of Searches
  const renderSearchResult = () => {
    return (
      <View style={{marginTop: 10}}>
        <FlatList
          style={{height: 450}}
          showsVerticalScrollIndicator={false}
          data={searchResultArr}
          renderItem={({item, index, separators}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setIsSearchView(false);
                  setSearch(item?.description);
                  // get info about clicked place id
                  getInfoPlaceId(item?.place_id, item?.description);
                }}>
                <View style={styles.searchItem}>
                  <Text numberOfLines={2}>{item?.description}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  // get Place detail from place Id
  const getInfoPlaceId = (placeId: string, searchResult: string) => {
    const placeDetail = {
      placeId: placeId,
    };
    dispatch(getPlaceDetailAsync(placeDetail))
      .unwrap()
      .then((result: any) => {
        console.log('LOG:: PLACE DETAIL ' + JSON.stringify(result));
        if (result?.status == 'OK') {
          // if Detail get Successfully.
          const lat = result?.result?.geometry?.location?.lat;
          const long = result?.result?.geometry?.location?.lng;
          setLat(lat);
          setLong(long);
          // save to redux
          savedSearchResult(searchResult, result);
          setIsSearchView(false);
        }
      })
      .catch(() => {
        toastShow('error', 'Something wrong');
      });
  };

  // display Recent Searches from Redux
  const displayRecentSearches = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        {/* See All  */}
        <View style={styles.recentSearchView}>
          <Text style={{color: Colors.black, fontSize: 18}}>
            Recent Search{' '}
            <Text style={{color: Colors.primaryDisable}}>
              ({searchResult_1?.searchResultArr.length})
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchHistory');
            }}>
            <Text style={{color: Colors.dimTextColor}}>See All</Text>
          </TouchableOpacity>
        </View>
        {/* List Display */}
        <ScrollView horizontal>
          {searchResult_1?.searchResultArr?.map((item: any, index: number) => {
            return (
              <View style={styles.recentSearchItemStyle}>
                <Text style={{color: Colors.black}}>{item?.searchKey}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const mapRef = useRef<MapView>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const handleMapReady = useCallback(() => {
    mapRef.current && setIsReady(true);
  }, []);
  // render Map View
  const renderMapView = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          region={{
            latitude: lat ? lat : 37.78825,
            longitude: long ? long : -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={{flex: 1}}
          onMapReady={handleMapReady}
          mapType={'hybrid'}>
          {lat && long && (
            <Marker
              coordinate={{latitude: lat, longitude: long}}
              title={search}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={styles.allSearches}
          onPress={() => {
            navigation.navigate('SearchHistory');
          }}>
          <Text>All Searches</Text>
        </TouchableOpacity>

        <View style={styles.customInputView}>
          <CustomInput
            RightFirstIcon={search.trim().length > 0 ? CROSS_ICON : ''}
            callBackRightFirstImage={() => {
              setSearch('');
              setIsSearchView(false);
            }}
            RightIcon={SEARCH_ICON}
            keyboardType={'web-search'}
            inputValue={search}
            placeholder={'Search Places'}
            rightFirstIconStyle={{
              width: 10,
              height: 10,
              marginRight: 5,
            }}
            onChangeText={(text: string) => {
              setSearch(text);
              searching(text);
              setIsSearchView(true);
            }}
          />

          {/* search Result Display */}
          {isSearchView && (
            <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
              {displayRecentSearches()}
              <View style={{flexDirection: 'column', marginTop: 5}}>
                {renderSearchResult()}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.centered}>
      {/* render Mao View */}
      {renderMapView()}
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
  },
  britainTextStyle: {
    color: Colors.primaryColor,
  },
  title: {
    fontSize: 28,

    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dimTextColor,
    padding: 10,
    backgroundColor: Colors.backGroundLowWhiteColor,
  },
  recentSearchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
  },
  recentSearchItemStyle: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.backGroundLowWhiteColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: Colors.backGroundLowWhiteColor,
  },
  allSearches: {
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    right: 10,
    top: 10,
    backgroundColor: Colors.whiteColor,
  },
  customInputView: {
    position: 'absolute',
    width: '90%',
    top: 70,
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
});

export default MapSearchScreen;

import {createAsyncThunk} from '@reduxjs/toolkit';
import {MAP_API_KEY} from '../../../constants';
import {BASE_URL} from '../../../utils/config';
import httpClient from '../../../utils/httpClient';

interface searchParams {
  searchKey?: string;
}

export const searchPlaceAsync = createAsyncThunk(
  'search/places',
  async (params: searchParams) => {
    const {searchKey} = params;
    console.log('CALLLLL');
    const linkHit =
      BASE_URL +
      'autocomplete/json?input=' +
      searchKey +
      '&types=establishment&fields=geometry&key=' +
      MAP_API_KEY;

    const response = await httpClient.callAPI('POST', linkHit, params, null);
    return response;
  },
);

//  get Place Detail to get Lat Lng to display on Map
interface PlaceDetailParams {
  placeId?: string;
}

export const getPlaceDetailAsync = createAsyncThunk(
  'search/placeDetail',
  async (params: PlaceDetailParams) => {
    const {placeId} = params;
    console.log('CALLLLL');
    const linkHit =
      BASE_URL +
      'details/json?key=' +
      MAP_API_KEY +
      '&place_id=' +
      placeId +
      '&fields=geometry';

    console.log('LOG:: OKAY LINK ' + linkHit);

    const response = await httpClient.callAPI('POST', linkHit, params, null);
    return response;
  },
);

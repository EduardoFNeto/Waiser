import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

import { PARSE_APPLICATION_ID, PARSE_SERVER_URL } from '../config/constants';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(PARSE_APPLICATION_ID);
Parse.serverURL = PARSE_SERVER_URL;

export const findOrCreate = async (qry: Parse.Query) => {
  let object = await qry.first();
  if (!object) {
    object = new Parse.Object(qry.className);
  }
  return object;
};

export default Parse;

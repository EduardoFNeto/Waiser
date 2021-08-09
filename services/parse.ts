import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

import { PARSE_APPLICATION_ID, PARSE_JS_KEY, PARSE_SERVER_URL } from '../config/constants';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JS_KEY);
Parse.serverURL = PARSE_SERVER_URL;

export default Parse;

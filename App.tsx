import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes'
import { useEffect } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const parseUser = await Parse.User.currentAsync();
      setIsLoading(true);
    }

    checkLogin()
  }, [])
  

  if (isLoading) {
    return <View />;
  }

  
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
        <Routes />
      </NavigationContainer>
    </>
  );
}

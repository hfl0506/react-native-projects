/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {WEATHER_API, API_KEY} from '@env';

const App = () => {
  const [search, setSearch] = useState<string>('');
  const [weather, setWeather] = useState<any[]>([]);

  const onSearch = async (val: string) => {
    const weather = await getWeather(val);
    setWeather(weather);
  };

  const getWeather = async (city: string) => {
    const url = `${WEATHER_API}${API_KEY}/q=${city}`;
    const result = await fetch(url);
    const data = result.json();
    return data;
  };

  useEffect(() => {
    console.log(WEATHER_API);
  }, [weather]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={newText => onSearch(newText)}
        value={search}
        placeholder="search your city"
      />
      <Text>{search}</Text>
      {weather?.length > 0 ? (
        <View></View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>...Nothing to Show</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#3AB4F2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '800',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: 'black',
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default App;

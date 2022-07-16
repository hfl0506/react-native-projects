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
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {WEATHER_API, API_KEY} from '@env';
import {Weather} from './src/types';
import useDebounce from './src/hooks/useDebounce';

const App = () => {
  const [search, setSearch] = useState<string>();
  const [weather, setWeather] = useState<Weather>();
  const debouncedSearchTerm = useDebounce(search, 500);

  const onSearch = async (val: string) => {
    const result = await findCityWeather(val);
    if (result !== undefined) {
      setWeather(result);
    }
  };

  const findCityWeather = async (city: string) => {
    try {
      const resp = await fetch(`${WEATHER_API}${API_KEY}&q=${city}&aqi=no`);
      const json: Weather = await resp.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={newText => setSearch(newText)}
        value={search}
        placeholder="search your city"
      />
      <Text>{search}</Text>
      {weather !== undefined ? (
        <View>
          <Text>City Name: {weather?.location?.name}</Text>
          <Text>Region: {weather?.location?.region}</Text>
          <Text>Local Time: {weather?.location?.localtime}</Text>
          <Text>Temperture: {weather?.current?.temp_c}</Text>
          <Text>Temperture: {weather?.current?.temp_f}</Text>
          <Text>Humidity: {weather?.current?.humidity}</Text>
          <Text>Last Updated Time: {weather?.current?.last_updated}</Text>
        </View>
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

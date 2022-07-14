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
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [search, setSearch] = useState<string>('');
  const [weather, setWeather] = useState<any[]>([]);

  const onSearch = (val: string) => {
    setSearch(val);
  };

  useEffect(() => {}, [weather]);
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

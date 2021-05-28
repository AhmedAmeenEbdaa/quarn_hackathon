/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Card, ListItem, Button, Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

const SURAH_NAMES = [
  {
    sura_no: '01',
    sura_name_ar: 'الفَاتِحة',
  },
  {
    sura_no: '111',
    sura_name_ar: 'المَسَد',
  },
  {
    sura_no: '112',
    sura_name_ar: 'الإخلَاص',
  },
  {
    sura_no: '113',
    sura_name_ar: 'الفَلَق',
  },
  {
    sura_no: '114',
    sura_name_ar: 'النَّاس',
  },
];

const Item = ({title, componentId, sura_no, surah}) => (
  <TouchableOpacity
    onPress={() =>
      Navigation.push(componentId, {
        component: {
          name: 'SurahDetails',
          passProps: {
            title: title,
            sura_no: sura_no,
            surah: surah,
          },
        },
      })
    }>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default class App extends Component {
  renderItem = ({item}) => (
    <Item
      title={item.sura_name_ar}
      sura_no={item.sura_no}
      surah={item}
      componentId={this.props.componentId}
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.backgroundStyle}>
        <Header
          centerComponent={{text: 'Quran Hackathon', style: {color: '#fff'}}}
        />
        <View
          style={{
            backgroundColor: 'white',
          }}>
                <Text style={styles.title}>
          {'اختر سورة'}
        </Text>
          <FlatList
            data={SURAH_NAMES}
            renderItem={this.renderItem}
            keyExtractor={item => item.sura_no}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    margin:20,

  },
  aya: {
    fontSize: 32,
    fontFamily: 'KFGQPC Hafs Smart',
    textAlign: 'center',
  },
});

// Speech to Text Conversion in React Native – Voice Recognition
// https://aboutreact.com/speech-to-text-conversion-in-react-native-voice-recognition/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

// import Voice
import Voice from '@react-native-voice/voice';
import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';
const SURAH_NAMES = [
  {
    ayah_no: '01',
    searchKey: 'واحد',
  },
  {
    ayah_no: '02',
    searchKey: 'اثنان',
  },
  {
    ayah_no: '02',
    searchKey: 'اثنين',
  },
  {
    ayah_no: '03',
    searchKey: 'ثلاثة',
  },
  {
    ayah_no: '03',
    searchKey: 'ثلاثه',
  },
  {
    ayah_no: '04',
    searchKey: 'أربعة',
  },
  {
    ayah_no: '04',
    searchKey: 'أربعه',
  },
  {
    ayah_no: '04',
    searchKey: 'اربعه',
  },
  {
    ayah_no: '05',
    searchKey: 'خمسة',
  },
  {
    ayah_no: '05',
    searchKey: 'خمسه',
  },
  {
    ayah_no: '06',
    searchKey: 'ستة',
  },
  {
    ayah_no: '06',
    searchKey: 'سته',
  },
  {
    ayah_no: '07',
    searchKey: 'سبعة',
  },
  {
    ayah_no: '07',
    searchKey: 'سبعه',
  },
  {
    ayah_no: '07',
    searchKey: '7',
  },
  {
    ayah_no: '06',
    searchKey: '6',
  },
  {
    ayah_no: '05',
    searchKey: '5',
  },
  {
    ayah_no: '04',
    searchKey: '4',
  },
  {
    ayah_no: '03',
    searchKey: '3',
  },
  {
    ayah_no: '02',
    searchKey: '2',
  },
  {
    ayah_no: '01',
    searchKey: '1',
  },
];
const App = props => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = e => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = async e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);

    let res = e.value;
    let surahNames = res[0];
    let surahName = surahNames.split(' ');
    console.log('surahName: ', surahName);

    let searchKey = '';
    if (surahName.length > 1) {
      searchKey = surahName[surahName.length - 1].trim();
    } else {
      searchKey = surahName[0].trim();
      if (Platform.OS === 'ios') {
        searchKey = searchKey.slice(1, searchKey.length);
      } else {
        searchKey = searchKey.slice(0, searchKey.length);
      }
    }
    [...searchKey].forEach(item => console.log(item));

    let finalResult = SURAH_NAMES.filter(item =>
      item.searchKey.startsWith(searchKey),
    );

    console.log('finalResult: ', finalResult);

    if (finalResult.length === 1) {
      await stopRecognizing();
      await destroyRecognizer();
      Navigation.push(props.componentId, {
        component: {
          name: 'AyahDetails',
          passProps: {
            ayah_no: finalResult[0].ayah_no,
            sura_no: props.sura_no,
          },
        },
      });
    }
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('ar-SA');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const skip = async () => {
    //Destroys the current SpeechRecognizer instance
    await Navigation.push(props.componentId, {
      component: {
        name: 'Home',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          من فضلك قم بالضغط علي ايقونة السماعة والبدا باختيار رقم الاية مثلا
          تقول واحد او اثنان
        </Text>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>{`النهاية: ${end}`}</Text>
          <Text style={styles.textWithSpaceStyle}>{`البداية: ${started}`}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>{`Pitch: \n ${pitch}`}</Text>
          <Text style={styles.textWithSpaceStyle}>{`الخطأ: \n ${error}`}</Text>
        </View>
        <TouchableHighlight onPress={startRecognizing}>
          <Image
            style={styles.imageButton}
            source={require('./assets/microphone.png')}
          />
        </TouchableHighlight>
        <Text style={styles.textStyle}>النتائج الجزئية</Text>
        <ScrollView>
          {partialResults.map((result, index) => {
            return (
              <Text key={`partial-result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <Text style={styles.textStyle}>النتائج</Text>
        <ScrollView style={{marginBottom: 42}}>
          {results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <View style={styles.horizontalView}>
          <TouchableHighlight
            onPress={stopRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>ايقاف</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={cancelRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>الغاء</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={destroyRecognizer}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>مسح</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={skip} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>تخطي</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 12,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#B0171F',
  },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  FlatList,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BottomSheet, Header, ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';

const DATA = [
  {
    id: '1',
    jozz: '1',
    sura_no: '01',
    sura_name_en: 'Al-Fātiḥah',
    sura_name_ar: 'الفَاتِحة',
    page: '1',
    line: '2',
    aya_no: '01',
    aya_text: '‏ ‏‏ ‏‏‏‏ ‏‏‏‏‏‏ ‏',
    aya_text_emlaey: 'بسم الله الرحمن الرحيم',
  },
  {
    id: '2',
    jozz: '1',
    sura_no: '01',
    sura_name_en: 'Al-Fātiḥah',
    sura_name_ar: 'الفَاتِحة',
    page: '1',
    line: '3',
    aya_no: '02',
    aya_text: '‏‏‏‏ ‏ ‏‏ ‏‏‏‏‏‏ ‏',
    aya_text_emlaey: 'الحمد لله رب العالمين',
  },
  {
    id: '3',
    jozz: '1',
    sura_no: '01',
    sura_name_en: 'Al-Fātiḥah',
    sura_name_ar: 'الفَاتِحة',
    page: '1',
    line: '4',
    aya_no: '03',
    aya_text: '‏‏‏‏ ‏‏‏‏‏‏ ‏',
    aya_text_emlaey: 'الرحمن الرحيم',
  },
  {
    id: '4',
    jozz: '1',
    sura_no: '01',
    sura_name_en: 'Al-Fātiḥah',
    sura_name_ar: 'الفَاتِحة',
    page: '1',
    line: '4',
    aya_no: '04',
    aya_text: '‏‏‏ ‏‏‏ ‏‏‏‏ ‏',
    aya_text_emlaey: 'مالك يوم الدين',
  },
  {
    id: '5',
    jozz: '1',
    sura_no: '01',
    sura_name_en: 'Al-Fātiḥah',
    sura_name_ar: 'الفَاتِحة',
    page: '1',
    line: '5',
    aya_no: '05',
    aya_text: '‏‏‏‏ ‏‏‏‏ ‏‏‏‏ ‏‏‏‏‏ ‏',
    aya_text_emlaey: 'إياك نعبد وإياك نستعين',
  },
  {
    id: '6',
    jozz: '1',
    sura_no: '01',
    sura_name_en: 'Al-Fātiḥah',
    sura_name_ar: 'الفَاتِحة',
    page: '1',
    line: '6',
    aya_no: '06',
    aya_text: '‏‏‏‏‏ ‏‏‏‏‏ ‏‏‏‏‏‏‏‏ ‏',
    aya_text_emlaey: 'اهدنا الصراط المستقيم',
  },
  {
    id: '7',
    jozz: '1',
    sura_no: '01',
    sura_name_en: 'Al-Fātiḥah',
    sura_name_ar: 'الفَاتِحة',
    page: '1',
    line: '8',
    aya_no: '07',
    aya_text:
      '‏‏‏ ‏‏‏‏ ‏‏‏‏‏ ‏‏‏‏‏ ‏‏‏ ‏‏‏‏‏‏‏ ‏‏‏‏‏ ‏‏ ‏‏‏‏‏‏ ‏',
    aya_text_emlaey: 'صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين',
  },
  {
    id: '6217',
    jozz: '30',
    sura_no: '111',
    sura_name_en: 'Al-Masad',
    sura_name_ar: 'المَسَد',
    page: '603',
    line: '13',
    aya_no: '01',
    aya_text: '‏‏‏ ‏‏‏ ‏‏ ‏‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'تبت يدا أبي لهب وتب',
  },
  {
    id: '6218',
    jozz: '30',
    sura_no: '111',
    sura_name_en: 'Al-Masad',
    sura_name_ar: 'المَسَد',
    page: '603',
    line: '13',
    aya_no: '02',
    aya_text: '‏‏ ‏‏‏ ‏‏‏ ‏‏‏‏ ‏‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'ما أغنى عنه ماله وما كسب',
  },
  {
    id: '6219',
    jozz: '30',
    sura_no: '111',
    sura_name_en: 'Al-Masad',
    sura_name_ar: 'المَسَد',
    page: '603',
    line: '14',
    aya_no: '03',
    aya_text: '‏‏‏‏ ‏‏‏‏ ‏‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'سيصلى نارا ذات لهب',
  },
  {
    id: '6220',
    jozz: '30',
    sura_no: '111',
    sura_name_en: 'Al-Masad',
    sura_name_ar: 'المَسَد',
    page: '603',
    line: '14',
    aya_no: '04',
    aya_text: '‏‏‏‏‏‏‏‏ ‏‏‏‏ ‏‏‏‏ ‏',
    aya_text_emlaey: 'وامرأته حمالة الحطب',
  },
  {
    id: '6221',
    jozz: '30',
    sura_no: '111',
    sura_name_en: 'Al-Masad',
    sura_name_ar: 'المَسَد',
    page: '603',
    line: '15',
    aya_no: '05',
    aya_text: '‏ ‏‏‏‏‏ ‏‏‏ ‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'في جيدها حبل من مسد',
  },
  {
    id: '6222',
    jozz: '30',
    sura_no: '112',
    sura_name_en: 'Al-Ikhlāṣ',
    sura_name_ar: 'الإخلَاص',
    page: '604',
    line: '3',
    aya_no: '01',
    aya_text: '‏‏ ‏‏ ‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'قل هو الله أحد',
  },
  {
    id: '6223',
    jozz: '30',
    sura_no: '112',
    sura_name_en: 'Al-Ikhlāṣ',
    sura_name_ar: 'الإخلَاص',
    page: '604',
    line: '3',
    aya_no: '02',
    aya_text: '‏‏ ‏‏‏‏‏ ‏',
    aya_text_emlaey: 'الله الصمد',
  },
  {
    id: '6224',
    jozz: '30',
    sura_no: '112',
    sura_name_en: 'Al-Ikhlāṣ',
    sura_name_ar: 'الإخلَاص',
    page: '604',
    line: '3',
    aya_no: '03',
    aya_text: '‏‏ ‏‏ ‏‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'لم يلد ولم يولد',
  },
  {
    id: '6225',
    jozz: '30',
    sura_no: '112',
    sura_name_en: 'Al-Ikhlāṣ',
    sura_name_ar: 'الإخلَاص',
    page: '604',
    line: '4',
    aya_no: '04',
    aya_text: '‏‏‏ ‏‏‏ ‏‏ ‏‏‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'ولم يكن له كفوا أحد',
  },
  {
    id: '6226',
    jozz: '30',
    sura_no: '113',
    sura_name_en: 'Al-Falaq',
    sura_name_ar: 'الفَلَق',
    page: '604',
    line: '7',
    aya_no: '01',
    aya_text: '‏‏ ‏‏‏‏ ‏‏‏ ‏‏‏‏‏ ‏',
    aya_text_emlaey: 'قل أعوذ برب الفلق',
  },
  {
    id: '6227',
    jozz: '30',
    sura_no: '113',
    sura_name_en: 'Al-Falaq',
    sura_name_ar: 'الفَلَق',
    page: '604',
    line: '7',
    aya_no: '02',
    aya_text: '‏‏ ‏‏ ‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'من شر ما خلق',
  },
  {
    id: '6228',
    jozz: '30',
    sura_no: '113',
    sura_name_en: 'Al-Falaq',
    sura_name_ar: 'الفَلَق',
    page: '604',
    line: '8',
    aya_no: '03',
    aya_text: '‏‏‏ ‏‏ ‏‏‏ ‏‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'ومن شر غاسق إذا وقب',
  },
  {
    id: '6229',
    jozz: '30',
    sura_no: '113',
    sura_name_en: 'Al-Falaq',
    sura_name_ar: 'الفَلَق',
    page: '604',
    line: '8',
    aya_no: '04',
    aya_text: '‏‏‏ ‏‏ ‏‏‏‏‏ ‏ ‏‏‏‏‏ ‏',
    aya_text_emlaey: 'ومن شر النفاثات في العقد',
  },
  {
    id: '6230',
    jozz: '30',
    sura_no: '113',
    sura_name_en: 'Al-Falaq',
    sura_name_ar: 'الفَلَق',
    page: '604',
    line: '9',
    aya_no: '05',
    aya_text: '‏‏‏ ‏‏ ‏‏‏‏ ‏‏‏ ‏‏‏ ‏',
    aya_text_emlaey: 'ومن شر حاسد إذا حسد',
  },
  {
    id: '6231',
    jozz: '30',
    sura_no: '114',
    sura_name_en: 'An-Nās',
    sura_name_ar: 'النَّاس',
    page: '604',
    line: '12',
    aya_no: '01',
    aya_text: '‏‏ ‏‏‏‏ ‏‏‏ ‏‏‏‏ ‏',
    aya_text_emlaey: 'قل أعوذ برب الناس',
  },
  {
    id: '6232',
    jozz: '30',
    sura_no: '114',
    sura_name_en: 'An-Nās',
    sura_name_ar: 'النَّاس',
    page: '604',
    line: '12',
    aya_no: '02',
    aya_text: '‏‏‏ ‏‏‏‏ ‏',
    aya_text_emlaey: 'ملك الناس',
  },
  {
    id: '6233',
    jozz: '30',
    sura_no: '114',
    sura_name_en: 'An-Nās',
    sura_name_ar: 'النَّاس',
    page: '604',
    line: '13',
    aya_no: '03',
    aya_text: '‏‏‏ ‏‏‏‏ ‏',
    aya_text_emlaey: 'إله الناس',
  },
  {
    id: '6234',
    jozz: '30',
    sura_no: '114',
    sura_name_en: 'An-Nās',
    sura_name_ar: 'النَّاس',
    page: '604',
    line: '13',
    aya_no: '4',
    aya_text: '‏‏ ‏‏ ‏‏‏‏‏‏‏ ‏‏‏‏‏ ‏',
    aya_text_emlaey: 'من شر الوسواس الخناس',
  },
  {
    id: '6235',
    jozz: '30',
    sura_no: '114',
    sura_name_en: 'An-Nās',
    sura_name_ar: 'النَّاس',
    page: '604',
    line: '14',
    aya_no: '05',
    aya_text: '‏‏‏ ‏‏‏‏‏ ‏ ‏‏‏‏‏ ‏‏‏‏ ‏',
    aya_text_emlaey: 'الذي يوسوس في صدور الناس',
  },
  {
    id: '6236',
    jozz: '30',
    sura_no: '114',
    sura_name_en: 'An-Nās',
    sura_name_ar: 'النَّاس',
    page: '604',
    line: '15',
    aya_no: '06',
    aya_text: '‏‏ ‏‏‏‏ ‏‏‏‏‏ ‏',
    aya_text_emlaey: 'من الجنة والناس',
  },
];
const Item = ({title, aya_text, onPress}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View style={styles.item}>
      <Text style={styles.aya}>{title}</Text>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 50, height: 50, backgroundColor: '#f9c2ff'}}
          source={require('./assets/listen.png')}
        />
        <Image
          style={{
            marginStart: 20,
            width: 50,
            height: 50,
            backgroundColor: '#f9c2ff',
          }}
          source={require('./assets/text.png')}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const SurahDetails = props => {
  const list = {
    '01_01_00': [
      'يراعى في البسملة كسر الباء جيدا  بِسْمِ',

      '{الرَّحْمَـٰنِ الرَّحِيمِ} اخفاء الراء في ',

      'عدم قراءة البسملة أو نسيانها وهي آية عند حفص:  {بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ}',
    ],

    '01_01_01': [
      'وذلك بتحريك الفك لأسفل',

      'ضم الشفتين عند النطق بالراء في كلمة {الرَّحْمَـٰنِ الرَّحِيمِ}',

      '  تذكرها ',
    ],

    '01_02_00': [
      '{الْعَالَمِينَ}مد غير مشروع',

      '{تسكين كلمة{رب',

      'عدم كسر لله ',
    ],

    '01_02_01': ['المد حركتين', 'كسرها', 'ترقيقها لله لانها مكسورة '],

    '111_01_00': [
      'التاء الساكنة في كلمة تبت ',

      'عدم قلقلة الباء المشددة',

      'يدآ أبي مد واجب منفصل ',
    ],

    '111_01_01': [
      'الهمس في كلمة تبت ',

      'قلقلة الباء في كبمة تبت ',

      'يمد حركتين أو اربع حركات ',
    ],

    '112_02_00': [
      'تخفيف حرف القاف في قل ',

      'ضم أو كسر لام قل ',

      'قلقلة كلمة احد ',
    ],

    '112_02_01': [
      'القاف مفخمة فى الدرجة الثالثة لأنها مضمومة',

      'لام (قُلْ ) ساكنة مظهرة جاء بعدها حرف الهاء',

      ' الدال تسكن عند الوقف ويجب فيها القلقلة',
    ],

    '113_01_00': [
      'ادغام قل بهمزة كلمة أعوذ',

      'الفتح في كلمة برب ',

      'قلقلة كلمة الفلق ',
    ],

    '113_01_01': [
      'تحقيق الهمزة مع فتحها ',

      'مراعاة حقيق الحركات ',

      'القاف تسكن عند الوقف و تقلقل ',
    ],

    '114_02_00': [
      'تخفيف حرف القاف في قل ',

      'ادغام قل بهمزة كلمة أعوذ',

      'الناس سرعة قرائتها و سقوط الحكم التجويدي   ',
    ],

    '114_02_01': [
      'القاف مفخمة فى الدرجة الثالثة لأنها مضمومة',

      'تحقيق الهمزة مع فتحها ',

      'غنة مقدارها حركتين في الناس ',
    ],
  };
  const isDarkMode = useColorScheme() === 'dark';
  const [visibleCorrect, setVisibleCorrect] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const getSurahAya = (sura_no, ayah_no) => {
    
    return DATA.filter(
      item => item.sura_no === sura_no && item.aya_no === ayah_no,
    )[0].aya_text;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header centerComponent={{text: props.title, style: {color: '#fff'}}} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Text style={styles.aya}>
          {getSurahAya(props.sura_no, props.ayah_no)}
        </Text>
        <View
          style={{
            marginTop: 50,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisibleCorrect(!visibleCorrect);
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={require('./assets/correct.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisibleError(!visibleError);
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={require('./assets/wrong.png')}
            />
          </TouchableOpacity>
          <Image
            style={{width: 50, height: 50}}
            source={require('./assets/listen.png')}
          />
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={require('./assets/text.png')}
          />
        </View>
        <BottomSheet
          isVisible={visibleError}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
          {props.sura_no &&  list[props.sura_no + '_' + props.ayah_no + '_00'] &&
            list[props.sura_no + '_' + props.ayah_no + '_00'].map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}>
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>{l}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          <ListItem onPress={() => setVisibleError(false)}>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{'الغاء'}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </BottomSheet>
        <BottomSheet
          isVisible={visibleCorrect}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
          {props.sura_no &&
            list[props.sura_no + '_' + props.ayah_no + '_01'] &&
            list[props.sura_no + '_' + props.ayah_no + '_01'].map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}>
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>{l}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          <ListItem onPress={() => setVisibleCorrect(false)}>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{'الغاء'}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: 'center',
  },
  aya: {
    fontSize: 32,
    // fontFamily: 'KFGQPC Hafs Smart',
    fontFamily:
      Platform.OS === 'android' ? 'HafsSmart_08' : 'KFGQPC Hafs Smart',

    textAlign: 'center',
  },
});

export default SurahDetails;

/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import Home from './App';
import SurahDetails from './SurahDetail';
import SurahSelection from './SurahSelection';
import AyahSelection from './AyahSelection';
import AyahDetails from './AyahDetails';


Navigation.registerComponent('AyahDetails', () => AyahDetails);

Navigation.registerComponent('WelcomeScreen', () => SurahSelection);
Navigation.registerComponent('AyahSelection', () => AyahSelection);
Navigation.registerComponent('SurahDetails', () => SurahDetails);
Navigation.registerComponent('Home', () => Home);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});

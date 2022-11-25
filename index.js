/**
 * @format
 */
import * as React from 'react';

import {AppRegistry} from 'react-native';
import App from './App';
import { LogBox } from "react-native"
import {name as appName} from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
LogBox.ignoreAllLogs()
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#f5a04c',
      accent: 'yellow',
      onPrimary: '#fff',
    surface: '#fff',
    onSurface: '#000',
    },
  };
  
export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
// AppRegistry.runApplication("App", {
//   rootTag: document.getElementById("root")
// });

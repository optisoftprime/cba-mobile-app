// config/statusBar.js
import { StatusBar, View } from 'react-native';
import { Colors } from 'config/theme';

export function GlobalStatusBar({
  style = 'dark-content',
  backgroundColor = Colors?.background
}) {
  return (
    <View></View>
  );
}
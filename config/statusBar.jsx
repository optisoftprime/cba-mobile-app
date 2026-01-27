// config/statusBar.js
import { StatusBar } from 'react-native';
import { Colors } from 'config/theme';

export function GlobalStatusBar({ 
  style = 'dark-content', 
  backgroundColor = Colors?.background 
}) {
  return (
    <StatusBar 
      barStyle={style}
      backgroundColor={backgroundColor}
    />
  );
}
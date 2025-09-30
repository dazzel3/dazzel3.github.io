import './src/assets/styles/font.css';
import 'prismjs/themes/prism-solarizedlight.css';
import { DarkModeProvider } from './src/context/DarkModeContext';

export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
);
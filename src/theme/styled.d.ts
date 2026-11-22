import 'styled-components/native';

import { theme } from './Theme';

type AppTheme = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}

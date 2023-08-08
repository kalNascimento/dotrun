import 'react-native-gesture-handler';
import { BodyTemplate } from './src/components/bodyTemplate';
import { Home } from './src/screens/home';

export default function App() {
  return (
    <BodyTemplate>
      <Home></Home>
    </BodyTemplate>
  );
}

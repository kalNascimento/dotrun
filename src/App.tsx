import 'react-native-gesture-handler';
import { BodyTemplate } from './components/bodyTemplate';
import { Home } from './screens/home';

export default function App() {
  return (
    <BodyTemplate>
      <Home></Home>
    </BodyTemplate>
  );
}

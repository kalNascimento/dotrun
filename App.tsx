import 'react-native-gesture-handler';
import { BodyTemplate } from './src/components/bodyTemplate';
import { Home } from './src/screens/home';
import { View, Text, Image } from 'react-native';

const header = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginHorizontal: 16 }}>
      <Text>logo</Text>
      <Text>menu</Text>
    </View>
  )
}

export default function App() {
  return (
    <BodyTemplate header={header()}>
      <Home></Home>
    </BodyTemplate>
  );
}

// Mocks dos módulos nativos que não existem no ambiente do Jest.
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');

  const createMock = (name) => {
    const Component = ({ children, ...props }) => React.createElement(View, props, children);
    Component.displayName = name;
    return Component;
  };

  const MapView = createMock('MapView');

  return {
    __esModule: true,
    default: MapView,
    MapView,
    Marker: createMock('Marker'),
    Polyline: createMock('Polyline'),
    PROVIDER_DEFAULT: null,
    PROVIDER_GOOGLE: 'google',
  };
});

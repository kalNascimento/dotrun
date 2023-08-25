import { render } from '@testing-library/react-native';
import { LoginForm } from '.';

describe('screens/Auth/LoginForm', () => {
  test('Renderizando LoginForm', () => {
    const component = render(<LoginForm />)
  });
});
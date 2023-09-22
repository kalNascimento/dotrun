import { fireEvent, renderWithNavigation, screen, waitFor } from "src/__tests__/test-utils/test-utils";
import { LoginForm } from "src/screens/Auth/LoginForm";
import { signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
}));

jest.mock('@configs/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn()
  }
}));

jest.mock("@assets/icons/facebook_logo.svg", () => 'FacebookIcon')
jest.mock("@assets/icons/google_group.svg", () => 'GoogleIcon')
jest.mock("@assets/icons/twitter_group.svg", () => 'TwitterIcon')
jest.mock("@assets/icons/dotRUN.svg", () => 'LogoIcon')

describe('screens/Auth/LoginForm', () => {

  beforeEach(() => {
    renderWithNavigation(<LoginForm></LoginForm>)
  });

  test('Should LoginForm is rendered', async () => {
    const form = screen.queryByTestId('login-form');

    expect(form).toBeOnTheScreen();
  });

  test('Should LoginForm is rendered with Login button', async () => {
    const button = screen.queryByText('Login');

    expect(button).toBeOnTheScreen();
  });

  test('Should display error messages when clicking login button without input', async () => {
    const button = screen.getByTestId('custom-outline-button');

    fireEvent.press(button);
  
    await waitFor(() => {
      const errorPassword = screen.queryByTestId('custom-password-input-error-text');
      const errorText = screen.queryByTestId('custom-text-input-error-text');

      expect(errorPassword).toBeOnTheScreen();
      expect(errorText).toBeOnTheScreen();
    });
  });

  test('Should update email and password input values when typing', async () => {
    const loginButton = screen.getByText('Login');

    const emailInput = screen.getByTestId('custom-text-input-content'); 
    const passwordInput = screen.getByTestId('custom-password-input-content');

    fireEvent.changeText(emailInput, 'john.doe@test.com');
    fireEvent.changeText(passwordInput, 'test@123');
    
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(emailInput.props.value).toBe('john.doe@test.com');
      expect(passwordInput.props.value).toBe('test@123');
    });
  });

  test('Should call signInWithEmailAndPassword when clicking login button with valid input', async () => {
    const loginButton = screen.getByText('Login');

    const emailInput = screen.getByTestId('custom-text-input-content'); 
    const passwordInput = screen.getByTestId('custom-password-input-content');

    fireEvent.changeText(emailInput, 'john.doe@test.com');
    fireEvent.changeText(passwordInput, 'test@123');
    
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toBeCalled();
    });
  });
});
import { render, screen } from "src/__tests__/test-utils/test-utils";
import { LoginForm } from "src/screens/Auth/LoginForm";

jest.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: jest.fn(() => { })
  };
});

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
    render(<LoginForm></LoginForm>)
  });

  test('Should LoginForm is rendered', async () => {
    const form = screen.queryByTestId('login-form');

    expect(form).toBeOnTheScreen();
  });
});
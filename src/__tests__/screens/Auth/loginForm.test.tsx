import { render } from "src/__tests__/test-utils/test-utils";
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

describe('screens/Auth/LoginForm', () => {

  test('should LoginForm is rendered', () => {
    render(<LoginForm></LoginForm>)
  });
});
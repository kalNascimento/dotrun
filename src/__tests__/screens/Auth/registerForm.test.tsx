import { fireEvent, renderWithNavigation, screen, waitFor } from "src/__tests__/test-utils/test-utils";
import { RegisterForm } from "src/screens/Auth/RegisterForm";
import { createUserWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
}));

jest.mock('@configs/firebase', () => ({
  auth: {}
}));

jest.mock("@assets/icons/facebook_logo.svg", () => 'FacebookIcon')
jest.mock("@assets/icons/google_group.svg", () => 'GoogleIcon')
jest.mock("@assets/icons/twitter_group.svg", () => 'TwitterIcon')
jest.mock("@assets/icons/dotRUN.svg", () => 'LogoIcon')

async function fillForm(password: string, confirmPassword: string) {
  const emailInput = screen.getByTestId('custom-text-input-content');
  const [passwordInput, confirmInput] = screen.getAllByTestId('custom-password-input-content');

  await fireEvent.changeText(emailInput, 'john.doe@test.com');
  await fireEvent.changeText(passwordInput, password);
  await fireEvent.changeText(confirmInput, confirmPassword);
  await fireEvent.press(screen.getByText('Cadastrar'));
}

describe('screens/Auth/RegisterForm', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await renderWithNavigation(<RegisterForm />);
  });

  test('Should show an error and not register when passwords differ', async () => {
    await fillForm('senha1234', 'outra1234');

    await waitFor(() => {
      expect(screen.getByText('Senha e confirmar senha precisam ser iguais')).toBeOnTheScreen();
    });
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  test('Should reject passwords shorter than 8 characters', async () => {
    await fillForm('123', '123');

    await waitFor(() => {
      expect(screen.getAllByText('A senha deve ter pelo menos 8 caracteres').length).toBeGreaterThan(0);
    });
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  test('Should register when the form is valid', async () => {
    await fillForm('senha1234', 'senha1234');

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'john.doe@test.com', 'senha1234');
    });
  });
});

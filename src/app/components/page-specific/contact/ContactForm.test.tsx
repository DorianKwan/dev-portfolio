import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { theme } from '~/theme/theme';
import { ContactForm } from './ContactForm';
import '@testing-library/jest-dom';

const renderForm = (onClose = jest.fn()) =>
  render(
    <ThemeProvider theme={theme}>
      <ContactForm onClose={onClose} />
    </ThemeProvider>,
  );

const fillForm = ({
  name = 'Test User',
  email = 'test@example.com',
  message = 'Hello from tests',
} = {}) => {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: name } });
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: message },
  });
};

const submitForm = () => {
  const button = screen.getByRole('button', { name: /send message/i });
  fireEvent.submit(button.closest('form')!);
};

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('rendering', () => {
    it('renders name, email, and message fields', () => {
      renderForm();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('renders a submit button with "Send Message" label', () => {
      renderForm();
      expect(
        screen.getByRole('button', { name: /send message/i }),
      ).toBeInTheDocument();
    });
  });

  describe('field interaction', () => {
    it('updates the name field on input', () => {
      renderForm();
      const input: HTMLInputElement = screen.getByLabelText('Name');
      fireEvent.change(input, { target: { value: 'Bryce' } });
      expect(input.value).toBe('Bryce');
    });

    it('updates the email field on input', () => {
      renderForm();
      const input: HTMLInputElement = screen.getByLabelText('Email');
      fireEvent.change(input, { target: { value: 'bryce@example.com' } });
      expect(input.value).toBe('bryce@example.com');
    });

    it('updates the message field on input', () => {
      renderForm();
      const input: HTMLInputElement = screen.getByLabelText('Message');
      fireEvent.change(input, { target: { value: "Let's work together" } });
      expect(input.value).toBe("Let's work together");
    });
  });

  describe('submission', () => {
    it('shows loading state and disables all inputs while submitting', async () => {
      (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
      renderForm();

      fillForm();
      submitForm();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
        expect(screen.getByLabelText('Name')).toBeDisabled();
        expect(screen.getByLabelText('Email')).toBeDisabled();
        expect(screen.getByLabelText('Message')).toBeDisabled();
      });
    });

    it('shows success state after a successful submission', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });
      renderForm();

      fillForm();
      submitForm();

      await waitFor(() => {
        expect(screen.getByText('Message Sent!')).toBeInTheDocument();
        expect(
          screen.getByText(/thanks for reaching out/i),
        ).toBeInTheDocument();
      });
    });

    it('calls onClose when the close button is clicked after success', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });
      const onClose = jest.fn();
      renderForm(onClose);

      fillForm();
      submitForm();

      await waitFor(() => screen.getByRole('button', { name: /close/i }));
      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('shows the API error message when the response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({
          success: false,
          error: 'All fields are required',
        }),
      });
      renderForm();

      fillForm();
      submitForm();

      await waitFor(() => {
        expect(screen.getByText('All fields are required')).toBeInTheDocument();
      });
    });

    it('shows a fallback error message when the request throws', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
      renderForm();

      fillForm();
      submitForm();

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    it('shows a fallback error message for non-Error throws', async () => {
      (global.fetch as jest.Mock).mockRejectedValue('unexpected');
      renderForm();

      fillForm();
      submitForm();

      await waitFor(() => {
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      });
    });
  });
});

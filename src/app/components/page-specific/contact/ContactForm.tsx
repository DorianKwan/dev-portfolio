import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme/theme';
import { hexToRGBA, pxToRem } from '~/theme/utils';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactFormProps {
  onClose: () => void;
}

export const ContactForm = ({ onClose }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json()) as { success: boolean; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong',
      );
    }
  };

  if (status === 'success') {
    return (
      <SuccessWrapper>
        <SuccessHeading>Message Sent!</SuccessHeading>
        <SuccessText>
          Thanks for reaching out — I&apos;ll get back to you shortly.
        </SuccessText>
        <SubmitButton type="button" onClick={onClose}>
          Close
        </SubmitButton>
      </SuccessWrapper>
    );
  }

  return (
    <Form onSubmit={e => void handleSubmit(e)} noValidate>
      <FormGroup>
        <FormLabel htmlFor="contact-name">Name</FormLabel>
        <FormInput
          id="contact-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={status === 'loading'}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="contact-email">Email</FormLabel>
        <FormInput
          id="contact-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="contact-message">Message</FormLabel>
        <FormTextarea
          id="contact-message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          rows={5}
          required
          disabled={status === 'loading'}
        />
      </FormGroup>
      {status === 'error' && <ErrorText>{errorMessage}</ErrorText>}
      <SubmitButton type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </SubmitButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const FormLabel = styled.label`
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.white};
`;

const inputStyles = css`
  width: 100%;
  background: ${hexToRGBA(theme.colors.white, 0.04)};
  border: ${pxToRem(1)} solid ${hexToRGBA(theme.colors.white, 0.15)};
  color: ${hexToRGBA(theme.colors.white, 0.85)};
  padding: 0.65rem 0.875rem;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 200ms ease-in-out;

  &::placeholder {
    color: ${hexToRGBA(theme.colors.white, 0.3)};
  }

  &:focus {
    border-color: ${theme.colors.lightPurple};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FormInput = styled.input`
  ${inputStyles}
`;

const FormTextarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 7.5rem;
`;

const SubmitButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.bluePurple};
  color: ${({ theme }) => theme.colors.white};
  border: ${pxToRem(1)} solid ${({ theme }) => theme.colors.bluePurple};
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.325rem;
  cursor: pointer;
  transition: filter 200ms ease-in-out;
  margin-top: 0.25rem;

  &::after {
    content: '';
    position: absolute;
    height: 0.25rem;
    width: 0;
    bottom: -0.125rem;
    left: 0;
    background-color: ${theme.colors.lightPurple};
    transition: width 250ms ease-in-out;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    filter: brightness(125%);

    &::after {
      width: 100%;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.errorText};
  font-size: 0.875rem;
`;

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 0;
`;

const SuccessHeading = styled.h3`
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0.05em;
`;

const SuccessText = styled.p`
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

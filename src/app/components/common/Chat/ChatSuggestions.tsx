import styled from '@emotion/styled';
import { theme } from '~/theme/theme';
import { hexToRGBA } from '~/theme/utils';

const SUGGESTIONS = [
  'Tell me about your experience',
  "What's your tech stack?",
  'What are you looking for?',
  "What's your availability?",
];

interface Props {
  visible: boolean;
  onSelect: (text: string) => void;
}

export const ChatSuggestions = ({ visible, onSelect }: Props) => {
  if (!visible) return null;

  return (
    <Row>
      {SUGGESTIONS.map(s => (
        <Chip key={s} onClick={() => onSelect(s)}>
          {s}
        </Chip>
      ))}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 0 0.25rem;
`;

const Chip = styled.button`
  background: transparent;
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.2)};
  color: ${hexToRGBA(theme.colors.white, 0.65)};
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 150ms ease-in-out,
    border-color 150ms ease-in-out;

  &:hover {
    color: ${theme.colors.white};
    border-color: ${hexToRGBA(theme.colors.white, 0.45)};
  }
`;

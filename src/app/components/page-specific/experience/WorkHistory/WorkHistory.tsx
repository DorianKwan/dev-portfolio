import styled from '@emotion/styled';
import { Heading } from '~/app/components/common/Heading/Heading';
import { theme } from '~/theme/theme';
import { hexToRGBA, interpolateHex, pxToRem } from '~/theme/utils';
import { workHistoryData } from './workHistory.data';

const renderBullet = (text: string): React.ReactNode => {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      // static content; no concerns with performance
      // eslint-disable-next-line react/no-array-index-key
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
};

export const WorkHistory: React.FC = () => {
  const total = workHistoryData.length;

  return (
    <WorkHistoryContainer>
      {workHistoryData.map(({ key, company, role, time, bullets }, i) => {
        const accentColor = interpolateHex(
          theme.colors.experienceOne,
          theme.colors.experienceFive,
          total > 1 ? i / (total - 1) : 0,
        );
        return (
          <Entry
            key={key}
            style={{ '--accent-color': accentColor } as React.CSSProperties}>
            <EntryHeader>
              <EntryLeft>
                <Heading type="h2" fontSize="2rem">
                  {company}
                </Heading>
                <EntryRole>{role}</EntryRole>
              </EntryLeft>
              <EntryTime>{time}</EntryTime>
            </EntryHeader>
            <EntryBullets>
              {bullets.map((bullet, j) => (
                // static content; no concerns with performance
                // eslint-disable-next-line react/no-array-index-key
                <li key={j}>{renderBullet(bullet)}</li>
              ))}
            </EntryBullets>
          </Entry>
        );
      })}
    </WorkHistoryContainer>
  );
};

const WorkHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: ${pxToRem(1000)};
  margin: 3rem 0;
`;

const Entry = styled.div`
  border-left: 3px solid var(--accent-color);
  padding-left: 1.75rem;
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const EntryLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const EntryRole = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
  font-weight: 500;
`;

const EntryTime = styled.small`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.5)};
  white-space: nowrap;
  padding-top: 0.5rem;
`;

const EntryBullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.75;
    color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.8)};
    font-size: 1rem;

    &::before {
      content: '—';
      position: absolute;
      left: 0;
      color: var(--accent-color);
    }
  }
`;

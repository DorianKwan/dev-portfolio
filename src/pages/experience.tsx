import { useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Heading } from '~/app/components/common/Heading/Heading';
import { Page } from '~/app/components/layout/Page/Page';
import { Timeline } from '~/app/components/page-specific/experience/Timeline/Timeline';
import { WorkHistory } from '~/app/components/page-specific/experience/WorkHistory/WorkHistory';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme/theme';
import { hexToRGBA } from '~/theme/utils';

type View = 'work-history' | 'timeline';

const Experience: React.FC = () => {
  const [view, setView] = useState<View>('work-history');

  return (
    <Page>
      <ExperienceLayout>
        <Heading>Experience</Heading>
        <ToggleGroup role="group" aria-label="View toggle">
          <ToggleButton
            active={view === 'work-history'}
            onClick={() => setView('work-history')}>
            Work History
          </ToggleButton>
          <ToggleButton
            active={view === 'timeline'}
            onClick={() => setView('timeline')}>
            Timeline
          </ToggleButton>
        </ToggleGroup>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            {view === 'work-history' ? <WorkHistory /> : <Timeline />}
          </motion.div>
        </AnimatePresence>
      </ExperienceLayout>
    </Page>
  );
};

export default Experience;

const ExperienceLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleGroup = styled.div`
  display: flex;
  width: fit-content;
  border: 1px solid ${hexToRGBA(theme.colors.white, 0.12)};
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1.5rem;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 2rem;
  background: ${({ active }) =>
    active
      ? `linear-gradient(to right, ${theme.colors.experienceOne}, ${theme.colors.experienceFive})`
      : 'transparent'};
  color: ${({ active }) =>
    active ? theme.colors.white : hexToRGBA(theme.colors.white, 0.4)};
  border: none;
  cursor: pointer;
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  transition:
    background 200ms ease,
    color 200ms ease;

  &:not(:last-child) {
    border-right: 1px solid ${hexToRGBA(theme.colors.white, 0.12)};
  }

  &:hover {
    color: ${theme.colors.white};
  }
`;

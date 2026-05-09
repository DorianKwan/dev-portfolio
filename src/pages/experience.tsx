import { useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Heading } from '~/app/components/common/Heading/Heading';
import { Page } from '~/app/components/layout/Page/Page';
import { Skills } from '~/app/components/page-specific/experience/Skills/Skills';
import { Timeline } from '~/app/components/page-specific/experience/Timeline/Timeline';
import { WorkHistory } from '~/app/components/page-specific/experience/WorkHistory/WorkHistory';
import { BebasNeue } from '~/app/fonts';
import { theme } from '~/theme/theme';
import { hexToRGBA } from '~/theme/utils';

type View = 'work-history' | 'skills' | 'timeline';

const VIEWS: View[] = ['work-history', 'skills', 'timeline'];

const Experience: React.FC = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const queryView = router.query.view;
  const view: View = VIEWS.includes(queryView as View)
    ? (queryView as View)
    : 'work-history';

  const setView = (newView: View) => {
    if (isPending) return;

    setIsPending(true);

    router
      .replace({ query: { view: newView } }, undefined, {
        shallow: true,
      })
      .then(() => {
        setIsPending(false);
      })
      .catch(e => console.error(e));
  };

  return (
    <Page>
      <ExperienceLayout>
        <Heading>Experience</Heading>
        <Overview>
          High agency senior full-stack engineer (~9 years experience) who
          thrives in ambiguity. Deep expertise in TypeScript, React, Node.js,
          system architecture, cloud infrastructure, DevOps tooling, and applied
          AI workflows.
        </Overview>
        <Divider />
        <ToggleGroup role="group" aria-label="View toggle">
          <ToggleButton
            active={router.isReady && view === 'work-history'}
            disabled={isPending}
            onClick={() => setView('work-history')}>
            Work History
          </ToggleButton>
          <ToggleButton
            active={router.isReady && view === 'skills'}
            disabled={isPending}
            onClick={() => setView('skills')}>
            Skills
          </ToggleButton>
          <ToggleButton
            active={router.isReady && view === 'timeline'}
            disabled={isPending}
            onClick={() => setView('timeline')}>
            Timeline
          </ToggleButton>
        </ToggleGroup>
        <AnimatePresence mode="wait">
          {router.isReady && (
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '100%',
                display: 'flex',
                placeContent: 'center',
              }}>
              {view === 'work-history' ? (
                <WorkHistory />
              ) : view === 'skills' ? (
                <Skills />
              ) : (
                <Timeline />
              )}
            </motion.div>
          )}
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

const Overview = styled.p`
  max-width: 70ch;
  margin-top: 1rem;
  padding-bottom: 1rem;
  line-height: 1.75;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
  text-align: center;
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 70ch;
  margin: 0;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border: none;
  border-top: 1px solid ${({ theme }) => hexToRGBA(theme.colors.white, 0.1)};
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
  padding: 0.875rem 2rem 0.75rem 2rem;
  display: grid;
  place-content: center;
  background: ${({ active }) =>
    active
      ? `linear-gradient(to right, ${theme.colors.experienceOne}, ${theme.colors.experienceFive})`
      : 'transparent'};
  color: ${({ active }) =>
    active ? theme.colors.white : hexToRGBA(theme.colors.white, 0.4)};
  border: none;
  cursor: pointer;
  font-family: ${BebasNeue.style.fontFamily};
  font-size: 1.125rem;
  letter-spacing: 0.1em;
  line-height: 1;
  transition:
    background 200ms ease,
    color 200ms ease;

  &:not(:last-child) {
    border-right: 1px solid ${hexToRGBA(theme.colors.white, 0.12)};
  }

  &:hover:not(:disabled) {
    color: ${theme.colors.white};
  }

  &:disabled {
    cursor: default;
  }
`;

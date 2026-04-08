import { Heading } from '~/app/components/common/Heading/Heading';
import { Page } from '~/app/components/layout/Page/Page';
import { PageContainer } from '~/app/components/page-shared/shared.styled';
import { Timeline } from '~/app/components/page-specific/experience/Timeline/Timeline';

const Experience: React.FC = () => {
  return (
    <Page>
      <PageContainer>
        <Heading>Experience</Heading>
        <Timeline />
      </PageContainer>
    </Page>
  );
};

export default Experience;

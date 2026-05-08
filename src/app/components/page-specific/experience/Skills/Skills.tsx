import styled from '@emotion/styled';
import { theme } from '~/theme/theme';
import { hexToRGBA, pxToRem } from '~/theme/utils';
import { PREFERRED_SKILLS, skillsData } from './skills.data';

export const Skills: React.FC = () => (
  <SkillsGrid>
    {skillsData.map(({ label, skills }) => (
      <Category key={label}>
        <CategoryLabel>{label}</CategoryLabel>
        <ChipRow>
          {skills.map(skill => (
            <Chip key={skill} preferred={PREFERRED_SKILLS.has(skill)}>
              {skill}
            </Chip>
          ))}
        </ChipRow>
      </Category>
    ))}
  </SkillsGrid>
);

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
  width: 100%;
  max-width: ${pxToRem(1000)};
  margin-top: 3rem;

  @media only screen and (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.9)};
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Chip = styled.span<{ preferred: boolean }>`
  padding: 0.2rem 0.6rem;
  border: 1px solid
    ${({ preferred, theme }) =>
      preferred
        ? theme.colors.experienceOne
        : hexToRGBA(theme.colors.white, 0.12)};
  border-radius: 2px;
  font-size: 0.85rem;
  color: ${({ preferred, theme }) =>
    preferred ? theme.colors.white : hexToRGBA(theme.colors.white, 0.65)};
  background: ${({ preferred, theme }) =>
    preferred ? hexToRGBA(theme.colors.experienceOne, 0.12) : 'transparent'};
  white-space: nowrap;
`;

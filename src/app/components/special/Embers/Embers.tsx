import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { loadBasic } from '@tsparticles/basic';
import { loadExternalPushInteraction } from '@tsparticles/interaction-external-push';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { particleOptions } from './particle.options';

export const Embers: React.FC = () => {
  const [particlesInitialized, setParticlesInitialized] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async engine => {
      const shouldRefresh = false;

      await loadBasic(engine, shouldRefresh);
      await loadExternalPushInteraction(engine, shouldRefresh);
    }).then(() => {
      setParticlesInitialized(true);
    });
  }, []);

  if (particlesInitialized) {
    return <StyledParticles id="tsparticles" options={particleOptions} />;
  }

  return <></>;
};

const StyledParticles = styled(Particles)`
  position: absolute;
  z-index: -1;
`;

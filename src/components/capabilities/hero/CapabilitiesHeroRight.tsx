import React from 'react';
import { useDevToggles, type CapabilitiesHeroVariant } from '../../../devToggles';
import CapabilitiesHeroOrbital from './CapabilitiesHeroOrbital';
import CapabilitiesHeroStaggered from './CapabilitiesHeroStaggered';
import CapabilitiesHeroVortex from './CapabilitiesHeroVortex';

export default function CapabilitiesHeroRight({ variant }: { variant?: CapabilitiesHeroVariant }) {
  const { toggles } = useDevToggles();
  const v = variant ?? toggles.capabilitiesHeroVariant;
  
  let Content;
  if (v === 'orbital') Content = <CapabilitiesHeroOrbital />;
  else if (v === 'staggered') Content = <CapabilitiesHeroStaggered />;
  else Content = <CapabilitiesHeroVortex />;

  return (
    <div style={{
      width: '45%',
      height: '100%',
      position: 'relative',
      overflow: 'visible',
      paddingRight: '60px',
      flexShrink: 0,
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {Content}
    </div>
  );
}

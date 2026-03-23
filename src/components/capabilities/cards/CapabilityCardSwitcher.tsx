import React from 'react';
import { useDevToggles } from '../../../devToggles';
import CapabilityCardFlip from './CapabilityCardFlip';
import CapabilityCardSlideUp from './CapabilityCardSlideUp';

export interface UnifiedCapabilityCardProps {
  title: string;
  desc: string;
  href: string;
  img: string;
  index: number;
  theme?: 'teal' | 'burgundy';
}

export default function CapabilityCardSwitcher(props: UnifiedCapabilityCardProps) {
  const { toggles } = useDevToggles();
  const v = toggles.cardHoverVariant;
  
  if (v === 'flip') return <CapabilityCardFlip {...props} />;
  return <CapabilityCardSlideUp {...props} />;
}

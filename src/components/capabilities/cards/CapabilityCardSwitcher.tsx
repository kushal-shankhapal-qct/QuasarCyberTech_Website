import React from 'react';
import CapabilityCardFlip from './CapabilityCardFlip';

export interface UnifiedCapabilityCardProps {
  title: string;
  desc: string;
  href: string;
  img: string;
  index: number;
  theme?: 'teal' | 'burgundy';
}

export default function CapabilityCardSwitcher(props: UnifiedCapabilityCardProps) {
  return <CapabilityCardFlip {...props} />;
}

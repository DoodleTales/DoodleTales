'use client';

import FuzzyText from '@/components/FuzzyText';

export default function NotFound() {

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen gap-10'>
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.5}
          enableHover={true}
          fontSize='clamp(1rem, 2rem, 2rem)'
        >
          404
        </FuzzyText>
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.5}
          enableHover={true}
          fontSize='clamp(1rem, 2rem, 2rem)'
        >
          Page Not Found
        </FuzzyText>
      </div>
    </>
  );
}
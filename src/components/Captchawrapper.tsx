'use client';

import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface HCaptchaWrapperProps {
  children: React.ReactNode;
}

export default function HCaptchaWrapper({ children }: HCaptchaWrapperProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);

  const onVerify = (token: string) => {
    // console.log('HCaptcha token:', token);
    setIsVerified(true);
    setShowCaptcha(false);
  };

  const onExpire = () => {
    setIsVerified(false);
    setShowCaptcha(true);
  };

  // Replace with your actual HCaptcha site key
  const HCAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '';

  if (showCaptcha && !isVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <HCaptcha
          sitekey={HCAPTCHA_SITE_KEY}
          onVerify={onVerify}
          onExpire={onExpire}
        />
      </div>
    );
  }

  return <>{children}</>;
}
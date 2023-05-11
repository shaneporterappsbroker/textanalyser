import { type AppType } from 'next/dist/shared/lib/utils';
import { useState, useEffect } from 'react';

import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <Component {...pageProps} />;
};

export default MyApp;

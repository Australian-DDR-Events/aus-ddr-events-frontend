import { useMediaQuery } from '@chakra-ui/react';
import { useAuthChanged } from 'hooks/use-auth-changed';
import React, { useEffect } from 'react';
import { useActiveProfile } from 'services/dancers';
import { useEvents } from 'services/events';

import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';

const Navigation = () => {
  const { trigger } = useAuthChanged();
  const [loading, , refresh, user] = useActiveProfile();
  const [, events] = useEvents();
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

  useEffect(() => {
    refresh();
  }, [trigger]);

  if (isLargerThan767)
    return <DesktopNav user={user} events={events} loading={loading} />;
  return <MobileNav user={user} events={events} loading={loading} />;
};

export default Navigation;

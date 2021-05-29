import { Box, Button, Container, Heading, Image } from '@chakra-ui/react';
import useAuthentication from 'hooks/use-authentication';
import React from 'react';
import useLocation from 'wouter/use-location';

import { getAssetUrl } from '../../utils/assets';
import AboutUs from './about-us';
import ContactUs from './contact-us';
import HowTo from './how-to';

const Home = () => {
  const [, setLocation] = useLocation();
  const { loggedInUser } = useAuthentication();
  return (
    <Container maxW="container.xl" centerContent p={8}>
      <Box align="center" mb={8}>
        <Heading size="lg">COMING SOON</Heading>
        <Image
          objectFit="cover"
          src={getAssetUrl(`/common/season-logo.png?event=supercars`)}
          alt="DDR V8 Supercars Logo"
        />
        <Heading as="h2" size="md">
          Start your engines for early July
        </Heading>
        {!loggedInUser && (
          <Button onClick={() => setLocation('/register')} mt={4}>
            Register now!
          </Button>
        )}
      </Box>

      <Box>
        <AboutUs />
      </Box>

      <Box>
        <HowTo />
      </Box>

      <Box>
        <ContactUs />
      </Box>
    </Container>
  );
};

export default Home;

import { Box, Button, Container, Heading, Image } from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import React, { useContext } from 'react';
import useLocation from 'wouter/use-location';

import { getAssetUrl } from '../../utils/assets';
import AboutUs from './about-us';
import ContactUs from './contact-us';
import HowTo from './how-to';

const Home = () => {
  const [, setLocation] = useLocation();

  const authRepo = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance;
  const loggedInUser = authRepo.get().okOrDefault();

  return (
    <Container maxW="container.xl" centerContent p={8}>
      <Box align="center" mb={8}>
        <Heading>Current season</Heading>
        <Heading size="lg">05 March - 16 April</Heading>
        <Image
          objectFit="cover"
          src={getAssetUrl(`/common/season-logo.png`)}
          alt="Summer BBQ Logo"
        />
        <Heading as="h2" size="md">
          Join the barbecue today, sign-up to participate!
        </Heading>
        {!loggedInUser.id && (
          <Button onClick={() => setLocation('/register')}>Sign Up</Button>
        )}
      </Box>

      <Box>
        <AboutUs />
      </Box>

      <Box>
        <HowTo />
      </Box>

      <Box>
        <ContactUs isLoggedIn={Boolean(loggedInUser.id)} />
      </Box>
    </Container>
  );
};

export default Home;

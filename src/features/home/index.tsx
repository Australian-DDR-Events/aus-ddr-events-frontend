import React, { useContext } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import useLocation from 'wouter/use-location';

import HowTo from './components/how-to';
import AboutUs from './components/about-us';
import ContactUs from './components/contact-us';

const Home = () => {
  const [, setLocation] = useLocation();

  const authRepo = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance;
  const loggedInUser = authRepo.get().okOrDefault();
  const [isLargerThan750] = useMediaQuery('(min-width: 750px)');

  return (
    <Container maxW="container.xl" centerContent p={8}>
      <Box align="center" mb={8}>
        <Heading>Coming Soon...</Heading>
        <Image
          boxSize={isLargerThan750 ? '50%' : '90%'}
          objectFit="cover"
          src="https://i.imgur.com/vgn9VFo.png"
          alt="Summer BBQ Logo"
        />
        <Heading as="h2" size="md">
          Show off your moves and join in on the hottest DDR seasonal event
          starting February 2021. Pre-register your account today!
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

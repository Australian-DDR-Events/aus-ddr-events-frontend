import { Box, Button, Heading, Image } from '@chakra-ui/react';
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
    <>
      <Box align="center" padding="5rem 0">
        <Heading fontSize="7xl">COMING SOON</Heading>
        <Image
          objectFit="cover"
          src={getAssetUrl(`/common/season-logo.png?event=supercars`)}
          alt="DDR V8 Supercars Logo"
        />
        <Heading as="h2" size="md">
          Start your engines for early July
        </Heading>
        {!loggedInUser.id && (
          <Button onClick={() => setLocation('/register')} mt={4}>
            Register now!
          </Button>
        )}
      </Box>

      <Box background="#2d8f9c" padding="5rem 0">
        <AboutUs />
      </Box>

      <Box padding="5rem 0">
        <HowTo />
      </Box>

      <Box background="#2d8f9c" padding="3rem 0">
        <ContactUs />
      </Box>
    </>
  );
};

export default Home;

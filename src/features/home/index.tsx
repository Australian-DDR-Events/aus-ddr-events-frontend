import { Box, Container, Heading, Image } from '@chakra-ui/react';
import seasonlogo from 'assets/seasonlogo.png';
import React from 'react';

import AboutUs from './about-us';
import ContactUs from './contact-us';
import HowTo from './how-to';

const Home = () => {
  // const [, setLocation] = useLocation();

  // const authRepo = useContext(AuthenticationRepositoryContext)
  //   .authenticationRepositoryInstance;
  // const loggedInUser = authRepo.get().okOrDefault();

  return (
    <Container maxW="container.xl" centerContent p={8}>
      <Box align="center" mb={8}>
        <Heading size="lg">SITE IN MAINTENANCE MODE</Heading>
        <Image src={seasonlogo} objectFit="cover" alt="DDR V8 Supercars Logo" />
        <Heading as="h2" size="md">
          This site is currently in maintenance mode.
        </Heading>
        {/* {!loggedInUser.id && (
          <Button onClick={() => setLocation('/register')} mt={4}>
            Register now!
          </Button>
        )} */}
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

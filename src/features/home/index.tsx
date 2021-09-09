import { Box, Container, Heading, Image } from '@chakra-ui/react';
// import { AuthenticationRepositoryContext } from 'context/authentication';
import React from 'react';

import { getAssetUrl } from '../../utils/assets';
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
        <Heading size="lg">COMING SOON</Heading>
        <Image
          objectFit="cover"
          src={getAssetUrl(`/common/season-logo.png?event=supercars`)}
          alt="DDR V8 Supercars Logo"
        />
        <Heading as="h2" size="md">
          Start your engines for early July
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

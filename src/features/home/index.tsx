import React, { useContext } from 'react';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from '../../context/authentication';

const Home = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );

  const loggedInUserId = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  return <p>hello {loggedInUserId}</p>;
};

export default Home;

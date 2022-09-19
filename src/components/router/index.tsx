import ImageUploader from 'features/admin/image-uploader';
import SongsManagement from 'features/admin/songs-management';
import Error from 'features/error';
import ForgotPassword from 'features/forgot-password';
import GraphqlTestbed from 'features/graphql-testbed';
import Leaderboard from 'features/leaderboard';
import LoginCallback from 'features/login-callback';
import LogoutCallback from 'features/logout-callback';
import Profile from 'features/profile';
import ProfileActive from 'features/profile-active';
import Register from 'features/register';
import Song from 'features/song';
import UnderMaintenance from 'features/under-maintenance';
import React, { useEffect } from 'react';
import { Title } from 'react-head';
import { useActiveProfile } from 'services/dancers';
import { GetLoginUrl } from 'utils/account';
import { Route, RouteProps, Switch } from 'wouter';

import CreateProfile from '../../features/profile/create-profile';

const ProtectedRoute = (props: RouteProps) => {
  const [loading, authorized] = useActiveProfile();
  useEffect(() => {
    if (!loading && !authorized) {
      window.location.assign(GetLoginUrl());
    }
  }, []);
  if (loading) return <></>;
  return <Route {...props} />;
};

const Router = () => (
  <Switch>
    <Route path="/">
      <Title>Australian DDR Events</Title>
      <UnderMaintenance />
    </Route>
    <Route path="/callback">
      <LoginCallback />
    </Route>
    <Route path="/logout">
      <LogoutCallback />
    </Route>
    <Route path="/register">
      <Title>Register | Australian DDR Events</Title>
      <Register />
    </Route>
    <Route path="/forgot-password">
      <Title>Forgot password | Australian DDR Events</Title>
      <ForgotPassword />
    </Route>
    <ProtectedRoute path="/profile">
      <Title>Profile | Australian DDR Events</Title>
      <ProfileActive />
    </ProtectedRoute>
    <ProtectedRoute path="/profile/start">
      <Title>Profile | Australian DDR Events</Title>
      <CreateProfile />
    </ProtectedRoute>
    <ProtectedRoute path="/profile/:id">
      {(params) => (
        <>
          <Title>Profile | Australian DDR Events</Title>
          <Profile id={params.id} />
        </>
      )}
    </ProtectedRoute>
    <Route path="/leaderboard">
      <Title>Leaderboards | Australian DDR Events</Title>
      <Leaderboard />
    </Route>
    <Route path="/song/:id">
      {(params) => (
        <>
          <Title>Loading | Australian DDR Events</Title>
          <Song songId={params.id} />
        </>
      )}
    </Route>
    <Route path="/leaderboard/:id">
      {(params) => (
        <>
          <Title>Leaderboards | Australian DDR Events</Title>
          <Leaderboard songDifficultyId={params.id} />
        </>
      )}
    </Route>
    <Route path="/testbed">
      <GraphqlTestbed />
    </Route>
    <ProtectedRoute path="/admin/uploadimage">
      <Title>Image uploading | Australian DDR Events</Title>
      <ImageUploader />
    </ProtectedRoute>
    <Route path="/admin/songs">
      <Title>Manage songs | Australian DDR Events</Title>
      <SongsManagement />
    </Route>
    <Route>
      <Error />
    </Route>
  </Switch>
);

export default Router;

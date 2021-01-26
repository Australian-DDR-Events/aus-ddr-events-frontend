import { Avatar, Button, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from '../../providers/authentication';
import { DefaultUser, UserRepositoryContext } from '../../providers/user';
import ProfileForm from '../ProfileForm';
import { User } from '../../providers/user/types';

const Profile = () => {
  const userRepo = useContext(UserRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const [user, setUser] = useState(DefaultUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loggedInUserId = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    userRepo.userRepositoryInstance
      .get(loggedInUserId)
      .then((u) => setUser(u.okOrDefault()));
  }, []);

  return !isEditing ? (
    <div>
      <Space align="center" size={16} direction="vertical">
        <Avatar size={80} icon={<UserOutlined />} />
        <Typography.Title level={2} style={{ marginBottom: 'none' }}>
          @{user.displayName}
        </Typography.Title>
        <Typography.Text type="secondary">
          Profiessional player since the dawn of time lmao
        </Typography.Text>
        <Button
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </Button>
      </Space>
    </div>
  ) : (
    <ProfileForm
      formData={user}
      onSuccessfulSubmit={(formData: User) => {
        setUser(formData);
        setIsEditing(false);
      }}
    />
  );
};

export default Profile;

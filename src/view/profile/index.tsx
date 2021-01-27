import { Avatar, Button, Skeleton, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from '../../providers/authentication';
import { DefaultUser, UserRepositoryContext, User } from '../../providers/user';
import ProfileForm from '../profile-form';
import { ProfileHeader } from './styled';

const Profile = () => {
  const userRepo = useContext(UserRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const [user, setUser] = useState(DefaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUserId = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();

    userRepo.userRepositoryInstance.get(loggedInUserId).then((u) => {
      setUser(u.okOrDefault());
      setLoading(false);
    });
  }, []);

  return !isEditing ? (
    <div>
      <Space align="center" size={16} direction="vertical">
        {loading && (
          <>
            <Skeleton.Avatar active size={80} shape="circle" />
            <Skeleton.Button active size="default" shape="square" />
            <Skeleton.Input style={{ width: 200 }} active size="small" />
          </>
        )}

        {!loading && (
          <>
            <Avatar size={80} icon={<UserOutlined />} />
            <ProfileHeader level={2}>@{user.displayName}</ProfileHeader>
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
          </>
        )}
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

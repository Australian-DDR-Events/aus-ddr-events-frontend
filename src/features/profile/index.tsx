import { Avatar, Button, Skeleton, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DefaultUser, UserRepositoryContext, User } from 'context/user';
import ProfileForm from './components/profile-form';
import { ProfileHeader, ProfileWrapper } from './styled';

interface ProfileProps {
  id?: string;
}

const Profile: React.FC<ProfileProps> = ({ id = undefined }: ProfileProps) => {
  const userRepo = useContext(UserRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const [user, setUser] = useState(DefaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedInUserId = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();
  const isEditable = !id || loggedInUserId === id;

  useEffect(() => {
    setLoading(true);
    const lookupId = id ?? loggedInUserId;

    userRepo.userRepositoryInstance.get(lookupId).then((u) => {
      setUser(u.okOrDefault());
      setLoading(false);
    });
  }, [id]);

  return !isEditing ? (
    <ProfileWrapper>
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
            <ProfileHeader level={2}>@{user.userName}</ProfileHeader>
            <Typography.Text type="secondary">
              Profiessional player since the dawn of time lmao
            </Typography.Text>
            {isEditable && (
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            )}
          </>
        )}
      </Space>
    </ProfileWrapper>
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

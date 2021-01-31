import {
  Avatar,
  Button,
  Skeleton,
  Space,
  Typography,
  Card,
  Row,
  Col,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DefaultUser, UserRepositoryContext } from 'context/user';
import ProfileForm from './components/profile-form';
import CollectionContainer from './components/collection-container';
import { ProfileHeader, ProfileWrapper } from './styled';
import { StateOptions } from '~/features/profile/constants';

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
    if (!isEditing) {
      setLoading(true);
      const lookupId = id ?? loggedInUserId;

      userRepo.userRepositoryInstance.get(lookupId).then((u) => {
        setUser(u.okOrDefault());
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  return !isEditing ? (
    <ProfileWrapper>
      <Row gutter={16}>
        <Col xs={24} xl={8}>
          <Card>
            <Space align="center" size={16} direction="vertical">
              {loading && (
                <>
                  <Skeleton.Avatar active size={80} shape="square" />
                  <Skeleton
                    active
                    paragraph={{
                      rows: 4,
                      width: '100%',
                    }}
                  />
                  <Skeleton.Button active size="default" shape="square" />
                </>
              )}

              {!loading && (
                <>
                  <Avatar
                    size={80}
                    shape="square"
                    src={
                      user.profilePicture || 'https://i.imgur.com/o0ulS6k.png'
                    }
                  />
                  <ProfileHeader level={2}>{user.userName}</ProfileHeader>
                  <Typography.Text key="dancerName">
                    Dancer Name: {user.dancerName}
                  </Typography.Text>
                  <Typography.Text key="dancerId">
                    DDR Code: {user.dancerId}
                  </Typography.Text>
                  {StateOptions.map((option) => {
                    if (option.key === user.state) {
                      return (
                        <Typography.Text key="dancerState">
                          State: {option.value}
                        </Typography.Text>
                      );
                    }
                    return <></>;
                  })}
                  <Typography.Text key="dancerMachine">
                    Primary Machine: {user.primaryMachine}
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
          </Card>
        </Col>
        <Col xs={24} xl={16}>
          <CollectionContainer />
        </Col>
      </Row>
    </ProfileWrapper>
  ) : (
    <ProfileForm
      formData={user}
      onSuccessfulSubmit={() => {
        setIsEditing(false);
      }}
      onCancelSubmit={() => {
        setIsEditing(false);
      }}
    />
  );
};

export default Profile;

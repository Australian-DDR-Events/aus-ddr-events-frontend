import { Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from '../../providers/authentication';
import { DefaultUser, UserRepositoryContext } from '../../providers/user';

const Profile = () => {
  const userRepo = useContext(UserRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const [user, setUser] = useState(DefaultUser);

  useEffect(() => {
    const loggedInUserId = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    userRepo.userRepositoryInstance
      .get(loggedInUserId)
      .then((u) => setUser(u.okOrDefault()));
  }, []);

  return (
    <div>
      <Space align="center" size={16} direction="vertical">
        <Avatar size={80} icon={<UserOutlined />} />
        <Typography.Title level={2} style={{ marginBottom: 'none' }}>
          @{user.displayName}
        </Typography.Title>
        <Typography.Text type="secondary">
          Profiessional player since the dawn of time lmao
        </Typography.Text>
      </Space>
    </div>
  );
};

export default Profile;

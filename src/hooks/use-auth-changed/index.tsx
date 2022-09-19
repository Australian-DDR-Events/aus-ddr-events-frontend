import React, { createContext, ReactChildren, useState } from 'react';

type AuthChangedContextProps = {
  trigger: boolean;
  setTrigger: (trigger: boolean) => void;
};

const AuthChangedContext = createContext<AuthChangedContextProps>({
  trigger: false,
  setTrigger: () => {},
});

export const AuthChangedProvider: React.FC = ({
  children,
}: {
  children: ReactChildren;
}) => {
  const [trigger, setTrigger] = useState(false);

  return (
    <AuthChangedContext.Provider value={{ trigger, setTrigger }}>
      {children}
    </AuthChangedContext.Provider>
  );
};

export const useAuthChanged = () => React.useContext(AuthChangedContext);

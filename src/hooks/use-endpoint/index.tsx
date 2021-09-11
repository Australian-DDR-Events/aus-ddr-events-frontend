import React, { createContext, ReactChildren, useState } from 'react';

type EndpointContextType = {
  url: string;
};

const EndpointContext = createContext<EndpointContextType>({ url: '' });

export const EndpointProvider: React.FC = ({
  baseUrl,
  children,
}: {
  baseUrl: string;
  children: ReactChildren;
}) => {
  const [url] = useState(baseUrl);

  return (
    <EndpointContext.Provider value={{ url }}>
      {children}
    </EndpointContext.Provider>
  );
};

export const useEndpoint = () => React.useContext(EndpointContext);

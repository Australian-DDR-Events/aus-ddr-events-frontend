import React, { useContext, useEffect } from "react";
import { EventsRepositoryContext } from "context/events";
import { BadgesRepositoryContext } from "context/badges";

const Badges = () => {
  const eventsRepository = useContext(EventsRepositoryContext);
  const badgesRepository = useContext(BadgesRepositoryContext);

  useEffect(() => {
    
  });

  return (
    <div>badges</div>
  );
};

export default Badges;
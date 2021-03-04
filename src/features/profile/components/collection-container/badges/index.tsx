import React, { useContext, useEffect, useState } from "react";
import { AuthenticationRepositoryContext } from "context/authentication";
import { BadgesRepositoryContext } from "context/badges";
import { Dancer, DancersRepositoryContext } from "context/dancer";
import { Event } from "context/events/types";
import { Badge } from "context/badges/types";
import { Card, Col, Image, Row, Tooltip, Typography } from "antd";
import { WrapText } from "./styled";
import { EventsRepositoryContext } from "context/events";

const Badges = ({ dancer }: { dancer: Dancer }) => {
  const badgesRepo = useContext(BadgesRepositoryContext);
  const eventsRepo = useContext(EventsRepositoryContext);

  const [badges, setBadges] = useState(new Array<Badge>());
  const [eventMap, setEventMap] = useState(new Map<string, Event>())
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (loading && dancer.id) {
      Promise.all([
        badgesRepo.badgesRepositoryInstance.getById(dancer.id),
        eventsRepo.eventsRepositoryInstance.getAll(false)
      ]).then((values) => {
        setBadges(values[0].okOrDefault());
        setEventMap(new Map(values[1].okOrDefault().map((event) => {
          return [event.id, event];
        })));
        console.log(values[1].okOrDefault());
        setLoading(false);
      });
    }
  });

  return (
    <Row gutter={16}>
      {badges.map((badge) => {
        return (
          <Col className="gutter-row" xs={12} xl={4}>
            <Tooltip title={badge.description}>
              <Card
                cover={<Image src={`${process.env.ASSETS_URL}${badge.image256}`} preview={false}/>}
              >
                <Card.Meta
                  title={
                    <>
                      <WrapText strong>{badge.name}</WrapText>
                      <br />
                      <WrapText>{eventMap.get(badge.eventId)?.name}</WrapText>
                    </>
                  }
                />
              </Card>
            </Tooltip>
          </Col>
        );
      })}
    </Row>
  );
}

export default Badges;
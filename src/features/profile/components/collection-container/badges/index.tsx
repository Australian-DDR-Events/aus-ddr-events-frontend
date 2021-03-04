import React, { useContext, useEffect, useState } from "react";
import { AuthenticationRepositoryContext } from "context/authentication";
import { BadgesRepositoryContext } from "context/badges";
import { Dancer, DancersRepositoryContext } from "context/dancer";
import { Badge } from "context/badges/types";
import { Card, Col, Image, Row } from "antd";

const Badges = ({ dancer }: { dancer: Dancer }) => {
  const badgesRepo = useContext(BadgesRepositoryContext);

  const [badges, setBadges] = useState(new Array<Badge>());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (loading && dancer.id) {
      badgesRepo.badgesRepositoryInstance.getById(dancer.id)
        .then((badges) => {
          setBadges(badges.okOrDefault());
          setLoading(false);
        });
    }
  });

  return (
    <Row gutter={16}>
      {badges.map((badge) => {
        <Col className="gutter-row" span={4}>
          <Card
            cover={<Image src={badge.image128}/>}
          >
            <Card.Meta title={badge.name} description={badge.description} />
          </Card>
        </Col>
      })}
    </Row>
  );
}

export default Badges;
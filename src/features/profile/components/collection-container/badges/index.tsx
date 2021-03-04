import React, { useContext, useEffect, useState } from "react";
import { AuthenticationRepositoryContext } from "context/authentication";
import { BadgesRepositoryContext } from "context/badges";
import { Dancer, DancersRepositoryContext } from "context/dancer";
import { Badge } from "context/badges/types";
import { Card, Col, Image, Row, Typography } from "antd";
import { WrapCard, WrapMeta, WrapText } from "./styled";

const Badges = ({ dancer }: { dancer: Dancer }) => {
  const badgesRepo = useContext(BadgesRepositoryContext);

  const [badges, setBadges] = useState(new Array<Badge>());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (loading && dancer.id) {
      badgesRepo.badgesRepositoryInstance.getById(dancer.id)
        .then((badges) => {
          console.log(dancer.id);
          console.log(badges.okOrDefault());
          setBadges(badges.okOrDefault());
          setLoading(false);
        });
    }
  });

  return (
    <Row gutter={16}>
      {badges.map((badge) => {
        return (
          <Col className="gutter-row" xs={12} xl={4}>
            <Card
              cover={<Image src={`${process.env.ASSETS_URL}${badge.image256}`}/>}
            >
              <Card.Meta
                title={<WrapText>{badge.name}</WrapText>}
                description={badge.description}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default Badges;
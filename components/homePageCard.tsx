'use client';

// Example:

import { Card, Container, Row, Col } from "react-bootstrap"

{/* <p style={{ marginBottom: '20px' }}>
    🏷️ <a href="https://www.getgoalsideanalytics.com/high-fat-data-for-low-er-fat-costs/" className="homepage-link" target="_blank">
    Creating labels from unlabelled data - football positions and Statsbomb 360
    </a>
    <br />
    <small>
        <i>An edition of the <b>Get Goalside</b> newsletter aiming to take existing analytics research and apply it to a slightly different use-case, creating positional labels from unlabelled data. [External link]</i>
    </small>
</p> */}

// Card should be a paragraph tag(?) 
type homePageCardType = {
    emoji: string
    linkUrl: string
    linkExternal: boolean
    anchorText: string
    descriptionText: string
    imageUrl: string
}

const HomePageCard: React.FC<homePageCardType> = ({emoji, linkUrl, linkExternal, anchorText, descriptionText, imageUrl}) => {
    return (
    <>
    
    <Card>
        <a href={linkUrl} target={linkExternal ? "_blank" : "_self"}>
        <Container>
            <Row style={{height:'100%'}} className="align-items-center">
                <Col xs={7}>
        <Card.Body>
            <Card.Title className="homepage-link">
                {emoji} {anchorText}
            </Card.Title>
            <Card.Text>
                <small><i>{descriptionText}</i></small>
            </Card.Text>
        </Card.Body>
        </Col>
        <Col>
        <Card.Img src={imageUrl}></Card.Img>
        </Col>
        </Row>
        </Container>
    </a>
    </Card>
    
    </>
    );
}

export default HomePageCard;
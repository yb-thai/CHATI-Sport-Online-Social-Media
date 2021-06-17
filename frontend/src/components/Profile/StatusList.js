import React from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./Profile.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export const StatusList = ({ event, title, description, comments }) => {
  return (
    <article className="events">
      <Row>
        <Col xs={14} md={10}>
          <h1> Event Name: {event}</h1>
          <h2 id="status"> Title: {title} </h2>
          <h4> Description: {description} </h4>
        </Col>
      </Row>

      <Accordion>
        <Card>
          <Card.Header id="card1">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {comments.length} Comments
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {comments.map((comment) => {
                return (
                  <div key={comment._id} id="comment-box">
                    <h6>{comment.owner}</h6>
                    <p>{comment.content}</p>
                  </div>
                );
              })}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </article>
  );
};

export default StatusList;

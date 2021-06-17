import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { listEvents } from "../../actions/eventAction";
import { listStatuses, createStatus } from "../../actions/statusAction";
import "./Status.css";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import {
  STATUS_CREATE_RESET,
  STATUS_DELETE_RESET,
} from "../../constants/StatusConstant";
import Loader from "./Loader";
import Message from "./Message";
function Status({ statusInfo }) {
  return (
    <article id="statuslist">
      <Row>
        <Col xs={14} md={10}>
          <h1>Owner: {statusInfo.owner}</h1>
          <h1> Event Name: {statusInfo.event}</h1>
          <h2 id="status"> Title: {statusInfo.title} </h2>
          <h4> Description: {statusInfo.description} </h4>
        </Col>
        <Col xs={4} md={2}>
          <a id="word" href={`/UserStatus/${statusInfo._id}`}>
            Click me to comment or edit!
          </a>
        </Col>
      </Row>

      <Accordion>
        <Card>
          <Card.Header id="card">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {statusInfo.comments.length} Comments
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {statusInfo.comments.map((comment) => {
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
}
function Statuses() {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { error: errorEvent, loading: loadingEvent, events } = eventList;

  const statusList = useSelector((state) => state.statusList);
  const { error: errorStatus, loading: loadingStatus, statuses } = statusList;
  const statusDelete = useSelector((state) => state.statusDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = statusDelete;
  const statusCreate = useSelector((state) => state.statusCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    status: createdStatus,
  } = statusCreate;
  const [filterEventList, setEvents] = React.useState([]);
  const [_id, setId] = React.useState();
  const [titleSelected, setTitleSelected] = React.useState("");
  const [descriptionSelected, setDescriptionSelected] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [eventFocused, setEventFocused] = useState(false);

  React.useEffect(() => {
    dispatch(listEvents());
    dispatch(listStatuses());
    if (successCreate) {
      dispatch({ type: STATUS_CREATE_RESET });
    } else if (successDelete) {
      dispatch({ type: STATUS_DELETE_RESET });
    }
  }, [dispatch, successCreate, createdStatus]);

  const onInputChange = (e) => {
    setId(null);
    setInputValue(e.target.value);
    const query =
      events.filter((event) => event.title === e.target.value) || [];
    if (query.length > 0) {
      setId(query[0]._id);
    }
    // fetch
    if (e.target.value === "") {
      setEvents([]);
    } else {
      setEvents(
        events.filter((event) => {
          return event.title
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase());
        })
      );
    }
    e.preventDefault();
  };

  const createStatusHandler = (e) => {
    if (_id) {
      dispatch(createStatus(_id, titleSelected, descriptionSelected));
    } else {
      console.log("no event id found");
    }
    e.preventDefault();
  };

  const renderAutocomplete = () => {
    return filterEventList.map((data) => {
      const { title = "" } = data || {};
      return (
        <ListGroup.Item
          action
          key={data._id}
          onClick={(e) => {
            setInputValue(title);
            setId(data._id);
            setEvents([]);
            e.preventDefault();
          }}
        >
          {title}
        </ListGroup.Item>
      );
    });
  };

  return (
    <Container>
      {!_id && <Message variant="danger">No event found</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      <Form>
        <Form.Group controlId="formBasicSearch">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event"
            autoComplete="off"
            onChange={onInputChange}
            value={inputValue}
            onFocus={() => setEventFocused(true)}
            onBlur={() => setEventFocused(false)}
          />
        </Form.Group>
        {errorEvent ? (
          <Message variant="danger">{errorEvent}</Message>
        ) : (
          <ListGroup id="results" style={{ opacity: eventFocused ? 1 : 0 }}>
            {renderAutocomplete()}
          </ListGroup>
        )}
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitleSelected(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter description"
            onChange={(e) => setDescriptionSelected(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={createStatusHandler}>
          Create status
        </Button>
      </Form>
      {loadingStatus ? (
        <Loader />
      ) : errorStatus ? (
        <Message variant="danger">{errorStatus}</Message>
      ) : (
        statuses.map((status) => (
          <Row key={status._id}>
            <Status statusInfo={status} />
          </Row>
        ))
      )}
    </Container>
  );
}
export default Statuses;

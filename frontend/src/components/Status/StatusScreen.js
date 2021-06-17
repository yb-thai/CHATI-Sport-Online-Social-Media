import React from "react";
import Loader from "./Loader";
import Message from "./Message";

import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listStatusDetails,
  updateStatus,
  deleteStatus,
  createStatusComment,
} from "../../actions/statusAction";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import {
  Row,
  Col,
  Button,
  Card,
  Accordion,
  Container,
  ListGroup,
  Form,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import {
  STATUS_UPDATE_RESET,
  STATUS_DETAILS_RESET,
  STATUS_CREATE_COMMENT_RESET,
  STATUS_LIST_OWNER_RESET,
} from "../../constants/StatusConstant";
import "./Status.css";

function StatusScreen({ match, history }) {
  const statusId = match.params.id;
  const [titleSelected, setTitleSelected] = React.useState("");
  const [descriptionSelected, setDescriptionSelected] = React.useState("");
  const [contentSelected, setContentSelected] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const statusDetails = useSelector((state) => state.statusDetails);
  const { error, loading, status } = statusDetails;
  const statusUpdate = useSelector((state) => state.statusUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = statusUpdate;

  const statusDelete = useSelector((state) => state.statusDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = statusDelete;

  const statusCommentCreate = useSelector((state) => state.statusCommentCreate);
  const {
    loading: loadingStatusComment,
    error: errorStatusComment,
    success: successStatusComment,
  } = statusCommentCreate;

  React.useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STATUS_UPDATE_RESET });
    } else if (error) {
      return;
    } else {
      if (!status.title || status._id !== Number(statusId)) {
        dispatch(listStatusDetails(match.params.id));
      } else {
        setDescriptionSelected(status.description);
        setTitleSelected(status.title);
      }
    }
  }, [dispatch, status, statusId, successUpdate, successDelete]);

  React.useEffect(() => {
    if (successStatusComment) {
      setContentSelected("");
      dispatch({ type: STATUS_CREATE_COMMENT_RESET });
    }
    dispatch(listStatusDetails(match.params.id));
  }, [dispatch, successStatusComment]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateStatus({
        id: statusId,
        title: titleSelected,
        description: descriptionSelected,
      })
    );
  };
  const deleteHandler = (e) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteStatus(status._id));
    }
  };
  const postCommentHandler = (e) => {
    e.preventDefault();
    dispatch(createStatusComment(status._id, contentSelected));
  };
  const hideOwnerField = () => {
    if (
      status.owner !== JSON.parse(localStorage.getItem("userInfo"))["username"]
    ) {
      return null;
    } else {
      return (
        <Row>
          <div id="iconLayOut">
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              <i className="fas fa-edit"></i>
            </Button>
            <Button variant="primary" onClick={() => deleteHandler()}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
          <Modal show={isOpen} onHide={() => setIsOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="formUpdateStatus" onSubmit={submitHandler}>
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={titleSelected}
                    onChange={(e) => setTitleSelected(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter description"
                    value={descriptionSelected}
                    onChange={(e) => setDescriptionSelected(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
              {successUpdate ? (
                <Message variant="primary">Update successfully</Message>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {successDelete && (
            <div>
              <Message variant="primary">Delete successfully</Message>
              <Redirect to="/status" />
            </div>
          )}
        </Row>
      );
    }
  };
  return (
    <Container fluid key={match.params.id} id="statusScreenContainer">
      <Link to="/status" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <article>
              <h1>Owner: {status.owner}</h1>
              <h1>Event: {status.event}</h1>
              <h1>Title: {status.title} </h1>
              <h4>Description: {status.description}</h4>
              <Accordion>
                <Card id="fixcommentbox">
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Comments
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {status.comments.map((comment) => {
                        return (
                          <div key={comment._id} id="comment-box">
                            <h6>{comment.owner}</h6>
                            <p>{comment.content}</p>
                          </div>
                        );
                      })}
                    </Card.Body>
                  </Accordion.Collapse>
                  <Form id="fixformcomment" onSubmit={postCommentHandler}>
                    <Row>
                      <Col xs={10} md={6}>
                        <Form.Group controlId="formBasicComment">
                          <Form.Control
                            className="fixwritecomment"
                            type="text"
                            placeholder="Write comment"
                            value={contentSelected}
                            onChange={(e) => setContentSelected(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Button variant="secondary" type="submit">
                          Post
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Accordion>
            </article>
          </Row>
          {hideOwnerField()}
        </div>
      )}
    </Container>
  );
}

export default StatusScreen;

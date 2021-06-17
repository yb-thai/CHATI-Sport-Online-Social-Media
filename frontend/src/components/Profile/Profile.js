import React from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import "./Profile.css";
import { Link } from "react-router-dom";
import { StatusList } from "./StatusList.js";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/userActions";
import { listStatusesAccordingToOwners } from "../../actions/statusAction";
import Loader from "../Status/Loader";
import Message from "../Status/Message";
import id from "date-fns/esm/locale/id/index.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function Profile({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [favoriteSport, setFavoriteSport] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [role, setRole] = React.useState("");
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const statusListAccordingToOwners = useSelector(
    (state) => state.statusListAccordingToOwners
  );
  const {
    error: errorStatus,
    loading: loadingStatus,
    statuses,
  } = statusListAccordingToOwners;
  const statusDelete = useSelector((state) => state.statusDelete);
  const { success: successDelete } = statusDelete;
  const statusCreate = useSelector((state) => state.statusCreate);
  const { success: successCreate } = statusCreate;
  const statusUpdate = useSelector((state) => state.statusUpdate);
  const { success: successUpdate } = statusUpdate;
  React.useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.email) {
        dispatch(getUserDetails(localStorage.getItem("userPK")));
      } else {
        setEmail(user.email);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setFavoriteSport(user.profile.favorite_sport);
        setOrganization(user.profile.organization);
        setRole(user.profile.role);
      }
    }
  }, [dispatch, history, userInfo, user]);

  React.useEffect(() => {
    dispatch(listStatusesAccordingToOwners(localStorage.getItem("userPK")));
  }, [
    dispatch,
    history,
    userInfo,
    user,
    successCreate,
    successUpdate,
    successDelete,
  ]);
  return (
    <section id="pagestatus">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <section id="profileandedit">
          <Row>
            <Col xs={12} md={8}>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Profile me!
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h2 id="email">
                        Name: {firstName} {lastName}
                      </h2>
                      <h2 id="email"> Email: {email}</h2>
                      <h3>Sport: {favoriteSport}</h3>
                      <h3>Organization: {organization}</h3>
                      <h3>Role: {role}</h3>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col xs={6} md={4}>
              <Link to="/editprofile" className="btn btn-light my-3">
                <i className="fas fa-user-edit">Edit</i>
              </Link>
            </Col>
          </Row>
        </section>
      )}
      {loadingStatus ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{errorStatus}</Message>
      ) : (
        <section className="eventlist">
          <article id="wordstatus"> STATUS</article>
          {statuses.map((status) => {
            return <StatusList key={status._id} {...status}></StatusList>;
          })}
        </section>
      )}
    </section>
  );
}

export default Profile;

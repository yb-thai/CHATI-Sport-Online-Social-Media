import React from "react";
import Loader from "../Status/Loader";
import Message from "../Status/Message";
import { getUserDetails, updateUser, logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
function EditProfile({ history }) {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [favoriteSport, setFavoriteSport] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdateProfile);
  const { error: errorUpdate, success } = userUpdate;
  React.useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.email) {
        dispatch(getUserDetails(localStorage.getItem("userPK")));
      } else if (success) {
        dispatch({ type: USER_UPDATE_RESET });
        setTimeout(() => {
          dispatch(logout());
          history.push("/Login");
        }, 1000);
      } else {
        setEmail(user.email);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setFavoriteSport(user.profile.favorite_sport);
        setOrganization(user.profile.organization);
        setRole(user.profile.role);
      }
    }
  }, [dispatch, history, userInfo, user, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      const username = JSON.parse(localStorage.getItem("userInfo"))["username"];
      dispatch(
        updateUser(localStorage.getItem("userPK"), {
          username: username,
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          profile: {
            favorite_sport: favoriteSport,
            organization: organization,
            role: role,
          },
        })
      );
      setMessage("");
    }
  };
  return (
    <Container fluid>
      <Link to="/Profile" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <h3 style={{ color: "red" }}>{message}</h3>}
          {error && <h1 style={{ color: "red" }}>{error}</h1>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            {/* email field */}
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/*password field */}

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/*confirm password field */}

            <Form.Group controlId="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/* firstname field */}

            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstName || ""}
                onChange={(e) => setFirstName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/* lastname field */}
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/* favorite sport field */}
            <Form.Group controlId="favoriteSport">
              <Form.Label>Favorite sport</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your favorite sport"
                value={favoriteSport || ""}
                onChange={(e) => setFavoriteSport(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Organization field */}
            <Form.Group controlId="organization">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your organization"
                value={organization || ""}
                onChange={(e) => setOrganization(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Role field */}
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your role"
                value={role || ""}
                onChange={(e) => setRole(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
          {errorUpdate && (
            <div>
              <Message variant="danger">{errorUpdate}</Message>
            </div>
          )}

          {success && (
            <div>
              <Message variant="primary">
                Update successfully. Transferring to login page
              </Message>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
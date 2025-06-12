import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const UPDATE_PROFILE_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [message, setMessage] = useState(null)
  
  const { token } = useSelector((state) => state.auth.token);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    

    const profileData = {
      idToken: token,
      displayName: displayName,
      photoUrl: photoUrl,
      deleteAttribute: "",
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(UPDATE_PROFILE_URL, profileData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
       setMessage({ type: "danger", text: "Profile update failed. Please try again." });
    }
  };
  return (
        <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h3 className="text-center text-primary">Give it all you got</h3>
          <p className="text-center">
            Your Profile is <strong>65%</strong> completed. A complete profile has a higher chance of landing a job.{" "}
            <span className="text-primary" style={{ cursor: "pointer" }}>
              Complete Now
            </span>
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          {message && <Alert variant={message.type}>{message.text}</Alert>}

          <Form onSubmit={handleProfileSubmit} className="p-4 border rounded shadow-sm bg-light">
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photoUrl">
              <Form.Label>Profile Photo URL</Form.Label>
              <Form.Control
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter photo URL"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import useAuth from "../store/auth-context";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const API_KEY = `AIzaSyAWVnD8ZpwnamACMsH-P3a-kmn1_BVi8q8`;
const UPDATE_PROFILE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const GET_PROFILE = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const profileData = {
          idToken: token,
        };
        try {
          const response = await axios.post(GET_PROFILE, profileData);
          console.log("Data is updated");
          const userProfile = response.data.users[0];
          // Populate state with current profile data
          setDisplayName(userProfile.displayName || "");
          setPhotoUrl(userProfile.photoUrl || "");
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [token]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const profileData = {
      idToken: token,
      displayName: displayName,
      photoUrl: photoUrl,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(UPDATE_PROFILE_URL, profileData);
      console.log(response.data);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={6} lg={4} className="border border-2 p-4 rounded">
        <div className="text-center mb-4">
          <h3>Winners never quit, Quitters never win</h3>
          <p>
            Your Profile is <strong>65%</strong> completed. A complete Profile
            has a higher chance of landing a job.{" "}
            <span className="text-primary">Complete now</span>
          </p>
        </div>

        <Form onSubmit={handleProfileSubmit}>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProfilePhoto">
            <Form.Label>Profile Photo URL:</Form.Label>
            <Form.Control
              id="photoUrl"
              name="photoUrl"
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
              placeholder="Enter the URL of your profile photo"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Update
            </Button>

            <Link to="/home" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default Profile;

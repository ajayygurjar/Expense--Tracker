import React from "react";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 shadow-lg border-0">
            <h2 className="text-center mb-3 text-primary">About Expense Tracker</h2>
            <p className="text-muted text-center mb-4">
              Manage your finances smartly, track your expenses, and take control of your money.
            </p>

            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h4 className="text-secondary">✨ Key Features</h4>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item>Add, edit, and delete expenses easily</ListGroup.Item>
                  <ListGroup.Item>Visual total expense tracking</ListGroup.Item>
                  <ListGroup.Item>
                    <Badge bg="warning" text="dark">Premium Mode</Badge> unlocks on spending over ₹10,000
                  </ListGroup.Item>
                  <ListGroup.Item>Download your expenses as CSV file</ListGroup.Item>
                  <ListGroup.Item>Email verification for added security</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h4 className="text-secondary">🛠️ Tech Stack Used</h4>
                <Row className="mt-3">
                  <Col md={6}>
                    <ul>
                      <li><strong>React JS</strong> - Component-based frontend</li>
                      <li><strong>Redux Toolkit</strong> - State management</li>
                      <li><strong>React Router</strong> - Page navigation</li>
                      <li><strong>React-Bootstrap</strong> - Responsive UI</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul>
                      <li><strong>Firebase Realtime DB</strong> - Expense data storage</li>
                      <li><strong>Firebase Auth</strong> - Secure login & email verification</li>
                      <li><strong>Axios</strong> - HTTP communication</li>
                      <li><strong>CSV Export</strong> - Data download feature</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-muted">
                Designed with ❤️ to help you become financially aware and empowered.
              </p>
              <p className="fw-semibold">Start tracking your money today!</p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;

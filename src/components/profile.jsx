import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "./navbar";
import QRCode from "qrcode.react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Profile = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsSnapshot = await getDocs(collection(db, "tickets"));
        const ticketsData = ticketsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const userTickets = ticketsData.filter(
          (ticket) => ticket.userId === userId
        );
        setTickets(userTickets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  const isPastTicket = (ticket) => {
    const now = new Date();
    const departureDate = new Date(ticket.date.seconds * 1000);
    return departureDate < now;
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h2 className="text-center mt-4">Your Tickets</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center">Error: {error.message}</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {tickets.map((ticket) => (
              <Col key={ticket.id}>
                <Link
                  to={{
                    pathname: `/ticket`,
                    search: `?departure=${ticket.departure}&destination=${ticket.destination}&departureDate=${ticket.date.seconds}&userId=${ticket.userId}`,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    className={`h-100 ${
                      isPastTicket(ticket) ? "bg-danger" : "bg-success"
                    }`}
                  >
                    <Card.Body>
                      <Card.Title>Departure: {ticket.departure}</Card.Title>
                      <Card.Text>Destination: {ticket.destination}</Card.Text>
                      <Card.Text>
                        Date:{" "}
                        {ticket.date
                          ? new Date(
                              ticket.date.seconds * 1000
                            ).toLocaleString()
                          : "N/A"}
                      </Card.Text>
                      <Card.Text>Price: ${ticket.price}</Card.Text>
                      <div className="text-center">
                        <QRCode value={JSON.stringify(ticket)} />
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
        <div className="text-center mt-4">
          <Link to="/login" className="btn btn-danger">
            Logout
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Profile;

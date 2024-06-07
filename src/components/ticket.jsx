import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./ticket.css"; 

const Ticket = () => {
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const departure = searchParams.get("departure");
  const destination = searchParams.get("destination");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketsSnapshot = await getDocs(collection(db, "tickets"));
        const ticketsData = ticketsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const ticketsWithUsers = await Promise.all(
          ticketsData.map(async (ticket) => {
            const userDoc = await getDoc(doc(db, "users", ticket.userId));
            const userData = userDoc.data();
            return {
              ...ticket,
              username: userData ? userData.username : "Unknown User",
            };
          })
        );

        const filteredTickets = ticketsWithUsers.filter(
          (ticket) =>
            ticket.departure === departure && ticket.destination === destination
        );
        setFilteredTickets(filteredTickets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [departure, destination]);

  return (
    <div>
      <Navbar />
      <Container>
        <h2 className="text-center mt-4">Who you're flying with</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : filteredTickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            filteredTickets.map((ticket) => (
              <Col key={ticket.id}>
                <Card className="ticket-card">
                  <div className="ticket-header">
                    <h5>{ticket.name}</h5>
                    <span className="username">@{ticket.username}</span>
                  </div>
                  <div className="ticket-body">
                    <p>
                      <strong>Departure:</strong> {ticket.departure}
                    </p>
                    <p>
                      <strong>Destination:</strong> {ticket.destination}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {ticket.date
                        ? new Date(ticket.date.seconds * 1000).toLocaleString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Price:</strong> ${ticket.price}
                    </p>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Ticket;

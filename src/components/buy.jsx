import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./navbar";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Buy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [date, setDate] = useState(new Date());
  const [departures, setDepartures] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [generatedPrice, setGeneratedPrice] = useState(null);

  const generateRandomPrice = () => {
    const minPrice = 50;
    const maxPrice = 200;
    return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const departuresSnapshot = await getDocs(collection(db, "departures"));
        const departuresData = departuresSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const destinationsSnapshot = await getDocs(
          collection(db, "destinations")
        );
        const destinationsData = destinationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDepartures(departuresData);
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching departures:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedDeparture && selectedDestination) {
      const price = generateRandomPrice();
      setGeneratedPrice(price);
    } else {
      setGeneratedPrice(null);
    }
  }, [selectedDeparture, selectedDestination, date]);

  const handleDepartureChange = (event) => {
    setSelectedDeparture(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleTicketCreation = async () => {
    try {
      const docRef = await addDoc(collection(db, "tickets"), {
        userId: userId,
        departure: selectedDeparture,
        destination: selectedDestination,
        date: date,
        price: generatedPrice,
      });
      console.log("Ticket created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding ticket: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center my-4">Buy Tickets</h1>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Departure:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    value={selectedDeparture}
                    onChange={handleDepartureChange}
                  >
                    <option value="">Select Departure</option>
                    {departures.map((departure) => (
                      <option key={departure.id} value={departure.location}>
                        {departure.location}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Destination:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    value={selectedDestination}
                    onChange={handleDestinationChange}
                  >
                    <option value="">Select Destination</option>
                    {destinations.map((destination) => (
                      <option key={destination.id} value={destination.location}>
                        {destination.location}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Select Date:
                </Form.Label>
                <Col sm={9}>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </Col>
              </Form.Group>
              <div className="text-center">
                <p>
                  Price: {generatedPrice != null ? `$${generatedPrice}` : "N/A"}
                </p>
                <Button onClick={handleTicketCreation} variant="primary">
                  Create Ticket
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Buy;

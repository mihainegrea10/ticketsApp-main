import React from "react";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container-fluid">
      <main>
        <section className="hero text-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="display-3 mb-4">
                  Find the Best Deals on Plane Tickets
                </h2>
                <p className="lead mb-4">
                  Search and book flights to your favorite destinations at
                  affordable prices.
                </p>
                <Link to="/login">
                  <button className="btn btn-primary btn-lg">
                    Search Tickets
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="features text-center py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-calendar3"></i>
                </div>
                <h3>Easy Booking</h3>
                <p>Quick and hassle-free booking process.</p>
              </div>
              <div className="col-md-4 mb-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <h3>Best Prices</h3>
                <p>Find the lowest fares for your desired routes.</p>
              </div>
              <div className="col-md-4 mb-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-headset"></i>
                </div>
                <h3>24/7 Support</h3>
                <p>Customer support available round the clock.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-4">
        <div className="container">
          <p>&copy; 2024 PlaneTicket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

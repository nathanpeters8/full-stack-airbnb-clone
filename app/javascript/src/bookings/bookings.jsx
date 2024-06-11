import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors, safeCredentialsForm } from '@utils/fetchHelper';

import './bookings.scss';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      username: '',
      paid: false,
      authenticated: false,
      show_booked_properties: true,
      loading: true,
    };
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then((data) => {
        this.setState({
          username: data.username,
          authenticated: data.authenticated,
        });
      })
      .then(() => {
        if (this.state.authenticated) {
          this.showProperties();
        }
      });
  }

  showProperties = () => {
    let endpoint = this.state.show_booked_properties ? 'bookings' : 'property_bookings';

    fetch(`/api/users/${this.state.username}/${endpoint}`)
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          bookings: data.bookings,
          loading: false,
        });
      });
  };

  render() {
    const { bookings, loading, authenticated, show_booked_properties } = this.state;

    if (!authenticated) {
      return (
        <Layout>
          <div className='border p-4 mb-4'>
            Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
          </div>
        </Layout>
      );
    }
    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <h1 className='text-center my-5'>Bookings</h1>
            <div className='col-12'>
              <div className='booking-buttons d-flex justify-content-center gap-2 mb-5'>
                <button
                  className='btn btn-lg btn-primary'
                  onClick={(e) => {
                    this.setState({ show_booked_properties: true }, () => {
                      this.showProperties();
                    });
                  }}
                >
                  My Booked Properties
                </button>
                <button
                  className='btn btn-lg btn-primary'
                  onClick={(e) => {
                    this.setState({ show_booked_properties: false }, () => {
                      this.showProperties();
                    });
                  }}
                >
                  My Property Bookings
                </button>
              </div>
              {bookings.length === 0 && authenticated && <h1 className='text-center'>No Bookings</h1>}
              <div className={`table-responsive ${bookings.length === 0 || !authenticated ? 'd-none' : ''}`}>
                <table className='table table-striped table-hover table-bordered align-items-center'>
                  <thead>
                    <tr className='align-middle text-center'>
                      <th></th>
                      <th>Property</th>
                      <th>{show_booked_properties ? 'Host' : 'Renter'}</th>
                      <th>Price</th>
                      {show_booked_properties && (
                        <>
                          <th>Rooms</th>
                          <th>Beds</th>
                          <th>Baths</th>
                        </>
                      )}
                      <th>Check In - Check Out</th>
                      <th>Paid?</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      if (loading) {
                        return (
                          <tr className='align-middle text-center'>
                            <td>loading...</td>
                          </tr>
                        );
                      }
                      if (bookings.length === 0) {
                        return (
                          <tr className='align-middle text-center'>
                            <td>No bookings</td>
                          </tr>
                        );
                      }
                      return bookings.map((booking) => {
                        let image = booking.property.image
                          ? booking.property.image
                          : `https://cdn.altcademy.com/assets/images/medium/airbnb_clone/${
                              booking.property.property_id - 1
                            }.jpg`;

                        let days = Math.floor(
                          (new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24)
                        );
                        return (
                          <tr className='align-middle text-center' key={booking.id}>
                            <td>
                              <a
                                href={`/property/${booking.property.property_id}`}
                                className='text-body text-decoration-none'
                              >
                                <div
                                  className='property-image mb-1 rounded'
                                  style={{
                                    backgroundImage: `url(${image})`,
                                    width: '75px',
                                    height: '75px',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                  }}
                                />
                              </a>
                            </td>
                            <td>{booking.property.title}</td>
                            <td>
                              {this.state.show_booked_properties ? booking.property.username : booking.user.username}
                            </td>
                            <td>
                              ${booking.property.price_per_night * days}{' '}
                              <small className='fw-light fst-italic'>(${booking.property.price_per_night}/day)</small>
                            </td>
                            {show_booked_properties && (
                              <>
                                <td>{booking.property.bedrooms}</td>
                                <td>{booking.property.beds}</td>
                                <td>{booking.property.baths}</td>
                              </>
                            )}
                            <td>
                              {booking.start_date} - {booking.end_date}
                            </td>
                            <td>{booking.paid ? 'Yes' : 'No'}</td>
                            <td>
                              <button className='btn btn-danger'>Cancel</button>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Bookings;
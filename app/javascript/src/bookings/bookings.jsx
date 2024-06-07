import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors, safeCredentialsForm } from '@utils/fetchHelper';

import './bookings.scss';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      loading: true,
    };
  }

  componentDidMount() {
    console.log('Bookings component mounted');
  }

  render() {
    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <h1 className='text-center my-5'>Bookings</h1>
            <div className='col-12'>
              <div className='booking-buttons d-flex justify-content-center gap-2 mb-5'>
                <button className='btn btn-lg btn-primary'>My Booked Properties</button>
                <button className='btn btn-lg btn-primary'>My Property Bookings</button>
              </div>
              <div className='table-responsive'>
                <table className='table table-striped table-hover table-bordered align-items-center'>
                  <thead>
                    <tr className='align-middle text-center'>
                      <th></th>
                      <th>Property</th>
                      <th>Host</th>
                      <th>Price</th>
                      <th>Rooms</th>
                      <th>Beds</th>
                      <th>Baths</th>
                      <th>Check In - Check Out</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='align-middle text-center'>
                      <td>
                        <img src='https://placehold.co/75' alt='' />
                      </td>
                      <td>Property 1</td>
                      <td>Name</td>
                      <td>$0.00</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>6/6/2024 - 6/10/2024</td>
                      <td>
                        <button className='btn btn-danger'>Cancel</button>
                      </td>
                    </tr>
                    <tr className='align-middle text-center'>
                      <td>
                        <img src='https://placehold.co/75' alt='' />
                      </td>
                      <td>Property 2</td>
                      <td>Name</td>
                      <td>$0.00</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>6/6/2024 - 6/10/2024</td>
                      <td>
                        <button className='btn btn-danger'>Cancel</button>
                      </td>
                    </tr>
                    <tr className='align-middle text-center'>
                      <td>
                        <img src='https://placehold.co/75' alt='' />
                      </td>
                      <td>Property 3</td>
                      <td>Name</td>
                      <td>$0.00</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>6/6/2024 - 6/10/2024</td>
                      <td>
                        <button className='btn btn-danger'>Cancel</button>
                      </td>
                    </tr>
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
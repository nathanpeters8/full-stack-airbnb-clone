import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './hostProperty.scss';

class HostProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: 0,
      max_guests: 1,
      rooms: 1,
      beds: 1,
      baths: 1,
      image: null,
      loading: true,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
  };

  render() {
    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='text-center my-3'>Airbnb Your Property</h1>
              <form className='row g-2 d-flex justify-content-center' onSubmit={this.handleSubmit}>
                <div className='col-10'>
                  <input
                    type='text'
                    placeholder='Property Title'
                    className='form-control text-center'
                    onChange={(e) => {
                      this.setState({ title: e.target.value });
                    }}
                    value={this.state.title}
                  />
                </div>
                <div className='col-10'>
                  <textarea
                    name='description'
                    className='form-control text-center'
                    placeholder='Description'
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                    value={this.state.description}
                  ></textarea>
                </div>
                <div className='row justify-content-center text-center mt-4'>
                  <div className='col-3 me-3'>
                    <label htmlFor='inputPrice' className='form-label'>
                      Price <small>(per night)</small>
                    </label>
                    <input
                      type='number'
                      placeholder='$'
                      className='form-control text-center'
                      onChange={(e) => {
                        this.setState({ price: e.target.value });
                      }}
                      value={this.state.price}
                    />
                  </div>
                  <div className='col-3 ms-3'>
                    <label htmlFor='inputGuests' className='form-label'>
                      Max Guests
                    </label>
                    <select
                      className='form-select'
                      id='inputGuests'
                      onChange={(e) => {
                        this.setState({ max_guests: e.target.value });
                      }}
                      value={this.state.max_guests}
                    >
                      <option value={1} defaultValue>
                        1
                      </option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                </div>
                <div className='row justify-content-center text-center mt-4'>
                  <div className='col-2'>
                    <label htmlFor='inputRooms' className='form-label'>
                      Rooms
                    </label>
                    <select
                      className='form-select'
                      id='inputRooms'
                      onChange={(e) => {
                        this.setState({ rooms: e.target.value });
                      }}
                      value={this.state.rooms}
                    >
                      <option value={1} defaultValue>
                        1
                      </option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                  <div className='col-2'>
                    <label htmlFor='inputRooms' className='form-label'>
                      Beds
                    </label>
                    <select
                      className='form-select'
                      id='inputBeds'
                      onChange={(e) => {
                        this.setState({ beds: e.target.value });
                      }}
                      value={this.state.beds}
                    >
                      <option value={1} defaultValue>
                        1
                      </option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                  <div className='col-2'>
                    <label htmlFor='inputRooms' className='form-label'>
                      Baths
                    </label>
                    <select
                      className='form-select'
                      id='inputBaths'
                      onChange={(e) => {
                        this.setState({ baths: e.target.value });
                      }}
                      value={this.state.baths}
                    >
                      <option value={1} defaultValue>
                        1
                      </option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                </div>
                <div className='col-10 mt-4'>
                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    className='form-control'
                    onChange={(e) => {
                      this.setState({ image: e.target.value });
                    }}
                  />
                </div>
                <div className='col-6 text-center my-4'>
                  <button type='submit' className='btn btn-warning'>
                    Host Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default HostProperty;

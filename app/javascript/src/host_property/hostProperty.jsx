import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './hostProperty.scss';

class HostProperty extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    console.log('HostProperty component mounted');
  }

  render() {
    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='text-center my-3'>Airbnb Your Property</h1>
              <form className='row g-2 d-flex justify-content-center'>
                <div className='col-10'>
                  <input type='text' placeholder='Property Title' className='form-control text-center' />
                </div>
                <div className='col-10'>
                  <textarea
                    name='description'
                    className='form-control text-center'
                    placeholder='Description'
                  ></textarea>
                </div>
                <div className='row justify-content-center text-center mt-4'>
                  <div className='col-3 me-3'>
                    <label for='inputPrice' className='form-label'>
                      Price <small>(per night)</small>
                    </label>
                    <input type='number' placeholder='$' className='form-control text-center' />
                  </div>
                  <div className='col-3 ms-3'>
                    <label for='inputGuests' className='form-label'>
                      Max Guests
                    </label>
                    <select className='form-select' id='inputGuests'>
                      <option value={1} selected>
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
                    <label for='inputRooms' className='form-label'>
                      Rooms
                    </label>
                    <select className='form-select' id='inputRooms'>
                      <option value={1} selected>
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
                    <label for='inputRooms' className='form-label'>
                      Beds
                    </label>
                    <select className='form-select' id='inputBeds'>
                      <option value={1} selected>
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
                    <label for='inputRooms' className='form-label'>
                      Baths
                    </label>
                    <select className='form-select' id='inputBaths'>
                      <option value={1} selected>
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
                <div className="col-10 mt-4">
                  <input type="file" name='image' accept='image/*' className='form-control' multiple />
                </div>
                <div className="col-6 text-center my-4">
                  <button type='submit' className='btn btn-warning'>Host Property</button>
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

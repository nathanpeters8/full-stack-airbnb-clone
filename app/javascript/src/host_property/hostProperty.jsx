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
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default HostProperty;
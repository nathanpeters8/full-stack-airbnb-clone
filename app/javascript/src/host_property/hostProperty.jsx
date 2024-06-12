import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors, safeCredentialsForm } from '@utils/fetchHelper';
import PropertyForm from '../propertyForm';

import './hostProperty.scss';

class HostProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {
        title: '',
        description: '',
        price_per_night: 1,
        city: '',
        country: '',
        property_type: '',
        max_guests: 1,
        bedrooms: 1,
        beds: 1,
        baths: 1,
        images: [],
      },
      authenticated: false,
      loading: true,
      previewImage: null,
    };
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then((data) => {
        this.setState({
          authenticated: data.authenticated,
          loading: false,
        });
      });
  }

  handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      this.setState(prevState => ({
        property: {
          ...prevState.property,
          images: e.target.files,
        }, 
        previewImage: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      this.setState(prevState => ({
        property: {
          ...prevState.property,
          [name]: name === 'price_per_night' ? parseFloat(value) : value,
        },
      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();

    Object.keys(this.state.property).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < this.state.property[key].length; i++){
          formData.append(`property[${key}][]`, this.state.property[key][i]);
        }
      } else {
        formData.set(`property[${key}]`, this.state.property[key]);
      }
    });

    fetch(
      '/api/properties',
      safeCredentialsForm({
        method: 'POST',
        body: formData,
      })
    )
      .then(handleErrors)
      .then((response) => {
        console.log(response);
        // redirect to the home page
        window.location.href = '/';
      });
  };

  render() {
    if (!this.state.authenticated) {
      return (
        <Layout>
          <div className='border p-4 mb-4'>
            Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to host a property.
          </div>
        </Layout>
      );
    }
    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='text-center my-3'>Airbnb Your Property</h1>
              <PropertyForm
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                property={this.state.property}
                formType='create'
                previewImage={this.state.previewImage}
                changedFields={[]}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default HostProperty;

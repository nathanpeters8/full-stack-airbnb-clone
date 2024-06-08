// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import PropertyForm from '../propertyForm';
import { handleErrors } from '@utils/fetchHelper';
import { Modal, Button } from 'react-bootstrap';

import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    showModal: false,
    previewImage: null,
  };

  componentDidMount() {
    console.log(this.props.property_id);
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          property: data.property,
          loading: false,
        });
      });
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      this.setState((prevState) => ({
        property: {
          ...prevState.property,
          image: e.target.files[0],
        },
        previewImage: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      this.setState((prevState) => ({
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
      if (key === 'image') {
        formData.set(`property[${key}]`, this.state.property[key], this.state.property[key].name);
      } else {
        formData.set(`property[${key}]`, this.state.property[key]);
      }
    });

    fetch(
      `/api/properties/${this.props.property_id}`,
      safeCredentialsForm({
        method: 'PUT',
        body: formData,
      })
    )
      .then(handleErrors)
      .then((response) => {
        console.log(response);
        this.setState({ property: response.property, showModal: false });
      });
  };

  render() {
    const { property, loading, previewImage } = this.state;

    if (loading) {
      return <p>loading...</p>;
    }

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image,
      user,
    } = property;

    const currentImage = image
      ? image
      : `https://cdn.altcademy.com/assets/images/medium/airbnb_clone/${property.id - 1}.jpg`;

    return (
      <Layout>
        <div className='property-image mb-3' style={{ backgroundImage: `url(${currentImage})` }} />
        <div className='container'>
          <div className='row'>
            <div className='info col-8'>
              <div className='mb-3'>
                <h3 className='mb-0'>{title}</h3>
                <p className='text-uppercase mb-0 text-secondary'>
                  <small>
                    {city}, {country}
                  </small>
                </p>
                <p className='mb-0'>
                  <small>
                    Hosted by <b>{user.username}</b>
                  </small>
                </p>
              </div>
              <div>
                <p className='mb-0 text-capitalize'>
                  <b>{property_type}</b>
                </p>
                <p className='text-nowrap'>
                  <span className='me-3'>{max_guests} guests</span>
                  <span className='me-3'>{bedrooms} bedroom</span>
                  <span className='me-3'>{beds} bed</span>
                  <span className='me-3'>{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div className='col-4'>
              <button className='btn btn-warning my-1 my-sm-0 mx-1' type='button' onClick={this.handleOpenModal}>
                Edit
              </button>
              <button className='btn btn-warning my-1 my-sm-0 mx-1'>Delete</button>
            </div>
            <div className='col-12 col-lg-5'>
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
          </div>
        </div>
        {/* Modal */}
        <Modal show={this.state.showModal} onHide={this.handleCloseModal} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Edit Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PropertyForm property={property} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} formType='edit' previewImage={previewImage} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant='primary' onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    );
  }
}

export default Property;

// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import PropertyForm from '../propertyForm';
import { handleErrors, safeCredentialsForm, safeCredentials } from '@utils/fetchHelper';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    showEditModal: false,
    showDeleteModal: false,
    previewImage: null,
    changedFields: [],
    isAuthenticated: false,
    currentUser: null,
    currentImageIndex: 0,
  };

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          property: data.property,
          loading: false,
        });
      });

    fetch(
      '/api/authenticated',
      safeCredentials({
        method: 'GET',
      })
    )
      .then(handleErrors)
      .then((data) => {
        this.setState({ isAuthenticated: data.authenticated, currentUser: data.username });
      });
  }

  handleOpenEditModal = () => {
    this.setState({ showEditModal: true });
  };

  handleCloseEditModal = () => {
    this.setState({ showEditModal: false }, () => {
      this.setState({ changedFields: [] }, () => {
        window.location.reload();
      });
    });
  };

  handleOpenDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };

  handleCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  nextImage = () => {
    const { property, currentImageIndex } = this.state;
    this.setState({ currentImageIndex: (currentImageIndex + 1) % property.images.length });
  };

  prevImage = () => {
    const { property, currentImageIndex } = this.state;
    this.setState({ currentImageIndex: (currentImageIndex - 1 + property.images.length) % property.images.length });
  };

  handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      this.setState((prevState) => ({
        property: {
          ...prevState.property,
          images: e.target.files,
        },
        previewImage: URL.createObjectURL(e.target.files[0]),
        changedFields: [...prevState.changedFields, name],
      }));
    } else {
      this.setState((prevState) => ({
        property: {
          ...prevState.property,
          [name]: name === 'price_per_night' ? parseFloat(value) : value,
        },
        changedFields: [...prevState.changedFields, name],
      }));
    }
  };

  handleDelete = () => {
    fetch(
      `/api/properties/${this.props.property_id}`,
      safeCredentials({
        method: 'DELETE',
      })
    )
      .then(handleErrors)
      .then(() => {
        this.setState({ showDeleteModal: false }, () => {
          window.location.href = '/';
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { property, changedFields, isAuthenticated } = this.state;
    const formData = new FormData();

    changedFields.forEach((field) => {
      if (field !== 'user' && field !== 'id') {
        if (field === 'images') {
          for (let i = 0; i < property[field].length; i++) {
            formData.append(`property[${field}][]`, property[field][i]);
          }
        } else {
          formData.append(`property[${field}]`, property[field]);
        }
      }
    });

    fetch(
      `/api/properties/${this.props.property_id}`,
      safeCredentialsForm({
        method: 'PATCH',
        body: formData,
      })
    )
      .then(handleErrors)
      .then((response) => {
        console.log(response);
        this.setState({ property: response.property, showEditModal: false, changedFields: [] });
      });
  };

  render() {
    const { property, loading, previewImage, currentUser, changedFields, currentImageIndex } = this.state;

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
      images,
      user,
    } = property;

    const currentImage =
      images.length > 0
        ? images[currentImageIndex].url
        : `https://cdn.altcademy.com/assets/images/medium/airbnb_clone/${property.id - 1}.jpg`;

    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <div
              className='col-12 property-image mb-3 d-flex align-items-center justify-content-between'
              style={{ backgroundImage: `url(${currentImage})` }}
            >
              <button className={`btn btn-danger btn-lg ${images.length < 2 ? 'd-none' : ''}`} onClick={this.prevImage}>
                <FontAwesomeIcon icon={faChevronLeft}/>
              </button>
              <button className={`btn btn-danger btn-lg ${images.length < 2 ? 'd-none' : ''}`} onClick={this.nextImage}>
                <FontAwesomeIcon icon={faChevronRight}/>
              </button>
            </div>
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
            {(() => {
              if (currentUser !== user.username) {
                return null;
              }
              return (
                <div className='col-4'>
                  <button
                    className='btn btn-warning my-1 my-sm-0 mx-1'
                    type='button'
                    onClick={this.handleOpenEditModal}
                  >
                    Edit
                  </button>
                  <button className='btn btn-warning my-1 my-sm-0 mx-1' onClick={this.handleOpenDeleteModal}>
                    Delete
                  </button>
                </div>
              );
            })()}
            <div className='col-12 col-lg-5'>
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
          </div>
        </div>
        {/* Edit Property Modal */}
        <Modal show={this.state.showEditModal} onHide={this.handleCloseEditModal} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Edit Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PropertyForm
              property={property}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              formType='edit'
              previewImage={previewImage}
              changedFields={changedFields}
              completeForm={true}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleCloseEditModal}>
              Close
            </Button>
            <Button variant='primary' onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Delete Property Modal */}
        <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this property?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleCloseDeleteModal}>
              Close
            </Button>
            <Button variant='danger' onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    );
  }
}

export default Property;

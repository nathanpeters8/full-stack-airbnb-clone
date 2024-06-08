import React from 'react';
import ReactDOM from 'react-dom';

const PropertyForm = ({ handleInputChange, handleSubmit, property, formType, previewImage }) => {
  return (
    <form className='row g-2 d-flex justify-content-center' onSubmit={handleSubmit}>
      <div className='col-10'>
        <input
          type='text'
          name='title'
          placeholder='Property Title'
          className='form-control text-center'
          onChange={handleInputChange}
          value={property.title}
        />
      </div>
      <div className='col-10'>
        <textarea
          name='description'
          className='form-control text-center'
          placeholder='Description'
          onChange={handleInputChange}
          value={property.description}
        ></textarea>
      </div>
      <div className='col-10'>
        <input
          type='text'
          name='property_type'
          placeholder='Property Type'
          className='form-control text-center'
          onChange={handleInputChange}
          value={property.property_type}
        />
      </div>
      <div className='row justify-content-center text-center mt-4'>
        <div className='col-4'>
          <input
            type='text'
            name='city'
            placeholder='City'
            className='form-control text-center'
            onChange={handleInputChange}
            value={property.city}
          />
        </div>
        <div className='col-4'>
          <input
            type='text'
            name='country'
            placeholder='Country'
            className='form-control text-center'
            onChange={handleInputChange}
            value={property.country}
          />
        </div>
      </div>
      <div className='row justify-content-center text-center mt-4'>
        <div className='col-3 me-3'>
          <label htmlFor='inputPrice' className='form-label'>
            Price <small>(per night)</small>
          </label>
          <input
            type='number'
            name='price_per_night'
            placeholder='$'
            className='form-control text-center'
            onChange={handleInputChange}
            value={property.price_per_night}
          />
        </div>
        <div className='col-3 ms-3'>
          <label htmlFor='inputGuests' className='form-label'>
            Max Guests
          </label>
          <select
            className='form-select'
            name='max_guests'
            id='inputGuests'
            onChange={handleInputChange}
            value={property.max_guests}
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
            name='bedrooms'
            id='inputRooms'
            onChange={handleInputChange}
            value={property.bedrooms}
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
          <select className='form-select' name='beds' id='inputBeds' onChange={handleInputChange} value={property.beds}>
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
            name='baths'
            id='inputBaths'
            onChange={handleInputChange}
            value={property.baths}
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
      <div className="col-8 mt-4 d-flex justify-content-center">
        {(property.image || previewImage) && (
          <>
            <div
              className='property-image mb-1 rounded me-1'
              style={{
                backgroundImage: `url(${previewImage || property.image})`,
                width: `${formType === 'create' ? '400px' : '250px'}`,
                height: `${formType === 'create' ? '300px' : '150px'}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </>
        )}
      </div>
      <div className='col-10 mt-4'>
        <input type='file' name='image' accept='image/*' className='form-control' onChange={handleInputChange} />
      </div>
      <div className={`col-6 text-center my-4 ${formType === 'edit' ? 'd-none' : ''}`}>
        <button type='submit' className='btn btn-warning'>
          Host Property
        </button>
      </div>
    </form>
  );
};
export default PropertyForm;

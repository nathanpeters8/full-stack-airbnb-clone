json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date

    json.property do
      json.property_id booking.property.id
      json.title booking.property.title
      json.price_per_night booking.property.price_per_night
      json.bedrooms booking.property.bedrooms
      json.beds booking.property.beds
      json.baths booking.property.baths
      json.username booking.property.user.username
      json.image url_for(booking.property.image) if booking.property.image.attached?
    end
  end
end
json.property do
    json.title @property.title
    json.description @property.description
    json.city @property.city
    json.country @property.country
    json.property_type @property.property_type
    json.price_per_night @property.price_per_night
    json.max_guests @property.max_guests
    json.bedrooms @property.bedrooms
    json.beds @property.beds
    json.baths @property.baths

    json.images do
      json.array! @property.images do |image|
        json.url url_for(image) if @property.images.attached?
      end
    end

    json.user do
      json.id @property.user.id
      json.username @property.user.username
    end
end
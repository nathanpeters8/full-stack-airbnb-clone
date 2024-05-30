Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/property/:id' => 'static_pages#property'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: %i[create destroy]
    resources :properties, only: [:index, :show]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
  end
end

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create]
  resources :workouts, only: [:index]
  resources :exercise_routines, only: [:index, :create]
  resources :routines, only: [:index, :create, :destroy]
  resources :exercise_rxes, only: [:show, :index, :create, :update]
  # Defines the root path route ("/")
  # root "articles#index"

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/authorized', to: 'users#show'
  get '/last_routine', to: 'exercise_rxes#last_routine'
  get '/last_workout', to: 'routines#last_workout'
  get '/all_routines', to: 'routines#all_routines'

end

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create]
  resources :workouts, only: [:index]
  resources :exercise_routines, only: [:index, :create]
  resources :routines, only: [:index, :create, :destroy]
  resources :exercise_rxes, only: [:show, :create, :update, :destroy]
  resources :weights, only: [:create]
  # Defines the root path route ("/")
  # root "articles#index"

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/authorized', to: 'users#show'
  
  #at User.js
  #gets only names and id
  get '/routine_names', to: 'routines#routine_names'
  get '/get_routine_by_date', to: 'routines#get_routine_by_date'


  get '/get_last_routine', to: 'routines#get_last_routine'
  get '/last_workout', to: 'routines#last_workout'
  get '/all_routines', to: 'routines#all_routines'
  
  get '/all_exercise_routines', to: 'exercise_routines#all_exercise_routines'
  get '/data_from_workout', to: 'exercise_routines#data_from_workout'
  get '/match_date', to: 'exercise_routines#match_date'
  
  get '/last_routine', to: 'exercise_rxes#last_routine'
  get '/routine_completed', to: 'exercise_rxes#complete_routine'
  get '/find_completed_routine', to: 'exercise_routines#find_completed_routine'
  # get '/find_completed_routine', to: 'routines#find_completed_routine'

end

Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
  resources :users, only: [:show, :edit, :update]
  resources :posts, only: [:index, :show, :new, :create] do
    resources :comments
  end
  post "/likes/:likeable_type/:likeable_id", to: "likes#create", as: :like
end

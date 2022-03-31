Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
  resources :users, only: [:show, :edit, :update] do
    resources :friendships
  end
  resources :posts, only: [:index, :new, :create, :edit, :update, :destroy] do
    resources :comments
  end
  resources :dialogs
  post "/likes/:likeable_type/:likeable_id", to: "likes#create", as: :like
end

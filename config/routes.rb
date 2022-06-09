Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
  resources :users, only: [:show, :edit, :update] do
    resources :friendships
  end
  resources :posts do
    resources :comments
  end
  resources :dialogs do
    resources :messages
  end
  post "/likes/:likeable_type/:likeable_id", to: "likes#create", as: :like
  get "search", to: "search#search"

  resources :subscriptions
  resources :stripe
  resources :purchases, only: [:index]
  post 'stripe/webhook', to: "stripe#webhook"
  get 'purchases/portal', to: "purchases#stripe_portal", as: :portal
  post '/portal', to: "stripe#portal"
end

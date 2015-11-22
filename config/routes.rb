Rails.application.routes.draw do
  devise_for :users

  get 'users/profile/:id' => "user#profile", as: "user_profile"
  get 'users/settings' => "user#settings", as: "user_settings"
  get 'users/follow/:user_id' => "user#follow", as: "user_follow"
  get 'users/unfollow/:user_id' => "user#unfollow", as: "user_unfollow"
  get 'users/block/:user_id' => "user#block", as: "user_block"
  get 'users/unblock/:user_id' => "user#unblock", as: "user_unblock"
  patch 'users/update' => "user#update", as: "user"

  root "main#index"

  namespace :main do
    get '/', action: :index
    get '/search', action: :search
    get '/explore', action: :explore
    get '/settings', action: :settings
    get '/notifications', action: :notifications
  end

  namespace :posts do
    post '/new', action: :new
    delete '/delete/:post_id', action: :delete, as: 'delete'
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

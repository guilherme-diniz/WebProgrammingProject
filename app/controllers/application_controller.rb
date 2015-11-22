class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

   def authorize
    authenticate_user!
  end

  def after_sign_in_path_for(resource)
    return'/main/settings' if current_user.sign_in_count == 1
    return '/main/explore'
  end
end

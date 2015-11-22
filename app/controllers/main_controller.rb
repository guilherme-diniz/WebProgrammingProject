class MainController < ApplicationController

  def search
    @search = params[:search]
    @posts = Post.full_text_search(@search)
    @users = User.full_text_search(@search)
    @index = 0
  end

  def explore
    users = [current_user] + current_user.all_followees
    @posts = Post.where(:user.in => users).order_by(:created_at.desc)
  end

  def settings
    @user = User.find(current_user.id)
  end

end

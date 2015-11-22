class PostsController < ApplicationController
  before_filter :authorize

  def new
      text = params[:post]
      post = Post.new
      post.text = text
      post.user = current_user

      respond_to do |format|
        if post.save
          format.html { redirect_to main_explore_path, notice: "Post submit sucessfully!"}
        else
          format.html { redirect_to main_explore_path, alert: "Error submit post!"}
        end
      end
  end

  def delete
    post = Post.find(params[:post_id])
    respond_to do |format|
      if post.delete
        format.html { redirect_to :back, notice: "Post deleted sucessfully!"}
      else
        format.html { redirect_to :back, alert: "Error deleting post!"}
      end
    end
  end
end

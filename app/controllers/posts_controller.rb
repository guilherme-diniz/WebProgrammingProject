class PostsController < ApplicationController
  before_filter :authorize

  def new
      text = params[:post]
      post = Post.new
      post.text = text
      post.user = current_user

      respond_to do |format|
        if post.save
          format.html { redirect_to main_explore_path, notice: "Post realizado com sucesso!"}
        else
          format.html { redirect_to main_explore_path, alert: "Erro ao submeter post!"}
        end
      end
  end

  def delete
    post = Post.find(params[:post_id])
    respond_to do |format|
      if post.delete
        format.html { redirect_to :back, notice: "Post removido com sucesso!"}
      else
        format.html { redirect_to :back, alert: "Erro ao remover post!"}
      end
    end
  end
end

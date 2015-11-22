class UserController < ApplicationController
  before_filter :authorize, only: [:follow, :unfollow, :block, :unblock]

  def profile
    user_id = params[:id]
    user_id ||= current_user.id

    @user =User.where(id: user_id).first
    @index = 0
  end

  def follow
    @user = User.find(params[:user_id])
    respond_to do |format|
      if Blocked.where(blocked_by: @user, blocked: current_user).count > 0
          format.html {redirect_to :back, alert: "You can't follow this user."}
      else
        current_user.follow(@user)
          format.html {redirect_to :back, notice: "You're following this user."}
      end
    end
  end

  def unfollow
    @user = User.find(params[:user_id])
    current_user.unfollow(@user)
    respond_to do |format|
      format.html {redirect_to :back, notice: "You unfollow this user"}
    end
  end

  def block
    @user = User.find(params[:user_id])
    block = Blocked.new
    block.blocked_by = current_user
    block.blocked = @user
    block.save!

    respond_to do |format|
      format.html {redirect_to :back, notice: "This user has been blocked"}
    end
  end

  def unblock
    @user = User.find(params[:user_id])
    block = Blocked.where(blocked_by: current_user, blocked: @user)
    block.delete
    respond_to do |format|
      format.html {redirect_to :back, notice: "This user has been unblocked"}
    end
  end

  def update
    @user = User.find(current_user.id)
    @user.name = user_params[:name]
    @user.email = user_params[:email]
    @user.avatar = user_params[:avatar] if user_params[:avatar]

    respond_to do |format|
      if @user.save!
        format.html { redirect_to main_settings_path, notice: 'Settings saved successfully' }
      else
        format.html { render main_settings_path , alert: "Error saving setting"}
      end
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :avatar, :notifications)
    end

end

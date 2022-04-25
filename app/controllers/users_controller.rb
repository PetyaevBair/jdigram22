class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token


  before_action :user_find, only: [:show, :edit, :update]

  def show
    @subscribes = Friendship.where(friend_id: @user.id).count
    @subscriptions = Friendship.where(user_id: @user.id).count
  end

  def edit
  end

  def update
    if @user.update(users_params)
      render json: "DATAAA"
      # redirect_to user_path(current_user)
    else
      redirect_to edit_user_path(@user)
    end

  end

  private

  def users_params
    params.permit(:id, :bio, :name, :username, :phone, :email, :image)
  end

  def user_find
    @user = User.find(params[:id])
  end

end

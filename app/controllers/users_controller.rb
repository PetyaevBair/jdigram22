class UsersController < ApplicationController

  before_action :user_find, only: [:show, :edit, :update]

  def show
  end

  def edit
  end

  def update

    if @user.update(users_params)
      redirect_to user_path(current_user)
    else
      redirect_to edit_user_path(@user)
    end
  end

  private

  def users_params
    params.require(:user).permit(:bio, :name, :username, :phone, :email, :image)
  end

  def user_find
    @user = User.find(params[:id])
  end

end

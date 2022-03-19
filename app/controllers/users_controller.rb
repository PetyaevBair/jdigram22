class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

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

end

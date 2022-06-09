class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token


  before_action :user_find, only: [:edit, :update]

  def show
    @user = User.includes(image_attachment: :blob).find(params[:id])
    @subscribes = Friendship.where(friend_id: @user.id).count
    @subscriptions = Friendship.where(user_id: @user.id).count
  end

  def edit; end

  def update
    if @user.update(users_params)
      render json: {completed: 'Успешно', status: 200}
    else
      @error_phone = @user.errors.full_messages.to_sentence
      render json: {completed: 'Провал', error: @error_phone, status: 500}
      # respond_to do |format|
      #   format.json {render json: @error_phone}
      # end
    end
    #render json: {completed: 'Успешно', status: 200}
  
  end

  private

    def users_params
      params.permit(:id, :bio, :name, :username, :phone, :email, :image)
    end

    def user_find
      @user = User.find(params[:id])
    end

end

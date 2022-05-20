class FriendshipsController < ApplicationController

	def index
		@user = User.find(params[:user_id])
		@friends = @user.friends
		@friends_all = []
		@friends.each do |friend|
			if Friendship.find_by(friend_id: @user.id, user_id: friend.id).present?
				@friends_all.append(friend)
			end
		end
	end

	def create
	    @friendships = current_user.friendships.where(friend_id: params[:id])
	    @user = User.find(params[:id])
	    if @friendships.present?
	    	@friendships.destroy_all
	    else
			@friendships = @current_user.friendships.create(friend_id: params[:id])
		end

		respond_to do |format|
			format.js
		end
  	end

  	private

	  	def friend_params
	  		params.permit[:id]  		
	  	end

end

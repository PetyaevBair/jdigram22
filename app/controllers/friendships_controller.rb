class FriendshipsController < ApplicationController

	def index
		@user = User.find(params[:user_id])
		@friendships = @user.friends.all
		@friends = []
		@friendships.each do |friendship|
			if friendship.friends.find(@user.id).present?
				@friends.append(friendship)
			end
		end

	end

	def create
	    @friendship = current_user.friendships.create(friend_id: params[:id])
  	end


  	private

  	def friend_params
  		params.permit[:id]  		
  	end

end

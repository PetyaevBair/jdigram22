class LikesController < ApplicationController
	def create
		@likes = current_user.likes.where(likes_params)
		@post = Post.find(params[:likeable_id])
		if @likes.present?
			@likes.destroy_all
		else
			@likes = @current_user.likes.create(likes_params)
		end
	end



	private

	def likes_params
		params.permit(:likeable_type, :likeable_id)
	end


end
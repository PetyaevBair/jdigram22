class LikesController < ApplicationController
	def create
		likes = current_user.likes.where(likes_params)

		if likes.present?
			likes.destroy_all
		else
			current_user.likes.create(likes_params)
		end
	end



	private

	def likes_params
		params.permit(:likeable_type, :likeable_id)
	end


end
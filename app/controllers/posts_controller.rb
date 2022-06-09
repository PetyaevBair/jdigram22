class PostsController < ApplicationController
	before_action :post_find, only: [:show, :update]
	before_action :sanitize_fields_params, only: [:create]

	def index
		@posts = Post.includes([:comments, user: [ image_attachment: :blob ]]).order(created_at: :desc)
	end

	def show; end

	def new
		@post = current_user.posts.new
	end

	def create
		@post = current_user.posts.new(description: params[:post][:description], image: params[:post][:image])
		if current_user.subscription.blank?	and current_user.posts.count >= 40
			redirect_to new_post_path, alert: "В бесплатной версии приложения вы не можете выложить больше 4-ёх постов"
		else
			if @post.save
				redirect_to user_path(current_user)
	    else
	    	redirect_to new_post_path, alert: @post.errors.full_messages.to_sentence
			end
		end
	end

	def edit
		@post = current_user.posts.find(params[:id])
	end

	def update
		@post.update(post_params)
		redirect_to root_path
	end

	def destroy
		@post = current_user.posts.find(params[:id])
		@post.destroy
	end

	private

		def sanitize_fields_params
			$logo_crop_x = 0
	    	$logo_crop_y = 0
	    	$logo_crop_w = 0
	    	$logo_crop_h = 0
				
	    	$logo_crop_x = params[:post][:logo_crop_x]
	    	$logo_crop_y = params[:post][:logo_crop_y]
	    	$logo_crop_w = params[:post][:logo_crop_w]
	    	$logo_crop_h = params[:post][:logo_crop_h]

	    	puts "\n\n\n\n\n\n\n\n\n\n x: #{$logo_crop_x} \n\n\n\n y: #{$logo_crop_y} \n\n\n\n w: #{$logo_crop_w} \n\n\n\n\n h: #{$logo_crop_h}"

		end

		def post_params
			params.require(:post).permit(:description, :image, :logo_crop_x, :logo_crop_y, :logo_crop_w, :logo_crop_h)
		end
		
		def post_find
			@post = Post.find(params[:id])
		end

end

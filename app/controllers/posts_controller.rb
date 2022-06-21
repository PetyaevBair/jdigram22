class PostsController < ApplicationController
	before_action :post_find, only: [:show, :update]

	def index
		@posts = Post.includes([:comments, image_attachment: :blob,	user: [image_attachment: :blob]]).order(created_at: :desc).page(params[:page]).per(5)
		respond_to do |format|
			format.html
			format.json {
				render json: { entries: render_to_string(partial: "posts/partials/posts_all", formats: [:html]), pagination: view_context.paginate(@posts)}
			}
		end
	end

	def show; end

	def new
		@post = current_user.posts.new
	end

	def create
		@post = current_user.posts.new(post_params)
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

		def post_params
			params.require(:post).permit(:description, :image, :logo_crop_x, :logo_crop_y, :logo_crop_w, :logo_crop_h)
		end
		
		def post_find
			@post = Post.find(params[:id])
		end

end

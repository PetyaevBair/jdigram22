class PostsController < ApplicationController
	def index
		@posts = Post.includes(:likes).order(created_at: :desc)
	end

	def show
    	@post = Post.find(params[:id])
    	@comment = @post.comments.new
  	end

	def new
		@post = Post.new
	end

	def create
		@post = current_user.posts.new(post_params)
		if @post.save
			redirect_to user_path(current_user)
    	else
      		redirect_to new_post_path(@post)
		end

	end

	private

	def post_params
		params.require(:post).permit(:description, :image)
	end

end

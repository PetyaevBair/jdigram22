class PostsController < ApplicationController
	before_action :post_find, only: [:show, :update]

	def index
		@posts = Post.includes(:likes).order(created_at: :desc)
	end

	def show
    end

	def new
		@post = current_user.posts.new
	end

	def create
		@post = current_user.posts.new(post_params)
		if @post.save
			redirect_to user_path(current_user)
    	else
      		redirect_to new_post_path(@post)
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
		params.require(:post).permit(:description, :image)
	end

	def post_find
		@post = Post.find(params[:id])
	end

end

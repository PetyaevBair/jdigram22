class CommentsController < ApplicationController
  
  before_action :find_comments, only: [:show, :create, :edit, :update, :destroy]

  def show
    @comment = @post.comments.find(params[:id])
  end

  def create
  	@comment = @post.comments.new(comment_params)
    @comment.user = current_user
    @comment.save
  end

  def edit
    @comment = @post.comments.find(params[:id])
  end

  def update
    @comment = @post.comments.find(params[:id])
    @comment.update(comment_params)
  end

  def destroy
    @comment = @post.comments.find(params[:id])
    @comment.destroy
  end

  private

    def comment_params
  	 params.require(:comment).permit(:text)
    end

    def find_comments
      @post = Post.find(params[:post_id])
    end

end

class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
  	@comment = @post.comments.new(comment_params)
    @comment.user = current_user
    @comment.save
  end

  def update
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[id])
  end

  def destroy
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.destroy
  end

  private

  def comment_params
	 params.require(:comment).permit(:text)
  end

end

class CommentsController < ApplicationController
  def create
  	@comment = Post.find(params[:post_id]).comments.new(comment_params)
    @comment.user = current_user
    @comment.save
    redirect_to root_path
  	
  end

  def update
    @comment = Comment.find(params[id])
  end

  def comment_params
	 params.require(:comment).permit(:text)
  end

end

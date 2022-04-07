class MessagesController < ApplicationController
	def create
		@dialog = Dialog.find(params[:dialog_id])
	  	@message = @dialog.messages.new(message_params.merge({user_id: params[:user_id]}))
	    if @message.save
		    DialogChannel.broadcast_to @dialog, body: @message.body, user: @message.user.username
	    end	
	end

	def destroy
		@dialog = Dialog.find(params[:dialog_id])
		@message = @dialog.messages.find(params[:id])
		@message.destroy
	end

	private
	
	def message_params
		params.require(:message).permit(:body)
	end
end

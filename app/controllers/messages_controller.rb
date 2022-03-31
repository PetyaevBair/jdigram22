class MessagesController < ApplicationController
	def create
		@dialog = Dialog.find(params[:dialog_id])
	  	@message = @dialog.messages.new(message_params)
	    @message.user_id = params[:user_id]
	    @message.save
	end

	private
	
	def message_params
		params.require(:message).permit(:body)
	end
end

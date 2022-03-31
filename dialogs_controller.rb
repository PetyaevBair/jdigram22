class DialogsController < ApplicationController

	def index
		@dialogs = current_user.dialogs.all
	end

	def show
		@dialog = current_user.dialogs.where(user_id: :user_id, id: :id)
	end

	def createhnfg ngddc,hgfdh,db dgdh,gdshj

	end

end

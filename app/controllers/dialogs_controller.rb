class DialogsController < ApplicationController
  def index
  	@dialogs_users = DialogsUser.where(user_id: :user_id)
  end

  def show
  	@dialog = Dialog.find(params[:id])
  end
  def create
  	dialogs_users = DialogsUser.where(user_id: current_user.id)
  	dialogs_users.each do |dialogs_user|
  		dialogs_user = DialogsUser.where(user_id: params[:user_id], dialog_id: dialogs_user.dialog.id)
  		if dialogs_user.present?
  			@dialog = dialogs_user.first.dialog
  			redirect_to dialog_path(@dialog) and return
  		end
  	end
  	@new_dialog = Dialog.create
  	DialogsUser.create(dialog_id: @new_dialog.id, user_id: current_user.id)
  	DialogsUser.create(dialog_id: @new_dialog.id, user_id: params[:user_id])
  	redirect_to dialog_path(@new_dialog)
  	
  end
end

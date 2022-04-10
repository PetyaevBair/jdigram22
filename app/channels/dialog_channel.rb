class DialogChannel < ApplicationCable::Channel

  def subscribed
   stream_for dialog
  end


  def dialog
    Dialog.find(params[:dialog_id])
  end


  def unsubscribed
    stop_all_streams
  end
end

# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  dialog_id  :integer
#  user_id    :integer
#
class Message < ApplicationRecord
	belongs_to :user
	belongs_to :dialog
end

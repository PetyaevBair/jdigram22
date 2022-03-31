# == Schema Information
#
# Table name: dialogs_users
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  dialog_id  :integer
#  user_id    :integer
#
class DialogsUser < ApplicationRecord

  belongs_to :user
  belongs_to :dialog

end

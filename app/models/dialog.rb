# == Schema Information
#
# Table name: dialogs
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Dialog < ApplicationRecord

  has_many :dialogs_users
  has_many :users, through: :dialogs_users

end

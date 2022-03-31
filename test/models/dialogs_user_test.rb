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
require "test_helper"

class DialogsUserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  friend_id  :integer
#  user_id    :integer
#
require "test_helper"

class FriendshipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

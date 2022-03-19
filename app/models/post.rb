# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#
class Post < ApplicationRecord
	belongs_to :user

	has_many :comments, as: :commentable
	has_many :likes, as: :likeable

	has_one_attached :image
end

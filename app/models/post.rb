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
	
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy

  has_one_attached :image

  validates :description, presence: true
  validates :description, length: { minimum: 10 }
  validate :image_presence

  private

  def image_presence
  	errors.add(:image, "can't be blank") unless image.attached?
  end
end

# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  description :string
#  logo_crop_h :integer
#  logo_crop_w :integer
#  logo_crop_x :integer
#  logo_crop_y :integer
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

  def crop
    image.variant(crop: "#{logo_crop_w}x#{logo_crop_h}+#{logo_crop_x}+#{logo_crop_y}")
  end

end

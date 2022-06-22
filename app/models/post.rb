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

  before_save :convert_to_int

  validates :description, presence: true
  validates :description, length: { minimum: 10 }

  def crop
    image.variant(crop: "#{self.logo_crop_w}x#{self.logo_crop_h}+#{self.logo_crop_x}+#{self.logo_crop_y}")
  end

  private

    def convert_to_int
      logo_crop_x = logo_crop_x.to_i
      logo_crop_y = logo_crop_y.to_i
      logo_crop_w = logo_crop_w.to_i
      logo_crop_h = logo_crop_h.to_i
    end

end

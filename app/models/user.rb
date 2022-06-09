# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  bio                    :text
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string
#  phone                  :bigint
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  stripe_id              :string
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  searchkick

  elastic_query = {
    fields: [:username, :name]
  }

  has_many :dialogs_users, dependent: :destroy
  has_many :dialogs, through: :dialogs_users, dependent: :destroy

  has_many :posts, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_one :subscription
  has_one_attached :image
  has_many :friendships
  has_many :friends, through: :friendships
  validates :name, length: { minimum: 4}

  def image_presence
    errors.add(:image, "не может быть пустым") unless image.attached?
  end
  
end

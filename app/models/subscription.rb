# == Schema Information
#
# Table name: subscriptions
#
#  id                     :bigint           not null, primary key
#  active                 :boolean          default(TRUE)
#  current_period_ends_at :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  plan_id                :string
#  stripe_id              :string
#  user_id                :integer
#
class Subscription < ApplicationRecord
	belongs_to :user

	def interrupt
  		Stripe::Subscription.delete(stripe_id)
  		self.active = false
  		save
	end
end

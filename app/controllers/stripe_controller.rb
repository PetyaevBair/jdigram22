class StripeController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      subscription_data: {
        items: [{ plan: params[:plan] }],
      },
      customer: current_user.stripe_id,
      client_reference_id: current_user.id,
      success_url: root_url,
      cancel_url: root_url,
    )

    render json: { session_id: session.id }
  end

  def webhook
    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, ENV["STRIPE_WEBHOOK_SECRET"]
      )
    rescue JSON::ParserError => e
      status 400
      return
    rescue Stripe::SignatureVerificationError => e
      # Invalid signature
      puts "Signature error"
      p e
      return
    end
    puts "\n\n\n\n\n\n\n\n\nВот тип вебхука: #{event.type}\n\n\n\n\n\n\n\n\n\n"
    # Handle the event
    case event.type
    when 'checkout.session.completed'
      object = event.data.object
      puts "Вот наш объект вот он: #{object[:client_reference_id]}"
      subscript = object.subscription
      stripe = Stripe::Subscription.retrieve(subscript)
      current_period_end = stripe.current_period_end
      plan = stripe.items.data[0].id
      @subscription = Subscription.new(user_id: object[:client_reference_id], stripe_id: subscript, plan_id: plan, current_period_ends_at: current_period_end)
      redirect_to root_path, alert: "Вы приобрели подписку на сервис, теперь вам доступны расширенные возможности"
      @subscription.save
    when 'customer.subscription.deleted'
      object = event.data.object
      #subscription = Subscription.find_by(stripe_id: )
      puts "\n\n\n\n\n\n\n\n\n\n\n\n Айди подписки: #{object.id}\n\n\n\n\n\n\n\n\n\n\n\n\n"
      subscription = Subscription.find_by(stripe_id: object.id)
      subscription.destroy
    end
  end

  def portal
    stripe = Stripe::Subscription.retrieve(current_user.subscription.stripe_id)
    session = Stripe::BillingPortal::Session.create({
      customer: stripe.customer,
      return_url: 'http://127.0.0.1:3000/',
    })

    redirect_to session.url
  end
end

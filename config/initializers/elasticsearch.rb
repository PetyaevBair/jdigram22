require 'elasticsearch/model'
require 'elasticsearch/transport'

if Rails.env.production?
	Elasticsearch::Model.client = Elasticsearch::Client.new host: ENV['BONSAI_URL'] || "localhost:9200"
end
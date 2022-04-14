require 'elasticsearch/model'
require 'elasticsearch/transport'

Elasticsearch::Model.client = Elasticsearch::Client.new host: ENV['BONSAI_URL'] || "localhost:9200"
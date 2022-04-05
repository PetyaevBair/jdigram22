class SearchController < ApplicationController
	def search
	    if params[:term].nil?
	    	@users = []
	    else
	      @users = User.search(params[:term])
	    end
  	end
end

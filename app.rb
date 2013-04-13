# -*- coding: utf-8 -*-
require 'bundler/setup'
require 'sinatra'
require 'slim'

get '/' do
  slim :index
end

require 'coffee-script'

get '/ag8Feeder.js' do
  coffee :ag8Feeder
end

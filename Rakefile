desc 'preview'
task :preview do
  ruby app.rb
end

desc 'generate'
task :generate do
  sh 'slimrb views/index.slim > index.html'
  require 'coffee-script'
  open('ag8Feeder.js','w') { |io|
    file = File.read("views/ag8Feeder.coffee")
    js = CoffeeScript.compile file
    io.write js
  }
end

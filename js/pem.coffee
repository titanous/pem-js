# RSA Key PEM Encoder
# Copyright 2010 Jonathan Rudenberg
# MIT Licensed
#
# Useful links:
# OpenSSL 1024 bit RSA Private Key Breakdown - http://etherhack.co.uk/asymmetric/docs/rsa_key_breakdown.html
# DER standard - http://www.itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf
# ASN.1 Javascript decoder - http://lapo.it/asn1js/

RSAEncodePrivatePEM = (key) ->
  encoded = '020100' # version header
  encoded = encoded + ASNIntValue(key.n, true) # modulus (prefixed w/null)
  encoded = encoded + ASNIntValue(key.e, false) # public exponent
  encoded = encoded + ASNIntValue(key.d, false) # private exponent
  encoded = encoded + ASNIntValue(key.p, true) # prime 1
  encoded = encoded + ASNIntValue(key.q, true) # prime 2
  encoded = encoded + ASNIntValue(key.dmp1, true) # exponent 1
  encoded = encoded + ASNIntValue(key.dmq1, false) # exponent 2
  encoded = encoded + ASNIntValue(key.coeff, false) # coefficient
  encoded = '30' + ASNLength(encoded) + encoded # sequence header
  "-----BEGIN RSA PRIVATE KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END RSA PRIVATE KEY-----"

RSAEncodePublicPEM = (key) ->
  encoded = ASNIntValue(key.n, true) # modulus
  encoded = encoded + ASNIntValue(key.e, false) # public exponent
  encoded = '30' + ASNLength(encoded) + encoded # sequence header
  encoded = '03' + ASNLength(encoded, 1) + '00' + encoded # bit string header
  encoded = '300d06092a864886f70d0101010500' + encoded # object identifier header
  encoded = '30' + ASNLength(encoded) + encoded # sequence header
  "-----BEGIN PUBLIC KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END PUBLIC KEY-----"

ASNIntValue = (integer, nullPrefixed) ->
  integer = int2hex(integer)
  integer = '00' + integer if nullPrefixed
  '02' + ASNLength(integer) + integer

ASNLength = (content, extra) ->
  extra = 0 if !extra?
  length = (content.length / 2) + extra
  if length > 127 # long format
    length = int2hex(length)
    int2hex(0x80 + length.length / 2) + length
  else # short format
    int2hex(length)

int2hex = (integer) ->
  integer = integer.toString(16)
  if integer.length % 2 != 0 then integer = '0' + integer
  integer

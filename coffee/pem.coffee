RSAEncodePrivatePEM = (key) ->
  encoded = '020100' # version header
  encoded = encoded + ASNIntValue(key.n, true) # modulus (prefixed w/null)
  encoded = encoded + ASNIntValue(key.e, false) # public exponent
  encoded = encoded + ASNIntValue(key.d, true) # private exponent
  encoded = encoded + ASNIntValue(key.p, true) # prime 1
  encoded = encoded + ASNIntValue(key.q, true) # prime 2
  encoded = encoded + ASNIntValue(key.dmp1, false) # exponent 1
  encoded = encoded + ASNIntValue(key.dmq1, true) # exponent 2
  encoded = encoded + ASNIntValue(key.coeff, true) # coefficient
  encoded = '30' + ASNLength(encoded) + encoded # ASN.1 sequence header
  "-----BEGIN RSA PRIVATE KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END RSA PRIVATE KEY-----"

ASNIntValue = (integer, nullPrefixed) ->
  integer = int2hex(integer)
  integer = '00' + integer if nullPrefixed
  '02' + ASNLength(integer) + integer

ASNLength = (content) ->
  length = content.length / 2
  if length > 127 # long format
    length = int2hex(length)
    int2hex(0x80 + length.length / 2) + length
  else # short format
    int2hex(length)

int2hex = (integer) ->
  integer = integer.toString(16)
  if integer.length % 2 != 0 then integer = '0' + integer
  integer

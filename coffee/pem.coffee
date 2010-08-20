RSAEncodePrivatePEM = (key) ->
  encoded = '30820264020100' # start with a header
  encoded = encoded + ASNValue(key.n, true) # modulus (prefixed w/null)
  encoded = encoded + ASNValue(key.e, false) # public exponent
  encoded = encoded + ASNValue(key.d, true) # private exponent
  encoded = encoded + ASNValue(key.p, true) # prime 1
  encoded = encoded + ASNValue(key.q, true) # prime 2
  encoded = encoded + ASNValue(key.dmp1, false) # exponent 1
  encoded = encoded + ASNValue(key.dmq1, true) # exponent 2
  encoded = encoded + ASNValue(key.coeff, true) # coefficient
  "-----BEGIN RSA PRIVATE KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END RSA PRIVATE KEY-----"

ASNValue = (integer, nullPrefixed) ->
  integer = int2hex(integer)
  extraBytes = if nullPrefixed then 1 else 0
  length = '81' + int2hex(integer.length / 2 + extraBytes) # naively use the DER long length format
  value = '02' + length
  value = value + '00' if nullPrefixed
  value + integer

int2hex = (integer) ->
  integer = integer.toString(16)
  if integer.length % 2 != 0 then integer = '0' + integer
  integer

var ASNIntValue, ASNLength, RSAEncodePrivatePEM, int2hex;
RSAEncodePrivatePEM = function(key) {
  var encoded;
  encoded = '020100';
  encoded = encoded + ASNIntValue(key.n, true);
  encoded = encoded + ASNIntValue(key.e, false);
  encoded = encoded + ASNIntValue(key.d, true);
  encoded = encoded + ASNIntValue(key.p, true);
  encoded = encoded + ASNIntValue(key.q, true);
  encoded = encoded + ASNIntValue(key.dmp1, false);
  encoded = encoded + ASNIntValue(key.dmq1, true);
  encoded = encoded + ASNIntValue(key.coeff, true);
  encoded = '30' + ASNLength(encoded) + encoded;
  return "-----BEGIN RSA PRIVATE KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END RSA PRIVATE KEY-----";
};
ASNIntValue = function(integer, nullPrefixed) {
  integer = int2hex(integer);
  if (nullPrefixed) {
    integer = '00' + integer;
  }
  return '02' + ASNLength(integer) + integer;
};
ASNLength = function(content) {
  var length;
  length = content.length / 2;
  if (length > 127) {
    length = int2hex(length);
    return int2hex(0x80 + length.length / 2) + length;
  } else {
    return int2hex(length);
  }
};
int2hex = function(integer) {
  integer = integer.toString(16);
  integer.length % 2 !== 0 ? (integer = '0' + integer) : null;
  return integer;
};
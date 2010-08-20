var ASNValue, RSAEncodePrivatePEM, int2hex;
RSAEncodePrivatePEM = function(key) {
  var encoded;
  encoded = '30820264020100';
  encoded = encoded + ASNValue(key.n, true);
  encoded = encoded + ASNValue(key.e, false);
  encoded = encoded + ASNValue(key.d, true);
  encoded = encoded + ASNValue(key.p, true);
  encoded = encoded + ASNValue(key.q, true);
  encoded = encoded + ASNValue(key.dmp1, false);
  encoded = encoded + ASNValue(key.dmq1, true);
  encoded = encoded + ASNValue(key.coeff, true);
  return "-----BEGIN RSA PRIVATE KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END RSA PRIVATE KEY-----";
};
ASNValue = function(integer, nullPrefixed) {
  var extraBytes, length, value;
  integer = int2hex(integer);
  extraBytes = nullPrefixed ? 1 : 0;
  length = '81' + int2hex(integer.length / 2 + extraBytes);
  value = '02' + length;
  if (nullPrefixed) {
    value = value + '00';
  }
  return value + integer;
};
int2hex = function(integer) {
  integer = integer.toString(16);
  integer.length % 2 !== 0 ? (integer = '0' + integer) : null;
  return integer;
};
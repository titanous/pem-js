var ASNIntValue, ASNLength, RSAEncodePrivatePEM, RSAEncodePublicPEM, int2hex;
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
RSAEncodePublicPEM = function(key) {
  var encoded;
  encoded = ASNIntValue(key.n, true);
  encoded = encoded + ASNIntValue(key.e, false);
  encoded = '30' + ASNLength(encoded) + encoded;
  encoded = '03' + ASNLength(encoded, 1) + '00' + encoded;
  encoded = '300d06092a864886f70d0101010500' + encoded;
  encoded = '30' + ASNLength(encoded) + encoded;
  return "-----BEGIN PUBLIC KEY-----\n" + encode64(chars_from_hex(encoded)) + "\n-----END PUBLIC KEY-----";
};
ASNIntValue = function(integer, nullPrefixed) {
  integer = int2hex(integer);
  if (nullPrefixed) {
    integer = '00' + integer;
  }
  return '02' + ASNLength(integer) + integer;
};
ASNLength = function(content, extra) {
  var length;
  if (!(typeof extra !== "undefined" && extra !== null)) {
    extra = 0;
  }
  length = (content.length / 2) + extra;
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
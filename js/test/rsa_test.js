(function(){
  var key;
  key = new RSAKey();
  key.setPrivateEx('bea8f90aef9d0b36e1ffda02a575f471f1dcf77e3cea75ad18dec5c758d51985d6e766f07ba9ece7b24fe7ddebc663513658d214d609d8615051b25e4e5f6bd68e68cb2a25393cb64eb097ed1de72355632ccd8e37c7104ec20aa87c32ea3f49058fe09b6f6b5ccd7d2613e97e9bf02debc3f6896a605de647e3b2ebfca70e41', '10001', '21a2d9dcee0cfcaf800b8d40ae44330def27969a34d10055bb6f81e0fb710d01a9ba4554e3dc44a953b1f92c13ae7a53178d6ff2b118278e7387163ac104e0973905b1d71ea19bb8b8a6fa944e53a473b1a3823340d1ff4e9f981935c868d9ff67af66e1f4013996e632291418bfeb1a8d522598a34d7d3f5f62b0893fafb1e1', 'fbcb696e8a191e5a8a03d4f584e511f2f995456cf3d97ca9156c764de9f5c5cdcbdfae0658407ff60db1a6cb2c2688ba631f349722f3fe9a4218554a0ae0a5ed', 'c1d82ba53035cf37ab5a0380dadba845730ab72441059e9d9846accd944f82e86f2a0d441f1cbed09edbc12970e17536809ce6326180d19dd7f5ca649b88ff25', 'eb20bd38a32ee7a0668743836df1373cad024e8d7a7cdaa34e4535887674b29d05c7bfcb5ef8044631ed7632fdec91fb737a7d72b10a25f3c8cace42513c0cd5', '044c33a384ef1c7a027d8b6856f1d9c83865bb6bbd594f8bf4ed5435769d50acb092411b0a898b9d7a782acf2d66823fc418366e558512a0aa4213cba93b1f55', '5a78fe7fef688175b353be76525d7b87f7cb1b55715f1050cd80de7191e458f9178ba77d049bf58e70e0a37afb039941f3c4de7587e12b40a37a809f4a03d68f');
  module('PEM Encoder');
  test('encodes private key correctly', function() {
    var correctPrivatePEM;
    correctPrivatePEM = "-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQC+qPkK750LNuH/2gKldfRx8dz3fjzqda0Y3sXHWNUZhdbnZvB7\nqeznsk/n3evGY1E2WNIU1gnYYVBRsl5OX2vWjmjLKiU5PLZOsJftHecjVWMszY43\nxxBOwgqofDLqP0kFj+Cbb2tczX0mE+l+m/At68P2iWpgXeZH47Lr/KcOQQIDAQAB\nAoGAIaLZ3O4M/K+AC41ArkQzDe8nlpo00QBVu2+B4PtxDQGpukVU49xEqVOx+SwT\nrnpTF41v8rEYJ45zhxY6wQTglzkFsdceoZu4uKb6lE5TpHOxo4IzQNH/Tp+YGTXI\naNn/Z69m4fQBOZbmMikUGL/rGo1SJZijTX0/X2KwiT+vseECQQD7y2luihkeWooD\n1PWE5RHy+ZVFbPPZfKkVbHZN6fXFzcvfrgZYQH/2DbGmyywmiLpjHzSXIvP+mkIY\nVUoK4KXtAkEAwdgrpTA1zzerWgOA2tuoRXMKtyRBBZ6dmEaszZRPguhvKg1EHxy+\n0J7bwSlw4XU2gJzmMmGA0Z3X9cpkm4j/JQJBAOsgvTijLuegZodDg23xNzytAk6N\nenzao05FNYh2dLKdBce/y174BEYx7XYy/eyR+3N6fXKxCiXzyMrOQlE8DNUCQARM\nM6OE7xx6An2LaFbx2cg4ZbtrvVlPi/TtVDV2nVCssJJBGwqJi516eCrPLWaCP8QY\nNm5VhRKgqkITy6k7H1UCQFp4/n/vaIF1s1O+dlJde4f3yxtVcV8QUM2A3nGR5Fj5\nF4unfQSb9Y5w4KN6+wOZQfPE3nWH4StAo3qAn0oD1o8=\n-----END RSA PRIVATE KEY-----";
    return equals(RSAEncodePrivatePEM(key), correctPrivatePEM);
  });
  test('encodes public key correctly', function() {
    var correctPublicPEM;
    correctPublicPEM = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+qPkK750LNuH/2gKldfRx8dz3\nfjzqda0Y3sXHWNUZhdbnZvB7qeznsk/n3evGY1E2WNIU1gnYYVBRsl5OX2vWjmjL\nKiU5PLZOsJftHecjVWMszY43xxBOwgqofDLqP0kFj+Cbb2tczX0mE+l+m/At68P2\niWpgXeZH47Lr/KcOQQIDAQAB\n-----END PUBLIC KEY-----";
    return equals(RSAEncodePublicPEM(key), correctPublicPEM);
  });
  module('RSA Decryptor');
  test('decrypts OpenSSL output', function() {
    var ciphertext;
    ciphertext = '4975d1eb49a8f07cb1479239a8a38bb8edc61516fd6b3af104ff5f94d9f416fff30c26df700159bdcf8ffc79f23efe50d63e3eaf96766d476419e5c4536d5da001aa52d7ac8edde928fc00b42e94ff3b8c7c52e3e5cd41d5716b5212066e04f6bac3c200f2cbde961945d6a3a7f645cb439e4033290b6cb374f3649d19f3a94f';
    return equals(key.decrypt(ciphertext), 'test_vector');
  });
})();

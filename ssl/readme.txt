rsa key
生成私钥

$ openssl genrsa -out private.pem 1024//输入本行
Generating RSA private key, 1024 bit long modulus (2 primes)
..........+++++
............+++++
e is 65537 (0x010001)
提取公钥

$ openssl rsa -in private.pem -pubout -out public.pem//输入本行
writing RSA key
 【来源：https://python.iitter.com/other/269639.html，转载请注明】
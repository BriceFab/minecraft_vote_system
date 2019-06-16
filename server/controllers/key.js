// function test() {
//
//     const crypto = require('crypto');
//
//     const { generateKeyPairSync } = require('crypto');
//     const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//         modulusLength: 1048,
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'pem'
//         },
//         privateKeyEncoding: {
//             type: 'pkcs8',
//             format: 'pem',
//         }
//     });
//
//     console.log(publicKey);
//     console.log(privateKey);
//
//     const sign = crypto.createSign('SHA256');
//     sign.update('some data to sign');
//     sign.end();
//     const signature = sign.sign(privateKey);
//     console.log("signature", signature.toString())
//
//     const verify = crypto.createVerify('SHA256');
//     verify.update('some data to sign');
//     verify.end();
//     console.log("verif", verify.verify(publicKey, signature));
//
// }
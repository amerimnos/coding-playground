fetch('./source/data.json')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function (jsonData) {
        // Encrypt
        ciphertext = CryptoJS.AES.encrypt(JSON.stringify(jsonData), '1234').toString();

        // Send encrypted data to PHP file
        fetch('test.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'encryptedString=' + encodeURIComponent(ciphertext), // URL-encode the ciphertext
        })
            .then(function (response) {
                console.log('암호화된 데이터가 성공적으로 전송되었습니다.');

                fetch('./test.dat')
                    .then(function (response1) {
                        return response1.text();
                    })
                    .then(function (response2) {
                        // Decrypt
                        bytes = CryptoJS.AES.decrypt(response2, '1234');
                        try {
                            decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                            console.log('복호화된 데이터:', decryptedData);
                        } catch (error) {
                            console.log('오류 발생:', error);
                        }
                    })
                    .catch(function (error) {
                        console.log('오류 발생:', error);
                    });
            })
            .catch(function (error) {
                console.log('오류 발생:', error);
            });
    })
    .catch(function (error) {
        console.log('오류 발생:', error);
    });
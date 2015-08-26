// main.js test

describe('RSA test', function() {
    describe('Encryption test', function() {
        it('should convert string to numbers', function() {
            var number = Rsa.messageToNumber('aa bb');
            expect(number).toBe(9797329898);
        });
    });
});

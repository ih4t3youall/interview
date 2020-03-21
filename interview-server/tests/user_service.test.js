const user_service = require('../services/user_service');

const valid_user = {
    id: 123,
    name: "johnn",
    surname: "wicked",
    email: "johnwick@gmail.com",
    dni: "31259687",
    language: "ES",
    password: "1F4$&ag5",
    isAdmin: true
};

const invalid_user = {
    id: 123,
    name: "j",
    surname: "w",
    email: "johnwick@gmail.comd",
    dni: "31259687",
    language: "ES",
    password: "1F4$&ag5",
    isAdmin: true
};

describe('User', ()=> {

    it('should be valid', ()=> {
        const { error } = user_service.validateUser(valid_user);
        expect(error).toBe(null);
    });

    it('should be invalid', ()=> {
        const { error } = user_service.validateUser(invalid_user);
        expect(error).not.toBe(null);
    });

});

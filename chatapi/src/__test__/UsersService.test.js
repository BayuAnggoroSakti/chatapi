const UsersService = require('../services/postgres/UsersService');
const InvariantError = require('../exceptions/InvariantError');
require('dotenv').config();

describe('Users Scenario', () => {
  const usersService = new UsersService();

  test('Adding user with valid username', async () => {
    const userAdd = {
      username: 'test1', password: 'bayue', fullname: 'bayue', phonenumber: '081251',
    };
    const user = await usersService.addUser(userAdd);
    expect(user).not.toBeUndefined();
  });

  test('Adding user with username existing', async () => {
    const userAdd = {
      username: 'test1', password: 'bayue', fullname: 'bayue', phonenumber: '081251',
    };
    const user = await usersService.addUser(userAdd);
    expect(() => user).toThrow(new InvariantError('Gagal menambahkan user. Username sudah digunakan.'));
  });

  test('Login with valid username password', async () => {
    const userAuth = {
      username: 'test1', password: 'bayue',
    };
    const user = await usersService.verifyUserCredential(userAuth);
    expect(user).not.toBeUndefined();
  });
});

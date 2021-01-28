import authenticationRepository from '../authentication-repository';

describe('authenticationRepository', () => {
  const firebaseDaoMock = {
    get: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    onAuthStateChanged: jest.fn(),
    register: jest.fn(),
    updatePassword: jest.fn(),
  };
  const authRepo = authenticationRepository(firebaseDaoMock);

  test('should call DAO get', () => {
    authRepo.get();
    expect(firebaseDaoMock.get).toHaveBeenCalled();
  });

  test('should call DAO login', () => {
    authRepo.login('test email', 'test password');
    expect(firebaseDaoMock.login).toBeCalledWith('test email', 'test password');
  });

  test('should call DAO logout', () => {
    authRepo.logout();
    expect(firebaseDaoMock.logout).toHaveBeenCalled();
  });

  test('should call DAO onAuthStateChanged', () => {
    const callbackMock = jest.fn();
    authRepo.onAuthStateChanged(callbackMock);
    expect(firebaseDaoMock.onAuthStateChanged).toHaveBeenCalledWith(
      callbackMock,
    );
  });

  test('should call DAO register', () => {
    authRepo.register('test email', 'test password');
    expect(firebaseDaoMock.register).toBeCalledWith(
      'test email',
      'test password',
    );
  });

  test('should call DAO updatePassword', () => {
    authRepo.updatePassword('old password', 'new password');
    expect(firebaseDaoMock.updatePassword).toBeCalledWith(
      'old password',
      'new password',
    );
  });
});

import authenticationRepository from '../authenticationRepository';

describe('authenticationRepository', () => {
  const firebaseDaoMock = {
    get: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    onAuthStateChanged: jest.fn(),
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
});

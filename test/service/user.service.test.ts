import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import  UserService  from '../../src/services/user.service';
import {User} from '../../src/infra/entities/user'
import { expect, jest, describe, beforeEach, it } from '@jest/globals';
import { EntityNotFoundError } from 'typeorm';

jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;
    userService = new UserService(userRepository);
  });

  describe('createUser', () => {
    it('should hash the password and save the user', async () => {
      const user = new User();
      user.user = 'testUser';
      user.password = 'plainPassword';

   
    // Mockando bcrypt.hash para retornar uma Promise com "hashedPassword"
    (bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>).mockResolvedValueOnce('hashedPassword');



    await userService.createUser(user);

    // Verifica se bcrypt.hash foi chamado corretamente
    expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10);
      expect(userRepository.save).toHaveBeenCalledWith({
        ...user,
        password: 'hashedPassword',
      });
    });
  });

  describe('login', () => {
    it('should return true if passwords match', async () => {
      const user = new User();
      user.user = 'testUser';
      user.password = 'hashedPassword';

      // (userRepository.findOne as jest.Mock).mockResolvedValue(null as any);
      // (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await userService.login({
        id: 1,
        user: 'testUser',
        password: 'plainPassword',
      });

      expect(bcrypt.compare).toHaveBeenCalledWith('plainPassword', 'hashedPassword');
      expect(result).toBe(true);
    });

    it('should throw EntityNotFoundError if user is not found', async () => {
      // (userRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        userService.login({
          id:1,
          user: 'testUser',
          password: 'plainPassword',
        })
      ).rejects.toThrowError(new EntityNotFoundError('User', 'user = testUser'));
    });
  });
});

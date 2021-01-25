export type User = {
  dancerName: string;
  dancerId: string;
  profilePicture: string;
  userName: string;
  displayName: string;
  state: string;
  primaryMachine: string;
};

export type UserRepository = {
  get: (id: string) => Promise<User>;
  update: (user: User) => Promise<boolean>;
};

export interface Get {
  (id: string): Promise<User>;
}

export interface Update {
  (user: User): Promise<boolean>;
}

export interface UserDao {
  get: Get;
  update: Update;
}

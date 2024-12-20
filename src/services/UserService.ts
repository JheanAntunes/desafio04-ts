export interface User {
  name: string;
  email: string;
}

const db = [
  {
    name: "Joana",
    email: "joana@dio.com",
  },
];

export class UserService {
  db: User[];

  constructor(database = db) {
    this.db = database;
  }

  createUser = (name: string, email: string) => {
    const user = {
      name,
      email,
    };

    this.db.push(user);
    console.log("DB atualizado", this.db);
  };

  deleteUser = (email: string) => {
    const filteredUsers = this.db.filter((user) => user.email !== email);
    this.db = filteredUsers;
  };

  getAllUsers = () => {
    return this.db;
  };
}

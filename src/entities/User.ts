import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from "crypto";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  constructor(name: string, email: string, password: string) {
    this.user_id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

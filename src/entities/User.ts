import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from "crypto";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id_user: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  constructor(name: string, email: string, password: string) {
    this.id_user = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Client } from "./Client.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "varchar", length: 45, unique: true, nullable: true })
  second_email: string | null | undefined;

  @Column({ type: "integer", unique: true })
  telephone: number;

  @Column({ type: "integer", unique: true, nullable: true })
  second_telephone: number | null | undefined;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @ManyToOne(() => Client, (client) => client.contact)
  client: Client;
}

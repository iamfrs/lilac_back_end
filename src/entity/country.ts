import { Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v1 as uuidv1 } from "uuid";
import { Region } from "./Region";

@Entity()
export class Country {
  // @PrimaryColumn("uuid")
  // id: string = uuidv1();
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string | null | undefined;

  @Column({ unique: true })
  country_name: string;

  @Column({ unique: true })
  country_code: string;

  @Column({ nullable: true })
  time_zone: string;

  @Column({ nullable: true })
  capital: string;

  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => Region)
  Region: Region;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}

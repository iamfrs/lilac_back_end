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

@Entity()
export class Region {
  // @PrimaryColumn("uuid")
  // id: string = uuidv1();
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string | null | undefined;

  @Column({  })
  region_name: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  img: string;

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

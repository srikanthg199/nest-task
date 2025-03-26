import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from 'src/constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column() // { select: false }
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VIEWER, // Default role is viewer
  })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  deleted_at: Date;
}

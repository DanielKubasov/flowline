// base.entity.ts
import {Exclude} from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'boolean', default: true})
    @Exclude()
    isActive: boolean;

    @Column({type: 'boolean', default: false})
    @Exclude()
    isArchived: boolean;

    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}

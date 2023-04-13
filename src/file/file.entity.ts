import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "File" })
export class File extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    advertiser: string;

    @Column()
    advertisement: string;

    @Column()
    metaverse: "Roblox" | "Zepeto";

    @Column()
    length: number;

    @Column()
    hashValue: string;

    @Column({ default: "pending" })
    detectionStatus: "pending" | "detecting" | "completed";

    @Column({ default: new Date() })
    createdAt: Date;

    @UpdateDateColumn({ default: new Date() })
    updatedAt: Date;
}
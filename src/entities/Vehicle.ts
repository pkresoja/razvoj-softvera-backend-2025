import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoice } from "./Invoice";
import { Client } from "./Client";
import { Model } from "./Model";

@Index("fk_vehicle_client_idx", ["clientId"], {})
@Index("fk_vehicle_model_idx", ["modelId"], {})
@Entity("vehicle", { schema: "fir_rs_2025" })
export class Vehicle {
  @PrimaryGeneratedColumn({ type: "int", name: "vehicle_id", unsigned: true })
  vehicleId: number;

  @Column("int", { name: "client_id", unsigned: true })
  clientId: number;

  @Column("int", { name: "model_id", unsigned: true })
  modelId: number;

  @Column("varchar", { name: "vin", length: 255 })
  vin: string;

  @Column("varchar", { name: "reg_plate", length: 255 })
  regPlate: string;

  @Column("int", { name: "year", unsigned: true })
  year: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Invoice, (invoice) => invoice.vehicle)
  invoices: Invoice[];

  @ManyToOne(() => Client, (client) => client.vehicles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;

  @ManyToOne(() => Model, (model) => model.vehicles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "model_id", referencedColumnName: "modelId" }])
  model: Model;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity("model", { schema: "fir_rs_2025" })
export class Model {
  @PrimaryGeneratedColumn({ type: "int", name: "model_id", unsigned: true })
  modelId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("boolean", { name: "active", default: () => "'true'" })
  active: boolean;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.model)
  vehicles: Vehicle[];
}

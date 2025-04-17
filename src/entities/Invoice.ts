import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./Vehicle";
import { InvoiceArticle } from "./InvoiceArticle";

@Index("fk_invoice_vehicle_idx", ["vehicleId"], {})
@Entity("invoice", { schema: "fir_rs_2025" })
export class Invoice {
  @PrimaryGeneratedColumn({ type: "int", name: "invoice_id", unsigned: true })
  invoiceId: number;

  @Column("int", { name: "vehicle_id", unsigned: true })
  vehicleId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "paid_at", nullable: true })
  paidAt: Date | null;

  @Column("datetime", { name: "generated_at", nullable: true })
  generatedAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.invoices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "vehicle_id", referencedColumnName: "vehicleId" }])
  vehicle: Vehicle;

  @OneToMany(() => InvoiceArticle, (invoiceArticle) => invoiceArticle.invoice)
  invoiceArticles: InvoiceArticle[];
}

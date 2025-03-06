import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceArticle } from "./InvoiceArticle";

@Entity("article", { schema: "fir_rs_2025" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "part_number", nullable: true, length: 255 })
  partNumber: string | null;

  @Column("double", { name: "price", unsigned: true, precision: 22 })
  price: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => InvoiceArticle, (invoiceArticle) => invoiceArticle.article)
  invoiceArticles: InvoiceArticle[];
}

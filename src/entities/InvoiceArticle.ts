import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Invoice } from "./Invoice";

@Index("fk_invoice_article_invoice_idx", ["invoiceId"], {})
@Index("fk_invoice_article_article_idx", ["articleId"], {})
@Entity("invoice_article", { schema: "fir_rs_2025" })
export class InvoiceArticle {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "invoice_article_id",
    unsigned: true,
  })
  invoiceArticleId: number;

  @Column("int", { name: "invoice_id", unsigned: true })
  invoiceId: number;

  @Column("int", { name: "article_id", unsigned: true })
  articleId: number;

  @Column("double", { name: "price", unsigned: true, precision: 22 })
  price: number;

  @Column("int", { name: "discount", unsigned: true })
  discount: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Article, (article) => article.invoiceArticles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceArticles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "invoice_id", referencedColumnName: "invoiceId" }])
  invoice: Invoice;
}

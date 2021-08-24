import { Article } from 'modules/articles/article.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// Sequelize.UUID
// UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL
// (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

@Table
export class Category extends Model {
  @IsUUID(4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    defaultValue: () => {
      return uuidv4();
    },
  })
  UUID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  createdBy: string;

  @HasMany(() => Article)
  articles: Article[];
}

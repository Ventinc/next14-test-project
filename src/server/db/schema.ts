// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  text,
  index,
  sqliteTable,
  integer,
  blob,
} from "drizzle-orm/sqlite-core";

export const posts = sqliteTable(
  "post",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdAt: text("created_at")
      .default(sql<string>`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updatedAt")
      .default(sql<string>`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  // other user attributes
});

export const session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});

import { drizzle } from "drizzle-orm/better-sqlite3";

import createSqlite from "better-sqlite3";
import * as schema from "./schema";

export const sqlite = createSqlite("sqlite.db");

export const db = drizzle(sqlite, { schema });

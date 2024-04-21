import * as SQLite from "expo-sqlite";

let db: SQLite.WebSQLDatabase | null = null;

export const getDatabase = () => {
  if (!db) {
    db = SQLite.openDatabase("db.db");
  }
  return db;
};

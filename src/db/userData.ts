import { getDatabase } from "./db";

export const createUserBodyTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS USER_BODY(date TEXT PRIMARY KEY, weight REAL, height REAL, body_fat_percentage REAL, calories INTEGER, macros TEXT, calories_goal INTEGER, macros_goal TEXT, activity TEXT, notes TEXT)",
        [],
        (_, { rows }) => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

// userbody type
export type UserBody = {
  date: string;
  weight: number;
  height: number;
  body_fat_percentage: number;
  calories: number;
  macros: string;
  calories_goal: number;
  macros_goal: string;
  activity: string;
  notes: string;
};

export const insertCalories = (calories: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO CALORIES (calories) VALUES (?)",
        [calories],
        (_, { rows }) => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

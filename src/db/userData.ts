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

export const getAllUserBody = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM USER_BODY", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export const getUserBody = (date: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM USER_BODY WHERE date = ?",
        [date],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            reject("No user body data found");
          }
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

export const insertUserBody = (userBody: UserBody): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO USER_BODY (date, weight, height, body_fat_percentage, calories, macros, calories_goal, macros_goal, activity, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userBody.date,
          userBody.weight,
          userBody.height,
          userBody.body_fat_percentage,
          userBody.calories,
          userBody.macros,
          userBody.calories_goal,
          userBody.macros_goal,
          userBody.activity,
          userBody.notes,
        ],
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

export const updateUserBody = (userBody: UserBody): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE USER_BODY SET weight = ?, height = ?, body_fat_percentage = ?, calories = ?, macros = ?, calories_goal = ?, macros_goal = ?, activity = ?, notes = ? WHERE date = ?",
        [
          userBody.weight,
          userBody.height,
          userBody.body_fat_percentage,
          userBody.calories,
          userBody.macros,
          userBody.calories_goal,
          userBody.macros_goal,
          userBody.activity,
          userBody.notes,
          userBody.date,
        ],
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

// insert new body data if not exist, update if exist
export const upsertUserBody = (userBody: UserBody): Promise<void> => {
  return new Promise((resolve, reject) => {
    getUserBody(userBody.date)
      .then(() => {
        updateUserBody(userBody)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch(() => {
        insertUserBody(userBody)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
  });
};

export const deleteUserBody = (date: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM USER_BODY WHERE date = ?",
        [date],
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

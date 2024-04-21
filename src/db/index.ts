import * as SQLite from "expo-sqlite";

let db: SQLite.WebSQLDatabase | null = null;

export const getDatabase = () => {
  if (!db) {
    db = SQLite.openDatabase("db.db");
  }
  return db;
};

// export const createTables = () => {
//   const db = getDatabase();
//   db.transaction((tx) => {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS FOOD (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, calories INTEGER, macros TEXT, time TEXT, location TEXT, price TEXT, picture TEXT, user_id INTEGER, repas TEXT)"
//     );
//   });
// };

export const createTables = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS FOOD (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, calories INTEGER, macros TEXT, time TEXT, location TEXT, price TEXT, picture TEXT, user_id INTEGER, repas TEXT)",
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

export const queryFoodByDate = (date: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FOOD WHERE time LIKE ?",
        [`${date}%`],
        (_, { rows }) => {
          try {
            rows._array.forEach((food: any) => {
              food.macros = JSON.parse(food.macros);
            });
            resolve(rows._array);
          } catch (error) {
            reject(error);
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

export const insertFood = (args: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO FOOD (name, calories, macros, time, location, price, picture, user_id, repas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args,
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

export const deleteFood = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM FOOD WHERE id = ?",
        [id],
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

export const updateFood = (id: string, args: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE FOOD SET name = ?, calories = ?, macros = ?, time = ?, location = ?, price = ?, picture = ?, user_id = ?, repas = ? WHERE id = ?",
        [...args, id],
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

export const queryFoodById = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FOOD WHERE id = ?",
        [id],
        (_, { rows }) => {
          try {
            rows._array.forEach((food: any) => {
              food.macros = JSON.parse(food.macros);
            });
            resolve(rows._array[0]);
          } catch (error) {
            reject(error);
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

export const queryAllFood = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FOOD",
        [],
        (_, { rows }) => {
          try {
            rows._array.forEach((food: any) => {
              food.macros = JSON.parse(food.macros);
            });
            resolve(rows._array);
          } catch (error) {
            reject(error);
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
export const clearDBAll = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM FOOD",
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

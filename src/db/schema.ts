import { sqliteTable, text, real, integer, int } from "drizzle-orm/sqlite-core";

export const userBody = sqliteTable("USER_BODY", {
  date: text("date").primaryKey(),
  picture: text("picture"),
  weight: real("weight"),
  height: real("height"),
  body_fat_percentage: real("body_fat_percentage"),
  calories: integer("calories"),
  macros: text("macros"),
  calories_goal: integer("calories_goal"),
  macros_goal: text("macros_goal"),
  activity: text("activity"),
  notes: text("notes"),
});

export const food = sqliteTable("FOOD", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text("name"),
  calories: integer("calories"),
  macros: text("macros"),
  time: text("time"),
  location: text("location"),
  price: text("price"),
  picture: text("picture"),
  user_id: integer("user_id"),
  repas: text("repas"),
});

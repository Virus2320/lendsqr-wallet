import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.decimal("balance", 14, 2).defaultTo(0);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users");
    table.enu("type", ["deposit", "transfer", "withdrawal"]).notNullable();
    table.decimal("amount", 14, 2).notNullable();
    table.integer("recipient_id").unsigned().nullable().references("id").inTable("users");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("blacklist", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("blacklist");
  await knex.schema.dropTableIfExists("transactions");
  await knex.schema.dropTableIfExists("users");
}

import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    plan: text('plan').notNull(),
    stripe_id: text('stripe_id').notNull(),
});

export const designsTable = pgTable('designs_table', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => usersTable.id),
    prompt: text('prompt').notNull(),
    imageUrl: text('image_url').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertDesign = typeof designsTable.$inferInsert;
export type SelectDesign = typeof designsTable.$inferSelect;

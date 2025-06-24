import { integer, pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    plan: text('plan').notNull(),
    stripe_id: text('stripe_id').notNull(),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
});

export const designsTable = pgTable('designs_table', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    prompt: text('prompt').notNull(),
    imageUrl: text('image_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const generatedImagesTable = pgTable('generated_images', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    originalImageUrl: text('original_image_url'),
    generatedImageUrl: text('generated_image_url').notNull(),
    prompt: text('prompt').notNull(),
    negativePrompt: text('negative_prompt'),
    generationSettings: jsonb('generation_settings'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertDesign = typeof designsTable.$inferInsert;
export type SelectDesign = typeof designsTable.$inferSelect;
export type InsertGeneratedImage = typeof generatedImagesTable.$inferInsert;
export type SelectGeneratedImage = typeof generatedImagesTable.$inferSelect;

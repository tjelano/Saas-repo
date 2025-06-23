import { createClient as createSupabaseClient } from '@/utils/supabase/server';
import { db } from '@/utils/db/db';
import { generatedImagesTable } from '@/utils/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  const supabase = createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Log the environment variable for debugging
    console.log("DATABASE_URL seen by API:", process.env.DATABASE_URL);

    // Get total count
    const countResult = await db
      .select({ count: generatedImagesTable.id })
      .from(generatedImagesTable)
      .where(eq(generatedImagesTable.userId, user.id));
    
    const total = countResult.length;

    // Get paginated results
    const images = await db
      .select()
      .from(generatedImagesTable)
      .where(eq(generatedImagesTable.userId, user.id))
      .orderBy(desc(generatedImagesTable.createdAt))
      .limit(limit)
      .offset(offset);

    return Response.json({ 
      images, 
      total,
      has_more: total > offset + limit 
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 
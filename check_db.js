const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.pmnpfakpqktngdbskriq:VQGaRBM7pM$EuD3@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?schema=public',
});

async function run() {
  await client.connect();
  const res = await client.query(`
    ALTER TABLE IF EXISTS "users" ADD COLUMN IF NOT EXISTS "google_id" text UNIQUE;
    ALTER TABLE IF EXISTS "users" ADD COLUMN IF NOT EXISTS "name" text;
  `);
  console.log('Columns added');
  await client.end();
}
run().catch(console.error);

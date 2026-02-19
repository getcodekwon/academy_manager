import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function checkSchema() {
    console.log('Verifying "problems" table schema...')

    // Insert a dummy draft problem to test if columns exist
    // We use 'upsert' or just insert and then delete, but checking columns via metadata is harder with just client
    // So we try an insert with the new columns.

    const dummyId = '00000000-0000-0000-0000-000000000000'

    // Try to select specifically the new columns
    const { data, error } = await supabase
        .from('problems')
        .select('status, reviewed_by, review_note')
        .limit(1)

    if (error) {
        console.error('❌ Schema Verification Failed:', error.message)
        console.log('It seems the columns "status", "reviewed_by" do not exist yet.')
        console.log('Please run "supabase/update_schema_for_ip.sql" in the Supabase SQL Editor.')
    } else {
        console.log('✅ Schema Verification Passed!')
        console.log('The "problems" table has the required IP protection columns.')
    }
}

checkSchema()

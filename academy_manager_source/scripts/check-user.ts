import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function checkUser() {
    console.log('Checking for user: verify-teacher@example.com')

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'verify-teacher@example.com')
        .single()

    if (error) {
        console.error('❌ User Check Failed:', error.message)
        // Also check auth.users if possible (requires service role key usually, but let's try getSession)
    } else {
        console.log('✅ User Found:', data)
    }
}

checkUser()

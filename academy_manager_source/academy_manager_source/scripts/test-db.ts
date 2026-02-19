import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl)

    // 1. Test Basic Connectivity (Auth)
    const { data: authData, error: authError } = await supabase.auth.getSession()
    if (authError) {
        console.error('Auth Connection Failed:', JSON.stringify(authError, null, 2))
        return
    }
    console.log('Auth Service Reachable. Session:', authData.session ? 'Active' : 'None (Expected)')

    // 2. Test Table Access
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true })

    if (error) {
        console.error('Table Access Failed (likely Schema not run):', JSON.stringify(error, null, 2))
        console.error('Ensure you have run the "schema.sql" in Supabase SQL Editor!')
    } else {
        console.log('Table Access Successful! "users" table exists.')
    }
}

testConnection()

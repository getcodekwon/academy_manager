import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seedClassDataWithExistingUser() {
    console.log('🌱 Seeding Class Data (Existing User)...')

    const email = 'verify-teacher@example.com' // Corrected email from browser test
    const password = 'password123'

    // 1. Sign In
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (authError) {
        console.error('❌ Auth Login Failed:', authError.message)
        return
    }

    const teacherId = authData.user!.id
    console.log(`✅ Teacher Logged In: ${email} (${teacherId})`)

    // 2. Create Class
    const { data: classData, error: classError } = await supabase
        .from('classes')
        .insert({
            teacher_id: teacherId,
            name: 'English 101 - Advanced',
            description: 'Advanced reading and comprehension.',
            schedule: 'Mon/Wed 10:00 AM'
        })
        .select()
        .single()

    if (classError) {
        console.error('❌ Class Creation Failed:', classError.message)
    } else {
        console.log(`✅ Class Created: ${classData.name} (${classData.id})`)
    }

    console.log('✨ Data Seeding Complete!')
}

seedClassDataWithExistingUser()

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

async function seedClassData() {
    console.log('🌱 Seeding Class Data...')

    const email = `teacher-seed-${Date.now()}@test.com`
    const password = 'password123'

    // 1. Sign up Teacher
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: 'Seed Teacher', role: 'teacher' }
        }
    })

    if (authError) {
        console.error('❌ Auth Signup Failed:', authError.message)
        return
    }

    const teacherId = authData.user!.id
    console.log(`✅ Teacher Created: ${email} (${teacherId})`)

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
        return
    }

    const classId = classData.id
    console.log(`✅ Class Created: ${classData.name} (${classId})`)

    // 3. Create Students (We need users for them)
    const students = ['Alice', 'Bob']
    for (const name of students) {
        const sEmail = `student-${name.toLowerCase()}-${Date.now()}@test.com`
        const { data: sAuth, error: sError } = await supabase.auth.signUp({
            email: sEmail,
            password: 'password123',
            options: { data: { full_name: `${name} Student`, role: 'student' } }
        })

        if (sError) {
            console.error(`❌ Student ${name} Signup Failed:`, sError.message)
            continue
        }

        const studentId = sAuth.user!.id

        // 4. Enroll Student
        const { error: enrollError } = await supabase
            .from('enrollments')
            .insert({
                class_id: classId,
                student_id: studentId
            })

        if (enrollError) {
            console.error(`❌ Enrollment Failed for ${name}:`, enrollError.message)
        } else {
            console.log(`✅ Enrolled: ${name} Student`)
        }
    }

    console.log('✨ Seeding Complete!')
    console.log('Login with:', email, '/', password)
}

seedClassData()

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seedExamData() {
    console.log('🌱 Seeding Exam Data...')

    // Bypass Auth Login if possible or use a known ID.
    // Ideally we query the users table but RLS prevents it for anon.
    // Let's try to sign up a NEW unique user every time.
    const email = `teacher-unique-${Date.now()}@test.com`
    const password = 'password123'

    // Try to sign up, if fails, try to sign in with a known fallback (risk of 400)
    let { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: 'Exam Builder', role: 'teacher' } }
    })

    if (authError) {
        console.log("Signup failed (Rate Limit?), trying login with fallback...")
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: 'teacher-final@test.com', // Hope this exists
            password: 'password123'
        });
        if (loginError) {
            console.error("❌ Fatal: Cannot get a user ID.", loginError.message);
            return;
        }
        authData = loginData;
    }

    const teacherId = authData.user!.id
    console.log(`✅ Logged in as Teacher: ${teacherId}`)

    // 2. Find or Create Class
    // ... skipping class verify for speed, assuming one exists or is not strictly needed for exam *creation* for MVP, 
    // but DB schema says exam needs class_id. Let's create a temp class if needed.

    const { data: classData } = await supabase.from('classes').select('id').eq('teacher_id', teacherId).limit(1).single();
    let classId = classData?.id;

    if (!classId) {
        const { data: newClass } = await supabase.from('classes').insert({ teacher_id: teacherId, name: 'Seed Class' }).select().single();
        classId = newClass!.id;
    }

    // 3. Create Passage
    const { data: passage } = await supabase
        .from('passages')
        .insert({
            title: 'The Great Gatsby - Intro',
            content: 'In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.\n\n"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven’t had the advantages that you’ve had."',
            source: 'F. Scott Fitzgerald'
        })
        .select()
        .single();

    // 4. Create Problems
    const { data: p1 } = await supabase.from('problems').insert({
        passage_id: passage!.id,
        question_text: "According to the narrator's father, what should he remember when criticizing others?",
        options: [
            { id: "A", text: "Others are less fortunate." },
            { id: "B", text: "Critique makes you stronger." },
            { id: "C", text: "Advantages are subjective." },
            { id: "D", text: "Silence is golden." }
        ],
        correct_answer: "A",
        explanation: "The text says: 'all the people in this world haven’t had the advantages that you’ve had'.",
        type: "multiple_choice",
        tags: ["reading", "literature"]
    }).select().single();

    const { data: p2 } = await supabase.from('problems').insert({
        // No passage
        question_text: "Choose the correct synonym for 'vulnerable'.",
        options: [
            { id: "A", text: "Strong" },
            { id: "B", text: "Susceptible" },
            { id: "C", text: "Invincible" },
            { id: "D", text: "Determined" }
        ],
        correct_answer: "B",
        explanation: "Vulnerable means susceptible to physical or emotional attack or harm.",
        type: "multiple_choice",
        tags: ["vocabulary"]
    }).select().single();

    // 5. Create Exam
    const { data: exam, error: examError } = await supabase
        .from('exams')
        .insert({
            class_id: classId,
            title: 'Weekly Literature Quiz',
            problem_ids: [p1!.id, p2!.id],
            deadline: new Date(Date.now() + 86400000).toISOString() // Tomorrow
        })
        .select()
        .single();

    if (examError) {
        console.error('❌ Exam Creation Failed:', examError.message);
    } else {
        console.log(`✅ Exam Created! ID: ${exam.id}`);
        console.log(`   URL: http://localhost:3000/exam/${exam.id}`);
    }
}

seedExamData()

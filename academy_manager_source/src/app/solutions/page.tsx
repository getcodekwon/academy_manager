import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Shield, Cpu, Lock, LineChart, Layout, Code2, Server } from "lucide-react";

export default function SolutionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navigation (Reused) */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                <Layout className="w-5 h-5" />
                            </div>
                            Academy<span className="text-indigo-600">Manager</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="/#features" className="hover:text-indigo-600 transition-colors">주요 기능</Link>
                        <Link href="/solutions" className="text-indigo-600 font-semibold">솔루션</Link>
                        <Link href="/pricing" className="hover:text-indigo-600 transition-colors">요금 안내</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild className="hidden sm:inline-flex text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                            <Link href="/login">로그인</Link>
                        </Button>
                        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 decoration-0">
                            <Link href="/signup">시작하기 <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-24">
                {/* Solution Hero */}
                <section className="bg-indigo-900 text-white py-20 pb-32">
                    <div className="container mx-auto px-4 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 bg-indigo-800/50 border border-indigo-700 text-indigo-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Enterprise Grade Security
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight break-keep">
                            기술이 교육을 뒷받침할 때,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                                한계는 사라집니다.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed break-keep">
                            AcademyManager는 단순한 관리 도구가 아닙니다.
                            금융권 수준의 보안, 무한한 확장성을 가진 AI 인프라, 그리고 데이터 기반의 시스템 입니다.
                        </p>
                    </div>
                </section>

                {/* Tech Stack Grid */}
                <section className="container mx-auto px-4 -mt-20 relative z-10 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <Server className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">엔터프라이즈 아키텍처</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Next.js 15의 Server Components와 Edge Computing을 도입하여 어떤 트래픽 폭주에도 유연하게 대응합니다.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-4">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                <Code2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">AI 콘텐츠 파이프라인</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                단순 생성을 넘어선 Draft-Review-Publish 워크플로우로 학원만의 독창적인 콘텐츠 IP를 보호합니다.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-4">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">데이터 보안 (RLS)</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Row-Level Security를 통해 데이터베이스 레벨에서 원천적으로 권한을 통제하여 정보 유출을 차단합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Deep Dive Sections (Slack Style Alternating) */}
                <section className="container mx-auto px-4 py-12 space-y-32">
                    {/* 1. Infrastructure */}
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 break-keep">
                                속도가 곧 경쟁력입니다.<br />
                                <span className="text-indigo-600">Next.js 15 & Supabase</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed break-keep">
                                기존 학원 관리 프로그램의 느린 로딩과 잦은 오류에 지치셨나요?
                                우리는 최신 웹 기술 표준을 준수하여 압도적인 퍼포먼스를 제공합니다.
                                Supabase Realtime DB를 통해 학생의 출결과 시험 응시 현황이 0.1초의 지연도 없이 동기화됩니다.
                            </p>
                            <div className="flex gap-2 pt-2">
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">Serverless</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">Edge Edge Network</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">Realtime Sync</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                            {/* Pseudo Code Block */}
                            <div className="absolute top-0 left-0 w-full h-8 bg-slate-800 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <pre className="mt-6 text-xs md:text-sm font-mono text-blue-300 overflow-x-auto">
                                <code>
                                    {`// Real-time Attendance Sync
supabase
  .channel('attendance')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public' }, 
    (payload) => {
      updateDashboard(payload.new);
      notifyParents(payload.new);
    }
  )
  .subscribe();`}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* 2. AI & IP Protection */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 break-keep">
                                AI는 도구일 뿐,<br />
                                <span className="text-purple-600">주인공은 선생님입니다.</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed break-keep">
                                AI가 무작위로 만든 문제는 학원의 퀄리티를 유지할 수 없습니다.
                                우리는 '프롬프트 엔지니어링 파이프라인'을 통해 선생님이 의도한 스타일을 학습하고,
                                <strong>Draft(초안) &rarr; Review(검수) &rarr; Publish(발행)</strong>의 체계적인 승인 절차를 거쳐야만 학생에게 전달되도록 설계했습니다.
                            </p>
                            <div className="flex gap-2 pt-2">
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">Human-in-the-loop</span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">Style Extraction</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center justify-between mb-8 border-b pb-4">
                                <div className="font-bold text-slate-700">문제 검수 파이프라인</div>
                                <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Review Required</div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start opacity-50">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                                    <div className="h-2 bg-slate-100 rounded w-full"></div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">AI</div>
                                    <div className="bg-purple-50 p-4 rounded-lg w-full text-sm text-slate-700">
                                        "지문을 기반으로 3개의 추론 문항을 생성했습니다. 검토해주시겠습니까?"
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button size="sm" variant="outline" className="text-red-500">반려</Button>
                                    <Button size="sm" className="bg-indigo-600">승인 및 발행</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Analytics */}
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 break-keep">
                                데이터가 말해주는<br />
                                <span className="text-orange-500">숨겨진 성장 포인트.</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed break-keep">
                                단순히 점수만 기록하지 않습니다. 반 평균 대비 성취도, 누적 출결 히트맵, 취약 유형 분석을 통해
                                "어떤 학생이 관리가 필요한지" 시스템이 먼저 알려줍니다.
                            </p>
                        </div>
                        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl h-64 flex items-center justify-center text-slate-400">
                            {/* Placeholder for Chart */}
                            <div className="text-center">
                                <LineChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <span className="text-sm">Comparative Analytics Dashboard</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-slate-50 border-t border-slate-200 py-24 text-center">
                    <div className="container mx-auto px-4 space-y-8">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 break-keep">
                            학원의 미래, 지금 바로 설계하세요.
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg break-keep">
                            기술적인 고민은 저희에게 맡기시고, 원장님은 교육에만 집중하세요.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 font-bold">
                                <Link href="/contact">도입 상담 신청하기</Link>
                            </Button>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer (Simplified) */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="container mx-auto px-4 text-center text-sm text-slate-500">
                    © 2024 AcademyManager Inc. Enterprise Solutions.
                </div>
            </footer>
        </div>
    );
}

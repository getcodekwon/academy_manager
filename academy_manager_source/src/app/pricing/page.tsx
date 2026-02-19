import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Layout } from "lucide-react";

export default function PricingPage() {
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
                        <Link href="/solutions" className="hover:text-indigo-600 transition-colors">솔루션</Link>
                        <Link href="/pricing" className="text-indigo-600 font-semibold">요금 안내</Link>
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
                {/* Pricing Hero */}
                <section className="bg-slate-50 py-20 pb-10 text-center">
                    <div className="container mx-auto px-4 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 break-keep">
                            학원 규모에 딱 맞는 요금제
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed break-keep">
                            소규모 공부방부터 대형 입시 학원까지,<br /> AcademyManager는 모든 규모의 성장을 지원합니다.
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="container mx-auto px-4 py-10 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Free Tier */}
                        <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col hover:shadow-lg transition-shadow">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
                                <p className="text-slate-500 text-sm h-10">
                                    기능 체험 및 데모 확인용
                                </p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900">₩0</span>
                                    <span className="text-slate-500 font-medium">/ 월</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mb-8 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold h-12">
                                무료로 시작하기
                            </Button>
                            <ul className="space-y-4 flex-1">
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> 모든 기능 14일 무료 체험
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> 학생 수 제한 없음 (체험 기간)
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> 신용카드 등록 불필요
                                </li>
                            </ul>
                        </div>

                        {/* Mid Tier */}
                        <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col hover:shadow-lg transition-shadow relative overflow-hidden">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mid</h3>
                                <p className="text-slate-500 text-sm h-10">
                                    소규모 학원 및 교습소 (5~50명)
                                </p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900">₩50,000</span>
                                    <span className="text-slate-500 font-medium">/ 월</span>
                                </div>
                            </div>
                            <Button className="w-full mb-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 shadow-md">
                                Mid 요금제 선택
                            </Button>
                            <ul className="space-y-4 flex-1">
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" /> <strong>학생 50명까지</strong> 관리 가능
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" /> 출결 관리 및 알림톡 전송
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" /> 시험 성적 입력 및 리포트
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" /> 이메일 기술 지원
                                </li>
                            </ul>
                        </div>

                        {/* Pro Tier (Highlighted) */}
                        <div className="bg-white rounded-xl border-2 border-indigo-600 p-8 flex flex-col hover:shadow-xl transition-shadow shadow-lg relative">
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                BEST
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
                                <p className="text-slate-500 text-sm h-10">
                                    대형 학원 및 프랜차이즈 (100명+)
                                </p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900">₩200,000</span>
                                    <span className="text-slate-500 font-medium">/ 월</span>
                                </div>
                            </div>
                            <Button className="w-full mb-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold h-12 shadow-md">
                                도입 문의하기
                            </Button>
                            <ul className="space-y-4 flex-1">
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" /> <strong>학생 무제한</strong> 등록
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" /> <strong>AI 자동 채점 및 문제 생성</strong>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" /> 고급 데이터 분석 (이탈 예측)
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" /> 전담 매니저 배정
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" /> API 연동 지원
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FAQ / Trust Teaser */}
                <section className="bg-white py-24 border-t border-slate-200">
                    <div className="container mx-auto px-4 text-center space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            궁금한 점이 있으신가요?
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            도입에 앞서 궁금한 점이 있다면 언제든 문의해주세요. <br />
                            전문 컨설턴트가 학원의 상황에 맞는 최적의 플랜을 제안해 드립니다.
                        </p>
                        <Button variant="outline" size="lg">자주 묻는 질문 보러가기</Button>
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

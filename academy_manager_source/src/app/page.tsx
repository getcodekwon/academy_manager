import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BarChart3, Users, BookOpen, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-indigo-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Academy</span><span className="text-indigo-600">Manager</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="#features" className="hover:text-indigo-600 transition-colors">주요 기능</Link>
                        <Link href="/solutions" className="hover:text-indigo-600 transition-colors">솔루션</Link>
                        <Link href="/pricing" className="hover:text-indigo-600 transition-colors">요금 안내</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild className="hidden sm:inline-flex text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                            <Link href="/login">로그인</Link>
                        </Button>
                        <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 decoration-0 border-0">
                            <Link href="/signup">시작하기 <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-48">
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            대한민국 1등 학원 관리 솔루션
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 break-keep leading-tight">
                            학원 관리, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
                                이보다 더 완벽할 순 없습니다.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed break-keep">
                            출결부터 성적, 수납까지. 복잡한 학원 업무를 하나의 플랫폼에서.<br />
                            원장님은 교육에만 집중하세요. 나머지는 저희가 해결합니다.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 transaction-all hover:scale-105">
                                <Link href="/signup">무료로 시작하기</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-slate-50">
                                <Link href="/contact">도입 상담 문의</Link>
                            </Button>
                        </div>
                        <p className="mt-6 text-sm text-slate-500 font-medium">
                            ✨ 14일 무료 체험 · 신용카드 등록 불필요
                        </p>
                    </div>

                    {/* Background Decor */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl"></div>
                </section>

                {/* Social Proof */}
                <section className="py-12 border-y border-indigo-50 bg-gradient-to-b from-white to-indigo-50/30">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-8">
                            이미 500개 이상의 학원이 선택했습니다
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-2xl font-black text-slate-400 hover:text-indigo-600 transition-colors">MEGA</span>
                            <span className="text-2xl font-black text-slate-400 hover:text-indigo-600 transition-colors">ETOOS</span>
                            <span className="text-2xl font-black text-slate-400 hover:text-indigo-600 transition-colors">DAESUNG</span>
                            <span className="text-2xl font-black text-slate-400 hover:text-indigo-600 transition-colors">JONGRO</span>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-32 bg-white relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                효율적인 학원 운영을 위한<br />모든 기능
                            </h2>
                            <p className="text-lg text-slate-600">
                                흩어져 있던 업무 도구들을 하나로 통합했습니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:rotate-6 transition-transform">
                                        <Users className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">학생/학부모 관리</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        학생 정보를 체계적으로 관리하고, 학부모님께 출결 및 성적 리포트를 자동으로 발송합니다.
                                    </p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:rotate-6 transition-transform">
                                        <BookOpen className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">스마트 출결 시스템</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        등하원 시간을 정확하게 기록하고, 지각/결석 시 스마트 알림을 통해 빈틈없이 관리합니다.
                                    </p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-emerald-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:rotate-6 transition-transform">
                                        <BarChart3 className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">성적 분석 리포트</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        시험 결과를 한눈에 파악할 수 있는 시각화된 리포트를 제공하여 학습 방향을 제시합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 py-32 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>

                    <div className="container mx-auto px-4 text-center relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight break-keep leading-tight">
                            지금 바로 <br className="md:hidden" />
                            <span className="text-indigo-300">학원 운영의 변화</span>를 시작하세요
                        </h2>
                        <p className="text-indigo-100 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed break-keep">
                            수백 명의 원장님이 선택한 AcademyManager와 함께,<br /> 교육의 본질에 더 집중하세요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button size="lg" className="h-16 px-10 text-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold shadow-2xl">
                                <Link href="/signup">무료로 시작하기</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-16 px-10 text-xl border-indigo-400 text-indigo-100 hover:bg-indigo-800 hover:text-white hover:border-indigo-300 backdrop-blur-sm">
                                <Link href="/contact">영업팀 문의</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white border-t border-slate-200 py-16">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">제품</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li className="hover:text-indigo-600 cursor-pointer">기능 소개</li>
                            <li className="hover:text-indigo-600 cursor-pointer"><Link href="/pricing">요금 안내</Link></li>
                            <li className="hover:text-indigo-600 cursor-pointer">엔터프라이즈</li>
                            <li className="hover:text-indigo-600 cursor-pointer">업데이트 노트</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">회사</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li className="hover:text-indigo-600 cursor-pointer">소개</li>
                            <li className="hover:text-indigo-600 cursor-pointer">채용</li>
                            <li className="hover:text-indigo-600 cursor-pointer">이용약관</li>
                            <li className="hover:text-indigo-600 cursor-pointer">연락처</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">리소스</h4>
                        <ul className="space-y-3 text-sm text-slate-500 font-medium">
                            <li className="hover:text-indigo-600 cursor-pointer">블로그</li>
                            <li className="hover:text-indigo-600 cursor-pointer">커뮤니티</li>
                            <li className="hover:text-indigo-600 cursor-pointer">고객센터</li>
                            <li className="hover:text-indigo-600 cursor-pointer">API 문서</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">소셜</h4>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer">
                                {/* Icon placeholder */}
                            </div>
                            <div className="w-10 h-10 bg-slate-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer"></div>
                            <div className="w-10 h-10 bg-slate-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer"></div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 text-center text-sm text-slate-400 pt-8 border-t border-slate-100">
                    © 2024 AcademyManager Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

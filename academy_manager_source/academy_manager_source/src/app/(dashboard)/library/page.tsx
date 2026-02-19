"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText, Search, Filter, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function LibraryPage() {
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = () => {
        setIsUploading(true)
        // Mock upload delay
        setTimeout(() => {
            setIsUploading(false)
            toast.success("File uploaded successfully. OCR processing started.")
        }, 2000)
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Problem Bank</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button>
                        <PlusIcon className="mr-2 h-4 w-4" /> Create Problem
                    </Button>
                </div>
            </div>

            {/* Bulk Upload Zone */}
            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
                <CardContent className="flex flex-col items-center justify-center py-10 gap-4">
                    <div className="p-4 bg-white rounded-full shadow-sm">
                        <Upload className="h-8 w-8 text-indigo-500" />
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="font-semibold text-lg">Bulk Upload</h3>
                        <p className="text-sm text-slate-500">
                            Drag and drop PDF or HWP files here to extract problems automatically.
                        </p>
                    </div>
                    <Button onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                            </>
                        ) : (
                            "Select Files"
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Problem List */}
            <div className="grid gap-4">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            type="search"
                            placeholder="Search by keyword or tag..."
                            className="pl-8 w-full md:w-[300px] bg-white"
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Problem Card Mock 1 */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded font-medium">Reading</div>
                                <span className="text-xs text-slate-400">#Science #Inference</span>
                            </div>
                            <CardTitle className="text-base mt-2 line-clamp-2">
                                According to the passage, what is the significance of...
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-500 line-clamp-3">
                                However, recent discoveries have revolutionized our understanding of photosynthesis. In the deep ocean...
                            </p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between text-sm text-slate-400">
                            <span>Grade 3</span>
                            <span>Level: Hard</span>
                        </CardFooter>
                    </Card>

                    {/* Problem Card Mock 2 */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-medium">Grammar</div>
                                <span className="text-xs text-slate-400">#To-Infinitive</span>
                            </div>
                            <CardTitle className="text-base mt-2 line-clamp-2">
                                Choose the correct form of the verb to complete the sentence.
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-500 line-clamp-3">
                                She decided _______ (go) to the party early.
                            </p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between text-sm text-slate-400">
                            <span>Grade 1</span>
                            <span>Level: Easy</span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function PlusIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

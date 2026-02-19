'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle className="h-6 w-6" />
                <h2 className="text-lg font-semibold">Something went wrong!</h2>
            </div>
            <p className="text-slate-500 max-w-md text-center">
                {error.message || "We couldn't load the class data. Please try again."}
            </p>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    )
}

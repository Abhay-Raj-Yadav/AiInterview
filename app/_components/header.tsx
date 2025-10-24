import React from 'react'
import { Button } from '@/components/ui/button'
import Link from "next/link"
function header() {
  return (
   <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
       <img src="/logo.svg" alt="Logo" width={48} height={48} />
       <h1 className="text-base font-bold md:text-2xl">AI INTERVIEW PREP</h1>
      </div>
     <Link href={"/sign-in"}> 
       <Button>
        LOGIN
       </Button>
      </Link>
    </nav>
  )
}

export default header

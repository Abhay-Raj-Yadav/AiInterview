import { UserButton } from '@clerk/nextjs'
import path from 'path'
import React from 'react'


const MenuOption=[
    {
        name:'Dashboard',
        path:'/dashboard'
    },
    {
        name:'Upgrade',
        path:'/upgrade'
    },
    {
        name:'How it works',
        path:'/how-it-works'
    }
]

function AppHeader() {
  return (
     <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
       <img src="/logo.svg" alt="Logo" width={48} height={48} />
       <h1 className="text-base font-bold md:text-2xl">AI INTERVIEW PREP</h1>
      </div>
      <ul className='flex gap-5'>
           { MenuOption.map((option,index)=>(
             <li key={index} className='text-lg hover:scale-105 transition-all'>{option.name}</li>
            )
            )}
      </ul>
     <div>
        </div>
        <UserButton />
    </nav>
  )
}

export default AppHeader

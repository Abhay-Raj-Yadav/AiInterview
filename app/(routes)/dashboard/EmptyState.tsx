import { Button } from '@/components/ui/button'
import React from 'react'
import CreateInterviewDialog from '../_components/CreateInterviewDialog'

function EmptyState() {
  return (
    <div className='mt-14 flex-col items-center justify-center text-center gap-5 border-amber-500 p-10 border-5'>
        <img src={'/interview.png'} alt='No interviews found'
        width={140} height={140} />
        <h2 className='text-2xl font-bold mt-6'>No Interviews Found</h2>
        <CreateInterviewDialog />
    </div>
  )
}

export default EmptyState

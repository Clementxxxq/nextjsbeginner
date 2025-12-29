'use client'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="p-6 flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Address Book
      </h1>
      <Button onClick={handleClick}>
      Add Contact
    </Button>
    </main>
  )
}

function handleClick() {
  alert('Button clicked!')
}

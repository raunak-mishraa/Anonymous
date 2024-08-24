'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { User as AnonymousUser } from 'lucide-react'; 

function Navbar() {
  const { data: session } = useSession();
  const user : User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 md:py-4 bg-white text-black">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold flex gap-x-1.5 mb-4 md:mb-0">
          <AnonymousUser className='w-5'/> Anonymous
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-black text-white" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-black text-white" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
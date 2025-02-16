"use client"
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { usePathname,useRouter } from 'next/navigation'
import { auth } from '@/configs/firebaseConfig';
import {  signOut } from 'firebase/auth';

function ProfilePage() {
         const path = usePathname()
        const router = useRouter()
        const { user } = useAuthContext();
        const [userData, setUserData] = useState<any>();
        useEffect(() => {
            user && GetUserCredits();
        }, [user])

        const onButtonPress = () => {
                    signOut(auth).then(() => {
                        // Sign-out successful.
                        router.replace('/')
                    }).catch((error) => {
                        // An error happened.
                    });
                }
        
        const GetUserCredits = async () => {
            const result = await axios.get('/api/user?email=' + user?.email);
            console.log(result.data)
            setUserData(result.data);
        }
  return (
    <div>
        <div className='p-4 shadow-sm  '>
        <Image src={'/111.png'} alt='logo' width={100} height={100} className='mb-5 ml-[50%] pb-8' />
        <h2 className='font-bold text-2xl pb-5' >Profile</h2>
        </div>
    <div className='p-5 bg-slate-50 rounded-xl border  '>
     
        
       
        
        
        <h1><label className='font-bold'>Name: </label> {userData?.name}</h1>
        <h1> <label className='font-bold'>Email: </label>{userData?.email}</h1>
        <h1> <label className='font-bold'>Credits: </label>{userData?.credits}</h1>
        
    </div>
    <div className='flex justify-center p-5'>
        <Button onClick={onButtonPress} variant={'link'}>Logout</Button>
    </div>
    </div>
  )
}

export default ProfilePage

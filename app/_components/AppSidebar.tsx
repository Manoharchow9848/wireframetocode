"use client"
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings ,Paintbrush,WalletCards,CircleUserRound} from "lucide-react"
import Image from 'next/image'
import { usePathname,useRouter } from 'next/navigation'
import { auth } from '@/configs/firebaseConfig';
import {  signOut } from 'firebase/auth';
import Link from 'next/link'
import ProfileAvatar from './ProfileAvatar'
import { useAuthContext } from '../provider'
import { Button } from '@/components/ui/button'

const items = [
    {
        title: "Workspace",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Design",
        url: "/design",
        icon: Paintbrush,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: WalletCards,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: CircleUserRound,
    },
   
]

export function AppSidebar() {
    
    const path = usePathname()
    const router = useRouter()
    const user = useAuthContext();

    const onButtonPress = () => {
            signOut(auth).then(() => {
                // Sign-out successful.
                router.replace('/')
            }).catch((error) => {
                // An error happened.
            });
        }
    
    
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Link href={'/'}>
                <Image  className='mb-5 ml-12 cursor-pointer' src={'/111.png'} alt="logo" width={100} height={100} />
                </Link>
                    <h2 className='text-sm text-gray-400 text-center'>Build Awesome</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                               
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg  
                                 ${path==item.url && 'bg-gray-300'}
                                 `}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>

                           
                            ))}
                           <Button variant={'link'} onClick={onButtonPress} className='mt-28' >Logout</Button>
                            
                        </SidebarMenu>
                        
                    </SidebarGroupContent>
                    
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm'>Copyright <span className='font-bold text-gray-600'>@KMC</span></h2>
            </SidebarFooter>
        </Sidebar>
    )
}
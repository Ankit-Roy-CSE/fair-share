"use client"

import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

type Props = {}

const Header = (props: Props) => {
    const path = usePathname() ;
    return (
        <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
            </Link>

            {path === "/" && (
            <div className="hidden md:flex items-center gap-6">
                <Link
                href="#features"
                className="text-sm font-medium hover:text-green-600 transition"
                >
                Features
                </Link>
                <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-green-600 transition"
                >
                How It Works
                </Link>
            </div>
            )}

            <div className="flex items-center gap-4">
            </div>
        </nav>
        </header>
    );
}

export default Header
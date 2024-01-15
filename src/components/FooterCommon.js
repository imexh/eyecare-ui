import React from "react";
import { Popover } from '@headlessui/react'

export default function FooterCommon() {
    return (
        <>
            <footer className="bg-white">
                <nav className="mx-auto flex flex-col items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <Popover.Group className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-12 lg:items-center">
                        <a href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                            About
                        </a>
                        <a href="/contacts" className="text-sm font-semibold leading-6 text-gray-900">
                            Contact Us
                        </a>
                        <a href="/help" className="text-sm font-semibold leading-6 text-gray-900">
                            Help
                        </a>
                    </Popover.Group>
                </nav>
            </footer>
        </>
    );
}

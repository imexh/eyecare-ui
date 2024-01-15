import React from 'react';
import authService from '../services/auth.service';
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    WrenchScrewdriverIcon,
    ChatBubbleLeftEllipsisIcon,
    QuestionMarkCircleIcon,
    GlobeAsiaAustraliaIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const More = [
    { name: 'Help', description: '', href: '/help', icon: QuestionMarkCircleIcon },
    { name: 'Contact Us', description: '', href: '/contacts', icon: ChatBubbleLeftEllipsisIcon },
    { name: 'About', description: '', href: '/about', icon: GlobeAsiaAustraliaIcon },
    { name: 'Profile', description: '', href: '/profile', icon: UserIcon },
    { name: 'Settings', description: '', href: '/settings', icon: WrenchScrewdriverIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBarCommon() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        authService.logout();
        navigate("/login");
        window.location.reload();
    }

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/dashboard" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-12 w-auto" src="/images/eyecaresquarelogoblack.png" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">

                    <a href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                        Dashboard
                    </a>
                    <a href="/cvs-home" className="text-sm font-semibold leading-6 text-gray-900">
                        CVS Test
                    </a>
                    <a href="/health" className="text-sm font-semibold leading-6 text-gray-900">
                        Health Tips
                    </a>
                    <a href="/usage" className="text-sm font-semibold leading-6 text-gray-900">
                        Usage Reports
                    </a>
                    <Popover className="relative">
                        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            More
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {More.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                            </div>
                                            <div className="flex-auto">
                                                <a href={item.href} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
                        Logout <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/dashboard" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-20 w-auto"
                                src="/images/eyecaresquarelogowithtextblack.png"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="/dashboard"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="/cvs-home"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    CVS Test
                                </a>
                                <a
                                    href="/health"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Health Tips
                                </a>
                                <a
                                    href="/usage"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Usage Reports
                                </a>
                                <a
                                    href="/help"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Help
                                </a>
                                <a
                                    href="/contacts"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Contact Us
                                </a>
                                <a
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    About
                                </a>
                                <a
                                    href="/profile"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Profile
                                </a>
                                <a
                                    href="/settings"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Settings
                                </a>
                            </div>
                            <div className="py-6">
                                <span
                                    onClick={handleLogout}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Logout
                                </span>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}

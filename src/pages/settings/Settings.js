import React from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import FooterCommon from '../../components/FooterCommon'

export default function Settings() {
  return (
    <>
      <NavBarCommon />

      <div className="min-h-full mb-12">
        <header className="bg-white shadow pb-2">
          <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 ml-8">Settings</h1>
          </div>
        </header>
        <main className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-auto px-16 mt-12">
          <div className="sm:col-span-3 max-w-7xl py-6 lg:px-8">
            Under Construction....
          </div>
        </main>
      </div>

      <FooterCommon />
    </>
  )
}

'use client'

import React, { FC } from 'react'

const Spinner: FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px] fixed inset-0 z-50 bg-black bg-opacity-1">
      <div
        className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: `var(--primary-color) var(--primary-color) var(--primary-color) transparent` }}
      ></div>
    </div>
  )
}

export default Spinner

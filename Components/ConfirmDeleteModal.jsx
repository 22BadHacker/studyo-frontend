'use client'
import React from 'react'

export default function ConfirmDeleteModal({ show, onClose, onConfirm, itemName }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60  flex items-center justify-center">
      <div className="bg-[#fff] text-main2 rounded-lg h-fit p-7 w-[390px] shadow-2xl">
        <h3 className="text-[23px] tracking-wide font-NeueMontreal font-semibold mb-2">Delete from Your Library?</h3>
        {/* <h3 className="text-xl font-semibold mb-3">Delete ?</h3> */}
        <p className="text-main2 relative -top-2 text-[12px] font-NeueMontreal tracking-wide mb-6">This will delete <span className='text-black capitalize font-semibold'>{itemName}</span> from <span className='text-black capitalize font-semibold'>your library</span></p>
        {/* <p className="text-main2 text-[13px] mb-5">Are you sure you want to permanently delete this {itemName}?</p> */}
        
        <div className="flex justify-end gap-6">
          <button onClick={onClose} className="font-NeueMontreal cursor-pointer hover:scale-[1.05] duration-200 ease-in-out font-semibold text-main2 text-[14px]  px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-600  text-[13.5px] cursor-pointer hover:scale-[1.05] duration-200 ease-in-out rounded-full text-white/95 tracking-wide px-7 font-NeueMontreal font-semibold py-[11px] ">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

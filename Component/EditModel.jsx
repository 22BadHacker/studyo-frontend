// components/EditProfileModal.jsx
'use client'
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import EditProfileForm from './EditProfileForm';

const EditModel = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-main2 text-white px-4 py-2 rounded hover:bg-main2/80"
      >
        Edit Profile
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-main2 hover:text-red-500"
            >
              <IoMdClose size={22} />
            </button>

            <EditProfileForm />
          </div>
        </div>
      )}
    </>
  );
};

export default EditModel;

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppHook } from '@/context/AppProvider';
import toast from 'react-hot-toast';
import logo from '@/public/Logo/Studyo_white.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { authToken } = useAppHook();

//   useEffect(() => {
//     if (!authToken) return router.push('/Auth/Login');

//     axios.get('http://localhost:8000/api/user/profile', {
//       headers: { Authorization: `Bearer ${authToken}` },
//     })
//       .then(res => {
//         setUser(res.data);
//         setForm({ username: res.data.username, email: res.data.email, password: '' });
//         setLoading(false);
//       })
//       .catch(() => router.push('/Auth/Login'));
//   }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = e => {
//     e.preventDefault();

//     axios.put('http://localhost:8000/api/user/profile', form, {
//       headers: { Authorization: `Bearer ${authToken}` },
//     })
//       .then(res => {
//         setMessage('Profile updated!');
//         setForm({ ...form, password: '' }); // clear password
//       })
//       .catch(err => {
//         setMessage(err.response?.data?.message || 'Error updating profile');
//       });
//   };

//   if (loading) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <div className="w-full flex  flex-col gap-20 ">
      <div className="flex fixed top-6 left-0 items-center px-[60px]  justify-between w-full mx-auto">
          <Link className='z-[70] group relative inline-block overflow-hidden  h-[47px] ' href={'/'}>
            <Image alt='Logo' className='w-[125px] block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
            <Image alt='Logo' className='w-[125px] absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
				</Link>
        <div className="flex gap-4 items-center">
          <span className='size-[40px] bg-white text-black rounded-full flex-center font-bold  text-[17.8px]'>A</span>
          <p className="text-white text-[17px] font-semibold">Profile</p>

        </div>
      </div>

      <div className="max-w-[700px] pt-[180px] flex flex-col gap-[65px] mx-auto  w-full  ">
          <div className="link-wrapper   h-[58px]   cursor-pointer w-fit  font-[700] text-white font-NeueMontreal leading-tight  tracking-[0.015em] text-[55px]">
            <h1 className=' link-text '>Edit Your Profile</h1>
            <h1 className=' link-text-clone '>Edit Your Profile </h1>
          </div>

          <div className="flex flex-col gap-7 w-full">
              <div className="flex gap-[8px] flex-col">
                  <span className="text-[14.5px] text-white font-NeueMontreal font-semibold">User Public Url</span>
                  <p className='text-[15px] tracking-wide font-normal font-NeueMontreal w-fit '>w4VB4bqp7OqCEYdSf15YPN</p>
              </div>


              <div className="flex gap-[8px] flex-col">
                  <span className="text-[14.5px] text-white font-NeueMontreal font-semibold">Username</span>
                  <input className='inpuut'  type="text" />
              </div>
          </div>

      </div>



      {/* <div className="pt-0 grid grid-col-2 gap-6">
        <div className="flex flex-col gap-6">
            <img src="/images/img30.jpg" className='size-[250px] rounded-full' alt="" />
            <p>Selina Gomez</p>
        </div>
      </div> */}

      {message && toast.success(message)}
    </div>
  );
}

    //   <form  className="space-y-4">
    //     <input
    //       name="username"
    //       value={form.username}
    //       onChange={handleChange}
    //       placeholder="Name"
    //       className="w-full p-2 border rounded"
    //     />
    //     <input
    //       name="email"
    //       value={form.email}
    //       onChange={handleChange}
    //       placeholder="Email"
    //       type="email"
    //       className="w-full p-2 border rounded"
    //     />
    //     <input
    //       name="password"
    //       value={form.password}
    //       onChange={handleChange}
    //       placeholder="New Password (optional)"
    //       type="password"
    //       className="w-full p-2 border rounded"
    //     />
    //     <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
    //       Save Changes
    //     </button>
    //   </form>
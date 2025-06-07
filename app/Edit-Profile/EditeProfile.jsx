'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppHook } from '@/context/AppProvider';
import toast from 'react-hot-toast';
import logo from '@/public/Logo/Studyo_white.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { PiCopyThin } from "react-icons/pi";
import GenderDropdown from './GenderDropdown';
import { useSession } from "next-auth/react";
import MonthDropdown from './MonthDropdown';

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '', gender: '', bio: '', role: '',  });
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { authToken } = useAppHook();

    const passwordChecks = {
    length: form.password.length >= 8,
    lowercase: /[a-z]/.test(form.password),
    uppercase: /[A-Z]/.test(form.password),
  };

   const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setForm(prev => ({ ...prev, role }));
  }

  useEffect(() => {
    if (!authToken) return router.push('/Auth/Login');

    axios.get('http://localhost:8000/api/user/profile', {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(res => {
        setUser(res.data);
        const { username, email, bio, gender, role, date_of_birth } = res.data;
        setForm({ username, email, password: "", bio: bio || "", gender: gender || "", role });
        setSelectedRole(role);
        setLoading(false);

        if (date_of_birth) {
            const [year, month, day] = date_of_birth.split("-");
            setDateOfBirth({ day, month, year });
          }
      })
      .catch(() => router.push('/Auth/Login'));
  }, []);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateOfBirth((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formattedDate = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;
     const updatedForm = {
    ...form,
    date_of_birth: formattedDate,
  };

    axios.put('http://localhost:8000/api/user/profile', updatedForm, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then(res => {
        toast.success('Profile updated successfully');
        setForm({ ...form, password: '' }); // clear password
        console.log(user.profile_image);
        
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to update profile');
      });
  };

 

  if (loading) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <div className="w-full flex items-center flex-col gap-20 ">
      <div className="flex  max-w-[1100px] py-2  items-center  justify-between w-full mx-auto">
          <Link className='z-[70] group relative inline-block overflow-hidden  h-[47px] ' href={'/'}>
            <Image alt='Logo' className='w-[115px] block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
            <Image alt='Logo' className='w-[115px] absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
				</Link>
        <div className="flex gap-4 items-center">
          <span className='size-[38px] bg-white text-black rounded-full flex-center font-bold  text-[16px]'>{user.username.charAt(0).toUpperCase()}</span>
          <p className="text-white text-[17px] font-semibold">Profile</p>
         <img className='size-[38px] rounded-full saturate-[1.3]  object-cover' src={`http://localhost:8000${user.profile_image}`} onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/Hand.jpg'; // fallback image in /public
        }} alt="" />

        </div>
      </div>

      <div className="max-w-[700px]  flex flex-col gap-[65px] mx-auto  w-full  ">
          <div className="breadcrumbs relative top-10 text-sm">
            <ul>
              <li><a>Home</a></li>
              <li><a>Profile</a></li>
              <li><a>Edit Profile</a></li>
            </ul>
          </div>

          <div className="link-wrapper   h-[58px]   cursor-pointer w-fit  font-[700] text-white font-NeueMontreal leading-tight  tracking-[0.015em] text-[55px]">
            <h1 className=' link-text '>Edit Your Profile</h1>
            <h1 className=' link-text-clone '>Edit Your Profile </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex pt-2 flex-col gap-6 w-full">
              <div className="flex gap-[8px] flex-col">
                  <span className="text-[15px] text-white font-NeueMontreal font-semibold">User Public Url</span>
                  <p className='text-[15.5px] flex gap-6 items-center tracking-wide font-normal font-NeueMontreal w-fit '>{user.public_id}<PiCopyThin/></p>
              </div>


              <div className="flex gap-[8px] flex-col">
                  <span className="text-[15px] text-white font-NeueMontreal font-semibold">Username</span>
                  <input className='inpuut' value={form.username} name='username' onChange={handleChange} type="text" />
              </div>
              <div className="flex gap-[8px] flex-col">
                  <span className="text-[15px] text-white font-NeueMontreal font-semibold">Role</span>
                <div className=" pt-2 grid grid-cols-2 w-full gap-12">
                  <div 
                    onClick={() => handleRoleSelect('artist')}
                    className={`flex-center relative  h-[170px] border-white/40 hover:border-white backdrop-blur-[50px] rounded-lg border-[1px] flex flex-col gap-4 items-center cursor-pointer transition-all duration-200 `}
                  >
                    <h3 className="text-white text-[16px]  font-bold">Artist or Manager</h3>

                    <div className={`${selectedRole === 'artist' ? 'bg-white border-white ' : 'border-white/40  '} size-5 absolute right-[10px] top-[10px] rounded-full border-white border-1`}></div>
                    {/* <input type="text" class /> */}
                    
                  </div>
                  <div 
                    onClick={() => handleRoleSelect('user')}
                    className={`flex-center relative h-[170px] border-white/40 hover:border-white backdrop-blur-[50px] rounded-lg border-[1px] flex flex-col gap-4 items-center cursor-pointer transition-all duration-200`}
                  > 
                   <div className={`${selectedRole === 'user' ? 'bg-white border-white ' : 'border-white/40  '} size-5 absolute right-[10px] top-[10px] rounded-full border-white border-1`}></div>
                    <h3 className="text-white text-[16px]  font-bold">Music Listener</h3>
                  </div>
                </div>
                 
              </div>

              <div className="flex gap-[8px] flex-col">
                  <span className="text-[15px] capitalize text-white font-NeueMontreal font-semibold">Adress email</span>
                  <input className='inpuut'  type="email" name='email' value={form.email}
                  onChange={handleChange} />
              </div>
              <div className="flex gap-[8px] flex-col">
                  <span className="text-[15px] capitalize text-white font-NeueMontreal font-semibold">password</span>
                  <input name="password"
                  
                  value={form.password}
                  onChange={handleChange} className='inpuut'  type="password"/>
              </div>
              <div className="py-1 text-[13px] text-white font-InterTight space-y-[6px]">
                  {Object.entries(passwordChecks).map(([key, isValid]) => {
                    const conditionText = {
                      length: 'At least 8 characters',
                      lowercase: 'Contains a lowercase letter',
                      uppercase: 'Contains an uppercase letter',
                      // number: 'Contains a number',
                      // special: 'Contains a special character',
                    }[key];

                    return (
                      <div key={key} className="flex  tracking-wide capitalize items-center gap-3">
                        {isValid ? (
                          <FaCheckCircle className="text-green-400 relative -top-[1px]" />
                        ) : (
                            <span className="text-red-400 relative -top-[1px] size-[13px] rounded-full border-[1px] border-main " />
                        )}
                        <span className={isValid ? 'text-white' : 'text-white/75'}>
                          {conditionText}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div className="flex gap-[8px] flex-col">
                  <span className="text-[15px] capitalize text-white font-NeueMontreal font-semibold">Gender</span>
                  <GenderDropdown  name='gender' selected={form.gender} onChange={(value) =>
                    setForm((prev) => ({ ...prev, gender: value }))
                  } />
              </div>
              <div className="flex gap-[8px] flex-col">

                  <span className="text-[15px] capitalize text-white font-NeueMontreal font-semibold">Date of Birth</span>
               <div className="grid grid-cols-[1fr_.5fr_1fr] gap-3">
                  <input
                    type="number"
                    name="day"
                    value={dateOfBirth.day}
                    onChange={handleDateChange}
                    placeholder="Day"
                    min="1"
                    max="31"
                    className="inpuut"
                  />
                 <MonthDropdown
                  selectedMonth={dateOfBirth.month}
                  onSelect={(value) => setDateOfBirth((prev) => ({ ...prev, month: value }))}
                />
                  <input
                    type="number"
                    name="year"
                    value={dateOfBirth.year}
                    onChange={handleDateChange}
                    placeholder="Year"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="inpuut"
                  />
                </div>
              </div>
              <div className="flex gap-[8px] flex-col">
                  <span className="text-[15px] capitalize text-white font-NeueMontreal font-semibold">Bio</span>
                 <textarea name="bio" value={form.bio} onChange={handleChange} className="inpuut min-h-[300px]" id=""></textarea>
              </div>
              
              <div className="w-full pt-2 flex items-center justify-end gap-6">
                <p className='capitalize text-white/70  text-[16px] hover:text-white cursor-pointer font-NeueMontreal font-semibold'>annuler</p>
                <button className='px-7 py-[14px] hover:scale-[1.02] text-[16px] font-NeueMontreal font-semibold rounded-full bg-main text-black/90' type='submit' >Update Your Profile</button>

              </div>
          </form>

      </div>


      {/* {message && toast.success(message)} */}
    </div>
  );
}

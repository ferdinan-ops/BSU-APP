import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import { camera, cross } from '../../../public'
import { dummy, users } from '../../utils/dummy'
import { Button, Gap, Input } from '../atoms'
import IconWrapper from '../atoms/Icon'

export default function Modals({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState({});

  const ref = useRef(null);
  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  useEffect(() => {
    const selectUser = users.filter((user) => user.id === parseInt(id));
    setUser(selectUser[0]);
  }, [id]);

  useEffect(() => {
    if (user) {
      setUsername(user?.username);
      setProfilePicture(user?.profilePicture);
    }
  }, [user])

  const submitHandler = (e) => {
    e.preventDefault();
    alert("masih test");
  }

  return (
    <>
      <div className='h-[50px] border border-[#C2C9D1] rounded-lg w-full'>
        <Button onClick={() => setIsOpen(true)}>Ubah Profil</Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-[569px] transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                  <div className='flex items-center px-[15px] py-4 border-b border-auth'>
                    <IconWrapper img={cross} style="bg-[#EB5757]/30 p-2 cursor-pointer" onClick={() => setIsOpen(false)} />
                    <p className='font-semibold text-xl ml-6'>Ubah Profil</p>
                    <div className='ml-auto w-[100px] bg-primary text-font text-[15px] font-semibold h-[35px] rounded-[30px] hover:bg-[#EEAF00]'>
                      <Button onClick={submitHandler}>Simpan</Button>
                    </div>
                  </div>
                  <div className='px-[15px] pb-6 text-left'>
                    <div className='mx-auto mt-[30px] w-fit relative overflow-hidden rounded-full group cursor-pointer'>
                      <img src={profilePicture} className="w-[100px] h-[100px] object-cover" alt="" />
                      <div className='absolute w-full h-full bg-slate-800/50 transition-all flex -bottom-full group-hover:bottom-0' onClick={() => ref.current.click()}>
                        <div className='relative w-7 h-7 m-auto'>
                          <Image src={camera} alt="" layout='fill' />
                        </div>
                      </div>
                    </div>
                    <Gap style="md:h-[30px]" />
                    <Input title="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="file" hidden ref={ref} onChange={imageUploadHandler} accept="image/*" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

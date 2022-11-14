import { getProfile, setFormProfile, updateProfile } from '../../config/redux/actions/profileAction';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { camera, cross } from '../../../public';
import { Button, Gap, Input } from '../atoms';
import IconWrapper from '../atoms/Icon';
import Image from 'next/image';
import { Ring } from '@uiball/loaders';

export default function Modals() {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { profile, formProfile, isLoading } = useSelector(state => state.profileReducer);
  const { username, photo, file } = formProfile;

  useEffect(() => {
    if (profile._id === currentUser._id) {
      dispatch(setFormProfile("username", currentUser.username));
      dispatch(setFormProfile("photo", currentUser.photo));
    }
  }, [dispatch, profile, currentUser]);

  const imagePreviewHandler = (e) => {
    const fileImage = e.target.files[0];
    dispatch(setFormProfile("file", fileImage));
    dispatch(setFormProfile("photo", URL.createObjectURL(fileImage)));
  };

  const cancelHandler = () => {
    dispatch(setFormProfile("username", currentUser.username));
    dispatch(setFormProfile("photo", currentUser.photo));
    dispatch(setFormProfile("file", ""));
    setIsOpen(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(currentUser._id, username, file, photo));
  }

  return (
    <>
      <div className='h-[50px] border border-[#C2C9D1] rounded-lg w-full'>
        <Button onClick={() => setIsOpen(true)}>Ubah Profil</Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={cancelHandler}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-[569px] transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                  <div className='flex items-center px-[15px] py-4 border-b border-auth'>
                    <IconWrapper img={cross} style="bg-[#EB5757]/30 p-2 cursor-pointer" onClick={cancelHandler} />
                    <p className='font-semibold text-xl ml-6'>Ubah Profil</p>
                    <div
                      className={`ml-auto w-[100px] bg-primary text-font text-[15px] font-semibold h-[35px] rounded-[30px] hover:bg-[#EEAF00] 
                    ${isLoading && "pointer-events-none bg-opacity-40"}`}
                    >
                      <Button onClick={submitHandler}>{isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Simpan"}</Button>
                    </div>
                  </div>
                  <div className='px-[15px] pb-6 text-left'>
                    <div className='mx-auto mt-[30px] w-fit relative overflow-hidden rounded-full group cursor-pointer'>
                      {photo ?
                        <img src={photo} className="w-[100px] h-[100px] object-cover" alt="" /> :
                        <img src="/images/profile.png" className="w-[100px] h-[100px] object-cover" alt="" />
                      }
                      <div className='absolute w-full h-full bg-slate-800/50 transition-all flex -bottom-full group-hover:bottom-0' onClick={() => ref.current.click()}>
                        <div className='relative w-7 h-7 m-auto'>
                          <Image src={camera} alt="" layout='fill' />
                        </div>
                      </div>
                    </div>
                    <Gap style="md:h-[30px]" />
                    <Input title="Username" value={username} onChange={(e) => dispatch(setFormProfile("username", e.target.value))} />
                    <input type="file" hidden ref={ref} onChange={imagePreviewHandler} accept="image/*" />
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

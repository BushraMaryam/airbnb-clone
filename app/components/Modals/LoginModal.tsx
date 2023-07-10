'use client';

import React,{ useState, useCallback } from 'react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import RegisterModal from './RegisterModal';
import useRegisterModal from '@/app/hooks/useRentModal';

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState:{
        errors
    }} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            if(callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back' subtitle='Login to your account'/>
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue With Google' icon={FcGoogle} onClick={()=>{signIn('google')}} />
            <Button outline label='Continue With Github' icon={AiFillGithub} onClick={()=>signIn('github')} />
            <div className='text-neutral-500 text-center font-light mt-4'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>
                    Don&apos;nt have an account ?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 font-semibold cursor-pointer hover:underline'>
                    Create an account.
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal footer={footerContent} body={bodyContent} disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} />
  )
}

export default LoginModal
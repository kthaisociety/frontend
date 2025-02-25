"use client";
import { redirect } from 'next/navigation';

const DefaultPage = () => {
  redirect('/auth/login');
}

export default DefaultPage  
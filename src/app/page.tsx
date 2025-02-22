"use client";
import { redirect } from 'next/navigation';

const DefaultPage = () => {
  redirect('/home');
}

export default DefaultPage  
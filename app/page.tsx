import { redirect } from 'next/navigation';

// Redirect to dashboard
export default function Home() {
  redirect('/dashboard');
}

import LoginSection from '@/app/login/_components/LoginSection';

export default function Login() {
  return (
    <div className='flex flex-col items-start w-screen min-w-full h-screen shrink-0'>
      <section id='login_section'>
        <LoginSection />
      </section>
    </div>
  );
}

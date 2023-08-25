import LoginSection from "@/components/login/LoginSection";

export default function Login() {
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full'>
      <section id='login_section'>
        <LoginSection />
        {/* <Splash /> */}
      </section>
    </div>
  );
}
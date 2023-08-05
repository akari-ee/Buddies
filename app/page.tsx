import dynamic from "next/dynamic";
const Login= dynamic(() => import("../components/Login"), { ssr: false });

export default function Home() {
  return (
    <div>
      <section>
        <Login />
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/input";
import Button from "@/components/button";
import { supaBase } from "@/app/sipabase-client";

export default function LoginForm() {
  const [email, setEmail] = useState("fisowa4759@fanwn.com");
  const [password, setPassword] = useState("passWord");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supaBase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error in login: ", error);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/tasks");
  };

  return (
    <form
      onSubmit={onLogin}
      className="flex flex-col items-center gap-4 justify-between h-[250px] w-full md:w-[400px] border border-gray-200 p-4 rounded-xl shadow-md bg-gray-50"
    >
      <Input
        label="ایمیل"
        placeholder="ایمیل خود را وارد نمایید"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="رمز عبور"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" loading={loading} aria="Login to dashboard">
        ورود
      </Button>
    </form>
  );
}

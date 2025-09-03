"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { validateIranPhone } from "@/lib/validation";
import { setUser } from "@/lib/storage";
import Input from "@/components/input";
import Button from "@/components/button";

async function fetchRandomUser() {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
  if (!res.ok) throw new Error("Failed to fetch user");
  const data = await res.json();
  return data.results[0];
}

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateIranPhone(phone)) {
      setError("فرمت تلفن همراه اشتباه است.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const user = await fetchRandomUser();
      setUser(user);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 justify-between h-[200px] w-full md:w-[400px] border border-gray-200 p-4 rounded-xl shadow-md bg-gray-50"
    >
      <Input
        label="شماره همراه"
        placeholder="شماره همراه خود را وارد نمایید"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={error}
      />

      <Button type="submit" loading={loading}>
        ورود
      </Button>
    </form>
  );
}

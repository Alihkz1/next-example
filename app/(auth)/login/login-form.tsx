"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { validateIranPhone } from "@/lib/validation";
import { fetchRandomUser } from "@/lib/api";
import { setUser } from "@/lib/storage";
import Input from "@/components/input";
import Button from "@/components/button";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateIranPhone(phone)) {
      setError("Invalid Iranian phone number");
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
    <form onSubmit={handleSubmit} className="flex flex-col h-full gap-4 justify-between">
      <Input
        label="شماره همراه"
        placeholder="09xxxxxxxxx"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={error}
      />

      <Button type="submit" loading={loading} fullWidth>
        ورود
      </Button>
    </form>
  );
}

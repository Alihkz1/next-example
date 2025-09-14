"use client";
import { redirect } from "next/navigation";
import { supaBase } from "./sipabase-client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);

  const handleIsLogin = async () => {
    const { data } = await supaBase.auth.getSession();
    redirect(data.session ? "/tasks" : "/login");
  };
  useEffect(() => {
    handleIsLogin();

    const { data: authListener } = supaBase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
}

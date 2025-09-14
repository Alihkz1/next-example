import { createClient } from "@supabase/supabase-js";

export const supaBase = createClient(
  "https://ucgiikuitvunihotjyqp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZ2lpa3VpdHZ1bmlob3RqeXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NDUzNDUsImV4cCI6MjA3MzQyMTM0NX0.s7rJNitsvCNKJ1evmLx3Gaapj7tbfEr4kZv0lSEfhAs"
);

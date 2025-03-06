import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hopovzuqklnuzrwdkrlx.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcG92enVxa2xudXpyd2Rrcmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzIzNzUsImV4cCI6MjA1NjY0ODM3NX0._c2wT_qv0SNX60jRLFM9hhCWa4zs8AXKKIktJ3C1X9A"; // Replace with your Supabase API Key

export const supabase = createClient(supabaseUrl, supabaseKey);
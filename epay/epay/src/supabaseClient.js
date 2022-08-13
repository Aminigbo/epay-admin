import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://jdptlyjoqfaypjklxsgv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcHRseWpvcWZheXBqa2x4c2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk5OTc5NzMsImV4cCI6MTk3NTU3Mzk3M30.-DforKUKqaYALLO2l2EC6cqpjjhqOwEtJcbWNAYeDu8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

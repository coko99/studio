import { createClient } from "@supabase/supabase-js";

function loadEnvFile(fileName: string) {
  try {
    const fs = require("node:fs") as typeof import("node:fs");
    const path = require("node:path") as typeof import("node:path");
    const envPath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(envPath)) return false;
    const text = fs.readFileSync(envPath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
    return true;
  } catch {
    return false;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env.local.example");

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  "";
const email =
  process.env.ADMIN_EMAIL || "admin@studio-caffe-bar.rs";
const password = process.env.ADMIN_PASSWORD || "";

if (!url || !serviceKey || url.includes("YOUR_PROJECT")) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

if (!password || password === "CHANGE_ME") {
  console.error(
    "Set ADMIN_PASSWORD in .env.local to the password you want for the admin account."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  if (listError) throw listError;

  const existing = listed.users.find(
    (user) => user.email?.toLowerCase() === email.toLowerCase()
  );

  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });
    if (error) throw error;
    console.log(`Updated password for ${email}`);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) throw error;
  console.log(`Created admin user ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

# Admin panel (Supabase)

## 1. Napravi Supabase projekat
1. Idi na https://supabase.com i kreiraj projekat
2. SQL Editor → nalepi sadržaj iz `supabase/migrations/001_admin_menu.sql` → Run  
   (ako si već pokrenuo staru verziju, pokreni i `002_lock_admin_write.sql`)
3. Authentication → Providers → Email → **isključi Sign ups / Allow new users**
4. Authentication → Users: ostavi samo `admin@studio-caffe-bar.rs`

## 2. Env
U `.env.local` stavi:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=tvoja_jaka_lozinka
```

Fiksni admin email: `admin@studio-caffe-bar.rs`  
Lozinku postavljaš samo u `ADMIN_PASSWORD`.

Iste vrednosti dodaj i u Vercel → Environment Variables.

## 3. Seed + admin nalog
```bash
npm run seed:menu
npm run create:admin
```

`create:admin` kreira (ili ažurira lozinku za) `admin@studio-caffe-bar.rs`.

## 4. Admin
- Login: `/admin/login` (email je fiksiran, unosiš samo lozinku)
- Cene: `/admin/cene`
- Istaknuti: `/admin/istaknuti`
- Raspored: `/admin/raspored`

## Bezbednost
- Middleware pušta u `/admin` samo `admin@studio-caffe-bar.rs`
- Server actions odbijaju sve ostale usere
- RLS write policy radi samo za taj email
- Ostali authenticated nalozi ne mogu da menjaju podatke

Bez env-a sajt i dalje radi sa lokalnim fallback podacima iz `src/lib/menus`.

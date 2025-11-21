# Sitenizi Yayına Alma Rehberi (Adım Adım)

Sitenizi yayına almak için modern ve ücretsiz (başlangıç seviyesi için) servisleri kullanacağız.

**Kullanacağımız Servisler:**
1.  **GitHub:** Kodlarınızı saklamak için.
2.  **Neon.tech:** Veritabanı için (Ücretsiz PostgreSQL).
3.  **Render.com:** Backend (Sunucu) için.
4.  **Vercel.com:** Frontend (Site arayüzü) için.

---

## 1. GitHub'a Yükleme
1.  [GitHub.com](https://github.com)'da bir hesap açın.
2.  Yeni bir **Repository** (Depo) oluşturun (örneğin: `avukat-sitesi`).
3.  Bilgisayarınızdaki proje klasöründe terminali açın ve şu komutları sırasıyla yazın:
    ```bash
    git init
    git add .
    git commit -m "İlk yükleme"
    git branch -M main
    git remote add origin https://github.com/KULLANICI_ADINIZ/avukat-sitesi.git
    git push -u origin main
    ```

---

## 2. Veritabanı Kurulumu (Neon.tech)
1.  [Neon.tech](https://neon.tech) adresine gidin ve üye olun.
2.  Yeni bir proje oluşturun.
3.  Size verilen **Connection String**'i (Bağlantı adresi) kopyalayın. Şuna benzer: `postgres://kullanici:sifre@ep-xyz.us-east-2.aws.neon.tech/neondb...`
4.  Projenizdeki `server/prisma/schema.prisma` dosyasını açın ve şu değişikliği yapın:
    ```prisma
    datasource db {
      provider = "postgresql" // sqlite yerine postgresql yazın
      url      = env("DATABASE_URL")
    }
    ```

---

## 3. Backend Kurulumu (Render.com)
1.  [Render.com](https://render.com) adresine üye olun.
2.  "New +" butonuna basıp **Web Service** seçin.
3.  GitHub hesabınızı bağlayın ve `avukat-sitesi` deponuzu seçin.
4.  Ayarları şöyle yapın:
    *   **Name:** `avukat-backend` (veya istediğiniz bir isim)
    *   **Root Directory:** `server`
    *   **Environment:** `Node`
    *   **Build Command:** `npm install && npx prisma generate`
    *   **Start Command:** `npm start` (veya `npx ts-node index.ts`)
5.  **Environment Variables** kısmına gelin ve şunları ekleyin:
    *   `DATABASE_URL`: (Neon'dan aldığınız bağlantı adresi)
    *   `JWT_SECRET`: (Rastgele uzun bir şifre belirleyin)
    *   `PORT`: `3001`
6.  **Create Web Service** butonuna basın.
7.  İşlem bitince size `https://avukat-backend.onrender.com` gibi bir adres verecek. Bu adresi kopyalayın.

---

## 4. Frontend Kurulumu (Vercel.com)
1.  [Vercel.com](https://vercel.com) adresine üye olun.
2.  "Add New..." -> **Project** seçin.
3.  GitHub deponuzu (`avukat-sitesi`) seçin ve **Import** deyin.
4.  **Environment Variables** kısmını açın ve şunu ekleyin:
    *   `VITE_API_URL`: (Render'dan aldığınız adres, sonuna `/api` eklemeyi unutmayın. Örn: `https://avukat-backend.onrender.com/api`)
5.  **Deploy** butonuna basın.

---

## Tebrikler! 🎉
Siteniz artık yayında. Vercel'in size verdiği domain (örn: `avukat-sitesi.vercel.app`) üzerinden sitenize ulaşabilirsiniz.

**Önemli Not:** Veritabanı türünü değiştirdiğimiz için (SQLite -> PostgreSQL), yayına aldıktan sonra admin kullanıcısı oluşturmanız gerekebilir veya veritabanını sıfırlamanız gerekebilir.

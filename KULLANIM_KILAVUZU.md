# Bungalov Kiralama Sistemi - Kullanım Kılavuzu

## 🎯 Hızlı Başlangıç

### 1. Projeyi Başlatma

```bash
# Projeyi aç
cd /Users/furkanhazar/Desktop/veritabani_odev/bungalov

# Bağımlılıkları yükle (ilk kurulumda)
npm install

# Dev server'ı başlat
npm run dev
```

Proje `http://localhost:3000` adresinde açılacaktır.

### 2. Veritabanını Başlatma

İlk kurulumda migrations otomatik olarak uygulanır. Eğer manuel olarak uygulamak gerekirse:

```bash
# Migrations'ı uygula
npx prisma migrate dev

# Örnek veri yükle (seed)
npm run seed
```

### 3. API Testi

```bash
# Tüm müşterileri getir
curl http://localhost:3000/api/customers

# Spesifik müşteri getir
curl http://localhost:3000/api/customers/1

# Tüm sahipleri getir
curl http://localhost:3000/api/owners

# Tüm bungalowları getir
curl http://localhost:3000/api/bungalows

# Tüm kiralama işlemlerini getir
curl http://localhost:3000/api/rentals
```

## 📋 API Endpoints Detaylı

### Müşteri Endpoints (`/api/customers`)

#### List (Listeleme)
```bash
GET /api/customers
```

Response örneği:
```json
[
  {
    "customerId": 1,
    "firstName": "Ahmet",
    "lastName": "Yılmaz",
    "nationalId": "12345678901",
    "email": "ahmet@example.com",
    "createdAt": "2025-12-19T10:06:16.041Z",
    "updatedAt": "2025-12-19T10:06:16.041Z"
  }
]
```

#### Get (Detay)
```bash
GET /api/customers/1
```

Response örneği:
```json
{
  "customerId": 1,
  "firstName": "Ahmet",
  "lastName": "Yılmaz",
  "nationalId": "12345678901",
  "email": "ahmet@example.com",
  "password": "sifre123",
  "createdAt": "2025-12-19T10:06:16.041Z",
  "updatedAt": "2025-12-19T10:06:16.041Z",
  "rentals": []
}
```

#### Create (Oluşturma)
```bash
POST /api/customers
Content-Type: application/json

{
  "firstName": "Ahmet",
  "lastName": "Yılmaz",
  "nationalId": "12345678901",
  "email": "ahmet@example.com",
  "password": "sifre123"
}
```

#### Update (Güncelleme)
```bash
PUT /api/customers/1
Content-Type: application/json

{
  "firstName": "AhmetYeni",
  "email": "ahmet.yeni@example.com"
}
```

#### Delete (Silme)
```bash
DELETE /api/customers/1
```

Response:
```json
{
  "message": "Customer deleted successfully"
}
```

### Bungalow Sahibi Endpoints (`/api/owners`)

Aynı CRUD işlemleri `/api/owners` endpoint'inde mevcuttur.

**Oluşturma örneği:**
```bash
POST /api/owners
Content-Type: application/json

{
  "firstName": "Mehmet",
  "lastName": "Kaya",
  "nationalId": "98765432109",
  "email": "mehmet@owner.com",
  "password": "ownerpass123"
}
```

### Bungalow Endpoints (`/api/bungalows`)

#### Oluşturma
```bash
POST /api/bungalows
Content-Type: application/json

{
  "ownerId": 1,
  "dailyPrice": 150.00,
  "hasPool": true,
  "poolSize": 50,
  "roomCount": 3,
  "hasInternet": true,
  "masterBedroomCount": 1,
  "bedCount": 4,
  "bathroomCount": 2,
  "latitude": 36.8969,
  "longitude": 30.7133
}
```

#### Listeleme
```bash
GET /api/bungalows
```

Response örneği:
```json
[
  {
    "bungalowId": 1,
    "ownerId": 1,
    "dailyPrice": "150",
    "hasPool": true,
    "poolSize": 50,
    "roomCount": 3,
    "hasInternet": true,
    "masterBedroomCount": 1,
    "bedCount": 4,
    "bathroomCount": 2,
    "latitude": 36.8969,
    "longitude": 30.7133,
    "createdAt": "2025-12-19T10:06:16.048Z",
    "updatedAt": "2025-12-19T10:06:16.048Z",
    "owner": {
      "firstName": "Mehmet",
      "lastName": "Öz",
      "email": "mehmet@owner.com"
    },
    "rentals": []
  }
]
```

### Kiralama Endpoints (`/api/rentals`)

#### Oluşturma
```bash
POST /api/rentals
Content-Type: application/json

{
  "bungalowId": 1,
  "customerId": 1,
  "startDate": "2025-12-20T00:00:00Z",
  "endDate": "2025-12-25T00:00:00Z"
}
```

#### Listeleme
```bash
GET /api/rentals
```

Response örneği:
```json
[
  {
    "rentalId": 1,
    "bungalowId": 1,
    "customerId": 1,
    "startDate": "2025-12-20T00:00:00.000Z",
    "endDate": "2025-12-25T00:00:00.000Z",
    "createdAt": "2025-12-19T10:06:16.052Z",
    "updatedAt": "2025-12-19T10:06:16.052Z",
    "bungalow": {
      "bungalowId": 1,
      "dailyPrice": "150",
      "roomCount": 3,
      "bedCount": 4,
      "owner": {
        "firstName": "Mehmet",
        "lastName": "Öz"
      }
    },
    "customer": {
      "customerId": 1,
      "firstName": "Ahmet",
      "lastName": "Yılmaz",
      "email": "ahmet@example.com"
    }
  }
]
```

## 🛠 Yararlı Komutlar

### Prisma Studio (GUI Veritabanı Yönetimi)
```bash
npx prisma studio
```
`http://localhost:5555` adresinde Prisma Studio açılır.

### Build ve Production
```bash
# Production build oluştur
npm run build

# Production server'ı başlat
npm start
```

### Lint
```bash
npm run lint
```

## 📁 Dosya Yapısı

```
src/
├── app/
│   ├── api/
│   │   ├── customers/         # Müşteri API
│   │   ├── owners/            # Sahip API
│   │   ├── bungalows/         # Bungalow API
│   │   └── rentals/           # Kiralama API
│   └── layout.tsx             # Global layout
└── lib/
    └── prisma.ts              # Prisma client

prisma/
├── schema.prisma              # Veri modelleri
├── seed.ts                    # Seed script
└── migrations/                # Migration dosyaları
```

## 🔧 Ortam Değişkenleri

`.env.local` dosyasında aşağıdaki değişkenler tanımlanmıştır:

```env
DATABASE_URL=postgresql://postgres:2344@localhost:5432/bungalov?schema=public
```

**Not:** Kendi PostgreSQL şifrenizi bu dosyada ayarlayın.

## ⚠️ Dikkat Edilecek Noktalar

1. **Email Benzersizliği**: Her müşteri ve sahip için email benzersiz olmalıdır.
2. **Tarih Formatı**: Tarihler ISO 8601 formatında gönderilmelidir (YYYY-MM-DDTHH:MM:SSZ).
3. **Decimal Fiyatlar**: Günlük fiyat virgüllü sayı olmalıdır (150.00).
4. **Zorunlu Alanlar**: İlişkili veri silerken cascade delete yapılmaktadır.

## 🐛 Hata Ayıklama

### Veritabanı Bağlantısı Başarısız
```bash
# .env.local'de DATABASE_URL doğru mu kontrol edin
# PostgreSQL'in çalışıp çalışmadığını kontrol edin
psql -U postgres -h localhost -d bungalov
```

### Migrations Problemi
```bash
# Migrations'ı reset et (tüm veri silinir!)
npx prisma migrate reset

# Yeni migration oluştur
npx prisma migrate dev --name init
```

### Prisma Client Sorunu
```bash
# Prisma client'ı yeniden generate et
npx prisma generate
```

## 📚 Kaynaklar

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Prisma Dokümantasyonu](https://www.prisma.io/docs)
- [PostgreSQL Dokümantasyonu](https://www.postgresql.org/docs)

## ✅ Test Edilmiş Özellikler

- ✅ Tüm CRUD işlemleri
- ✅ İlişkisel veriler (owner, customer, bungalow, rental)
- ✅ Error handling
- ✅ JSON responses
- ✅ Cascading deletes
- ✅ Timestamps

---

**Proje Tamamlanma Tarihi**: 19 Aralık 2025

Sorun yaşanırsa lütfen:
1. `.env.local` dosyasını kontrol edin
2. PostgreSQL bağlantısını doğrulayın
3. Migrations'ı çalıştırın
4. npm install ile bağımlılıkları yükleyin


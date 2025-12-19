# Bungalov Kiralama Sistemi - Form Sayfaları

## ✨ Ekleme Sayfaları

Sistem tüm ekleme işlemleri için ayrı, modern formlu sayfalar sunuyor.

### 📄 Müşteri Ekleme

**URL:** `/customers/add`

- ✅ Tam ad, soyadı, kimlik numarası, email, şifre
- ✅ Validasyon kontrolleri, hata mesajları
- ✅ Otomatik yönlendirme

### 👤 Sahip Ekleme

**URL:** `/owners/add`

- ✅ Tam ad, soyadı, kimlik numarası, email, şifre
- ✅ Yeşil renkli tasarım
- ✅ Validasyon kontrolleri

### 🏠 Bungalow Ekleme

**URL:** `/bungalows/add`

- ✅ Sahip dropdown, fiyat, oda/yatak/banyo sayısı
- ✅ Havuz checkbox'ı
- ✅ Dinamik sahip yükleme

### 📋 Kiralama Ekleme

**URL:** `/rentals/add`

- ✅ Müşteri & bungalow dropdown
- ✅ Tarih seçimi
- ✅ Otomatik fiyat hesaplama

---

## � Güncelleme Sayfaları

Sistem tüm kaynaklar için ayrı düzenleme sayfaları sunuyor.

### ✏️ Müşteri Güncelleme

**URL:** `/customers/{id}/edit`

- ✅ Mevcut bilgileri yükle
- ✅ Ad, soyad, kimlik numarası, email güncelle
- ✅ Validasyon kontrolleri
- ✅ Başarı durumunda otomatik yönlendirme

### ✏️ Sahip Güncelleme

**URL:** `/owners/{id}/edit`

- ✅ Mevcut bilgileri yükle
- ✅ Ad, soyad, kimlik numarası, email güncelle
- ✅ Yeşil renkli tasarım
- ✅ Validasyon kontrolleri

### ✏️ Bungalow Güncelleme

**URL:** `/bungalows/{id}/edit`

- ✅ Mevcut bilgileri yükle
- ✅ Sahip, fiyat, oda/yatak/banyo sayısı güncelle
- ✅ Havuz durumunu değiştir
- ✅ Dinamik sahip dropdown

### ✏️ Kiralama Güncelleme

**URL:** `/rentals/{id}/edit`

- ✅ Mevcut bilgileri yükle
- ✅ Müşteri, bungalow, tarihler güncelle
- ✅ Otomatik fiyat yeniden hesaplama
- ✅ Dinamik dropdown'lar

---

## 🔄 Sayfa Akışı

```
Anasayfa (/)
├── Müşteriler (/customers)
│   ├── + Yeni Müşteri (/customers/add)
│   └── 📝 Düzenle (/customers/{id}/edit)
│
├── Sahibler (/owners)
│   ├── + Yeni Sahip (/owners/add)
│   └── 📝 Düzenle (/owners/{id}/edit)
│
├── Bungalowlar (/bungalows)
│   ├── + Yeni Bungalow (/bungalows/add)
│   └── 📝 Düzenle (/bungalows/{id}/edit)
│
└── Kiralamalar (/rentals)
    ├── + Yeni Kiralama (/rentals/add)
    └── 📝 Düzenle (/rentals/{id}/edit)
```

---

**URL:** `/bungalows/add`

**Özellikler:**

- Sahip seçme (dropdown - sahibler dinamik yüklenir)
- Günlük fiyat, oda/yatak/banyo sayısı
- Havuz checkbox'ı
- Sarı renkli tasarım
- Sahip yoksa yeni sahip ekleme linki

**Form Alanları:**

- ✅ Sahip Seç (Dropdown - ID ve ad soyadı gösterir)
- ✅ Günlük Fiyat (Decimal)
- ✅ Oda Sayısı (Number)
- ✅ Yatak Sayısı (Number)
- ✅ Banyo Sayısı (Number)
- ✅ Havuz Var mı? (Checkbox)

**Varsayılan Değerler:**

- hasInternet: true
- masterBedroomCount: 1
- latitude: 36.8969 (Dalyan, Muğla)
- longitude: 30.7133

---

### 📋 Kiralama Ekleme Sayfası

**URL:** `/rentals/add`

**Özellikler:**

- Müşteri seçme (dropdown)
- Bungalow seçme (dropdown - sahip ve günlük fiyat gösterir)
- Başlangıç ve bitiş tarihi
- **Otomatik fiyat hesaplama** ✨
- Mor renkli tasarım
- Müşteri/bungalow yoksa ekleme linkləri

**Form Alanları:**

- ✅ Müşteri Seç (Dropdown - ID ve ad soyadı gösterir)
- ✅ Bungalow Seç (Dropdown - ID, sahip ve günlük fiyat gösterir)
- ✅ Başlangıç Tarihi (Date)
- ✅ Bitiş Tarihi (Date)

**Otomatik Özellikler:**

- 📊 Seçilen bungalow'un günlük fiyatı gösterilir
- 🧮 Tarih aralığına göre toplam fiyat otomatik hesaplanır
- 📍 Fiyat tahmini form altında gösterilir

---

## 🔄 Sayfa Akışı

```
Anasayfa (/)
├── Müşteriler (/customers)
│   └── + Yeni Müşteri (/customers/add)
├── Sahibler (/owners)
│   └── + Yeni Sahip (/owners/add)
├── Bungalowlar (/bungalows)
│   └── + Yeni Bungalow (/bungalows/add)
│       └── Sahip seçme → Yoksa /owners/add'ye yönlendir
└── Kiralamalar (/rentals)
    └── + Yeni Kiralama (/rentals/add)
        ├── Müşteri seçme → Yoksa /customers/add'ye yönlendir
        └── Bungalow seçme → Yoksa /bungalows/add'ye yönlendir
```

---

## 🎨 Tasarım Özellikleri

| İşlem                    | Renk          | Emoji |
| ------------------------ | ------------- | ----- |
| Müşteri (Ekle/Güncelle)  | Mavi (Blue)   | 👤    |
| Sahip (Ekle/Güncelle)    | Yeşil (Green) | 🔑    |
| Bungalow (Ekle/Güncelle) | Sarı (Yellow) | 🏠    |
| Kiralama (Ekle/Güncelle) | Mor (Purple)  | 📋    |

### Form Özellikleri

- ✅ Responsive design (mobile-friendly)
- ✅ Focus ring efektleri
- ✅ Validasyon hata mesajları
- ✅ Loading state gösterimi
- ✅ Otomatik yönlendirme (redirect)
- ✅ İptal butonu her formda
- ✅ Mevcut veri yükleme (edit sayfalarında)

---

## 🚀 Kullanım

### Müşteri Yönetimi

**Ekleme:**

1. Müşteriler → **+ Yeni Müşteri** tıkla
2. Bilgileri doldur
3. **Müşteri Ekle** tıkla

**Güncelleme:**

1. Müşteriler → Listeden **Düzenle** tıkla
2. Bilgileri güncelleştir
3. **Müşteri Güncelle** tıkla

### Sahip Yönetimi

**Ekleme:**

1. Sahibler → **+ Yeni Sahip** tıkla
2. Bilgileri doldur
3. **Sahip Ekle** tıkla

**Güncelleme:**

1. Sahibler → Listeden **Düzenle** tıkla
2. Bilgileri güncelleştir
3. **Sahip Güncelle** tıkla

### Bungalow Yönetimi

**Ekleme:**

1. Bungalowlar → **+ Yeni Bungalow** tıkla
2. Sahip seç (dropdown)
3. Diğer alanları doldur
4. **Bungalow Ekle** tıkla

**Güncelleme:**

1. Bungalowlar → Karttan **Düzenle** tıkla
2. Bilgileri güncelleştir
3. **Bungalow Güncelle** tıkla

### Kiralama Yönetimi

**Ekleme:**

1. Kiralamalar → **+ Yeni Kiralama** tıkla
2. Müşteri seç
3. Bungalow seç (fiyat otomatik gösterilir)
4. Tarihler seç (toplam fiyat otomatik hesaplanır)
5. **Kiralama Oluştur** tıkla

**Güncelleme:**

1. Kiralamalar → Karttan **Düzenle** tıkla
2. Bilgileri güncelleştir (fiyat otomatik recalculate)
3. **Kiralama Güncelle** tıkla

---

## ✅ Form Alanları

### Müşteri & Sahip Formları

- ✅ İlk Ad (Text)
- ✅ Soyadı (Text)
- ✅ Kimlik Numarası (Text)
- ✅ Email (Email)
- ✅ Şifre (Edit'te opsiyonel)

### Bungalow Formu

- ✅ Sahip (Dropdown - dinamik)
- ✅ Günlük Fiyat (Decimal)
- ✅ Oda Sayısı (Number)
- ✅ Yatak Sayısı (Number)
- ✅ Banyo Sayısı (Number)
- ✅ Havuz (Checkbox)

### Kiralama Formu

- ✅ Müşteri (Dropdown - ID + ad)
- ✅ Bungalow (Dropdown - ID + sahip + fiyat)
- ✅ Başlangıç Tarihi (Date)
- ✅ Bitiş Tarihi (Date)
- 📊 Toplam Fiyat (Otomatik hesaplama)

---

## 🔧 Teknik Detaylar

### Form Teknolojisi

- React `useState` ile state yönetimi
- `useRouter` ile programatik yönlendirme
- `useParams` ile dynamic route parametreleri
- Fetch API ile POST/PUT istekleri
- Real-time validasyon ve hata yönetimi

### Edit Sayfaları Özellikleri

- ✅ Sayfa yüklemede mevcut verileri fetch eder
- ✅ Formları mevcut değerlerle doldurur
- ✅ Loading state gösterir
- ✅ PUT request ile veri günceller
- ✅ Başarı durumunda listeye geri yönlendir

### Veri Akışı

**Ekleme:**

```
Form Input → State → Submit → API POST → Redirect to List
```

**Güncelleme:**

```
Load Data → Fill Form → Edit → Submit → API PUT → Redirect to List
```

### Dropdown'lar

- Dinamik olarak API'dan veri çekilir
- Loading state gösterilir
- Veri yoksa yeni veri ekleme linki sunulur
- Seçili değer dropdown'da gösterilir

---

## 📊 Fiyat Hesaplama (Kiralama)

```typescript
const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
const totalPrice = bungalow.dailyPrice * days;
```

**Örnek:**

- Günlük fiyat: ₺150
- Başlangıç: 2025-12-19
- Bitiş: 2025-12-22
- Gün sayısı: 3
- **Toplam: ₺450**

---

## ✨ Tüm İşlemler

| İşlem    | Ekleme URL       | Güncelleme URL         | Status |
| -------- | ---------------- | ---------------------- | ------ |
| Müşteri  | `/customers/add` | `/customers/{id}/edit` | ✅     |
| Sahip    | `/owners/add`    | `/owners/{id}/edit`    | ✅     |
| Bungalow | `/bungalows/add` | `/bungalows/{id}/edit` | ✅     |
| Kiralama | `/rentals/add`   | `/rentals/{id}/edit`   | ✅     |

---

## 🎯 Sonraki Geliştirmeler (Opsiyonel)

- [ ] Edit (güncelleme) sayfaları
- [ ] Batch import (CSV'den toplu ekleme)
- [ ] Form otomatik doldurma (autofill)
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Ön izleme (preview) modu

---

**Güncelleme Tarihi:** 19 Aralık 2025
**Tüm sayfalar test edildi ve çalışıyor** ✅

# Bungalov Kiralama Sistemi - Form Sayfaları

## ✨ Yeni Ekleme Sayfaları

Sistem artık tüm ekleme işlemleri için ayrı, modern formlu sayfalar sunuyor.

### 📄 Müşteri Ekleme Sayfası

**URL:** `/customers/add`

**Özellikler:**

- Tam adı, soyadı, kimlik numarası, email ve şifre alanları
- Validasyon kontrolleri
- Hata mesajları
- Başarılı işlemden sonra müşteriler sayfasına yönlendirme

**Form Alanları:**

- ✅ İlk Ad (Text)
- ✅ Soyadı (Text)
- ✅ Kimlik Numarası (Text)
- ✅ Email (Email)
- ✅ Şifre (Password)

---

### 👤 Sahip Ekleme Sayfası

**URL:** `/owners/add`

**Özellikler:**

- Tam adı, soyadı, kimlik numarası, email ve şifre alanları
- Validasyon kontrolleri
- Hata mesajları
- Yeşil renkli tasarım
- Başarılı işlemden sonra sahibler sayfasına yönlendirme

**Form Alanları:**

- ✅ İlk Ad (Text)
- ✅ Soyadı (Text)
- ✅ Kimlik Numarası (Text)
- ✅ Email (Email)
- ✅ Şifre (Password)

---

### 🏠 Bungalow Ekleme Sayfası

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

| Sayfa         | Renk Şeması   | Emoji |
| ------------- | ------------- | ----- |
| Müşteri Ekle  | Mavi (Blue)   | 👤    |
| Sahip Ekle    | Yeşil (Green) | 🔑    |
| Bungalow Ekle | Sarı (Yellow) | 🏠    |
| Kiralama Ekle | Mor (Purple)  | 📋    |

### Form Özellikleri

- ✅ Responsive design (mobile-friendly)
- ✅ Focus ring efektleri
- ✅ Validasyon hata mesajları
- ✅ Loading state gösterimi
- ✅ Form başarılı submission'da redirect
- ✅ İptal butonu her formda mevcut

---

## 🚀 Kullanım

### Müşteri Ekleme

1. **Müşteriler** sayfasına git
2. **+ Yeni Müşteri** butonuna tıkla
3. Form alanlarını doldur
4. **Müşteri Ekle** butonuna tıkla
5. Otomatik olarak müşteriler sayfasına yönlendir

### Sahip Ekleme

1. **Sahibler** sayfasına git
2. **+ Yeni Sahip** butonuna tıkla
3. Form alanlarını doldur
4. **Sahip Ekle** butonuna tıkla
5. Otomatik olarak sahibler sayfasına yönlendir

### Bungalow Ekleme

1. **Bungalowlar** sayfasına git
2. **+ Yeni Bungalow** butonuna tıkla
3. Önce bir sahip seç (dropdown)
4. Diğer alanları doldur
5. **Bungalow Ekle** butonuna tıkla
6. Otomatik olarak bungalowlar sayfasına yönlendir

### Kiralama Ekleme

1. **Kiralamalar** sayfasına git
2. **+ Yeni Kiralama** butonuna tıkla
3. Müşteri ve bungalow seç (dropdown)
4. Tarihleri seç (otomatik fiyat hesaplanır)
5. **Kiralama Oluştur** butonuna tıkla
6. Otomatik olarak kiralamalar sayfasına yönlendir

---

## ✅ Validasyon

Tüm formlarda aşağıdaki doğrulamalar yapılır:

- ✅ Tüm zorunlu alanlar dolu mu?
- ✅ API yanıtı başarılı mı?
- ✅ Hata varsa mesaj göster
- ✅ Başarı durumunda redirect

---

## 🔧 Teknik Detaylar

### Form Teknolojisi

- React `useState` ile state yönetimi
- `useRouter` ile programatik yönlendirme
- Fetch API ile POST istekleri
- Real-time validasyon

### Veri Akışı

```
Form Input → State Update → Submit → API POST →
Server Validation → Response → Redirect/Error Message
```

### Dropdown'lar

- Dinamik olarak API'dan veri çekilir
- Loading state gösterilir
- Veri yoksa kullanıcı yeni veri ekleme sayfasına yönlendirilir
- Seçili değer dropdown'da gösterilir

---

## 📊 Fiyat Hesaplama (Kiralama)

```typescript
const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
const totalPrice = bungalow.dailyPrice * days;
```

Örnek:

- Bungalow günlük fiyatı: ₺150
- Başlangıç: 2025-12-19
- Bitiş: 2025-12-22
- Gün: 3
- **Toplam: ₺450**

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

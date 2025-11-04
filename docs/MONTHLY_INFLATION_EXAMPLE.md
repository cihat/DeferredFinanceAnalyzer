# Aylık Enflasyon Oranı Hesaplama

## Temel Kavram

Aylık enflasyon oranı, bir fiyat endeksinin (örn. TÜFE) bir aydan diğerine olan yüzdelik değişimini ölçer.

## Formül

```
Aylık Enflasyon Oranı (%) = ((TÜFE_bu_ay / TÜFE_geçen_ay) - 1) × 100
```

**Değişkenler:**
- `TÜFE_bu_ay`: Bu ayın Tüketici Fiyat Endeksi
- `TÜFE_geçen_ay`: Geçen ayın Tüketici Fiyat Endeksi

## Örnek Hesaplama

### Örnek 1: Basit Hesaplama

**Veriler:**
- Geçen ay TÜFE: 120
- Bu ay TÜFE: 123

**Hesaplama:**
```
Aylık Enflasyon = ((123 / 120) - 1) × 100
                = (1.025 - 1) × 100
                = 0.025 × 100
                = 2.5%
```

**Sonuç:** Fiyatlar bir önceki aya göre %2.5 artmış.

### Örnek 2: Yüksek Enflasyon

**Veriler:**
- Geçen ay TÜFE: 500
- Bu ay TÜFE: 525

**Hesaplama:**
```
Aylık Enflasyon = ((525 / 500) - 1) × 100
                = (1.05 - 1) × 100
                = 5.0%
```

### Örnek 3: Düşük Enflasyon

**Veriler:**
- Geçen ay TÜFE: 1000
- Bu ay TÜFE: 1010

**Hesaplama:**
```
Aylık Enflasyon = ((1010 / 1000) - 1) × 100
                = (1.01 - 1) × 100
                = 1.0%
```

## Türkiye Uygulaması (TÜİK)

### TÜİK Verileri

Türkiye İstatistik Kurumu (TÜİK) her ay başında **aylık enflasyon oranını** açıklar:

**Örnek Açıklama (Ekim 2024):**
```
"Ekim ayında aylık enflasyon %2.88 oldu"
```

### Yıllık vs Aylık Enflasyon

TÜİK iki farklı oran açıklar:

1. **Aylık Enflasyon** (Aylık TÜFE Değişimi)
   - Bir ay öncesine göre değişim
   - Örnek: "%2.88 aylık"

2. **Yıllık Enflasyon** (Yıllık TÜFE Değişimi)
   - 12 ay öncesine göre değişim
   - Örnek: "%61.36 yıllık"

**Önemli:** Uygulamamız **aylık enflasyon** kullanır!

### Dönüşüm

Aylık enflasyondan yıllık enflasyona:

```
Yıllık Enflasyon ≈ (1 + aylık)^12 - 1

Örnek: Aylık %2.5
→ Yıllık = (1.025)^12 - 1 = 0.3449 = %34.49
```

**Not:** Bu bileşik enflasyondur, basit çarpımdan (2.5 × 12 = 30%) farklıdır.

## Satın Alma Gücü Kaybı

### Bugünkü Değer Hesaplama

Gelecekteki bir tutarın bugünkü değeri:

```
Bugünkü Değer = Gelecek Değer / (1 + aylık_enflasyon)^ay_sayısı
```

### Örnek 1: 12 Ay Sonra

**Parametreler:**
- Gelecek değer: 100,000 TRY
- Aylık enflasyon: %2.5
- Süre: 12 ay

**Hesaplama:**
```
Bugünkü Değer = 100,000 / (1.025)^12
              = 100,000 / 1.3449
              = 74,356 TRY

Değer Kaybı = 100,000 - 74,356 = 25,644 TRY (%25.6)
```

### Örnek 2: 30 Ay Sonra

**Parametreler:**
- Gelecek değer: 500,000 TRY
- Aylık enflasyon: %2.5
- Süre: 30 ay

**Hesaplama:**
```
Bugünkü Değer = 500,000 / (1.025)^30
              = 500,000 / 2.0976
              = 238,341 TRY

Değer Kaybı = 500,000 - 238,341 = 261,659 TRY (%52.3)
```

**Sonuç:** 30 ay sonra alacağınız 500,000 TRY'nin bugünkü değeri sadece 238,341 TRY!

### Örnek 3: 60 Ay Sonra

**Parametreler:**
- Gelecek değer: 500,000 TRY
- Aylık enflasyon: %2.5
- Süre: 60 ay

**Hesaplama:**
```
Bugünkü Değer = 500,000 / (1.025)^60
              = 500,000 / 4.3998
              = 113,645 TRY

Değer Kaybı = 500,000 - 113,645 = 386,355 TRY (%77.3)
```

## Gerçek TÜİK Verileri (2023-2024)

### Son 12 Ayın Aylık Enflasyonu (Örnek)

| Ay | Aylık TÜFE (%) |
|----|----------------|
| Kasım 2023 | 3.28 |
| Aralık 2023 | 2.93 |
| Ocak 2024 | 6.70 |
| Şubat 2024 | 4.53 |
| Mart 2024 | 3.16 |
| Nisan 2024 | 3.18 |
| Mayıs 2024 | 3.37 |
| Haziran 2024 | 1.64 |
| Temmuz 2024 | 3.23 |
| Ağustos 2024 | 2.47 |
| Eylül 2024 | 2.97 |
| Ekim 2024 | 2.88 |

**Ortalama:** ~3.36% aylık

## Uygulama Kullanımı

### Senaryo 1: Mevcut Enflasyon

```
Parametre: TÜİK'in son açıkladığı aylık enflasyon
Girdi: 2.5
Anlamı: Her ay fiyatlar %2.5 artıyor varsayımı
```

### Senaryo 2: Muhafazakar Tahmin

```
Parametre: Düşük enflasyon beklentisi
Girdi: 1.5
Anlamı: Enflasyonun düşeceği senaryosu
```

### Senaryo 3: Kötümser Tahmin

```
Parametre: Yüksek enflasyon beklentisi
Girdi: 4.0
Anlamı: Enflasyonun artacağı senaryosu
```

## Teslimat Ayının Önemi

### Erken Teslimat (10. Ay)

```
Aylık enflasyon: %2.5
500,000 TRY'nin bugünkü değeri: ~488,800 TRY
Değer kaybı: ~11,200 TRY (%2.2)
```

**Yorum:** Düşük değer kaybı, erken teslimat avantajlı

### Orta Teslimat (30. Ay)

```
Aylık enflasyon: %2.5
500,000 TRY'nin bugünkü değeri: ~238,300 TRY
Değer kaybı: ~261,700 TRY (%52.3)
```

**Yorum:** Önemli değer kaybı

### Geç Teslimat (48. Ay)

```
Aylık enflasyon: %2.5
500,000 TRY'nin bugünkü değeri: ~153,500 TRY
Değer kaybı: ~346,500 TRY (%69.3)
```

**Yorum:** Çok yüksek değer kaybı, geç teslimat dezavantajlı

## Karşılaştırma

### Yüksek Enflasyon (%4 aylık)

| Ay | Bugünkü Değer | Kayıp |
|----|---------------|-------|
| 10 | ₺675,564 | %32.5 |
| 30 | ₺307,680 | %69.2 |
| 48 | ₺140,071 | %86.0 |

### Orta Enflasyon (%2.5 aylık)

| Ay | Bugünkü Değer | Kayıp |
|----|---------------|-------|
| 10 | ₺781,198 | %21.9 |
| 30 | ₺476,743 | %52.3 |
| 48 | ₺306,557 | %69.3 |

### Düşük Enflasyon (%1 aylık)

| Ay | Bugünkü Değer | Kayıp |
|----|---------------|-------|
| 10 | ₺905,287 | %9.5 |
| 30 | ₾740,741 | %25.9 |
| 48 | ₺620,260 | %38.0 |

## TÜİK Verilerini Nereden Bulabilirim?

1. **TÜİK Web Sitesi:** https://www.tuik.gov.tr
2. **TÜFE Bülteni:** Her ayın ilk haftası yayınlanır
3. **Veri Portalı:** https://data.tuik.gov.tr
4. **Aylık Enflasyon:** "Tüketici Fiyat Endeksi, Aylık" kategorisi

## Özet

✅ **Uygulamada Kullan:** TÜİK'in açıkladığı **aylık enflasyon oranını**  
❌ **Kullanma:** Yıllık enflasyon oranını 12'ye bölme  
💡 **Neden:** Enflasyon bileşiktir, basit orantı yanlış sonuç verir

---

**Kaynak:** TÜİK (Türkiye İstatistik Kurumu) - TÜFE Bültenleri


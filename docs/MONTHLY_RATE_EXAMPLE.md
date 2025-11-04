# Aylık Faiz Oranı Hesaplama Örneği

## Banka Kredisi Hesaplama

Bankalar **aylık nominal faiz oranını** ilan ederler ve geri ödeme planı bu aylık oran üzerinden hesaplanır.

### Formül

```
Aylık Ödeme = P × r × (1 + r)^n / ((1 + r)^n – 1)
```

**Değişkenler:**
- `P` = Anapara (Principal)
- `r` = Aylık faiz oranı (decimal olarak)
- `n` = Toplam ay sayısı

### Örnek 1: Standart Banka Kredisi

**Parametreler:**
- Anapara: 1,000,000 TRY
- Aylık faiz oranı: %3 (0.03)
- Vade: 36 ay

**Hesaplama:**
```
r = 3% / 100 = 0.03
n = 36

(1 + r)^n = (1.03)^36 = 2.8983
r × (1 + r)^n = 0.03 × 2.8983 = 0.08695
(1 + r)^n - 1 = 1.8983

Aylık Ödeme = 1,000,000 × 0.08695 / 1.8983
            = 1,000,000 × 0.04581
            = 45,810 TRY

Toplam Geri Ödeme = 45,810 × 36 = 1,649,160 TRY
Toplam Faiz = 1,649,160 - 1,000,000 = 649,160 TRY
```

### Örnek 2: Daha Düşük Faiz

**Parametreler:**
- Anapara: 500,000 TRY
- Aylık faiz oranı: %2 (0.02)
- Vade: 60 ay

**Hesaplama:**
```
r = 0.02
n = 60

(1.02)^60 = 3.2810
Aylık Ödeme = 500,000 × (0.02 × 3.2810) / (3.2810 - 1)
            = 500,000 × 0.06562 / 2.2810
            = 500,000 × 0.02876
            = 14,380 TRY

Toplam = 14,380 × 60 = 862,800 TRY
Faiz = 362,800 TRY
```

### Örnek 3: Yüksek Faiz (Mevcut Türkiye Koşulları)

**Parametreler:**
- Anapara: 500,000 TRY
- Aylık faiz oranı: %4 (0.04)
- Vade: 120 ay

**Hesaplama:**
```
r = 0.04
n = 120

(1.04)^120 = 110.66
Aylık Ödeme = 500,000 × (0.04 × 110.66) / (110.66 - 1)
            = 500,000 × 4.4264 / 109.66
            = 500,000 × 0.04037
            = 20,185 TRY

Toplam = 20,185 × 120 = 2,422,200 TRY
Faiz = 1,922,200 TRY
```

## Önemli Notlar

### 1. Yıllık Maliyet Oranı (KKDF)
Bankalar "Yıllık Maliyet Oranı" (Yearly Cost Ratio) da yayınlarlar, ancak:
- Bu oran sadece bilgilendirme amaçlıdır
- Geri ödeme planı **her zaman aylık oran** ile hesaplanır
- Yıllık maliyet, ek ücretleri de içerir

### 2. Aylık Oran vs Yıllık Oran
```
Aylık %3 ≠ Yıllık %36

Gerçek yıllık efektif oran:
(1.03)^12 - 1 = 1.4258 - 1 = 0.4258 = %42.58
```

### 3. KKDF ve BSMV
Türkiye'de kredi maliyetine eklenir:
- KKDF: %15 (kredi kullandırım vergisi)
- BSMV: %10 (banka ve sigorta muameleleri vergisi)

Örnek:
```
Nominal aylık faiz: %3
KKDF (%15): 3 × 0.15 = 0.45
BSMV (%10): 3 × 0.10 = 0.30
Toplam efektif aylık faiz: 3 + 0.45 + 0.30 = %3.75
```

## Uygulama Kullanımı

Uygulamada:
1. **Aylık Faiz Oranı** alanına bankanın ilan ettiği aylık oranı yazın
2. Örnek: Banka "%3 aylık" diyorsa → `3` yazın (36 değil!)
3. Uygulama otomatik olarak:
   - Aylık ödemeyi hesaplar
   - Toplam maliyeti gösterir
   - Toplam faizi hesaplar

## Test Senaryoları

### Senaryo 1: Gerçekçi Konut Kredisi
```
Anapara: 1,000,000 TRY
Aylık Faiz: %3.5
Vade: 120 ay
Beklenen Aylık: ~35,840 TRY
Beklenen Toplam: ~4,300,800 TRY
```

### Senaryo 2: Kısa Vadeli Taşıt Kredisi
```
Anapara: 500,000 TRY
Aylık Faiz: %2.5
Vade: 36 ay
Beklenen Aylık: ~15,770 TRY
Beklenen Toplam: ~567,720 TRY
```

### Senaryo 3: Sıfır Faiz (Kampanya)
```
Anapara: 100,000 TRY
Aylık Faiz: %0
Vade: 12 ay
Beklenen Aylık: 8,333 TRY
Beklenen Toplam: 100,000 TRY
```

---

**Not:** Bu örnekler standart eşit taksitli (amortismanlı) kredi hesaplamalarıdır. Farklı geri ödeme planları (azalan taksit, balonlu vb.) farklı formüller kullanır.


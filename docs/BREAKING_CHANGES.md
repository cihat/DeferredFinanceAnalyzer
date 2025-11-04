# Breaking Changes

## Version 1.3.0 - Aylık Enflasyon Oranı Değişikliği

### ⚠️ Önemli Değişiklik

**v1.3.0** ile birlikte enflasyon oranı girişi **yıllıktan aylığa** değiştirilmiştir.

### Neden Bu Değişiklik?

Türkiye'de TÜİK (Türkiye İstatistik Kurumu) enflasyonu **aylık CPI değişimi** olarak açıklar:
- ✅ "Ekim ayında aylık enflasyon %2.88 oldu"
- ❌ "Yıllık enflasyon 12'ye bölünür" yaklaşımı yanlış

Enflasyon **bileşik** bir olgudur, basit orantı doğru sonuç vermez.

### Değişiklik Öncesi (v1.2.x ve öncesi)

```typescript
interface TFSParams {
  annualInflationRate?: number;
}

// Hesaplama
const monthlyInflation = annualInflationRate / 100 / 12;
```

**UI:**
- Label: "Yıllık Enflasyon Oranı (%)"
- Örnek girdi: `30` (yıllık %30 için)
- Hesaplanan aylık: `30 / 12 = 2.5%` ❌ YANLIŞ!

### Değişiklik Sonrası (v1.3.0+)

```typescript
interface TFSParams {
  monthlyInflationRate?: number;
}

// Hesaplama
const inflationDecimal = monthlyInflationRate / 100;
```

**UI:**
- Label: "Aylık Enflasyon Oranı (%)"
- Örnek girdi: `2.5` (TÜİK'in açıkladığı aylık oran)
- Kullanılan: `2.5%` ✅ DOĞRU!

### Neden Basit Bölme Yanlış?

```
Aylık %2.5 enflasyon:
- Basit hesap: 2.5 × 12 = %30 yıllık ❌
- Gerçek (bileşik): (1.025)^12 - 1 = %34.49 yıllık ✅

Fark: %4.49 - bu büyük bir fark!
```

### Dönüşüm

TÜİK verisini kullanma:

| TÜİK Açıklaması | Uygulama Girişi |
|-----------------|-----------------|
| "Aylık %2.88" | 2.88 |
| "Aylık %3.16" | 3.16 |
| "Aylık %1.64" | 1.64 |

### API Değişiklikleri

```diff
export interface TFSParams {
  principal: number;
  termMonths: number;
  organizationFee: number;
  deliveryMonth: number;
- annualInflationRate?: number;
+ monthlyInflationRate?: number;
}
```

### TÜİK Verilerini Nereden Bulabilirim?

1. **Web:** https://www.tuik.gov.tr
2. **TÜFE Bülteni:** Her ayın ilk haftası
3. **Arama:** "TÜİK aylık enflasyon"

---

## Version 1.2.0 - Aylık Faiz Oranı Değişikliği

### ⚠️ Önemli Değişiklik

**v1.2.0** ile birlikte faiz oranı girişi **yıllıktan aylığa** değiştirilmiştir.

### Neden Bu Değişiklik?

Türkiye'deki bankalar kredi faiz oranlarını **aylık nominal oran** olarak ilan ederler:
- ✅ "Aylık %3 faiz"
- ❌ "Yıllık %36 faiz" değil

Geri ödeme planı da bu aylık oran üzerinden hesaplanır, yıllık oran sadece bilgilendirme amaçlıdır.

### Değişiklik Öncesi (v1.1.x ve öncesi)

```typescript
// Eski kod
interface LoanParams {
  annualInterestRate: number; // Yıllık oran
}

// Hesaplama
const monthlyRate = annualInterestRate / 100 / 12;
```

**UI:**
- Label: "Yıllık Faiz Oranı (%)"
- Örnek girdi: `30` (yıllık %30 için)
- Hesaplanan aylık: `30 / 12 = 2.5%`

### Değişiklik Sonrası (v1.2.0+)

```typescript
// Yeni kod
interface LoanParams {
  monthlyInterestRate: number; // Aylık oran
}

// Hesaplama
const monthlyRate = monthlyInterestRate / 100;
```

**UI:**
- Label: "Aylık Faiz Oranı (%)"
- Örnek girdi: `3` (aylık %3 için)
- Kullanılan aylık: `3%`

### Dönüşüm Tablosu

Eğer eski versiyonda kullandığınız değerleri yeni versiyona çevirmek istiyorsanız:

| Eski (Yıllık) | Yeni (Aylık) | Açıklama |
|----------------|--------------|----------|
| 24% | 2% | 24 ÷ 12 = 2 |
| 30% | 2.5% | 30 ÷ 12 = 2.5 |
| 36% | 3% | 36 ÷ 12 = 3 |
| 42% | 3.5% | 42 ÷ 12 = 3.5 |
| 48% | 4% | 48 ÷ 12 = 4 |

### Hesaplama Farkı

**Önemli:** Basit bölme ile gerçek yıllık efektif oran farklıdır!

```
Aylık %3:
- Basit yıllık: 3 × 12 = %36
- Efektif yıllık: (1.03)^12 - 1 = %42.58
```

### Örnekler

#### Örnek 1: Konut Kredisi

**Eski versiyon girişi:**
```
Yıllık Faiz: 36%
→ Aylık hesaplanan: 3%
```

**Yeni versiyon girişi:**
```
Aylık Faiz: 3%
→ Direkt kullanılır: 3%
```

**Sonuç:** Aynı hesaplama, daha doğru girdi

#### Örnek 2: Taşıt Kredisi

**Eski versiyon:**
```
Anapara: 500,000 TRY
Yıllık Faiz: 30%
Vade: 36 ay
```

**Yeni versiyon:**
```
Anapara: 500,000 TRY
Aylık Faiz: 2.5%
Vade: 36 ay
```

### API Değişiklikleri

#### TypeScript Interface

```diff
export interface LoanParams {
  principal: number;
- annualInterestRate: number;
+ monthlyInterestRate: number;
  termMonths: number;
}
```

#### Store

```diff
class FinancialStore {
- loanInterestRate = $state(2.5); // Annual percentage
+ loanInterestRate = $state(3.0); // Aylık faiz oranı (%)
}
```

#### Fonksiyon Çağrıları

```diff
calculateLoan({
  principal: 500000,
- annualInterestRate: 30,
+ monthlyInterestRate: 2.5,
  termMonths: 36
});
```

### Migration Guide

Eğer kodu kullanıyorsanız:

1. **Tüm `annualInterestRate` referanslarını `monthlyInterestRate` ile değiştirin**
2. **Girdi değerlerini 12'ye bölün** (örn: 36 → 3)
3. **Test senaryolarınızı güncelleyin**

```typescript
// Eski
const rate = 36; // yıllık
calculateLoan({ ..., annualInterestRate: rate });

// Yeni
const rate = 3; // aylık (36 / 12)
calculateLoan({ ..., monthlyInterestRate: rate });
```

### Banka Reklamlarını Okuma

Türkiye'de bankaların kredi reklamlarında:

**✅ Doğru okuma:**
- "Aylık %2.99 faiz" → Uygulamaya `2.99` yazın
- "36 ay vade, aylık %3.5" → Uygulamaya `3.5` yazın

**❌ Yanlış okuma:**
- "Yıllık %36" yazan reklamı 12'ye bölün → `3` yazın
- Veya bankanın tüketici kredisi sözleşmesindeki **aylık oranı** kullanın

### Yasal Dayanak

- **Tüketici Kredileri Sözleşmesi**: Aylık nominal faiz oranı belirtilir
- **KKDF (Kredi Kullandırım Destekleme Fonu)**: Aylık faiz üzerinden hesaplanır
- **BSMV (Banka ve Sigorta Muameleleri Vergisi)**: Aylık faiz üzerinden hesaplanır

### Destek

Sorularınız için:
- GitHub Issues: [DeferredFinance/issues](https://github.com/yourusername/DeferredFinance/issues)
- Dokümantasyon: [docs/MONTHLY_RATE_EXAMPLE.md](./MONTHLY_RATE_EXAMPLE.md)

---

**Versiyon:** 1.2.0  
**Tarih:** 4 Kasım 2025  
**Etki:** Tüm kullanıcılar ve API consumers


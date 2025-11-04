# Enflasyon Hesaplama Özelliği

## Genel Bakış

Uygulama artık enflasyon etkisini hesaba katarak daha gerçekçi karşılaştırmalar yapıyor. Teslimat ayı arttıkça paranın satın alma gücü azalıyor ve bu durum hesaplamalara yansıtılıyor.

## Neden Önemli?

### Senaryo Örneği

**Durum:** ₺500,000 hedef tutar, 60 aylık TFS, %3 yıllık enflasyon

#### 10. Ayda Teslimat
- Alınan tutar: ₺500,000
- Bugünkü değeri: ~₺488,000
- Değer kaybı: ~₺12,000 (%2.4)

#### 48. Ayda Teslimat
- Alınan tutar: ₺500,000
- Bugünkü değeri: ~₺442,000
- Değer kaybı: ~₺58,000 (%11.6)

**Sonuç:** Geç teslimat almak, enflasyon nedeniyle paranın gerçek değerinde kayba neden oluyor.

## Teknik Detaylar

### Formül

**Bugünkü Değer (Present Value):**
```
PV = FV / (1 + i)^n

Burada:
PV = Bugünkü değer (Present Value)
FV = Gelecekteki değer (Future Value)
i = Aylık enflasyon oranı (yıllık / 12 / 100)
n = Ay sayısı
```

### Örnek Hesaplama

```typescript
// Teslimat: 30. ay, Enflasyon: %3 yıllık
const monthlyInflation = 3 / 100 / 12; // 0.0025
const months = 30;
const futureValue = 500000;

const presentValue = futureValue / Math.pow(1 + monthlyInflation, months);
// presentValue ≈ ₺464,500
// Değer kaybı ≈ ₺35,500 (%7.1)
```

## UI Özellikleri

### 1. Enflasyon Input'u
- **Konum:** Genel Parametreler kartı
- **Alan:** Yıllık Enflasyon Oranı (%)
- **Varsayılan:** %3.0
- **Açıklama:** Paranın değer kaybını hesaplamak için kullanılır

### 2. TFS Sonuç Kartında Enflasyon Uyarısı
Enflasyon > 0 olduğunda görünen amber (turuncu) renkli bilgi kutusu:
- ⚠️ Enflasyon Etkisi başlığı
- Alacağınız tutarın bugünkü değeri
- Değer kaybı miktarı ve yüzdesi
- Görsel olarak dikkat çekici

### 3. Aylık Karşılaştırma Grafiği
- Her ay için enflasyon düzeltmeli fark gösterilir
- Her satırda değer kaybı yüzdesi gösterilir (örn: "-7.1% değer")
- Alt kısımda açıklayıcı not: "Enflasyon hesaplamalara dahil edildi"
- Sarı/amber renk tonu ile vurgulanır

## Kullanım Senaryoları

### Yüksek Enflasyon Ortamı
```
Enflasyon: %40 yıllık
Teslimat: 36. ay
Değer kaybı: ~%31
```
→ TFS'nin avantajı önemli ölçüde azalır

### Düşük Enflasyon Ortamı
```
Enflasyon: %2 yıllık
Teslimat: 24. ay
Değer kaybı: ~%4
```
→ TFS avantajı korunur

### Enflasyon Olmadan
```
Enflasyon: %0
```
→ Klasik hesaplama, enflasyon etkisi gösterilmez

## Kod Yapısı

### Yeni Fonksiyonlar

**`calculatePresentValue()`**
```typescript
export function calculatePresentValue(
  futureValue: number,
  annualInflationRate: number,
  months: number
): number
```
Gelecekteki bir tutarın bugünkü değerini hesaplar.

### Güncellenmiş Fonksiyonlar

**`calculateTFS()`**
- Artık `annualInflationRate` parametresi alıyor
- `principalPresentValue`, `realValueLoss`, `inflationImpact` döndürüyor

**`compareOptions()`**
- Enflasyon düzeltmeli karşılaştırma yapıyor
- `inflationAdjustedDifference` hesaplıyor

**`generateMonthlyComparison()`**
- Her ay için enflasyon etkisini hesaplıyor
- Ay bazlı değer kaybını gösteriyor

## Store Güncellemeleri

```typescript
class FinancialStore {
  inflationRate = $state(3.0); // Yeni parametre
  
  setInflationRate(value: number) {
    this.inflationRate = Math.max(0, value);
  }
}
```

## Karşılaştırma Mantığı

### TFS Gerçek Maliyeti
```
Gerçek Maliyet = Nominal Maliyet + Değer Kaybı
```

**Örnek:**
- Nominal maliyet: ₺510,000 (₺500,000 + ₺10,000 org. ücreti)
- Alınan tutarın bugünkü değeri: ₺464,500
- Değer kaybı: ₺35,500
- **Gerçek maliyet:** ₺510,000 + ₺35,500 = ₺545,500

### Kredi ile Karşılaştırma
```
Enflasyon Düzeltmeli Fark = Kredi Maliyeti - TFS Gerçek Maliyeti
```

## Kullanıcı Deneyimi

### Görsel İpuçları
1. 🟨 Amber/sarı renk tonu → enflasyon ile ilgili
2. ⚠️ Uyarı ikonu → dikkat edilmesi gereken bilgi
3. % yüzdesi → değer kaybı oranı
4. ₺ tutar → mutlak değer kaybı

### Bilgilendirme
- Enflasyon > 0: Tüm ilgili alanlarda görsel gösterimler aktif
- Enflasyon = 0: Klasik görünüm, enflasyon bilgileri gizli
- Dinamik güncelleme: Enflasyon değiştiğinde tüm hesaplamalar otomatik güncellenir

## Deployment

**Güncellenmiş Versiyon:** https://8c274ae1.deferredfinance.pages.dev

## Testler

### Test Senaryoları

1. **Enflasyon Sıfır**
   - Enflasyon: %0
   - Beklenen: Enflasyon bilgileri görünmemeli

2. **Düşük Enflasyon**
   - Enflasyon: %2
   - Teslimat: 12. ay
   - Beklenen: ~%2 değer kaybı

3. **Orta Enflasyon**
   - Enflasyon: %10
   - Teslimat: 36. ay
   - Beklenen: ~%27 değer kaybı

4. **Yüksek Enflasyon**
   - Enflasyon: %50
   - Teslimat: 24. ay
   - Beklenen: ~%66 değer kaybı

## Sonuç

Enflasyon özelliği, kullanıcıların **gerçek maliyeti** anlamalarını sağlıyor. Özellikle yüksek enflasyon dönemlerinde teslimat ayı seçiminin ne kadar kritik olduğunu net bir şekilde gösteriyor.

**Önemli Çıkarım:** Geç teslimat = Daha fazla değer kaybı = Daha yüksek gerçek maliyet


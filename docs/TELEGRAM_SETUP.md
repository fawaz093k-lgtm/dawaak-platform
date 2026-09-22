# تفعيل إشعارات تيليجرام

## الخطوات

### 1. إنشاء بوت
1. افتح تيليجرام وابحث عن **@BotFather**
2. أرسل `/newbot`
3. اختر اسم للبوت (مثلاً: Dawaak Alerts)
4. اختر يوزرنيم ينتهي بـ `bot` (مثلاً: `dawaak_alerts_bot`)
5. انسخ الـ **Token** اللي يعطيك إياه

### 2. الحصول على Chat ID
**للمحادثة الخاصة:**
- ابحث عن `@userinfobot` وأرسل له أي رسالة، راح يعطيك الـ ID

**لقناة أو مجموعة:**
1. أضف البوت كأدمن في القناة/المجموعة
2. أرسل أي رسالة في القناة
3. افتح الرابط التالي (بدل TOKEN):
   `https://api.telegram.org/botTOKEN/getUpdates`
4. ابحث عن `"chat":{"id":-100xxxxxxxxxx}` وانسخ الرقم

### 3. إضافة المتغيرات
في ملف `.env`:
```
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=-100xxxxxxxxxx
```

### 4. تجربة الإشعار
```bash
curl -X POST http://localhost:3000/api/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "🧪 تجربة إشعار من دواءك"}'
```

أو لتغيير سعر:
```bash
curl -X POST http://localhost:3000/api/notify \
  -H "Content-Type: application/json" \
  -d '{
    "type": "price_change",
    "productName": "اتورفاستاتين 10 ملغ",
    "oldPrice": 10100,
    "newPrice": 10500,
    "warehouse": "مستودع الفواز"
  }'
```

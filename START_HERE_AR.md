# تشغيل موقع Grassroots MI محليًا والعمل عليه باستخدام Codex

هذه الحزمة تحتوي على كود الموقع الكامل مع الصور والفيديوهات، ولا تحتوي على `node_modules` أو ملفات البناء المؤقتة حتى يبقى حجم التحميل مناسبًا.

## المتطلبات

- Node.js إصدار 22.13 أو أحدث.
- تطبيق Codex أو Codex CLI.
- اتصال بالإنترنت عند التثبيت الأول فقط لتنزيل حزم npm.

## الطريقة الأسهل على Windows باستخدام تطبيق Codex

1. فك ضغط الملف في مكان واضح، مثل:

   `C:\Users\YOUR_NAME\Documents\grassroots-mi-community-local`

2. افتح Codex واختر **Open Folder**، ثم اختر مجلد المشروع بعد فك الضغط.

3. افتح Terminal داخل Codex وشغّل:

   ```powershell
   npm ci
   npm run dev
   ```

4. سيظهر في الـTerminal رابط محلي للموقع. افتحه في المتصفح، وغالبًا سيكون:

   `http://localhost:5173`

5. ابدأ محادثة جديدة داخل Codex واكتب مثلًا:

   ```text
   Read the project first. Keep the existing Grassroots MI design system and media.
   Help me edit the homepage, then run the relevant checks before finishing.
   ```

## استخدام Codex CLI

افتح PowerShell داخل مجلد المشروع، ثم شغّل:

```powershell
codex
```

في أول تشغيل، سجّل الدخول بحساب ChatGPT، ثم اطلب من Codex فهم المشروع قبل التعديل:

```text
Tell me about this project and identify the homepage, shared styles, internal pages, and media folders. Do not edit anything yet.
```

## أهم أماكن التعديل

- الصفحة الرئيسية: `app/page.tsx`
- الألوان والتصميم المتجاوب: `app/globals.css`
- الهيدر والفوتر وقالب الصفحات الداخلية: `app/site-chrome.tsx`
- قسم الفيديو: `app/media-story.tsx`
- الصفحات الداخلية: المجلدات الموجودة داخل `app/`
- الصور: `public/media/images/`
- الفيديوهات: `public/media/video/`

## أوامر مفيدة

```powershell
npm run dev
npm run lint
```

الاختبارات الكاملة وأوامر تجهيز نسخة النشر تستخدم Bash؛ على Windows استخدم WSL أو Git Bash عند تشغيل:

```bash
npm test
npm run build
```

## قبل أي تعديل كبير

من الأفضل إنشاء مستودع Git محلي حتى يمكن الرجوع لأي نسخة:

```powershell
git init
git add .
git commit -m "Initial Grassroots MI local version"
```

بعد ذلك اطلب من Codex إجراء تعديل واحد واضح في كل مرة، ومراجعة النتيجة قبل الانتقال إلى تعديل آخر.


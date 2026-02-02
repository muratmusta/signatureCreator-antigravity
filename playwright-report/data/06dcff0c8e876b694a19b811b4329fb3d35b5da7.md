# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - link "S SignatureOS" [ref=e5] [cursor=pointer]:
      - /url: /
      - generic [ref=e6]: S
      - text: SignatureOS
    - generic [ref=e7]:
      - heading "Hoş Geldiniz" [level=1] [ref=e8]
      - paragraph [ref=e9]: Devam etmek için Google hesabınızla giriş yapın
      - button "Google ile Giriş Yap" [ref=e10]:
        - img
        - text: Google ile Giriş Yap
      - button "🛠️ Dev Test Login" [active] [ref=e11]
      - paragraph [ref=e12]:
        - text: Hesabınız yok mu?
        - link "Kayıt Olun" [ref=e13] [cursor=pointer]:
          - /url: /register
    - paragraph [ref=e14]:
      - text: Giriş yaparak
      - link "Kullanım Şartları" [ref=e15] [cursor=pointer]:
        - /url: /terms
      - text: ve
      - link "Gizlilik Politikası" [ref=e16] [cursor=pointer]:
        - /url: /privacy
      - text: "'nı kabul etmiş olursunuz."
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e22] [cursor=pointer]:
    - img [ref=e23]
  - alert [ref=e26]
```
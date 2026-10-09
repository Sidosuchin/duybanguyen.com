# duybanguyen.com

Digital home của **Duy Ba Nguyen** — Sống · Làm · Khám phá (Living · Building · Exploring).

Personal website: personal brand trước, portfolio sau, shop sau cùng — theo đúng thứ tự Know → Work → Buy.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (design tokens trong `app/globals.css` qua `@theme`)
- Fonts: Plus Jakarta Sans (display) + Inter (body), subset tiếng Việt qua `next/font`
- Deploy: Vercel · Domain: duybanguyen.com

## Chạy local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production (phải pass trước khi push)
npm run lint
```

## Cấu trúc

```
app/
  page.tsx              # Home: Hero, Introduction, Now, Selected Work (dark), Life & Interests, Notes, Shop teaser, Connect
  ve-minh/              # "Duy là người như thế nào?" (+ VeMinhContent.tsx)
  cong-viec/            # Case studies + /cong-viec/[slug]
  cuoc-song/            # Photo journal
  goc-cua-duy/          # Notes + /goc-cua-duy/[slug]
  shop/                 # Teaser (Phase 6 mới bật bán) + /shop/[slug]
  lien-he/              # Connect
  sitemap.ts robots.ts not-found.tsx
components/             # Navbar (+ LanguageSwitcher), Hero, Now, Work, Life, Notes, Shop, Contact, Footer…
lib/i18n.ts             # Từ điển song ngữ VI/EN + kiểu LocalizedText
data/                   # Tách khỏi UI: projects.ts, posts.ts, products.ts, life.ts, now.ts, site.ts, content.ts
```

## Nguyên tắc nội dung (quan trọng)

**Không bịa** thành tích, số liệu, project, khách hàng, chức danh, sản phẩm hay thông tin cá nhân.
Chỗ nào chưa có nội dung thật → dùng nội dung mẫu **trung tính** trong `data/` (không để nhãn kỹ thuật trên giao diện).
Thêm nội dung mới = thêm một mục trong `data/`, không sửa layout.

## Song ngữ VI | EN

- Tiếng Việt là mặc định. Nút chuyển `VI | EN` nằm trên Navbar (cả desktop & mobile), đổi ngay không reload, nhớ lựa chọn qua localStorage và giữ nguyên khi chuyển trang.
- Toàn bộ chữ giao diện nằm trong từ điển `lib/i18n.ts` (`dict.vi` / `dict.en`).
- Nội dung trong `data/` dùng kiểu `LocalizedText` (`{ vi, en }`) — khi thêm project/bài viết/sản phẩm, điền cả hai ngôn ngữ.
- Sửa nội dung cá nhân (giới thiệu, tính cách, giá trị, NOW, link social) tại `data/content.ts`, `data/now.ts`, `data/site.ts`.

## Design system

- Nền warm cream `#FAF6F0` / `#F6F0E6`, chữ charcoal `#211D1A`, accent Terracotta `#BC5633` (bản sáng `#E59A78` trên nền tối)
- Nhịp section xen kẽ: sáng → cream → tối (Selected Work, Journey, Footer charcoal)
- Bo góc vừa phải (8px nút / 12px card), viền 1px thay bóng đổ, ảnh lớn kiểu editorial
- Motion tinh tế: fade-in + slide-up khi vào khung hình, tôn trọng `prefers-reduced-motion`

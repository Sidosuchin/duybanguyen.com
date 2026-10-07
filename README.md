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
  page.tsx              # Home: Hero, Introduction, Now, Selected Work, Life Lately, Góc của Duy, Shop teaser, Connect
  ve-minh/              # "Duy là người như thế nào?"
  cong-viec/            # Case studies + /cong-viec/[slug]
  cuoc-song/            # Photo journal
  goc-cua-duy/          # Notes + /goc-cua-duy/[slug]
  shop/                 # Teaser (Phase 6 mới bật bán) + /shop/[slug]
  lien-he/              # Connect
  sitemap.ts robots.ts not-found.tsx
components/             # Navbar, Hero, Now, Work, Life, Notes, Shop, Contact, Footer…
data/                   # Tách khỏi UI: projects.ts, posts.ts, products.ts, life.ts, now.ts, site.ts
```

## Nguyên tắc nội dung (quan trọng)

**Không bịa** thành tích, số liệu, project, khách hàng, chức danh, sản phẩm hay thông tin cá nhân.
Chỗ nào thiếu nội dung thật → render `[CONTENT PLACEHOLDER]` và hỏi Duy bổ sung.
Thêm nội dung mới = thêm một mục trong `data/`, không sửa layout.

## Design system

- Nền warm white `#FAF6F0`, chữ charcoal `#211D1A`, accent Terracotta `#BC5633`
- Bo góc 12–16px card / 8px nút, viền 1px thay bóng đổ, bóng đổ gần như không dùng
- Motion tinh tế: fade-in + slide-up khi vào khung hình, tôn trọng `prefers-reduced-motion`

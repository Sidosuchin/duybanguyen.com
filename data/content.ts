import { lt, type LocalizedText } from "@/lib/i18n";

/**
 * Nội dung biên tập trung tính của site — Duy sửa tại đây, không cần đụng
 * vào component. Mọi câu chữ đều bám brief cá nhân của Duy (tính cách,
 * tinh thần Sống · Làm · Khám phá); không có thành tích/số liệu bịa.
 */

/** Đoạn giới thiệu ngắn ở trang chủ */
export const homeIntro: LocalizedText = lt(
  "Đây là ngôi nhà số của mình — nơi mình ghi lại hành trình sống, làm việc và khám phá của một người trẻ đang xây dựng sự nghiệp của chính mình. Không ồn ào, không phô trương: chỉ là những điều thật mình đang làm, đang học và đang tò mò.",
  "This is my digital home — where I document the journey of a young person living, working and exploring while building a career of his own. Nothing loud, nothing showy: just the real things I'm doing, learning and curious about."
);

/** Đoạn giới thiệu ở trang Về mình */
export const aboutIntro: LocalizedText = lt(
  "Mình là Duy — một người trẻ linh hoạt, năng động và ham khám phá. Mình thoải mái hòa nhập với cộng đồng, thích học hỏi và luôn sẵn sàng thử những điều mới. Website này là nơi mình kể câu chuyện đó: con người trước, công việc sau, và những thứ mình tạo ra ở cuối.",
  "I'm Duy — a flexible, energetic young person who loves exploring. I connect easily with communities, I love learning, and I'm always up for trying new things. This website is where I tell that story: the person first, the work second, and the things I create last."
);

/** Tám tính từ tính cách — từ brief cá nhân của Duy */
export const traits: LocalizedText[] = [
  lt("Linh hoạt", "Flexible"),
  lt("Thích nghi tốt", "Adaptable"),
  lt("Thoải mái", "Easy-going"),
  lt("Năng động", "Energetic"),
  lt("Hòa đồng · Cộng đồng", "Community-minded"),
  lt("Thích khám phá", "Curious explorer"),
  lt("Thích học hỏi", "Always learning"),
  lt("Thích thử điều mới", "Loves new things"),
];

/** Sở thích — hiển thị dạng chip ở trang Về mình và mục Life */
export const interests: LocalizedText[] = [
  lt("Cà phê", "Coffee"),
  lt("Âm nhạc", "Music"),
  lt("Du lịch", "Travel"),
  lt("Công nghệ", "Technology"),
  lt("Cộng đồng", "Community"),
  lt("Học hỏi", "Learning"),
];

/** Giá trị — tinh thần rút ra trực tiếp từ brief của Duy */
export const values: { title: LocalizedText; text: LocalizedText }[] = [
  {
    title: lt("Chân thật", "Authenticity"),
    text: lt(
      "Là chính mình trong mọi việc mình làm — thật hơn hoàn hảo.",
      "Being myself in everything I do — real beats perfect."
    ),
  },
  {
    title: lt("Tò mò", "Curiosity"),
    text: lt(
      "Luôn hỏi “còn gì nữa?” và dám thử điều chưa từng làm.",
      "Always asking “what else?” and daring to try the untried."
    ),
  },
  {
    title: lt("Học không ngừng", "Keep learning"),
    text: lt(
      "Mỗi ngày học thêm một chút, từ công việc lẫn cuộc sống.",
      "Learning a little more every day, from work and from life."
    ),
  },
  {
    title: lt("Kết nối con người", "People first"),
    text: lt(
      "Con người là trung tâm — của cộng đồng, công việc và mọi thứ mình xây.",
      "People are at the center — of community, of work, of everything I build."
    ),
  },
];

/** Ghi chú trung tính cho mục Hành trình — chưa có cột mốc nào được bịa ra */
export const journeyNote: LocalizedText = lt(
  "Hành trình của mình vẫn đang được viết tiếp mỗi ngày. Các cột mốc quan trọng sẽ sớm được chia sẻ tại đây.",
  "My journey is still being written every day. The important milestones will be shared here soon."
);

/** Ba lý do liên hệ ở trang Liên hệ */
export const contactPurposes: { title: LocalizedText; text: LocalizedText }[] = [
  {
    title: lt("Hợp tác", "Collaboration"),
    text: lt(
      "Có project muốn làm cùng, hay cơ hội hợp tác dài hạn — mình rất muốn nghe.",
      "Have a project to build together, or a long-term collaboration in mind — I'd love to hear it."
    ),
  },
  {
    title: lt("Cà phê", "Coffee"),
    text: lt(
      "Đơn giản là muốn gặp, trò chuyện, chia sẻ về những điều cả hai đang tò mò.",
      "Simply want to meet, chat, and share the things we're both curious about."
    ),
  },
  {
    title: lt("Góp ý", "Feedback"),
    text: lt(
      "Thấy website này có gì hay / chưa hay, cứ nói mình biết nhé.",
      "See anything good — or not so good — on this site? Let me know."
    ),
  },
];

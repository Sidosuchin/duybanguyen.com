/**
 * Bilingual dictionary + shared i18n helpers.
 *
 * Vietnamese is the default language. Every UI-facing string lives here so
 * the whole site can be translated from one place. Content text (projects,
 * posts, products…) lives in `data/` and uses the same `LocalizedText` type.
 *
 * To add a string: add it to `vi` first, then mirror it in `en`
 * (TypeScript enforces the same shape).
 */

export type Lang = "vi" | "en";

/** A piece of content available in both languages. */
export type LocalizedText = { vi: string; en: string };

/** A list of content items available in both languages. */
export type LocalizedList = { vi: string[]; en: string[] };

export const lt = (vi: string, en: string): LocalizedText => ({ vi, en });

export const pick = (text: LocalizedText, lang: Lang): string => text[lang];

export const pickList = (list: LocalizedList, lang: Lang): string[] =>
  list[lang];

const vi = {
  a11y: {
    skip: "Bỏ qua tới nội dung chính",
    mainNav: "Điều hướng chính",
    footerNav: "Điều hướng chân trang",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    language: "Ngôn ngữ / Language",
    socials: "Kênh liên hệ",
    topics: "Chủ đề",
    categories: "Chuyên mục",
  },
  nav: {
    about: "Về mình",
    work: "Công việc",
    life: "Cuộc sống",
    notes: "Notes",
    shop: "Shop",
    contact: "Liên hệ",
    connect: "Connect",
  },
  theme: {
    toggleToDark: "Chuyển sang chế độ tối",
    toggleToLight: "Chuyển sang chế độ sáng",
  },
  welcome: {
    dialogLabel: "Màn hình chào — trò chơi lật thẻ tìm cặp",
    label: "WELCOME",
    heading: "Chào bạn, mình là Duy.",
    description:
      "Trước khi khám phá thế giới của Duy, hãy chơi một trò nhỏ nhé.",
    start: "Bắt đầu",
    supporting: "Một chút tập trung, một chút may mắn.",
    skipIntro: "Bỏ qua intro",
    gameEyebrow: "Memory game",
    gameTitle: "Tìm các cặp giống nhau",
    gameIntro:
      "Lật hai thẻ bất kỳ — nếu giống nhau, chúng sẽ ở lại. Tìm đủ 6 cặp để bước vào nhà của Duy nhé.",
    moves: "Lượt lật",
    pairs: "Cặp đã tìm",
    progress: "Tiến trình hoàn thành",
    replay: "Chơi lại",
    back: "Quay lại",
    cardDown: "Thẻ úp ở vị trí {n} — nhấn để lật",
    cardUp: "Thẻ {name}",
    cardFound: "Thẻ {name} — đã tìm thấy cặp",
    matchFound: "Khớp rồi! Bạn vừa tìm thấy cặp {name}.",
    mismatch: "Chưa khớp — hai thẻ sẽ úp lại.",
    winStatus: "Tuyệt vời! Bạn đã tìm đủ 6 cặp.",
    cards: {
      cat: "Mèo cam",
      laptop: "Laptop",
      books: "Chồng sách",
      coffee: "Tách cà phê",
      globe: "Trái đất",
      suitcase: "Vali",
    },
    doneEyebrow: "Hoàn thành",
    doneTitle: "Bạn đã tìm đủ các cặp!",
    doneBody: "Sẵn sàng khám phá nhé.",
    doneMoves: "Bạn hoàn thành trong {moves} lượt lật.",
    enter: "Khám phá website",
  },
  hero: {
    greeting: "Xin chào, mình là Duy.",
    live: "Mình sống",
    build: "Mình xây dựng",
    explore: "Mình khám phá",
    intro:
      "Mình thích khám phá những điều mới, xây dựng những thứ có giá trị và kết nối với mọi người.",
    ctaAbout: "Về mình",
    ctaWork: "Xem công việc",
    portraitAlt:
      "Thiết kế typographic Duy Ba Nguyen — ảnh chân dung thật sẽ sớm được cập nhật tại đây",
    portraitCaption: "Living · Building · Exploring",
  },
  sections: {
    intro: {
      eyebrow: "Introduction",
      title: "Vài dòng về mình",
      readMore: "Đọc thêm về mình",
    },
    now: {
      eyebrow: "Now",
      title: "Mình đang làm gì dạo này?",
      description:
        "Trang này được cập nhật theo nhịp sống thật — để bạn biết mình đang ở đâu trên hành trình của mình.",
      updated: "Cập nhật",
    },
    work: {
      eyebrow: "Work",
      title: "Selected Work",
      description:
        "Không phải CV — mỗi project là một case study: bối cảnh, việc mình làm, và điều mình học được.",
      viewAll: "Xem tất cả công việc",
      sampleBadge: "Mẫu bố cục",
      viewCaseStudy: "Xem case study",
    },
    life: {
      eyebrow: "Life",
      title: "Life & Interests",
      description:
        "Người phía sau công việc — những khoảnh khắc đời thường, sở thích và những điều mình đang khám phá.",
      viewAll: "Xem cuộc sống của mình",
      emptyText:
        "Ảnh đời sống đang được chọn lọc và sẽ sớm xuất hiện tại đây.",
    },
    notes: {
      eyebrow: "Notes",
      title: "Góc của Duy",
      description: "Những điều mình đang nghĩ, đang học, đang tò mò.",
      readMore: "Đọc thêm",
      emptyText:
        "Bài viết đầu tiên đang được chuẩn bị — quay lại sớm nhé.",
    },
    shop: {
      eyebrow: "Shop",
      title: "My Shop",
      viewAll: "Vào Shop",
      comingSoon: "Sắp mở bán",
      productPhoto: "Khu vực ảnh sản phẩm",
    },
    connect: {
      eyebrow: "Connect",
      title: "Kết nối với mình nhé",
      text: "Muốn hợp tác, mời cà phê, hay chỉ đơn giản là chào nhau một câu — mình luôn vui khi quen thêm bạn mới.",
      cta: "Tới trang liên hệ",
    },
  },
  footer: {
    explore: "Khám phá",
    connectTitle: "Kết nối",
    blurb:
      "Muốn hợp tác, mời cà phê, hay chỉ đơn giản là chào nhau một câu — cứ nhắn mình nhé.",
    contactCta: "Liên hệ",
    rights: "Bảo lưu mọi quyền.",
    madeWith: "Được làm với sự chăm chút.",
  },
  pages: {
    about: {
      headerEyebrow: "Về mình",
      headerTitle: "Mình là Duy — một người trẻ đang sống, làm và khám phá.",
      headerDescription: "Trang này trả lời câu hỏi: Duy là người như thế nào?",
      introEyebrow: "Giới thiệu",
      introTitle: "Chào bạn, mình là Duy",
      personalityEyebrow: "Personality",
      personalityTitle: "Tính cách của mình",
      personalityDescription:
        "Tám tính từ này là bộ lọc cho mọi thứ mình làm — kể cả website này.",
      interestsEyebrow: "Interests",
      interestsTitle: "Mình thích gì?",
      journeyEyebrow: "Journey",
      journeyTitle: "Hành trình của mình",
      journeyDescription: "Những cột mốc đã đưa mình đến hôm nay.",
      valuesEyebrow: "Values",
      valuesTitle: "Điều mình tin",
      focusEyebrow: "Current focus",
      focusTitle: "Mình đang tập trung vào",
    },
    work: {
      headerEyebrow: "Công việc",
      headerTitle: "Mình đã làm gì?",
      headerDescription:
        "Không phải CV — mỗi project là một case study. Bấm vào để xem bối cảnh, cách mình làm, và điều mình học được.",
      listNote:
        "Danh sách đang được cập nhật — các project tiếp theo sẽ xuất hiện tại đây.",
      metaDescription:
        "Selected work của Duy Ba Nguyen — các project dưới dạng case study: bối cảnh, việc đã làm, và điều học được.",
    },
    life: {
      headerEyebrow: "Cuộc sống",
      headerTitle: "Thế giới của Duy trông như thế nào?",
      headerDescription:
        "Photo journal — ảnh thật, caption ngắn, ngày và địa điểm khi nhớ. Đời thật, không cần hoàn hảo.",
      journalEyebrow: "Photo journal",
      journalTitle: "Ảnh đang được chuẩn bị",
      metaDescription:
        "Life lately của Duy Ba Nguyen — photo journal: du lịch, cà phê, bạn bè, cộng đồng và đời thường.",
    },
    notes: {
      headerEyebrow: "Notes",
      headerTitle: "Góc của Duy",
      headerDescription:
        "Mình viết về những điều mình đang nghĩ, đang học và đang tò mò. Chữ nhiều, khoảng trắng nhiều.",
      metaDescription:
        "Notes của Duy Ba Nguyen — những điều mình đang nghĩ, đang học, đang tò mò: Business, Marketing, Technology, Learning, Life.",
    },
    shop: {
      headerEyebrow: "Shop",
      headerTitle: "My Shop",
      noteSuffix:
        "Shop ở đây là một góc của personal brand — cùng font, cùng màu, không biến thành cửa hàng ecommerce.",
      metaDescription:
        "My Shop — những thứ Duy Ba Nguyen tạo ra, sử dụng hoặc muốn chia sẻ.",
    },
    contact: {
      headerEyebrow: "Connect",
      headerTitle: "Kết nối với mình nhé",
      headerDescription:
        "Bạn liên hệ vì việc gì nhất? Chọn một trong ba — hoặc cả ba cũng được.",
      channelsEyebrow: "Kênh liên hệ",
      channelsTitle: "Tìm mình ở đây",
      channelsNote:
        "Các kênh liên hệ đang được cập nhật — quay lại sớm nhé.",
      metaDescription:
        "Kết nối với Duy Ba Nguyen — Facebook, Instagram, LinkedIn, Email.",
    },
  },
  caseStudy: {
    eyebrow: "Case study",
    sampleEyebrow: "Case study · Mẫu bố cục",
    sampleBannerTitle: "Mẫu bố cục",
    sampleBannerNote:
      "Đây là khung trình bày case study để xem cấu trúc — nội dung thật sẽ được cập nhật khi sẵn sàng.",
    context: "Bối cảnh",
    problem: "Vấn đề",
    whatIDid: "Việc mình làm",
    tools: "Công cụ",
    result: "Kết quả",
    lessons: "Điều học được",
    metricsNote: "Số liệu sẽ được cập nhật khi có con số chính thức.",
    back: "Quay lại tất cả công việc",
    imageAlt: "Khu vực ảnh của dự án",
  },
  post: {
    back: "Quay lại Góc của Duy",
    coverAlt: "Khu vực ảnh bìa bài viết",
  },
  product: {
    physical: "Sản phẩm vật lý",
    digital: "Sản phẩm số",
    affiliate: "Sản phẩm gợi ý",
    back: "Quay lại Shop",
    imageAlt: "Khu vực ảnh sản phẩm",
  },
  notFound: {
    eyebrow: "404",
    title: "Ối, lạc đường rồi bạn ơi.",
    text: "Trang bạn tìm không tồn tại — nhưng nhà của mình thì ở ngay đây.",
    cta: "Về trang chủ",
  },
};

export type Dictionary = typeof vi;

const en: Dictionary = {
  a11y: {
    skip: "Skip to main content",
    mainNav: "Main navigation",
    footerNav: "Footer navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language / Ngôn ngữ",
    socials: "Contact channels",
    topics: "Topics",
    categories: "Categories",
  },
  nav: {
    about: "About",
    work: "Work",
    life: "Life",
    notes: "Notes",
    shop: "Shop",
    contact: "Contact",
    connect: "Connect",
  },
  theme: {
    toggleToDark: "Switch to dark mode",
    toggleToLight: "Switch to light mode",
  },
  welcome: {
    dialogLabel: "Welcome screen — memory matching game",
    label: "WELCOME",
    heading: "Hey, I'm Duy.",
    description: "Before exploring my world, let's play a little game.",
    start: "Let's play",
    supporting: "A little focus, a little luck.",
    skipIntro: "Skip intro",
    gameEyebrow: "Memory game",
    gameTitle: "Find the matching pairs",
    gameIntro:
      "Flip any two cards — if they match, they stay face up. Find all 6 pairs to step into Duy's home.",
    moves: "Moves",
    pairs: "Pairs found",
    progress: "Completion progress",
    replay: "Play again",
    back: "Back",
    cardDown: "Face-down card at position {n} — press to flip",
    cardUp: "{name} card",
    cardFound: "{name} card — pair found",
    matchFound: "It's a match! You found the {name} pair.",
    mismatch: "Not a match — both cards will flip back.",
    winStatus: "Wonderful! You found all 6 pairs.",
    cards: {
      cat: "Orange cat",
      laptop: "Laptop",
      books: "Stack of books",
      coffee: "Cup of coffee",
      globe: "Globe",
      suitcase: "Suitcase",
    },
    doneEyebrow: "Completed",
    doneTitle: "You found every pair!",
    doneBody: "Ready to explore?",
    doneMoves: "You finished in {moves} moves.",
    enter: "Explore my website",
  },
  hero: {
    greeting: "Hello, I'm Duy.",
    live: "I live",
    build: "I build",
    explore: "I explore",
    intro:
      "I love exploring new things, building things that matter, and connecting with people.",
    ctaAbout: "About me",
    ctaWork: "See my work",
    portraitAlt:
      "Duy Ba Nguyen typographic design — a real portrait photo will be added here soon",
    portraitCaption: "Living · Building · Exploring",
  },
  sections: {
    intro: {
      eyebrow: "Introduction",
      title: "A few words about me",
      readMore: "More about me",
    },
    now: {
      eyebrow: "Now",
      title: "What am I up to?",
      description:
        "This page is updated at the pace of real life — so you know where I am on my journey.",
      updated: "Updated",
    },
    work: {
      eyebrow: "Work",
      title: "Selected Work",
      description:
        "Not a CV — every project is a case study: the context, what I did, and what I learned.",
      viewAll: "See all work",
      sampleBadge: "Layout sample",
      viewCaseStudy: "View case study",
    },
    life: {
      eyebrow: "Life",
      title: "Life & Interests",
      description:
        "The person behind the work — everyday moments, interests, and the things I'm exploring.",
      viewAll: "See my life lately",
      emptyText: "Life photos are being curated and will appear here soon.",
    },
    notes: {
      eyebrow: "Notes",
      title: "Duy's Corner",
      description: "Things I'm thinking about, learning, and curious about.",
      readMore: "Read more",
      emptyText: "The first note is being prepared — check back soon.",
    },
    shop: {
      eyebrow: "Shop",
      title: "My Shop",
      viewAll: "Visit the Shop",
      comingSoon: "Coming soon",
      productPhoto: "Product photo area",
    },
    connect: {
      eyebrow: "Connect",
      title: "Let's connect",
      text: "Want to collaborate, grab a coffee, or simply say hi — I'm always happy to meet new people.",
      cta: "Go to the contact page",
    },
  },
  footer: {
    explore: "Explore",
    connectTitle: "Connect",
    blurb:
      "Want to collaborate, grab a coffee, or simply say hi — just drop me a message.",
    contactCta: "Contact",
    rights: "All rights reserved.",
    madeWith: "Made with care.",
  },
  pages: {
    about: {
      headerEyebrow: "About",
      headerTitle: "I'm Duy — a young person living, building and exploring.",
      headerDescription: "This page answers the question: what is Duy like?",
      introEyebrow: "Intro",
      introTitle: "Hi there, I'm Duy",
      personalityEyebrow: "Personality",
      personalityTitle: "My personality",
      personalityDescription:
        "These eight words filter everything I do — including this website.",
      interestsEyebrow: "Interests",
      interestsTitle: "What do I enjoy?",
      journeyEyebrow: "Journey",
      journeyTitle: "My journey",
      journeyDescription: "The milestones that brought me to today.",
      valuesEyebrow: "Values",
      valuesTitle: "What I believe in",
      focusEyebrow: "Current focus",
      focusTitle: "What I'm focusing on",
    },
    work: {
      headerEyebrow: "Work",
      headerTitle: "What have I done?",
      headerDescription:
        "Not a CV — every project is a case study. Click through for the context, how I worked, and what I learned.",
      listNote: "This list is being updated — more projects will appear here.",
      metaDescription:
        "Selected work by Duy Ba Nguyen — projects as case studies: context, what I did, and what I learned.",
    },
    life: {
      headerEyebrow: "Life",
      headerTitle: "What does Duy's world look like?",
      headerDescription:
        "A photo journal — real photos, short captions, dates and places when I remember them. Real life, no perfection needed.",
      journalEyebrow: "Photo journal",
      journalTitle: "Photos are being prepared",
      metaDescription:
        "Life lately by Duy Ba Nguyen — a photo journal: travel, coffee, friends, community and everyday life.",
    },
    notes: {
      headerEyebrow: "Notes",
      headerTitle: "Duy's Corner",
      headerDescription:
        "I write about the things I'm thinking about, learning and curious about. Lots of words, lots of whitespace.",
      metaDescription:
        "Notes by Duy Ba Nguyen — things I'm thinking about, learning and curious about: Business, Marketing, Technology, Learning, Life.",
    },
    shop: {
      headerEyebrow: "Shop",
      headerTitle: "My Shop",
      noteSuffix:
        "The shop here is one corner of a personal brand — same type, same colors, never a full-blown ecommerce store.",
      metaDescription:
        "My Shop — things Duy Ba Nguyen creates, uses or wants to share.",
    },
    contact: {
      headerEyebrow: "Connect",
      headerTitle: "Let's connect",
      headerDescription:
        "What are you reaching out about? Pick one of the three — or all of them.",
      channelsEyebrow: "Channels",
      channelsTitle: "Find me here",
      channelsNote: "Contact channels are being updated — check back soon.",
      metaDescription:
        "Connect with Duy Ba Nguyen — Facebook, Instagram, LinkedIn, Email.",
    },
  },
  caseStudy: {
    eyebrow: "Case study",
    sampleEyebrow: "Case study · Layout sample",
    sampleBannerTitle: "Layout sample",
    sampleBannerNote:
      "This is a case-study frame to preview the structure — real content will be added when it's ready.",
    context: "Context",
    problem: "Problem",
    whatIDid: "What I did",
    tools: "Tools",
    result: "Result",
    lessons: "Lessons learned",
    metricsNote: "Metrics will be added once official numbers are available.",
    back: "Back to all work",
    imageAlt: "Project image area",
  },
  post: {
    back: "Back to Duy's Corner",
    coverAlt: "Post cover image area",
  },
  product: {
    physical: "Physical product",
    digital: "Digital product",
    affiliate: "Recommended product",
    back: "Back to Shop",
    imageAlt: "Product image area",
  },
  notFound: {
    eyebrow: "404",
    title: "Oops, you took a wrong turn.",
    text: "The page you're looking for doesn't exist — but my home is right here.",
    cta: "Back to homepage",
  },
};

export const dict: Record<Lang, Dictionary> = { vi, en };

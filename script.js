const moreMenu = document.getElementById('moreMenu');
const moreBtn = document.getElementById('moreBtn');

if (moreMenu && moreBtn) {
  const setMenuState = (isOpen) => {
    moreMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    moreBtn.setAttribute('aria-expanded', String(isOpen));
  };

  const closeMenu = () => {
    setMenuState(false);
  };

  moreBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    setMenuState(!moreMenu.classList.contains('open'));
  });

  moreMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      moreBtn.focus();
    }
  });
}

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const scrollToTarget = (top, behavior) => {
  const scroller = document.scrollingElement || document.documentElement;
  const targetTop = Math.max(0, top);
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  const setScrollTop = (nextTop) => {
    scroller.scrollTop = nextTop;
    document.documentElement.scrollTop = nextTop;
    document.body.scrollTop = nextTop;
    window.scrollTo(0, nextTop);
  };

  document.documentElement.style.scrollBehavior = 'auto';

  if (behavior === 'auto') {
    setScrollTop(targetTop);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
    return;
  }

  const startTop = window.scrollY || scroller.scrollTop || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const distance = targetTop - startTop;
  const duration = 520;
  const startTime = performance.now();
  const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    setScrollTop(startTop + distance * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    }
  };

  requestAnimationFrame(step);
};

const scrollCues = document.querySelectorAll('.hero-scroll-cue,.continue-scroll-cue');
scrollCues.forEach((scrollCue) => {
  scrollCue.addEventListener('click', (event) => {
    const targetId = scrollCue.getAttribute('href');
    const target = targetId && targetId.startsWith('#') ? document.querySelector(targetId) : null;
    if (!target) return;
    event.preventDefault();
    const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - scrollMargin;
    const behavior = motionQuery.matches ? 'auto' : 'smooth';
    scrollToTarget(targetTop, behavior);
    history.pushState(null, '', targetId);
  });
});

const initSoftwareHero = () => {
  const videoIntro = document.querySelector('.software-video-intro');
  const video = document.getElementById('softwareHeroVideo');
  const videoSource = video?.querySelector('source');
  const exploreButton = document.querySelector('.software-video-explore');
  const soundButton = document.querySelector('.software-video-sound');

  if (!videoIntro || !exploreButton) return;

  const loadHeroVideo = () => {
    if (!video || !videoSource) return;
    const sourcePath = videoSource.dataset.src;
    video.preload = 'auto';
    video.loop = true;
    if (sourcePath && videoSource.getAttribute('src') !== sourcePath) {
      videoSource.setAttribute('src', sourcePath);
      video.load();
    }
  };

  const playHeroVideo = () => {
    if (!video) return;
    loadHeroVideo();
    video.play().catch(() => {});
  };

  const maintainSoftLoop = () => {
    if (!video) return;
    video.loop = true;
  };

  const showSoftwareContent = ({ updateHash = true } = {}) => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.classList.add('software-content-active');
    const targetTop = videoIntro.offsetHeight;
    scrollToTarget(targetTop, 'smooth');

    if (updateHash) {
      history.replaceState(null, '', '#software-content');
    }
  };

  exploreButton.addEventListener('click', (event) => {
    event.preventDefault();
    showSoftwareContent();
  });

  soundButton?.addEventListener('click', () => {
    if (!video) return;
    const nextMuted = !video.muted ? true : false;
    video.muted = nextMuted;
    video.volume = 0.72;
    soundButton.classList.toggle('is-on', !nextMuted);
    soundButton.setAttribute('aria-pressed', String(!nextMuted));
    soundButton.setAttribute('aria-label', nextMuted ? 'Turn sound on' : 'Turn sound off');
    playHeroVideo();
  });

  if (window.location.hash === '#software-content') {
    document.body.classList.add('software-content-active');
  }
  maintainSoftLoop();
  playHeroVideo();
};

const translationEntries = [
  ['site.name', 'Sifaks Ousmail', 'Sifaks Ousmail', 'Sifaks Ousmail'],
  ['site.logoAlt', 'Sifaks Ousmail logo', 'Logo de Sifaks Ousmail', 'Sifaks Ousmail 标志'],
  ['site.copyright', '© 2026 Sifaks Ousmail', '© 2026 Sifaks Ousmail', '© 2026 Sifaks Ousmail'],
  ['nav.home', 'Home', 'Accueil', '首页'],
  ['nav.background', 'About', 'À propos', '关于我'],
  ['nav.research', 'Research', 'Recherche', '研究'],
  ['nav.projects', 'Projects', 'Projets', '项目'],
  ['nav.publications', 'Publications', 'Publications', '出版物'],
  ['nav.blog', 'Blog', 'Blog', '博客'],
  ['nav.contact', 'Contact', 'Contact', '联系'],
  ['nav.more', 'More', 'Plus', '更多'],
  ['nav.mainLinks', 'Main links', 'Liens principaux', '主要链接'],
  ['nav.internationalProfile', 'International Profile', 'Profil international', '国际简介'],
  ['nav.softwareCtaTitle', 'SIFAKS © Software', 'SIFAKS © Software', 'SIFAKS © Software'],
  ['nav.softwareCtaSub', 'Language learning app', 'Application d’apprentissage des langues', '语言学习应用'],
  ['nav.moreLinks', 'More links', 'Autres liens', '更多链接'],
  ['country.china', 'China', 'Chine', '中国'],
  ['country.ukShort', 'UK', 'Royaume-Uni', '英国'],
  ['country.france', 'France', 'France', '法国'],
  ['common.learnMore', 'Learn more', 'En savoir plus', '了解更多'],
  ['common.emailLabel', 'Email: hello@sifaks.com', 'E-mail : hello@sifaks.com', '邮箱：hello@sifaks.com'],
  ['common.emailMe', 'Email me', 'M’écrire', '给我发邮件'],
  ['home.name', 'Sifaks Ousmail', 'Sifaks Ousmail', 'Sifaks Ousmail'],
  ['home.official', 'Official Website', 'Site officiel', '官方网站'],
  ['home.profileAlt', 'Portrait of Sifaks Ousmail', 'Portrait de Sifaks Ousmail', 'Sifaks Ousmail 肖像'],
  ['home.lead', 'French researcher in SLA and AI-assisted language education.', 'Chercheur français en acquisition des langues secondes et éducation aux langues assistée par IA.', '法国第二语言习得与 AI 辅助语言教育研究者。'],
  ['home.note', 'This site is a growing space for language and linguistics lovers, connecting research, multilingual education, and practical pathways for Chinese, English, and French language learning.', 'Ce site est un espace en développement pour les passionnés de langues et de linguistique, reliant recherche, éducation multilingue et parcours pratiques pour l’apprentissage du chinois, de l’anglais et du français.', '本站是一个面向语言与语言学爱好者的成长空间，连接研究、多语教育以及中文、英语和法语学习的实践路径。'],
  ['home.viewBackground', 'View background', 'Voir le parcours', '查看背景'],
  ['home.letsGo', 'Let’s go', 'C’est parti', '开始'],
  ['home.letsGoAria', 'Scroll to software preview', 'Faire défiler vers l’aperçu logiciel', '滚动到软件预览'],
  ['home.continueExplore', 'Continue exploring', 'Continuer l’exploration', '继续浏览'],
  ['home.continueExploreAria', 'Continue to external academic profiles', 'Continuer vers les profils académiques externes', '继续到外部学术主页'],
  ['home.overviewTitle', 'Academic Profile', 'Profil académique', '学术简介'],
  ['home.cardResearchKicker', 'Core interests', 'Intérêts principaux', '核心兴趣'],
  ['home.researchCardTitle', 'Research Areas', 'Axes de recherche', '研究领域'],
  ['home.researchCard', 'Research interests across applied linguistics, second language acquisition, language policy, and AI-assisted language learning. This section outlines the broad academic areas shaping the site.', 'Des intérêts de recherche en linguistique appliquée, acquisition des langues secondes, politique linguistique et apprentissage des langues assisté par l’IA. Cette section présente les grands axes académiques du site.', '研究兴趣涵盖应用语言学、第二语言习得、语言政策和人工智能辅助语言学习。本部分概述塑造本站的主要学术方向。'],
  ['home.cardProfileKicker', 'Academic path', 'Parcours académique', '学术路径'],
  ['home.profileCardTitle', 'International Academic Profile', 'Profil académique international', '国际学术简介'],
  ['home.profileCard', 'An international academic path connecting France, the United Kingdom, and China through French language learning, Chinese language learning, Cambridge, and Shanghai.', 'Un parcours académique international reliant la France, le Royaume-Uni et la Chine à travers l’apprentissage du français, du chinois, Cambridge et Shanghai.', '一条连接法国、英国和中国的国际学术路径，涉及法语学习、中文学习、剑桥和上海。'],
  ['home.cardOutputsKicker', 'Ongoing work', 'Travaux en cours', '持续工作'],
  ['home.outputsCardTitle', 'Projects & Publications', 'Projets et publications', '项目与出版物'],
  ['home.outputsCard', 'Incoming project work connected to multilingual education, FLE, pronunciation learning, and more.', 'Travaux de projet à venir liés à l’éducation multilingue, au FLE, à l’apprentissage de la prononciation, et plus encore.', '即将开展的项目工作，连接多语教育、对外法语、发音学习等方向。'],
  ['home.cardBlogKicker', 'Notes', 'Notes', '笔记'],
  ['home.blogCardTitle', 'Blog & Reflections', 'Blog et réflexions', '博客与思考'],
  ['home.blogCard', 'A reflection space for language learning and ideas emerging from academic work. Dev notes are also posted here.', 'Un espace de réflexion sur l’apprentissage des langues et les idées issues du travail académique. Des notes de développement y sont aussi publiées.', '一个记录语言学习和学术工作中产生的想法的空间，也会发布一些开发笔记。'],
  ['home.learnMoreArrow', 'Learn more →', 'En savoir plus →', '了解更多 →'],
  ['home.focusTitle', 'Research Focus', 'Axes de recherche', '研究重点'],
  ['home.focusApplied', 'Applied Linguistics', 'Linguistique appliquée', '应用语言学'],
  ['home.focusEducation', 'Language Education', 'Éducation aux langues', '语言教育'],
  ['home.focusSla', 'Second Language Acquisition', 'Acquisition des langues secondes', '第二语言习得'],
  ['home.focusAi', 'AI-assisted Language Learning', 'Apprentissage des langues assisté par l’IA', '人工智能辅助语言学习'],
  ['home.focusChinese', 'Chinese Language Learning', 'Apprentissage du chinois', '中文学习'],
  ['home.softwareKicker', 'Software preview', 'Aperçu logiciel', '软件预览'],
  ['home.softwareTitle', 'AI Language Software — Dev Preview', 'Logiciel linguistique IA — aperçu dev', 'AI 语言软件 — 开发预览'],
  ['home.softwareCopy', 'Experimental software by Sifaks Ousmail for AI-assisted pronunciation feedback and language learning.', 'Logiciel expérimental de Sifaks Ousmail pour le feedback de prononciation assisté par l’IA et l’apprentissage des langues.', 'Sifaks Ousmail 的实验性软件，用于 AI 辅助发音反馈和语言学习。'],
  ['home.softwareLink', 'Open software preview →', 'Ouvrir l’aperçu logiciel →', '打开软件预览 →'],
  ['home.appLink', 'Open app preview →', 'Ouvrir l’aperçu de l’app →', '打开应用预览 →'],
  ['home.academicProfiles', 'External Academic Profiles', 'Profils académiques externes', '外部学术主页'],
  ['home.githubTitle', 'GitHub', 'GitHub', 'GitHub'],
  ['home.githubText', 'Sifaks Ousmail’s GitHub profile for software projects, gaming projects, and other code experiments.', 'Le profil GitHub de Sifaks Ousmail rassemble des projets logiciels, des projets liés au jeu vidéo et d’autres expérimentations de code.', 'Sifaks Ousmail 的 GitHub 主页展示软件项目、游戏相关项目和其他代码实验。'],
  ['home.githubLink', 'Visit GitHub profile →', 'Visiter le profil GitHub →', '访问 GitHub 主页 →'],
  ['home.githubAria', 'Visit Sifaks Ousmail GitHub profile', 'Visiter le profil GitHub de Sifaks Ousmail', '访问 Sifaks Ousmail 的 GitHub 主页'],
  ['footer.githubAria', 'Visit Sifaks Ousmail GitHub profile', 'Visiter le profil GitHub de Sifaks Ousmail', '访问 Sifaks Ousmail 的 GitHub 主页'],
  ['background.title', 'About', 'À propos', '关于我'],
  ['background.pill', 'Academic Path', 'Parcours académique', '学术路径'],
  ['background.subtitle', 'An academic journey across France, the United Kingdom, and China.', 'Un parcours académique entre la France, le Royaume-Uni et la Chine.', '横跨法国、英国和中国的学术旅程。'],
  ['background.heading', 'Education', 'Éducation', '教育'],
  ['background.introA', 'I usually go by <strong>Sifaks</strong>, or <strong>Danny</strong> in English — and <strong>邬熙汐</strong> in Chinese. Take your pick. I like languages, and I like figuring out <em>how</em> we learn them even more. That’s probably how I reached a near-native level in Chinese (Mandarin — not every dialect, not yet). When I’m not studying languages, I build things: my other passion is sharing how to learn efficiently, and I hope you find something useful here.', 'Je me fais généralement appeler <strong>Sifaks</strong>, ou <strong>Danny</strong> en anglais — et <strong>邬熙汐</strong> en chinois. Au choix. J’aime les langues, et j’aime encore plus comprendre <em>comment</em> on les apprend. C’est sans doute ainsi que j’ai atteint un niveau quasi natif en chinois (le mandarin — pas encore tous les dialectes). Quand je n’étudie pas les langues, je construis des choses : mon autre passion est de partager comment apprendre efficacement, et j’espère que vous trouverez quelque chose d’utile ici.', '我通常被称为 <strong>Sifaks</strong>，英文名 <strong>Danny</strong>，中文名 <strong>邬熙汐</strong>。随你喜欢。我喜欢语言，更喜欢研究我们是<em>如何</em>学习语言的。这大概就是我把中文（普通话——还没掌握所有方言）学到接近母语水平的原因。不研究语言的时候，我会做点东西：我的另一份热情是分享如何高效学习，希望你能在这里找到有用的内容。'],
  ['background.introB', 'Fun fact: I can do a backflip on ice, and I once hit Challenger in League of Legends. Each happened only once.', 'Anecdote : je sais faire un salto arrière sur glace, et j’ai atteint une fois le rang Challenger sur League of Legends. Chacun n’est arrivé qu’une seule fois.', '有趣的是：我会在冰上做后空翻，还曾在《英雄联盟》里打到过最强王者（Challenger）。两件事都只发生过一次。'],
  ['background.phd', 'PhD', 'Doctorat', '博士'],
  ['background.masters', 'Master’s', 'Master', '硕士'],
  ['background.bachelors', 'Bachelor’s', 'Licence', '本科'],
  ['background.phdDegree', 'PhD - Language Policy & Language Education', 'Doctorat - Politique linguistique et éducation aux langues', '博士 - 语言政策与语言教育'],
  ['background.phdSchool', 'Shanghai International Studies University · Shanghai, China', 'Université des études internationales de Shanghai · Shanghai, Chine', '上海外国语大学 · 中国上海'],
  ['background.phdField', 'Doctoral work connecting language policy, language education, and technology.', 'Travail doctoral reliant politique linguistique, éducation aux langues et technologie.', '博士研究连接语言政策、语言教育和技术。'],
  ['background.mphilDegree', 'MPhil - Research in Second Language Education', 'MPhil - Recherche en éducation aux langues secondes', '哲学硕士 - 第二语言教育研究'],
  ['background.cambridgeSchool', 'University of Cambridge · Cambridge, United Kingdom', 'Université de Cambridge · Cambridge, Royaume-Uni', '剑桥大学 · 英国剑桥'],
  ['background.mphilField', 'Faculty of Education — SLA research and applied linguistics.', 'Faculty of Education — recherche en ALS et linguistique appliquée.', '教育学院 — 第二语言习得研究与应用语言学。'],
  ['background.fleDegree', 'Master FLE - Français Langue Étrangère', 'Master FLE - Français langue étrangère', '硕士 - 对外法语'],
  ['background.sorbonneSchool', 'Sorbonne Nouvelle - Paris III · Paris, France', 'Sorbonne Nouvelle - Paris III · Paris, France', '巴黎第三大学 · 法国巴黎'],
  ['background.fleField', 'Didactique des langues - French as a foreign language.', 'Didactique des langues - français langue étrangère.', '语言教学法 - 对外法语。'],
  ['background.baDegree', 'Bachelor’s - Foreign and Regional Languages, Literatures, and Civilizations (Chinese Language Studies)', 'Licence - Langues, littératures et civilisations étrangères et régionales (études chinoises)', '本科 - 外国语言、文学与区域文明（中文研究）'],
  ['background.parisSchool', 'Université Paris Cité · Paris, France', 'Université Paris Cité · Paris, France', '巴黎西岱大学 · 法国巴黎'],
  ['background.baField', 'Undergraduate studies in Chinese language, linguistics, language sciences, and history.', 'Études de licence en chinois, linguistique, sciences du langage et histoire.', '本科阶段学习中文、语言学、语言科学和历史。'],
  ['background.skills', 'Language Skills', 'Compétences linguistiques', '语言能力'],
  ['background.certified', 'Certified Language proficiency', 'Compétences linguistiques certifiées', '认证语言能力'],
  ['background.english', 'English', 'Anglais', '英语'],
  ['background.chinese', 'Chinese', 'Chinois', '中文'],
  ['background.ielts', 'C2 IELTS (8.5)', 'C2 IELTS (8.5)', 'C2 雅思（8.5）'],
  ['background.hsk', 'HSK 6 · 270', 'HSK 6 · 270', 'HSK 6 · 270'],
  ['background.ieltsDesc', 'Advanced English proficiency for academic research.', 'Maîtrise avancée de l’anglais pour la recherche académique.', '高级英语能力，支持学术研究。'],
  ['background.hskDesc', 'Advanced Chinese proficiency.', 'Maîtrise avancée du chinois.', '高级中文能力。'],
  ['background.languageQuestion', 'Interested in language learning?', 'Intéressé par l’apprentissage des langues ?', '对语言学习感兴趣？'],
  ['background.blogLink', 'See my blog >>>', 'Voir mon blog >>>', '查看我的博客 >>>'],
  ['research.title', 'Research', 'Recherche', '研究'],
  ['research.pill', 'Research Focus', 'Axes de recherche', '研究重点'],
  ['research.lead', 'Applied linguistics, SLA, and AI-assisted language learning.', 'Linguistique appliquée, acquisition des langues secondes et apprentissage des langues assisté par l’IA.', '应用语言学、第二语言习得和 AI 辅助语言学习。'],
  ['research.areas', 'Research Areas', 'Axes de recherche', '研究领域'],
  ['research.core', 'Core Interests', 'Intérêts principaux', '核心兴趣'],
  ['research.sla', 'Second Language Acquisition', 'Acquisition des langues secondes', '第二语言习得'],
  ['research.slaDesc', 'Research interests include how learners develop grammar, pronunciation, and metalinguistic awareness across different stages of second language learning.', 'Mes intérêts portent notamment sur le développement de la grammaire, de la prononciation et de la conscience métalinguistique à différentes étapes de l’apprentissage.', '研究兴趣包括学习者在第二语言学习不同阶段如何发展语法、发音和元语言意识。'],
  ['research.applied', 'Applied Linguistics', 'Linguistique appliquée', '应用语言学'],
  ['research.appliedDesc', 'Applied linguistics provides the main framework for connecting language theory with teaching, learning, assessment, and multilingual communication.', 'La linguistique appliquée fournit le cadre principal pour relier théorie du langage, enseignement, apprentissage, évaluation et communication multilingue.', '应用语言学为连接语言理论、教学、学习、评估和多语交流提供主要框架。'],
  ['research.ai', 'AI-assisted Language Learning', 'Apprentissage des langues assisté par l’IA', '人工智能辅助语言学习'],
  ['research.aiDesc', 'How artificial intelligence can support feedback, pronunciation, and learner autonomy in language education.', 'Comment l’intelligence artificielle peut soutenir le feedback, la prononciation et l’autonomie des apprenants en éducation aux langues.', '人工智能如何在语言教育中支持反馈、发音和学习者自主性。'],
  ['research.fle', 'French as a Foreign Language / FLE', 'Français langue étrangère / FLE', '对外法语 / FLE'],
  ['research.fleDesc', 'FLE research focuses on French language learning, grammar acquisition, learner difficulties, and pedagogical approaches for French as an additional language.', 'La recherche en FLE porte sur l’apprentissage du français, l’acquisition grammaticale, les difficultés des apprenants et les approches pédagogiques du français langue additionnelle.', '对外法语研究关注法语学习、语法习得、学习困难以及作为附加语言的法语教学方法。'],
  ['research.policy', 'Language Policy and Language Education', 'Politique linguistique et éducation aux langues', '语言政策与语言教育'],
  ['research.policyDesc', 'How language policy shapes educational practice, multilingual learning environments, and access to language education.', 'Comment la politique linguistique façonne les pratiques éducatives, les environnements multilingues et l’accès à l’éducation aux langues.', '语言政策如何塑造教育实践、多语学习环境以及语言教育机会。'],
  ['projects.title', 'Projects', 'Projets', '项目'],
  ['projects.pill', 'My Projects', 'Mes projets', '我的项目'],
  ['projects.lead', 'Concrete project work and ongoing initiatives connected to research, teaching, and multilingual language education.', 'Travaux de projet concrets et initiatives en cours liés à la recherche, à l’enseignement et à l’éducation multilingue.', '与研究、教学和多语教育相关的具体项目与持续行动。'],
  ['projects.kicker', 'Academic Projects', 'Projets académiques', '学术项目'],
  ['projects.work', 'Project work', 'Travaux de projet', '项目工作'],
  ['projects.note', 'Practical and ongoing initiatives that translate research interests into focused project work.', 'Initiatives pratiques et en cours qui transforment les intérêts de recherche en projets ciblés.', '将研究兴趣转化为具体项目工作的实践性持续行动。'],
  ['projects.color', 'Colour-Coding and Metacognition for French Gender Learning', 'Codage couleur et métacognition pour l’apprentissage du genre en français', '法语性别学习中的颜色编码与元认知'],
  ['projects.colorDesc', 'A project direction focused on how visual support and metacognitive reflection may help learners notice and retain French grammatical gender.', 'Un axe de projet sur la manière dont le soutien visuel et la réflexion métacognitive peuvent aider les apprenants à repérer et retenir le genre grammatical français.', '一个关注视觉支持和元认知反思如何帮助学习者注意并记住法语语法性别的项目方向。'],
  ['projects.pronunciation', 'AI-assisted Pronunciation Learning', 'Apprentissage de la prononciation assisté par l’IA', '人工智能辅助发音学习'],
  ['projects.pronunciationDesc', 'Exploration of how AI tools can support pronunciation practice, feedback, and learner autonomy in second language acquisition.', 'Exploration de la manière dont les outils d’IA peuvent soutenir la pratique de la prononciation, le feedback et l’autonomie dans l’acquisition des langues secondes.', '探索 AI 工具如何在第二语言习得中支持发音练习、反馈和学习者自主性。'],
  ['projects.multilingual', 'Multilingual Language Education', 'Éducation multilingue', '多语语言教育'],
  ['projects.multilingualDesc', 'Work connecting French, English, and Chinese language learning with broader questions in language education and applied linguistics.', 'Travail reliant l’apprentissage du français, de l’anglais et du chinois à des questions plus larges en éducation aux langues et linguistique appliquée.', '将法语、英语和中文学习与语言教育和应用语言学中的更广泛问题联系起来。'],
  ['projects.software', 'SIFAKS © Software', 'SIFAKS © Software', 'SIFAKS © Software'],
  ['projects.softwareDesc', 'A short preview of EuuuhAI for French, an in-development AI-assisted French pronunciation training tool for Chinese native speakers.', 'Un court aperçu d’EuuuhAI for French, un outil d’entraînement à la prononciation française assisté par l’IA pour les apprenants sinophones.', '优法音 AI（EuuuhAI for French）的简短预览：面向中文母语者的 AI 辅助法语发音训练工具。'],
  ['projects.softwareLink', 'Open software preview →', 'Ouvrir l’aperçu logiciel →', '打开软件预览 →'],
  ['software.title', 'SIFAKS © Software', 'SIFAKS © Software', 'SIFAKS © Software'],
  ['software.status', 'On the App Store · Still learning manners', 'Sur l’App Store · apprend encore les bonnes manières', '已上线 App Store · 还在学习礼貌'],
  ['software.subtitle', 'French, English, and Chinese practice with pronunciation feedback, vocabulary cards, maps, and mouth-shape help. Tiny blue mascot included. Emotional support, not legal advice.', 'Pratique du français, de l’anglais et du chinois avec feedback de prononciation, cartes de vocabulaire, parcours et aide aux mouvements de bouche. Petite mascotte bleue incluse. Soutien moral, pas conseil juridique.', '法语、英语和中文练习，包含发音反馈、词汇卡片、学习地图和口型帮助。附赠蓝色小吉祥物。精神支持，不是法律建议。'],
  ['software.viewPreview', 'View preview', 'Voir l’aperçu', '查看预览'],
  ['software.backProjects', 'Back to projects', 'Retour aux projets', '返回项目'],
  ['software.aboutKicker', 'About the project', 'À propos du projet', '项目介绍'],
  ['software.aboutTitle', 'The app grew up', 'L’application a grandi', '应用长大了一点'],
  ['software.aboutText', 'The old page showed the French pronunciation prototype. The current app is broader: French, English, and Chinese, with speaking, vocabulary, and guided review.', 'L’ancienne page montrait le prototype de prononciation française. L’application actuelle est plus large : français, anglais et chinois, avec oral, vocabulaire et révision guidée.', '旧页面展示的是法语发音原型。现在的应用更完整：法语、英语和中文，包含口语、词汇和引导复习。'],
  ['software.aimsKicker', 'Learning support', 'Soutien à l’apprentissage', '学习支持'],
  ['software.aimsTitle', 'What it helps with', 'Ce que l’application aide à travailler', '它能帮助练习什么'],
  ['software.cardPronunciation', 'Pronunciation practice', 'Pratique de la prononciation', '发音练习'],
  ['software.cardPronunciationDesc', 'Record, hear yourself, compare, and try again. The microphone is patient. Very patient.', 'Enregistrez, écoutez-vous, comparez, puis recommencez. Le micro est patient. Très patient.', '录音、听自己、对比、再来一次。麦克风很有耐心。非常有耐心。'],
  ['software.cardFeedback', 'AI-assisted feedback', 'Feedback assisté par l’IA', 'AI 辅助反馈'],
  ['software.cardFeedbackDesc', 'Clear pronunciation signals for sounds and words, without pretending a score is a human teacher.', 'Des indications claires pour les sons et les mots, sans prétendre qu’un score remplace un professeur.', '为音素和单词提供清晰的发音信号，但不假装分数能代替老师。'],
  ['software.cardLearners', 'Vocabulary cards and maps', 'Cartes de vocabulaire et parcours', '词汇卡片和学习地图'],
  ['software.cardLearnersDesc', 'Swipe cards, save favorites, follow learning paths, and avoid the classic "open app, forget plan" situation.', 'Faites défiler les cartes, gardez les favoris, suivez des parcours, et évitez le classique "j’ouvre l’app et j’oublie mon plan".', '刷卡片、收藏、跟着地图学习，避免经典的“打开应用，然后忘记计划”。'],
  ['software.cardApplied', 'French, English, Chinese', 'Français, anglais, chinois', '法语、英语、中文'],
  ['software.cardAppliedDesc', 'The app now supports several language paths. The old EuuuhFrench name stays in the archive because history has screenshots.', 'L’application prend maintenant en charge plusieurs parcours de langues. L’ancien nom EuuuhFrench reste dans les archives parce que l’histoire a des captures d’écran.', '应用现在支持多条语言路径。旧名 EuuuhFrench 保留在归档里，因为历史有截图。'],
  ['software.previewKicker', 'Current app preview', 'Aperçu de l’application actuelle', '当前应用预览'],
  ['software.previewTitle', 'Screens from the actual app', 'Écrans de la vraie application', '真实应用截图'],
  ['software.galleryHome', 'English home', 'Accueil anglais', '英语首页'],
  ['software.galleryPractice', 'French home', 'Accueil français', '法语首页'],
  ['software.galleryFeedback', 'Pronunciation paths', 'Parcours de prononciation', '发音路径'],
  ['software.galleryHomeAlt', 'Sifaks: Language Learning English home screen in dark mode', 'Écran d’accueil anglais de Sifaks: Language Learning en mode sombre', 'Sifaks: Language Learning 英语深色模式首页'],
  ['software.galleryPracticeAlt', 'Sifaks: Language Learning French home screen in dark mode', 'Écran d’accueil français de Sifaks: Language Learning en mode sombre', 'Sifaks: Language Learning 法语深色模式首页'],
  ['software.galleryFeedbackAlt', 'Sifaks: Language Learning pronunciation practice choices for Chinese', 'Choix de pratique de prononciation chinoise dans Sifaks: Language Learning', 'Sifaks: Language Learning 中文发音练习选择页面'],
  ['software.practiceLabel', 'Practice sentence', 'Phrase d’entraînement', '练习句子'],
  ['software.mockCoach', 'AI pronunciation coach', 'Coach de prononciation IA', 'AI 发音教练'],
  ['software.mockMode', 'Prototype mode', 'Mode prototype', '原型模式'],
  ['software.mockTarget', 'Target sound · /ø/', 'Son cible · /ø/', '目标音 · /ø/'],
  ['software.mockAttempt', 'Attempt 1 of 4', 'Essai 1 sur 4', '第 1 / 4 次尝试'],
  ['software.mockHint', 'Listen carefully, then repeat the full sentence.', 'Écoutez attentivement, puis répétez la phrase complète.', '仔细听，然后重复完整句子。'],
  ['software.mockRecordNote', 'Preview mode does not score recordings yet.', 'Le mode aperçu ne note pas encore les enregistrements.', '预览模式尚不对录音评分。'],
  ['software.mockRecordButton', 'Record', 'Enregistrer', '录音'],
  ['software.mockFeedbackKicker', 'AI-assisted feedback preview', 'Aperçu du feedback assisté par l’IA', 'AI 辅助反馈预览'],
  ['software.mockFeedbackTitle', 'Clearer guidance after each attempt', 'Des indications plus claires après chaque essai', '每次尝试后获得更清晰的指导'],
  ['software.mockFeedbackBody', 'Focus on the rounded /ø/ vowel, keep the lips stable, then connect the sound inside the full sentence.', 'Concentrez-vous sur la voyelle arrondie /ø/, gardez les lèvres stables, puis reliez le son dans la phrase complète.', '注意圆唇元音 /ø/，保持嘴唇稳定，然后把这个音连接到完整句子中。'],
  ['software.mockDisclaimer', 'Real current screenshots. The old prototype has officially moved out of the main photo album.', 'Captures réelles de l’application actuelle. L’ancien prototype a officiellement quitté l’album principal.', '当前真实截图。旧原型已经正式搬出主相册。'],
  ['software.stepRecord', 'Record pronunciation', 'Enregistrer la prononciation', '录制发音'],
  ['software.stepFeedback', 'Receive focused feedback', 'Recevoir un feedback ciblé', '获得重点反馈'],
  ['software.stepRetry', 'Try again with clearer guidance', 'Réessayer avec des indications plus claires', '根据更清晰的指导再次尝试'],
  ['software.researchKicker', 'Research connection', 'Lien avec la recherche', '研究关联'],
  ['software.researchTitle', 'Language learning and research', 'Apprentissage des langues et recherche', '语言学习与研究'],
  ['software.focusTitle', 'Connected areas', 'Domaines associés', '相关领域'],
  ['software.focusSla', 'Applied linguistics', 'Linguistique appliquée', '应用语言学'],
  ['software.focusChineseLearners', 'Second language acquisition', 'Acquisition des langues secondes', '第二语言习得'],
  ['software.focusPronunciation', 'Speech analysis', 'Analyse de la parole', '语音分析'],
  ['software.focusAi', 'AI-assisted language learning', 'Apprentissage des langues assisté par l’IA', 'AI 辅助语言学习'],
  ['software.statusKicker', 'Development status', 'Statut de développement', '开发状态'],
  ['software.statusText', 'Current public name: Sifaks: Language Learning. Older posts may still say EuuuhFrench AI, because the app had a past life and we are not hiding the baby photos.', 'Nom public actuel : Sifaks: Language Learning. Les anciens articles peuvent encore dire EuuuhFrench AI, parce que l’application a eu une vie avant et on ne cache pas les photos de bébé.', '当前公开名称：Sifaks: Language Learning。旧文章可能仍写 EuuuhFrench AI，因为应用有过去，我们不隐藏小时候的照片。'],
  ['software.appStoreBadge', 'Available on the App Store', 'Disponible sur l’App Store', '已上线 App Store'],
  ['software.appLinkText', 'Open the app at app.sifaks.com', 'Ouvrir l’application sur app.sifaks.com', '在 app.sifaks.com 打开应用'],
  ['software.appLinkAria', 'Open Sifaks: Language Learning at app.sifaks.com', 'Ouvrir Sifaks: Language Learning sur app.sifaks.com', '在 app.sifaks.com 打开 Sifaks: Language Learning'],
  ['publications.title', 'Publications', 'Publications', '出版物'],
  ['publications.pill', 'My Research', 'Mes recherches', '我的研究'],
  ['publications.lead', 'A space for publications, academic writing, conference work, and research outputs in language policy, language education, and applied linguistics.', 'Un espace pour les publications, l’écriture académique, les communications et les productions de recherche en politique linguistique, éducation aux langues et linguistique appliquée.', '用于展示语言政策、语言教育和应用语言学领域的出版物、学术写作、会议工作和研究成果。'],
  ['publications.outputs', 'Research Outputs', 'Productions de recherche', '研究成果'],
  ['publications.writing', 'Academic writing', 'Écriture académique', '学术写作'],
  ['publications.note', 'Selected outputs will be added as they become available.', 'Des productions sélectionnées seront ajoutées lorsqu’elles seront disponibles.', '相关成果将在可用时陆续添加。'],
  ['publications.journal', 'Journal Articles', 'Articles de revue', '期刊论文'],
  ['publications.journalDesc', 'Peer-reviewed publications in applied linguistics, language education, second language acquisition, and related areas will be listed here.', 'Les publications évaluées par les pairs en linguistique appliquée, éducation aux langues, acquisition des langues secondes et domaines associés seront listées ici.', '应用语言学、语言教育、第二语言习得及相关领域的同行评审出版物将在此列出。'],
  ['publications.working', 'Working Papers', 'Documents de travail', '工作论文'],
  ['publications.workingDesc', 'Developing research texts and preliminary academic writing will appear here when appropriate.', 'Les textes de recherche en cours et les écrits académiques préliminaires apparaîtront ici lorsque cela sera approprié.', '正在发展的研究文本和初步学术写作将在适当时展示。'],
  ['publications.conference', 'Conference Presentations', 'Communications', '会议报告'],
  ['publications.conferenceDesc', 'Conference talks and academic presentations connected to French language learning, Chinese language learning, and AI-assisted language learning will be added here.', 'Les communications liées à l’apprentissage du français, du chinois et à l’apprentissage assisté par l’IA seront ajoutées ici.', '与法语学习、中文学习和人工智能辅助语言学习相关的会议报告将在此添加。'],
  ['publications.progress', 'Research in Progress', 'Recherche en cours', '进行中的研究'],
  ['publications.progressDesc', 'Ongoing research directions linked to Cambridge training and Shanghai International Studies University doctoral work will be summarized here.', 'Les orientations de recherche en cours liées à la formation à Cambridge et au doctorat à l’Université des études internationales de Shanghai seront résumées ici.', '与剑桥训练和上海外国语大学博士研究相关的持续研究方向将在此概述。'],
  ['blog.title', 'Blog', 'Blog', '博客'],
  ['blog.pill', 'My Thoughts', 'Mes réflexions', '我的思考'],
  ['blog.lead', 'A space for reflections on languages.<br>Also uploading the development of language learning software.<br>Not uploading my life on Dofus, tough.', 'Un espace de réflexion sur les langues.<br>Je partage aussi le développement de logiciels d’apprentissage des langues.<br>Mais pas ma vie sur Dofus, tant pis.', '一个关于语言的反思空间。<br>也会分享语言学习软件的开发。<br>但不会上传我在 Dofus 的人生，没办法。'],
  ['blogMvp.title', 'EuuuhFrench AI - From MVP Audio to a Pronunciation Coach', 'EuuuhFrench AI - De l’audio MVP à un coach de prononciation', 'EuuuhFrench AI——从 MVP 音频到发音教练'],
  ['blogMvp.lead', 'A short development story about turning a small pronunciation practice loop into a focused French pronunciation coach for Chinese-speaking learners.', 'Un court récit de développement : comment une petite boucle d’entraînement à la prononciation est devenue un coach de prononciation française pensé pour les apprenants sinophones.', '一个简短的开发故事：如何把一个小小的发音练习循环，打造成专为中文母语学习者设计的法语发音教练。'],
  ['blogMvp.intro', 'EuuuhFrench AI started with a deliberately narrow goal: help learners practise the French sounds that are often difficult when coming from Mandarin Chinese. It was not meant to become a full French course. The useful unit was smaller: listen, record, replay, notice one thing, and try again.', 'EuuuhFrench AI est parti d’un objectif volontairement restreint : aider les apprenants à travailler les sons français souvent difficiles lorsqu’on vient du mandarin. Il n’était pas censé devenir un cours de français complet. L’unité utile était plus petite : écouter, s’enregistrer, réécouter, remarquer une chose, puis réessayer.', 'EuuuhFrench AI 一开始的目标刻意很窄：帮助学习者练习从普通话出发时往往很难掌握的法语音。它并不打算成为一门完整的法语课程。真正有用的单元更小：听、录音、回放、注意一个细节，然后再试一次。'],
  ['blogMvp.loopTitle', 'The first useful loop', 'La première boucle utile', '第一个有用的循环'],
  ['blogMvp.loopText1', 'The earliest stable version was built around native French examples, learner recording, replay, and basic feedback. That loop mattered because pronunciation practice can become vague very quickly. A learner needs a model, a chance to produce the sound, and a way to compare the attempt with something concrete.', 'La première version stable reposait sur des exemples de français natif, l’enregistrement par l’apprenant, la réécoute et un retour de base. Cette boucle était importante car l’entraînement à la prononciation peut vite devenir flou. Un apprenant a besoin d’un modèle, d’une occasion de produire le son et d’un moyen de comparer sa tentative à quelque chose de concret.', '最早的稳定版本围绕法语母语示例、学习者录音、回放和基础反馈构建。这个循环很重要，因为发音练习很容易变得含糊。学习者需要一个范例、一个发出该音的机会，以及一种把自己的尝试与具体内容进行比较的方法。'],
  ['blogMvp.loopText2', 'From there, the app moved from demo-style feedback toward provider-backed pronunciation analysis. Speechace support made the feedback feel more grounded, but I kept the product wording careful. Automated pronunciation feedback can be useful, but it should not pretend to know everything a human teacher can hear.', 'Ensuite, l’application est passée d’un retour de démonstration à une analyse de prononciation appuyée par un prestataire. La prise en charge de Speechace a rendu le retour plus fiable, mais j’ai gardé une formulation prudente. Un retour de prononciation automatisé peut être utile, mais il ne doit pas prétendre entendre tout ce qu’un enseignant humain perçoit.', '在此基础上，应用从演示式反馈转向由服务商支持的发音分析。引入 Speechace 让反馈更有依据，但我在产品措辞上保持谨慎。自动化的发音反馈可能很有用，但它不应假装能听出人类老师所能听到的一切。'],
  ['blogMvp.wordsTitle', 'From words to guided practice', 'Des mots à la pratique guidée', '从单词到引导式练习'],
  ['blogMvp.wordsText1', 'The next step was content. Isolated sounds are useful, but learners also need words, sentences, and contrast pairs. Practice modes added more structure: quick lessons, word practice, sentence practice, and focused work on sounds such as /y/, /u/, /ø/, /œ/, and the French nasal vowels.', 'L’étape suivante a été le contenu. Les sons isolés sont utiles, mais les apprenants ont aussi besoin de mots, de phrases et de paires minimales. Les modes d’entraînement ont apporté plus de structure : leçons rapides, travail sur les mots, travail sur les phrases et exercices ciblés sur des sons comme /y/, /u/, /ø/, /œ/ et les voyelles nasales françaises.', '下一步是内容。孤立的音很有用，但学习者还需要单词、句子和对比对。练习模式增加了更多结构：快速课程、单词练习、句子练习，以及对 /y/、/u/、/ø/、/œ/ 等音和法语鼻元音的针对性训练。'],
  ['blogMvp.wordsText2', 'Nasal vowels became a major content milestone. They are difficult for many learners because the contrast is not only about one letter or one spelling pattern. The app gradually added examples, feedback paths, and mouth-shape support for sounds such as /ɑ̃/, /ɔ̃/, and /ɛ̃/.', 'Les voyelles nasales sont devenues un jalon de contenu majeur. Elles sont difficiles pour beaucoup d’apprenants car le contraste ne tient pas à une seule lettre ni à une seule graphie. L’application a progressivement ajouté des exemples, des parcours de retour et un soutien sur la forme de la bouche pour des sons comme /ɑ̃/, /ɔ̃/ et /ɛ̃/.', '鼻元音成为一个重要的内容里程碑。它们对许多学习者来说很难，因为区别不仅仅在于某个字母或某种拼写方式。应用逐步为 /ɑ̃/、/ɔ̃/、/ɛ̃/ 等音添加了示例、反馈路径和口型支持。'],
  ['blogMvp.progressTitle', 'Progress without noise', 'Des progrès sans bruit', '没有噪音的进步'],
  ['blogMvp.progressText1', 'As the practice bank grew, progress needed to become more useful. The app added local progress, optional account sync, Smart Review, daily practice planning, and per-sound signals. The purpose was not to turn learning into a scoreboard. It was to help the learner know what to practise next.', 'À mesure que la banque d’exercices grandissait, le suivi des progrès devait devenir plus utile. L’application a ajouté un suivi local, une synchronisation de compte optionnelle, la révision intelligente, une planification quotidienne et des indicateurs par son. Le but n’était pas de transformer l’apprentissage en tableau de scores, mais d’aider l’apprenant à savoir quoi travailler ensuite.', '随着练习库的增长，进度需要变得更有用。应用增加了本地进度、可选的账户同步、智能复习、每日练习计划和按音区分的信号。目的不是把学习变成计分板，而是帮助学习者知道接下来该练什么。'],
  ['blogMvp.progressText2', 'The progress work also made the app feel more complete: returning learners could see repetition history, review recent attempts, and move through short sessions without losing the thread of their practice.', 'Ce travail sur les progrès a aussi rendu l’application plus aboutie : les apprenants qui reviennent peuvent voir l’historique de leurs répétitions, revoir leurs tentatives récentes et enchaîner de courtes sessions sans perdre le fil de leur pratique.', '进度方面的改进也让应用更加完整：再次回来的学习者可以查看重复练习的历史、回顾最近的尝试，并在短时段内连续练习而不会打断节奏。'],
  ['blogMvp.nowTitle', 'Where the coach stands now', 'Où en est le coach aujourd’hui', '教练现在的状态'],
  ['blogMvp.nowText1', 'The current v1.10 direction is compact and practical. After recording, the learner sees the latest score, their own recording, the native model, one pronunciation feedback card, and optional history only when needed. Sound-specific tips are short and Mandarin-friendly. Mouth videos appear after repeated difficulty, not immediately for every attempt.', 'La direction actuelle, en v1.10, est compacte et pratique. Après l’enregistrement, l’apprenant voit le dernier score, son propre enregistrement, le modèle natif, une carte de retour de prononciation et l’historique seulement si nécessaire. Les conseils par son sont courts et adaptés aux sinophones. Les vidéos de bouche apparaissent après des difficultés répétées, et non immédiatement à chaque tentative.', '当前 v1.10 的方向紧凑而实用。录音后，学习者会看到最新分数、自己的录音、母语范例、一张发音反馈卡片，以及仅在需要时出现的历史记录。针对具体音的提示简短且照顾中文母语者。口型视频会在多次遇到困难后才出现，而不是每次尝试都立即显示。'],
  ['blogMvp.nowText2', 'This is the shape I want the app to keep: focused pronunciation practice, clear native audio, careful AI-assisted feedback, and a calm rhythm of repetition. It remains experimental and research-informed, but it is now much closer to a real pronunciation coach than a first MVP.', 'C’est la forme que je veux conserver pour l’application : un entraînement ciblé à la prononciation, un audio natif clair, un retour assisté par l’IA prudent et un rythme de répétition apaisé. Elle reste expérimentale et nourrie par la recherche, mais elle est désormais bien plus proche d’un véritable coach de prononciation que d’un premier MVP.', '这就是我希望应用保持的样子：专注的发音练习、清晰的母语音频、谨慎的 AI 辅助反馈，以及平稳的重复节奏。它仍是实验性的、以研究为依据，但如今已远比最初的 MVP 更接近一个真正的发音教练。'],
  ['blogMvp.changelogPointer', 'For readers who want the development archive rather than the story version, I also keep a concise changelog from the first idea to the current pronunciation coach polish.', 'Pour les lecteurs qui préfèrent l’archive de développement plutôt que la version récit, je tiens aussi un changelog concis, de la première idée jusqu’aux finitions actuelles du coach de prononciation.', '对于想看开发存档而非故事版本的读者，我还维护了一份简洁的更新日志，记录从最初的想法到当前发音教练打磨的全过程。'],
  ['blogMvp.changelogBtn', 'Read the changelog archive →', 'Lire l’archive du changelog →', '阅读更新日志存档 →'],
  ['blogMvp.appBtn', 'Open app preview', 'Ouvrir l’aperçu de l’app', '打开应用预览'],
  ['blogCl.title', 'EuuuhFrench AI Changelog - v0.0 to v1.10', 'Changelog EuuuhFrench AI - v0.0 à v1.10', 'EuuuhFrench AI 更新日志——v0.0 到 v1.10'],
  ['blogCl.lead', 'A public release archive for EuuuhFrench AI, from the first MVP audio loop to the current compact pronunciation coach.', 'Une archive publique des versions d’EuuuhFrench AI, de la première boucle audio MVP au coach de prononciation compact actuel.', 'EuuuhFrench AI 的公开版本存档，从最初的 MVP 音频循环到当前精简的发音教练。'],
  ['blogCl.intro1', 'EuuuhFrench AI now combines native French audio examples, learner recording replay, mouth-shape guidance, correction prompts, progress signals, and API-backed pronunciation assessment. Feedback wording has also been refined so unclear recordings receive useful guidance rather than misleading scores.', 'EuuuhFrench AI combine désormais des exemples audio de français natif, la réécoute des enregistrements de l’apprenant, un guidage sur la forme de la bouche, des invites de correction, des indicateurs de progrès et une évaluation de la prononciation appuyée par une API. La formulation des retours a aussi été affinée afin que les enregistrements peu clairs reçoivent des conseils utiles plutôt que des scores trompeurs.', 'EuuuhFrench AI 现在融合了法语母语音频示例、学习者录音回放、口型指导、纠正提示、进度信号，以及由 API 支持的发音评估。反馈措辞也经过优化，使不清晰的录音得到有用的指导，而不是具有误导性的分数。'],
  ['blogCl.intro2', 'This changelog keeps the public story readable. It does not list every commit. Instead, it follows the main release phases that changed what learners could actually do inside the app.', 'Ce changelog garde un récit public lisible. Il ne liste pas chaque commit. Il suit plutôt les principales phases de version qui ont changé ce que les apprenants pouvaient réellement faire dans l’application.', '这份更新日志力求让公开的故事易于阅读。它不会列出每一次提交，而是按照真正改变了学习者在应用内能做什么的主要版本阶段来展开。'],
  ['blogCl.v00Title', 'v0.0 - Idea and skeleton', 'v0.0 - Idée et squelette', 'v0.0 - 想法与骨架'],
  ['blogCl.v00Text1', 'The project began as a focused pronunciation tool for Chinese-speaking learners of French. The aim was deliberately narrow: not a full French course, but short, repeatable practice for difficult sounds.', 'Le projet a commencé comme un outil de prononciation ciblé pour les apprenants sinophones de français. L’objectif était volontairement restreint : non pas un cours de français complet, mais une pratique courte et répétable des sons difficiles.', '项目最初是一个专为中文母语法语学习者设计的发音工具。目标刻意很窄：不是一门完整的法语课程，而是针对难点音的简短、可重复的练习。'],
  ['blogCl.v00Text2', 'The early skeleton established the app direction: lesson targets, native audio planning, recording and feedback routes, local progress ideas, and a future path for real pronunciation assessment.', 'Le squelette initial a défini la direction de l’application : objectifs de leçon, planification de l’audio natif, parcours d’enregistrement et de retour, idées de progrès local et une voie future vers une véritable évaluation de la prononciation.', '早期骨架确定了应用方向：课程目标、母语音频规划、录音与反馈流程、本地进度的设想，以及未来实现真正发音评估的路径。'],
  ['blogCl.v01Title', 'v0.1 - First working MVP audio loop', 'v0.1 - Première boucle audio MVP fonctionnelle', 'v0.1 - 首个可用的 MVP 音频循环'],
  ['blogCl.v01Text1', 'The first stable MVP made the core learning flow usable. Learners could choose a target sound, listen to a native French example, record their own attempt, replay it, receive basic feedback, and try again.', 'Le premier MVP stable a rendu le flux d’apprentissage de base utilisable. Les apprenants pouvaient choisir un son cible, écouter un exemple de français natif, enregistrer leur propre tentative, la réécouter, recevoir un retour de base et réessayer.', '首个稳定的 MVP 让核心学习流程可用。学习者可以选择目标音、听母语法语示例、录下自己的尝试、回放、获得基础反馈，然后再试一次。'],
  ['blogCl.v01Text2', 'This version proved the main interaction: pronunciation practice needs a model, a learner attempt, a replay moment, and a small correction prompt. Without that loop, extra features would not matter.', 'Cette version a validé l’interaction principale : l’entraînement à la prononciation a besoin d’un modèle, d’une tentative de l’apprenant, d’un moment de réécoute et d’une petite invite de correction. Sans cette boucle, les fonctions supplémentaires n’auraient pas d’importance.', '这个版本验证了主要交互：发音练习需要一个范例、一次学习者的尝试、一个回放时刻和一个小小的纠正提示。没有这个循环，额外的功能都无关紧要。'],
  ['blogCl.v02Title', 'v0.2 to v0.6 - Assessment, onboarding, and mouth-shape support', 'v0.2 à v0.6 - Évaluation, prise en main et soutien sur la forme de la bouche', 'v0.2 到 v0.6 - 评估、引导上手与口型支持'],
  ['blogCl.v02Text1', 'The next phase made the prototype less like a demo and more like a learning tool. Recording behavior became more stable, Speechace-backed assessment was prepared and calibrated, and feedback became more careful about target detection.', 'La phase suivante a rendu le prototype moins proche d’une démo et plus proche d’un outil d’apprentissage. Le comportement d’enregistrement est devenu plus stable, l’évaluation appuyée par Speechace a été préparée et calibrée, et le retour est devenu plus prudent quant à la détection de la cible.', '下一阶段让原型不再像演示，而更像一个学习工具。录音行为更加稳定，基于 Speechace 的评估得到准备和校准，反馈在目标音识别上也更加谨慎。'],
  ['blogCl.v02Text2', 'Onboarding and guided practice were also improved so a new learner could understand what to do without reading a long explanation. Mouth-shape help started with French /y/ and gradually moved toward broader visual guidance for difficult sounds.', 'La prise en main et la pratique guidée ont aussi été améliorées pour qu’un nouvel apprenant comprenne quoi faire sans lire une longue explication. L’aide sur la forme de la bouche a commencé par le /y/ français et s’est progressivement étendue à un guidage visuel plus large pour les sons difficiles.', '引导上手和引导式练习也得到改进，让新学习者无需阅读冗长说明就能明白该做什么。口型帮助从法语 /y/ 开始，逐步扩展为针对难点音的更广泛的视觉指导。'],
  ['blogCl.v10Title', 'v1.0 - Polished MVP', 'v1.0 - MVP peaufiné', 'v1.0 - 打磨后的 MVP'],
  ['blogCl.v10Text1', 'Version 1.0 was the first version that felt like a real app. It combined native French audio examples, learner recording, replay, pronunciation feedback, retry support, mouth-shape guidance, a basic lesson chooser, a completion flow, a progress page, and clearer privacy and terms pages.', 'La version 1.0 a été la première à ressembler à une vraie application. Elle combinait des exemples audio de français natif, l’enregistrement par l’apprenant, la réécoute, un retour de prononciation, la prise en charge des nouvelles tentatives, un guidage sur la forme de la bouche, un sélecteur de leçons de base, un flux de fin, une page de progrès et des pages de confidentialité et de conditions plus claires.', '1.0 版本是第一个感觉像真正应用的版本。它整合了法语母语音频示例、学习者录音、回放、发音反馈、重试支持、口型指导、基础课程选择器、完成流程、进度页面，以及更清晰的隐私和条款页面。'],
  ['blogCl.v10Text2', 'If real pronunciation scoring is not available, the app can use a preview mode so the learning flow remains usable while avoiding false assessment claims. The assessment layer was improved for target detection and feedback reliability, but it remains AI-assisted pronunciation feedback, not a claim of a proprietary AI model, and not a replacement for teaching.', 'Si une véritable notation de la prononciation n’est pas disponible, l’application peut utiliser un mode aperçu afin que le flux d’apprentissage reste utilisable tout en évitant de fausses affirmations d’évaluation. La couche d’évaluation a été améliorée pour la détection de la cible et la fiabilité du retour, mais elle reste un retour de prononciation assisté par l’IA, sans prétendre à un modèle d’IA propriétaire ni remplacer l’enseignement.', '如果无法获得真正的发音评分，应用可以使用预览模式，让学习流程保持可用，同时避免虚假的评估宣称。评估层在目标音识别和反馈可靠性方面有所改进，但它仍然是 AI 辅助的发音反馈，并不宣称拥有专有 AI 模型，也不能替代教学。'],
  ['blogCl.v10Text3', '<strong>Prototype status:</strong> v1.0 was the first working public MVP. It was still early, but the core learning flow was usable: native audio, recording, replay, pronunciation feedback, retry support, and video guidance for difficult sounds.', '<strong>État du prototype :</strong> la v1.0 était le premier MVP public fonctionnel. C’était encore tôt, mais le flux d’apprentissage de base était utilisable : audio natif, enregistrement, réécoute, retour de prononciation, prise en charge des nouvelles tentatives et guidage vidéo pour les sons difficiles.', '<strong>原型状态：</strong>v1.0 是第一个可用的公开 MVP。当时仍很早期，但核心学习流程已可用：母语音频、录音、回放、发音反馈、重试支持，以及针对难点音的视频指导。'],
  ['blogCl.v11Title', 'v1.1 to v1.3 - Practice modes and nasal vowels', 'v1.1 à v1.3 - Modes d’entraînement et voyelles nasales', 'v1.1 到 v1.3 - 练习模式与鼻元音'],
  ['blogCl.v11Text1', 'After the MVP, the app expanded beyond isolated word practice. It added Quick Lesson, Word Practice, and Sentence Practice so learners could move between short sound work and more contextual French examples.', 'Après le MVP, l’application a dépassé la simple pratique de mots isolés. Elle a ajouté Leçon rapide, Pratique des mots et Pratique des phrases pour que les apprenants puissent alterner entre un travail court sur les sons et des exemples français plus contextualisés.', '在 MVP 之后，应用超越了孤立单词练习。它增加了快速课程、单词练习和句子练习，让学习者能够在简短的音节训练和更具语境的法语示例之间切换。'],
  ['blogCl.v11Text2', 'Nasal vowels became a major content milestone. The app added more practice for /ɑ̃/, /ɔ̃/, and /ɛ̃/, including better examples, feedback paths, and mouth-shape support. This mattered because nasal vowels are not just a spelling issue; they require learners to notice a different sound category.', 'Les voyelles nasales sont devenues un jalon de contenu majeur. L’application a ajouté davantage d’exercices pour /ɑ̃/, /ɔ̃/ et /ɛ̃/, avec de meilleurs exemples, des parcours de retour et un soutien sur la forme de la bouche. C’était important car les voyelles nasales ne sont pas qu’une question d’orthographe : elles demandent à l’apprenant de remarquer une catégorie de son différente.', '鼻元音成为一个重要的内容里程碑。应用为 /ɑ̃/、/ɔ̃/、/ɛ̃/ 增加了更多练习，包括更好的示例、反馈路径和口型支持。这很重要，因为鼻元音不只是拼写问题，它要求学习者注意一种不同的音类。'],
  ['blogCl.v14Title', 'v1.4 to v1.5 - Progress, contrast practice, and Smart Review', 'v1.4 à v1.5 - Progrès, paires minimales et révision intelligente', 'v1.4 到 v1.5 - 进度、对比练习与智能复习'],
  ['blogCl.v14Text1', 'The app then became a more complete learning product. It added /u/ versus /y/ contrast work, local progress, optional account sync, PWA support, onboarding tutorial polish, streaks, and clearer privacy messaging.', 'L’application est ensuite devenue un produit d’apprentissage plus complet. Elle a ajouté le travail de contraste /u/ contre /y/, le progrès local, une synchronisation de compte optionnelle, la prise en charge PWA, des finitions du tutoriel d’accueil, des séries et un message de confidentialité plus clair.', '随后应用成为一个更完整的学习产品。它增加了 /u/ 与 /y/ 的对比训练、本地进度、可选的账户同步、PWA 支持、上手教程的打磨、连续打卡，以及更清晰的隐私说明。'],
  ['blogCl.v14Text2', 'Smart Review changed the feel of the app. Instead of only asking learners to pick something manually, EuuuhFrench AI began suggesting the next useful practice step. Contrast ladders such as rue/roue, tu/tout, peu/peur, deux/doux, and vin/vent made practice more precise.', 'La révision intelligente a changé le ressenti de l’application. Au lieu de demander seulement à l’apprenant de choisir manuellement, EuuuhFrench AI a commencé à suggérer la prochaine étape de pratique utile. Des échelles de contraste comme rue/roue, tu/tout, peu/peur, deux/doux et vin/vent ont rendu la pratique plus précise.', '智能复习改变了应用的体验。EuuuhFrench AI 不再只让学习者手动选择，而是开始建议下一步有用的练习。诸如 rue/roue、tu/tout、peu/peur、deux/doux 和 vin/vent 这样的对比阶梯让练习更精准。'],
  ['blogCl.v16Title', 'v1.6 to v1.9 - Feedback quality, progress insight, and trust', 'v1.6 à v1.9 - Qualité du retour, suivi des progrès et confiance', 'v1.6 到 v1.9 - 反馈质量、进度洞察与信任'],
  ['blogCl.v16Text1', 'This phase focused on making the coach more reliable and less harsh. Feedback became more pedagogical, especially for nasal contrasts, short words, unclear recordings, and provider-related uncertainty.', 'Cette phase visait à rendre le coach plus fiable et moins sévère. Le retour est devenu plus pédagogique, en particulier pour les contrastes nasaux, les mots courts, les enregistrements peu clairs et les incertitudes liées au prestataire.', '这一阶段着重让教练更可靠、更不严苛。反馈变得更具教学性，尤其针对鼻音对比、短词、不清晰的录音以及与服务商相关的不确定性。'],
  ['blogCl.v16Text2', 'The Progress page also became more useful: repetition levels, lesson history, streaks, sync status, per-sound stats, and a daily 5-minute coach plan helped learners understand what they had practised and what to repeat next.', 'La page Progrès est aussi devenue plus utile : niveaux de répétition, historique des leçons, séries, état de synchronisation, statistiques par son et un plan de coach quotidien de 5 minutes ont aidé les apprenants à comprendre ce qu’ils avaient travaillé et ce qu’il fallait répéter ensuite.', '进度页面也变得更有用：重复等级、课程历史、连续打卡、同步状态、按音统计，以及每日 5 分钟的教练计划，帮助学习者了解自己练过什么、接下来该重复什么。'],
  ['blogCl.v16Text3', 'The trust work was important. Native audio reliability was checked, legal/about/progress copy was polished, and the app stayed careful about what automated pronunciation scoring can and cannot claim.', 'Le travail sur la confiance était important. La fiabilité de l’audio natif a été vérifiée, les textes juridiques/à propos/progrès ont été peaufinés, et l’application est restée prudente sur ce que la notation automatisée de la prononciation peut et ne peut pas affirmer.', '信任方面的工作很重要。母语音频的可靠性经过检查，法律/关于/进度文案得到打磨，应用也始终谨慎对待自动发音评分能与不能宣称的内容。'],
  ['blogCl.v110Title', 'v1.10 - Current pronunciation coach polish', 'v1.10 - Finitions actuelles du coach de prononciation', 'v1.10 - 当前发音教练的打磨'],
  ['blogCl.v110Text1', 'The current version is more compact and more focused. After recording, learners see the latest score, their own recording, the native speaker model, one pronunciation feedback card, collapsed attempt history, sound-specific Mandarin-friendly tips, and video support only after repeated difficulty.', 'La version actuelle est plus compacte et plus ciblée. Après l’enregistrement, les apprenants voient le dernier score, leur propre enregistrement, le modèle du locuteur natif, une carte de retour de prononciation, l’historique des tentatives replié, des conseils par son adaptés aux sinophones, et un soutien vidéo seulement après des difficultés répétées.', '当前版本更紧凑、更专注。录音后，学习者会看到最新分数、自己的录音、母语者范例、一张发音反馈卡片、折叠的尝试历史、针对具体音且照顾中文母语者的提示，以及仅在多次遇到困难后才出现的视频支持。'],
  ['blogCl.v110Text2', 'Pass scores stay clean. A weak first attempt gets short written help. A weak second attempt can unlock video. Repeated difficulty keeps video available and offers continue or review-later actions. No-score attempts can still show useful sound tips unless the issue is a provider or API failure.', 'Les scores réussis restent épurés. Une première tentative faible reçoit une courte aide écrite. Une deuxième tentative faible peut débloquer la vidéo. Des difficultés répétées maintiennent la vidéo disponible et proposent des actions « continuer » ou « revoir plus tard ». Les tentatives sans score peuvent tout de même afficher des conseils utiles, sauf si le problème vient d’une défaillance du prestataire ou de l’API.', '通过的分数保持简洁。第一次尝试较弱会得到简短的文字帮助。第二次尝试较弱可以解锁视频。反复遇到困难会持续提供视频，并给出「继续」或「稍后复习」的操作。即使没有分数的尝试也仍可显示有用的发音提示，除非问题出在服务商或 API 故障。'],
  ['blogCl.bridge', 'As of now, the project serves as a bridge between applied linguistics research and practical language education design: a focused pronunciation software for Chinese-speaking learners of French, built around concrete French pronunciation learning problems.', 'À ce jour, le projet sert de pont entre la recherche en linguistique appliquée et la conception pratique de l’éducation aux langues : un logiciel de prononciation ciblé pour les apprenants sinophones de français, construit autour de problèmes concrets d’apprentissage de la prononciation française.', '到目前为止，这个项目在应用语言学研究与实用语言教育设计之间架起了一座桥梁：一款专为中文母语法语学习者设计、围绕具体法语发音学习问题构建的发音软件。'],
  ['blogCl.techToggle', 'View technical changelog', 'Voir le changelog technique', '查看技术更新日志'],
  ['blogCl.techTitle', 'Technical changelog', 'Changelog technique', '技术更新日志'],
  ['blogCl.techIntro', 'These notes keep the development history compact, but closer to how the app is organized in code: routes, components, API boundaries, content files, tests, assets, and release checks.', 'Ces notes gardent l’historique de développement compact, mais plus proche de l’organisation de l’application dans le code : routes, composants, frontières d’API, fichiers de contenu, tests, ressources et vérifications de version.', '这些笔记让开发历史保持精简，但更贴近应用在代码中的组织方式：路由、组件、API 边界、内容文件、测试、资源和发布检查。'],
  ['blogCl.h3_01', 'v0.1 - MVP audio loop', 'v0.1 - Boucle audio MVP', 'v0.1 - MVP 音频循环'],
  ['blogCl.h3_02', 'v0.2 to v0.6 - Provider and guidance layer', 'v0.2 à v0.6 - Couche prestataire et guidage', 'v0.2 到 v0.6 - 服务商与指导层'],
  ['blogCl.h3_10', 'v1.0 - Polished MVP', 'v1.0 - MVP peaufiné', 'v1.0 - 打磨后的 MVP'],
  ['blogCl.h3_11', 'v1.1 to v1.3 - Practice modes and nasal vowels', 'v1.1 à v1.3 - Modes d’entraînement et voyelles nasales', 'v1.1 到 v1.3 - 练习模式与鼻元音'],
  ['blogCl.h3_14', 'v1.4 to v1.5 - Progress, account, and Smart Review', 'v1.4 à v1.5 - Progrès, compte et révision intelligente', 'v1.4 到 v1.5 - 进度、账户与智能复习'],
  ['blogCl.h3_16', 'v1.6 to v1.9 - Feedback quality and trust layer', 'v1.6 à v1.9 - Qualité du retour et couche de confiance', 'v1.6 到 v1.9 - 反馈质量与信任层'],
  ['blogCl.h3_110', 'v1.10 - Compact pronunciation coach', 'v1.10 - Coach de prononciation compact', 'v1.10 - 精简的发音教练'],
  ['blogCl.h3_checks', 'App release checks', 'Vérifications de version', '应用发布检查'],
  ['blogCl.storyBtn', 'Read the story version', 'Lire la version récit', '阅读故事版本'],
  ['blogCl.backBtn', 'Back to blog →', 'Retour au blog →', '返回博客 →'],
  ['blog.latestPost', 'Latest Post', 'Dernier article', '最新文章'],
  ['blog.developmentUpdate', 'Development update', 'Mise à jour du développement', '开发更新'],
  ['blog.featureTitle', 'EuuuhFrench AI v1.0 Development Update', 'EuuuhFrench AI v1.0 : mise à jour du développement', 'EuuuhFrench AI v1.0 开发更新'],
  ['blog.featureImageAria', 'Read EuuuhFrench AI v1.0 Development Update', 'Lire la mise à jour EuuuhFrench AI v1.0', '阅读 EuuuhFrench AI v1.0 开发更新'],
  ['blog.featureDesc', 'EuuuhFrench AI v1.0 is the first working MVP, with native French audio, learner recording, replay, AI-assisted feedback, retry support, and mouth-shape video guidance.', 'EuuuhFrench AI v1.0 est le premier MVP fonctionnel, avec audio français natif, enregistrement de l’apprenant, réécoute, feedback assisté par l’IA, aide à la reprise et guidage vidéo de la forme de la bouche.', 'EuuuhFrench AI v1.0 是第一个可用的 MVP，包含法语母语音频、学习者录音、回放、AI 辅助反馈、重试支持和口型视频指导。'],
  ['blog.featureLink', 'Read development update →', 'Lire la mise à jour →', '阅读开发更新 →'],
  ['blog.v11Title', 'EuuuhFrench AI v1.1 — Word and Sentence Practice Update', 'EuuuhFrench AI v1.1 — mise à jour pratique de mots et de phrases', 'EuuuhFrench AI v1.1 — 单词与句子练习更新'],
  ['blog.v11ImageAria', 'Read EuuuhFrench AI v1.1 Word and Sentence Practice Update', 'Lire la mise à jour EuuuhFrench AI v1.1 sur la pratique de mots et de phrases', '阅读 EuuuhFrench AI v1.1 单词与句子练习更新'],
  ['blog.v11Desc', 'EuuuhFrench AI v1.1 adds Quick Lesson, Word Practice, and Sentence Practice for more flexible French pronunciation practice.', 'EuuuhFrench AI v1.1 ajoute Quick Lesson, Word Practice et Sentence Practice pour un entraînement de prononciation française plus flexible.', 'EuuuhFrench AI v1.1 增加了 Quick Lesson、Word Practice 和 Sentence Practice，让法语发音练习更加灵活。'],
  ['blog.v11Link', 'Read v1.1 update →', 'Lire la mise à jour v1.1 →', '阅读 v1.1 更新 →'],
  ['blog.recapTitle', 'EuuuhFrench AI — From MVP to Guided Pronunciation Practice', 'EuuuhFrench AI — du MVP à une pratique guidée de la prononciation', 'EuuuhFrench AI — 从 MVP 到引导式发音练习'],
  ['blog.recapImageAria', 'Read EuuuhFrench AI From MVP to Guided Pronunciation Practice', 'Lire le récapitulatif EuuuhFrench AI, du MVP à une pratique guidée de la prononciation', '阅读 EuuuhFrench AI 从 MVP 到引导式发音练习的总结'],
  ['blog.recapDesc', 'A short recap of how EuuuhFrench AI moved from a first MVP to a more guided pronunciation practice app.', 'Un court récapitulatif sur le passage d’EuuuhFrench AI d’un premier MVP à une app de pratique de la prononciation plus guidée.', '一篇简短总结，说明 EuuuhFrench AI 如何从第一个 MVP 发展为更有引导性的发音练习应用。'],
  ['blog.recapLink', 'Read recap →', 'Lire le récapitulatif →', '阅读总结 →'],
  ['blog.previousUpdates', 'Previous Updates', 'Mises à jour précédentes', '以前的更新'],
  ['blog.softwareArchive', 'Software archive', 'Archive logicielle', '软件更新归档'],
  ['blog.planned', 'Planned Notes', 'Notes prévues', '计划笔记'],
  ['blog.notes', 'Language notes', 'Notes linguistiques', '语言笔记'],
  ['blog.note', 'A future reflection space for language learning discussions and research ideas.', 'Un futur espace de réflexion pour les discussions sur l’apprentissage des langues et les idées de recherche.', '未来用于语言学习讨论和研究想法的反思空间。'],
  ['blog.gender', 'Why French Gender Is Difficult for Chinese Learners', 'Pourquoi le genre français est difficile pour les apprenants chinois', '为什么法语性别对中文学习者很难'],
  ['blog.genderDesc', 'A planned reflection on grammar, cross-linguistic differences, and the learning challenges behind French gender acquisition.', 'Une réflexion prévue sur la grammaire, les différences interlinguistiques et les défis d’apprentissage liés à l’acquisition du genre en français.', '一篇计划中的反思，讨论语法、跨语言差异以及法语性别习得背后的学习挑战。'],
  ['blog.aiPronunciation', 'AI and Pronunciation Learning', 'IA et apprentissage de la prononciation', '人工智能与发音学习'],
  ['blog.aiPronunciationDesc', 'A planned note on AI-assisted language learning, pronunciation feedback, and the limits of automated support.', 'Une note prévue sur l’apprentissage des langues assisté par l’IA, le feedback de prononciation et les limites du soutien automatisé.', '一篇计划中的笔记，关于 AI 辅助语言学习、发音反馈以及自动化支持的局限。'],
  ['blog.metacognition', 'Metacognition in Second Language Acquisition', 'Métacognition dans l’acquisition des langues secondes', '第二语言习得中的元认知'],
  ['blog.metacognitionDesc', 'A planned post on learner awareness, strategy use, and how metacognition can shape second language acquisition.', 'Un billet prévu sur la conscience des apprenants, l’usage des stratégies et la manière dont la métacognition peut façonner l’acquisition des langues secondes.', '一篇计划中的文章，关于学习者意识、策略使用以及元认知如何影响第二语言习得。'],
  ['blogPost.kicker', 'SIFAKS Software', 'SIFAKS Software', 'SIFAKS Software'],
  ['blogPost.title', 'EuuuhFrench AI v1.0 DevUpdate', 'EuuuhFrench AI v1.0 : mise à jour dev', 'EuuuhFrench AI v1.0 开发更新'],
  ['blogPost.lead', 'A short update on the first MVP version of EuuuhFrench AI, an AI-assisted French pronunciation tool for Chinese-speaking learners of French.', 'Une courte mise à jour sur la première version MVP d’EuuuhFrench AI, un outil de prononciation française assisté par l’IA pour les apprenants sinophones du français.', '关于 EuuuhFrench AI 首个 MVP 版本的简短更新：这是面向中文母语法语学习者的 AI 辅助法语发音工具。'],
  ['blogPost.origin', 'EuuuhFrench AI is conceived, designed, and developed by Sifaks Ousmail. The project is part of <a href="software.html">SIFAKS Software</a> and connects applied linguistics, second language acquisition, language education, and French as a foreign language.', 'EuuuhFrench AI est imaginé, conçu et développé par Sifaks Ousmail. Le projet fait partie de <a href="software.html">SIFAKS Software</a> et relie la linguistique appliquée, l’acquisition des langues secondes, l’éducation aux langues et le français langue étrangère.', 'EuuuhFrench AI 由 Sifaks Ousmail 构思、设计并开发。该项目属于 <a href="software.html">SIFAKS Software</a>，连接应用语言学、第二语言习得、语言教育和对外法语。'],
  ['blogPost.live', 'Version 1.0 is now live at <a href="https://app.sifaks.com" target="_blank" rel="noopener noreferrer">app.sifaks.com</a> as a focused MVP. Learners can listen to native French audio, record their own pronunciation, replay their attempt, receive AI-assisted feedback, read correction guidance, and try again. The interface is available in English, French, and Simplified Chinese, with desktop and mobile layouts checked.', 'La version 1.0 est maintenant en ligne sur <a href="https://app.sifaks.com" target="_blank" rel="noopener noreferrer">app.sifaks.com</a> comme MVP ciblé. Les apprenants peuvent écouter un audio français natif, enregistrer leur prononciation, réécouter leur essai, recevoir un feedback assisté par l’IA, lire des conseils de correction et recommencer. L’interface est disponible en anglais, français et chinois simplifié, avec des mises en page vérifiées sur ordinateur et mobile.', '1.0 版本现已在 <a href="https://app.sifaks.com" target="_blank" rel="noopener noreferrer">app.sifaks.com</a> 上线，作为一个聚焦发音练习的 MVP。学习者可以听法语母语音频、录制自己的发音、回放尝试、获得 AI 辅助反馈、阅读纠正建议并再次练习。界面支持英语、法语和简体中文，并已检查桌面端和移动端布局。'],
  ['blogPost.homeAlt', 'EuuuhFrench AI landing interface for Chinese-speaking learners of French.', 'Interface d’accueil d’EuuuhFrench AI pour les apprenants sinophones du français.', '面向中文母语法语学习者的 EuuuhFrench AI 首页界面。'],
  ['blogPost.changedTitle', 'What changed in v1.0?', 'Qu’est-ce qui change dans la v1.0 ?', 'v1.0 有哪些变化？'],
  ['blogPost.flow', 'The main focus was on making the practice flow more clearly and easily to follow. Learners now move through a simple sequence for each practice item: listen, record, receive feedback, retry or skip, then continue to the next item.', 'Le travail principal a porté sur un parcours d’entraînement plus clair et plus facile à suivre. Pour chaque élément de pratique, les apprenants suivent maintenant une séquence simple : écouter, enregistrer, recevoir un feedback, réessayer ou passer, puis continuer.', '这次更新的重点是让练习流程更清晰、更容易跟随。现在，每个练习项目的顺序更简单：听音频、录音、接收反馈、重试或跳过，然后继续下一项。'],
  ['blogPost.mouthShape', 'Version 1.0 also includes local mouth-shape video guidance for five French sounds: /y/, /ø/, /œ/, /ʁ/, and /ɛ̃/. These sounds are especially relevant for Chinese-speaking learners of French because they involve lip rounding, vowel placement, nasal resonance, and uvular articulation. Video guidance is only available in Chinese for now.', 'La version 1.0 inclut aussi une aide vidéo locale sur la forme de la bouche pour cinq sons français : /y/, /ø/, /œ/, /ʁ/ et /ɛ̃/. Ces sons sont particulièrement importants pour les apprenants sinophones du français, car ils impliquent l’arrondissement des lèvres, le placement vocalique, la résonance nasale et l’articulation uvulaire. Pour l’instant, l’aide vidéo est disponible uniquement en chinois.', '1.0 版本还加入了五个法语音素的本地口型视频指导：/y/、/ø/、/œ/、/ʁ/ 和 /ɛ̃/。这些音对中文母语法语学习者尤其重要，因为它们涉及圆唇、元音位置、鼻化共鸣和小舌音发音。目前视频指导仅提供中文。'],
  ['blogPost.mouthAlt', 'EuuuhFrench AI mouth-shape video guidance for French pronunciation practice.', 'Guidage vidéo de la forme de la bouche dans EuuuhFrench AI pour l’entraînement à la prononciation française.', 'EuuuhFrench AI 法语发音练习中的口型视频指导。'],
  ['blogPost.combines', 'The app now combines native French audio examples, learner recording replay, mouth-shape guidance, correction prompts, and API-backed pronunciation assessment. Feedback wording has also been refined so that unclear recordings receive useful guidance rather than misleading scores.', 'L’application combine maintenant des exemples audio en français natif, la réécoute de l’enregistrement de l’apprenant, des indications de forme de bouche, des consignes de correction et une évaluation de la prononciation soutenue par API. Le texte du feedback a aussi été ajusté afin que les enregistrements peu clairs reçoivent des conseils utiles plutôt que des scores trompeurs.', '现在，应用结合了法语母语音频示例、学习者录音回放、口型指导、纠正提示和 API 支持的发音评估。反馈文字也经过调整，让不清晰的录音获得更有用的建议，而不是产生误导性的分数。'],
  ['blogPost.supportPages', 'Version 1.0 also includes a basic lesson chooser, completion flow, progress page, and feedback page. If real pronunciation scoring is not available, the app can use a preview mode, so the learning flow remains usable while clearly avoiding false assessment claims.', 'La version 1.0 comprend aussi un sélecteur de leçons, un parcours de fin de leçon, une page de progression et une page de feedback. Si l’évaluation réelle de la prononciation n’est pas disponible, l’application peut utiliser un mode de prévisualisation, afin que le parcours d’apprentissage reste utilisable sans présenter de fausses affirmations d’évaluation.', '1.0 版本还包括基础课程选择、课程完成流程、进度页面和反馈页面。如果真实的发音评分暂时不可用，应用可以使用预览模式，让学习流程仍然可以体验，同时避免把预览反馈误认为正式评估。'],
  ['blogPost.assessment', 'The assessment layer has been improved in terms of target detection and feedback reliability. This remains AI-assisted pronunciation feedback, not a claim of a proprietary AI model, and not a replacement for teaching.', 'La couche d’évaluation a été améliorée pour la détection des cibles et la fiabilité du feedback. Il s’agit toujours d’un feedback de prononciation assisté par l’IA, sans revendication de modèle propriétaire, et cela ne remplace pas l’enseignement.', '评估层在目标检测和反馈可靠性方面有所改进。这仍然是 AI 辅助发音反馈，并不代表自有专有 AI 模型，也不能替代教学。'],
  ['blogPost.prototypeTitle', 'Prototype status', 'Statut du prototype', '原型状态'],
  ['blogPost.prototype', 'EuuuhFrench AI v1.0 is the first working MVP. It is still an early version, but the core learning flow is now usable: native audio, recording, replay, pronunciation feedback, retry support, and video guidance for difficult sounds.', 'EuuuhFrench AI v1.0 est le premier MVP fonctionnel. Il s’agit encore d’une version précoce, mais le parcours principal est maintenant utilisable : audio natif, enregistrement, réécoute, feedback de prononciation, aide à la reprise et guidage vidéo pour les sons difficiles.', 'EuuuhFrench AI v1.0 是第一个可用的 MVP。它仍然是早期版本，但核心学习流程已经可以使用：母语音频、录音、回放、发音反馈、重试支持，以及针对难点音的口型视频指导。'],
  ['blogPost.privacy', 'Because this is the first public MVP release, basic <a href="https://app.sifaks.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://app.sifaks.com/terms" target="_blank" rel="noopener noreferrer">Terms of Use</a> pages have also been added. They explain how pronunciation audio may be processed by third-party APIs for feedback, and clarify that EuuuhFrench AI is an experimental learning tool.', 'Comme il s’agit de la première version MVP publique, des pages simples de <a href="https://app.sifaks.com/privacy" target="_blank" rel="noopener noreferrer">politique de confidentialité</a> et de <a href="https://app.sifaks.com/terms" target="_blank" rel="noopener noreferrer">conditions d’utilisation</a> ont aussi été ajoutées. Elles expliquent comment l’audio de prononciation peut être traité par des API tierces pour produire un feedback, et précisent qu’EuuuhFrench AI est un outil d’apprentissage expérimental.', '因为这是第一个公开 MVP 版本，项目也加入了基本的<a href="https://app.sifaks.com/privacy" target="_blank" rel="noopener noreferrer">隐私政策</a>和<a href="https://app.sifaks.com/terms" target="_blank" rel="noopener noreferrer">使用条款</a>页面。它们说明发音音频可能会通过第三方 API 处理以生成反馈，并明确 EuuuhFrench AI 是一个实验性学习工具。'],
  ['blogPost.devNotesToggleClosed', 'View developer notes', 'Voir les notes développeur', '查看开发说明'],
  ['blogPost.devNotesToggleOpen', 'Hide developer notes', 'Masquer les notes développeur', '隐藏开发说明'],
  ['blogPost.devNotesTitle', 'Developer notes', 'Notes développeur', '开发说明'],
  ['blogPost.devNotesFlow', 'v1.0 was built around a Next.js App Router practice flow with lesson selection, native French audio playback, browser MediaRecorder capture, learner replay, pronunciation assessment routing, normalized feedback display, local progress history, and multilingual EN/FR/中文 UI copy.', 'La v1.0 a été construite autour d’un parcours de pratique Next.js App Router avec sélection de leçons, lecture d’audio natif français, capture MediaRecorder dans le navigateur, réécoute par l’apprenant, acheminement de l’évaluation de prononciation, affichage normalisé du feedback, historique local de progression et textes d’interface multilingues EN/FR/中文.', 'v1.0 基于 Next.js App Router 练习流程构建，包括课程选择、法语原声音频播放、浏览器 MediaRecorder 录音、学习者录音回放、发音评估路由、标准化反馈显示、本地进度记录以及多语言 EN/FR/中文 UI 文案。'],
  ['blogPost.devNotesRoutesTitle', 'Routes checked:', 'Routes vérifiées :', '已检查的路由：'],
  ['blogPost.devNotesImplementationTitle', 'Main implementation areas:', 'Principales zones d’implémentation :', '主要实现部分：'],
  ['blogPost.devNotesQualityTitle', 'Quality checks passed:', 'Vérifications qualité validées :', '已通过的质量检查：'],
  ['blogPost.devNotesAreaPractice', 'practice flow', 'parcours de pratique', '练习流程'],
  ['blogPost.devNotesAreaRecording', 'recording and replay', 'enregistrement et réécoute', '录音与回放'],
  ['blogPost.devNotesAreaAudio', 'audio example handling', 'gestion des exemples audio', '音频示例处理'],
  ['blogPost.devNotesAreaFeedback', 'pronunciation feedback display', 'affichage du feedback de prononciation', '发音反馈显示'],
  ['blogPost.devNotesAreaAssessment', 'Speechace-ready API assessment', 'évaluation API compatible avec Speechace', 'Speechace-ready API 评估'],
  ['blogPost.devNotesAreaPrivacy', 'privacy and terms pages', 'pages de confidentialité et de conditions d’utilisation', '隐私政策与使用条款页面'],
  ['blogPost.devNotesAreaMobile', 'mobile layout polish', 'ajustements de la mise en page mobile', '移动端布局优化'],
  ['blogPost.devNotesAreaTranslations', 'translation strings', 'chaînes de traduction', '翻译字符串'],
  ['blogPost.final', 'As of now, this project serves as a bridge between applied linguistics research and practical language education design: a focused pronunciation software for Chinese-speaking learners of French. Built around concrete French pronunciation learning problems.', 'Pour l’instant, ce projet fait le lien entre la recherche en linguistique appliquée et la conception concrète d’outils pour l’éducation aux langues : un logiciel de prononciation ciblé pour les apprenants sinophones du français, construit autour de problèmes réels de prononciation française.', '目前，这个项目连接应用语言学研究和实际语言教育设计：它是一个面向中文母语法语学习者的发音软件，围绕具体的法语发音学习问题构建。'],
  ['blogPost.softwareButton', 'View SIFAKS Software', 'Voir SIFAKS Software', '查看 SIFAKS Software'],
  ['blogPost.appButton', 'Open app preview', 'Ouvrir l’aperçu de l’app', '打开应用预览'],
  ['blogRecap.kicker', 'SIFAKS Software', 'SIFAKS Software', 'SIFAKS Software'],
  ['blogRecap.title', 'EuuuhFrench AI — From MVP to Guided Pronunciation Practice', 'EuuuhFrench AI — du MVP à une pratique guidée de la prononciation', 'EuuuhFrench AI — 从 MVP 到引导式发音练习'],
  ['blogRecap.lead', 'A short recap of the first EuuuhFrench AI versions.', 'Un court récapitulatif des premières versions d’EuuuhFrench AI.', '关于 EuuuhFrench AI 早期版本的简短总结。'],
  ['blogRecap.intro', 'EuuuhFrench AI has changed quickly, so this post groups the early updates instead of writing one note for every small version.', 'EuuuhFrench AI a évolué vite. Cet article regroupe donc les premières mises à jour au lieu de publier une note pour chaque petite version.', 'EuuuhFrench AI 更新得很快，所以这篇文章把早期更新放在一起，而不是为每个小版本单独写一篇。'],
  ['blogRecap.todayAlt', 'EuuuhFrench AI home screen with the Start today’s practice button.', 'Écran d’accueil d’EuuuhFrench AI avec le bouton pour commencer la pratique du jour.', 'EuuuhFrench AI 首页界面，显示“开始今天的练习”按钮。'],
  ['blogRecap.v10', 'v1.0 was the first usable version. Learners could choose a difficult French sound, listen to native audio, record themselves, replay their attempt, and receive pronunciation feedback.', 'La v1.0 était la première version utilisable. Les apprenants pouvaient choisir un son français difficile, écouter un audio natif, s’enregistrer, réécouter leur essai et recevoir un feedback de prononciation.', 'v1.0 是第一个可用版本。学习者可以选择一个法语难点音，听法语母语音频，录下自己的发音，回放录音，并获得发音反馈。'],
  ['blogRecap.v1112', 'v1.1 and v1.2 made practice less repetitive. The app added quick lessons, word practice, sentence practice, and more work on nasal vowels such as an/en, on, and in/ain.', 'Les v1.1 et v1.2 ont rendu la pratique moins répétitive. L’app a ajouté des leçons rapides, la pratique de mots, la pratique de phrases et davantage de travail sur les voyelles nasales comme an/en, on et in/ain.', 'v1.1 和 v1.2 让练习不再那么重复。应用加入了快速课程、单词练习、句子练习，并增加了 an/en、on、in/ain 等鼻化元音练习。'],
  ['blogRecap.practiceModesAlt', 'EuuuhFrench AI practice screen showing Quick Lesson, More practice, and Sentence Practice modes.', 'Écran de pratique d’EuuuhFrench AI montrant les modes Quick Lesson, More practice et Sentence Practice.', 'EuuuhFrench AI 练习界面，显示 Quick Lesson、More practice 和 Sentence Practice 模式。'],
  ['blogRecap.v1314', 'v1.3 and v1.4 made the practice flow deeper. There is more audio-backed practice for each main sound, clearer nasal help, and small contrast pairs such as deux / doux and vin / vent.', 'Les v1.3 et v1.4 ont rendu le parcours plus complet. Chaque son principal a davantage de pratique avec audio, l’aide pour les sons nasaux est plus claire, et de petites paires de contraste comme deux / doux et vin / vent ont été ajoutées.', 'v1.3 和 v1.4 让练习流程更深入。每个主要难点音都有更多带音频的练习，鼻化音帮助更清楚，也加入了 deux / doux、vin / vent 这样的小对比练习。'],
  ['blogRecap.lessonsAlt', 'EuuuhFrench AI lesson page showing core sounds and contrast practice sections.', 'Page des leçons d’EuuuhFrench AI montrant les sons principaux et les sections de contraste.', 'EuuuhFrench AI 课程页面，显示核心音和对比练习部分。'],
  ['blogRecap.account', 'I also started adding progress and account foundations. I see that as support work: useful for returning to practice, but not the main story of the app yet.', 'J’ai aussi commencé à ajouter des bases pour le suivi de progression et les comptes. Je vois cela comme un soutien : utile pour revenir à la pratique, mais pas encore comme le cœur de l’app.', '我也开始加入进度和账号相关的基础功能。我把它看作辅助部分：它有助于学习者之后继续练习，但还不是应用的主要内容。'],
  ['blogRecap.close', 'The direction is simple: short guided practice, real French audio, focused sounds, and feedback that helps learners notice what to try next. The app is still experimental and research-informed, not a replacement for teacher guidance.', 'La direction reste simple : une pratique courte et guidée, de vrais audios français, des sons ciblés et un feedback qui aide les apprenants à voir quoi essayer ensuite. L’app reste expérimentale et nourrie par la recherche ; elle ne remplace pas l’accompagnement d’un enseignant.', '方向很简单：短而有引导的练习、真实法语音频、聚焦的难点音，以及帮助学习者知道下一步怎么练的反馈。这个应用仍然是实验性、研究导向的，不能替代教师指导。'],
  ['blogRecap.devNotesTitle', 'Developer notes', 'Notes développeur', '开发说明'],
  ['blogRecap.devNotesSummary', 'The early work moved from one guided pronunciation loop to a more structured practice app with clearer routing, content, feedback, and progress states.', 'Les premiers développements sont passés d’une seule boucle de prononciation guidée à une app de pratique plus structurée, avec un routage, des contenus, un feedback et des états de progression plus clairs.', '早期开发从一个引导式发音练习循环，发展为结构更清楚的练习应用，并逐步明确了路由、内容、反馈和进度状态。'],
  ['blogRecap.devAreasTitle', 'Main areas touched:', 'Principales zones touchées :', '主要涉及部分：'],
  ['blogRecap.devAreaRouting', 'practice-mode routing for quick, word, and sentence practice', 'routage des modes de pratique pour leçon rapide, mots et phrases', '快速课程、单词练习和句子练习的练习模式路由'],
  ['blogRecap.devAreaContent', 'audio-backed lesson content for difficult French sounds', 'contenu de leçon appuyé par l’audio pour les sons français difficiles', '带音频支持的法语难点音课程内容'],
  ['blogRecap.devAreaAudio', 'native audio mapping for examples and practice items', 'correspondance de l’audio natif pour les exemples et les items de pratique', '示例和练习项目的法语原声音频映射'],
  ['blogRecap.devAreaNasal', 'nasal vowel and contrast-practice content', 'contenu pour les voyelles nasales et les pratiques de contraste', '鼻化元音和对比练习内容'],
  ['blogRecap.devAreaFeedback', 'feedback flow for listening, recording, retrying, and reviewing', 'parcours de feedback pour écouter, enregistrer, réessayer et revoir', '听音、录音、重试和查看反馈的流程'],
  ['blogRecap.devAreaProgress', 'local progress state and dashboard polish', 'état de progression locale et ajustements du tableau de bord', '本地进度状态和进度面板优化'],
  ['blogRecap.devAreaI18n', 'i18n strings for English, French, and Chinese', 'chaînes i18n pour l’anglais, le français et le chinois', '英语、法语和中文的 i18n 字符串'],
  ['blogRecap.devAreaPwa', 'PWA polish, legal-page polish, and browser QA', 'ajustements PWA, pages légales et QA navigateur', 'PWA 优化、法律页面优化和浏览器 QA'],
  ['blogRecap.devChecksTitle', 'Recent checks:', 'Vérifications récentes :', '最近检查：'],
  ['blogRecap.devCheckStatic', 'static JavaScript and sitemap checks', 'vérifications JavaScript statiques et sitemap', '静态 JavaScript 和 sitemap 检查'],
  ['blogRecap.devCheckBrowser', 'desktop and mobile browser QA', 'QA navigateur desktop et mobile', '桌面和移动端浏览器 QA'],
  ['blogRecap.devCheckLanguages', 'EN / FR / 中文 language-switching checks', 'vérifications du changement de langue EN / FR / 中文', 'EN / FR / 中文 语言切换检查'],
  ['blogRecap.devCheckToggle', 'developer-notes expand/collapse check', 'vérification ouverture/fermeture des notes développeur', '开发说明展开/收起检查'],
  ['blogV11.kicker', 'SIFAKS Software', 'SIFAKS Software', 'SIFAKS Software'],
  ['blogV11.title', 'EuuuhFrench AI v1.1 — Word and Sentence Practice Update', 'EuuuhFrench AI v1.1 — mise à jour pratique de mots et de phrases', 'EuuuhFrench AI v1.1 — 单词与句子练习更新'],
  ['blogV11.lead', 'A short update on the v1.1 practice modes in EuuuhFrench AI.', 'Une courte mise à jour sur les modes de pratique de la v1.1 dans EuuuhFrench AI.', '关于 EuuuhFrench AI v1.1 练习模式的简短更新。'],
  ['blogV11.intro', 'EuuuhFrench AI v1.1 adds three pronunciation practice modes: Quick Lesson, Word Practice, and Sentence Practice. Learners can now move from short guided practice to isolated word repetition and short sentence practice, while keeping native French audio and automated feedback.', 'EuuuhFrench AI v1.1 ajoute trois modes de pratique de la prononciation : Quick Lesson, Word Practice et Sentence Practice. Les apprenants peuvent maintenant passer d’un entraînement court et guidé à la répétition de mots isolés et à la pratique de courtes phrases, tout en gardant l’audio natif français et le feedback automatisé.', 'EuuuhFrench AI v1.1 增加了三种发音练习模式：Quick Lesson、Word Practice 和 Sentence Practice。学习者现在可以从简短的引导练习，进入单词重复练习和短句练习，同时保留法语母语音频和自动反馈。'],
  ['blogV11.lessonModesAlt', 'EuuuhFrench AI v1.1 lesson selection interface with Quick Lesson, Word Practice, and Sentence Practice.', 'Interface de sélection de leçons d’EuuuhFrench AI v1.1 avec Quick Lesson, Word Practice et Sentence Practice.', 'EuuuhFrench AI v1.1 课程选择界面，包含 Quick Lesson、Word Practice 和 Sentence Practice。'],
  ['blogV11.flexible', 'The goal of this update is to make practice more flexible. Quick Lesson remains short and guided, Word Practice gives learners more repetition with individual words, and Sentence Practice helps learners practise difficult French sounds inside short, natural phrases.', 'L’objectif de cette mise à jour est de rendre la pratique plus flexible. Quick Lesson reste court et guidé, Word Practice donne plus de répétition sur des mots isolés, et Sentence Practice aide les apprenants à travailler les sons difficiles du français dans de courtes phrases naturelles.', '这次更新的目标是让练习更加灵活。Quick Lesson 仍然保持简短和引导式；Word Practice 让学习者对单个词进行更多重复；Sentence Practice 帮助学习者在简短自然的法语短语中练习难点音。'],
  ['blogV11.interfaceColor', 'The blue and purple interface colors and colored labels were already present in v1.1, helping separate practice modes and difficulty levels without changing the existing visual identity.', 'Les couleurs bleue et violette de l’interface, ainsi que les libellés colorés, étaient déjà présents dans la v1.1 afin de mieux distinguer les modes de pratique et les niveaux de difficulté sans changer l’identité visuelle existante.', '蓝紫色界面配色和彩色标签在 v1.1 中已经存在，用来更清楚地区分练习模式和难度等级，同时不改变原有视觉风格。'],
  ['blogV11.sounds', 'This version focuses on selected difficult sounds for Chinese-speaking learners of French, including /y/, /ø/, /œ/, /ʁ/, and /ɛ̃/. More examples and native French audio have also been added to support clearer listening and pronunciation practice.', 'Cette version se concentre sur plusieurs sons difficiles pour les apprenants sinophones du français, notamment /y/, /ø/, /œ/, /ʁ/ et /ɛ̃/. Davantage d’exemples et d’audio français natif ont aussi été ajoutés pour soutenir une écoute plus claire et la pratique de la prononciation.', '这个版本聚焦于中文母语法语学习者较难掌握的一些法语音，包括 /y/、/ø/、/œ/、/ʁ/ 和 /ɛ̃/。同时也增加了更多示例和法语母语音频，帮助学习者更清楚地听音和练习发音。'],
  ['blogV11.purpose', 'v1.1 does not change the purpose of the app: EuuuhFrench AI remains an experimental pronunciation-learning tool. Automated feedback can help learners practise more independently, but it does not replace teacher guidance or formal assessment.', 'La v1.1 ne change pas l’objectif de l’application : EuuuhFrench AI reste un outil expérimental d’apprentissage de la prononciation. Le feedback automatisé peut aider les apprenants à pratiquer de manière plus autonome, mais il ne remplace pas l’accompagnement d’un enseignant ni l’évaluation formelle.', 'v1.1 不改变应用的定位：EuuuhFrench AI 仍然是一个实验性的发音学习工具。自动反馈可以帮助学习者更独立地练习，但不能替代教师指导或正式评估。'],
  ['blogV11.devNotesFlow', 'v1.1 adds a mode-aware practice structure for EuuuhFrench AI. The practice flow now separates Quick Lesson, Word Practice, and Sentence Practice, so each lesson can load the right type of content instead of forcing all practice into one long sequence.', 'La v1.1 ajoute une structure de pratique sensible aux modes pour EuuuhFrench AI. Le parcours sépare maintenant Quick Lesson, Word Practice et Sentence Practice, afin que chaque leçon puisse charger le bon type de contenu au lieu de forcer toute la pratique dans une seule longue séquence.', 'v1.1 为 EuuuhFrench AI 增加了按模式区分的练习结构。现在练习流程区分 Quick Lesson、Word Practice 和 Sentence Practice，让每节课可以加载合适类型的内容，而不是把所有练习都放进同一个长序列。'],
  ['blogV11.devNotesModes', 'This update also improves how the app handles lesson modes, native audio examples, and item-specific progression labels. Word Practice focuses on isolated repetition, while Sentence Practice uses short French phrases with longer recording windows and more natural pronunciation contexts.', 'Cette mise à jour améliore aussi la gestion des modes de leçon, des exemples audio natifs et des libellés de progression propres à chaque item. Word Practice se concentre sur la répétition isolée, tandis que Sentence Practice utilise de courtes phrases françaises avec des fenêtres d’enregistrement plus longues et des contextes de prononciation plus naturels.', '这次更新也改进了应用对课程模式、法语母语音频示例和单项进度标签的处理。Word Practice 侧重单独重复练习，Sentence Practice 使用简短法语短语，并提供更长的录音时间和更自然的发音语境。'],
  ['blogV11.devAreaMode', 'mode-aware lesson selection', 'sélection de leçon selon le mode', '按模式选择课程'],
  ['blogV11.devAreaRouting', 'Quick Lesson / Word Practice / Sentence Practice routing', 'routage Quick Lesson / Word Practice / Sentence Practice', 'Quick Lesson / Word Practice / Sentence Practice 路由'],
  ['blogV11.devAreaPacks', 'word and sentence content packs', 'packs de contenu pour mots et phrases', '单词与句子内容包'],
  ['blogV11.devAreaAudio', 'native French audio mapping', 'correspondance avec l’audio natif français', '法语母语音频映射'],
  ['blogV11.devAreaLabels', 'mode-specific next-item labels', 'libellés de progression selon le mode', '按模式区分的下一项标签'],
  ['blogV11.devAreaTiming', 'recording timing for word and sentence practice', 'durée d’enregistrement pour la pratique des mots et des phrases', '单词与句子练习的录音时长'],
  ['blogV11.devAreaFeedback', 'feedback flow consistency', 'cohérence du parcours de feedback', '反馈流程一致性'],
  ['blogV11.devAreaTranslations', 'translation strings for EN / FR / 中文', 'chaînes de traduction pour EN / FR / 中文', 'EN / FR / 中文 翻译字符串'],
  ['blogV11.qualityTitle', 'Quality checks:', 'Vérifications qualité :', '质量检查：'],
  ['blogV11.qualityLint', 'lint passed', 'lint validé', 'lint 已通过'],
  ['blogV11.qualityTests', 'tests passed', 'tests validés', '测试已通过'],
  ['blogV11.qualityBuild', 'build passed', 'build validé', '构建已通过'],
  ['blogV11.qualityMobile', 'mobile layout checked', 'mise en page mobile vérifiée', '移动端布局已检查'],
  ['contact.kicker', 'Get in touch', 'Me contacter', '联系我'],
  ['contact.title', 'Contact Sifaks Ousmail', 'Contacter Sifaks Ousmail', '联系 Sifaks Ousmail'],
  ['contact.lead', 'I’m always happy to hear from anyone interested in language learning, AI, or education.', 'Je suis toujours heureux d’échanger avec toute personne intéressée par l’apprentissage des langues, l’IA ou l’éducation.', '如果你对语言学习、人工智能或教育感兴趣，我很欢迎你联系我。'],
  ['profile.label', 'International Academic Profile', 'Profil académique international', '国际学术简介'],
  ['profile.trajectory', 'Part of an international academic trajectory across France, the United Kingdom, and China.', 'Un élément d’une trajectoire académique internationale entre la France, le Royaume-Uni et la Chine.', '横跨法国、英国和中国的国际学术轨迹的一部分。'],
  ['china.title', 'China', 'Chine', '中国'],
  ['china.pill', 'Language learning, academic development, and cross-cultural research', 'Apprentissage des langues, développement académique et recherche interculturelle', '语言学习、学术发展与跨文化研究'],
  ['china.lead', 'China has played a central role in my academic and personal development, connecting advanced language learning with research in language education, applied linguistics, and AI-assisted learning.', 'La Chine a joué un rôle central dans mon développement académique et personnel, reliant un apprentissage avancé des langues à la recherche en éducation aux langues, linguistique appliquée et apprentissage assisté par l’IA.', '中国在我的学术和个人发展中发挥了核心作用，将高级语言学习与语言教育、应用语言学和 AI 辅助学习研究联系起来。'],
  ['china.languageJourney', 'Language Journey', 'Parcours linguistique', '语言学习历程'],
  ['china.studyPerspective', 'Chinese as study and perspective', 'Le chinois comme objet d’étude et perspective', '中文作为学习对象与研究视角'],
  ['china.languageNote', 'Chinese became both a language of study and a way to understand language learning from another perspective.', 'Le chinois est devenu à la fois une langue d’étude et une manière de comprendre l’apprentissage des langues depuis une autre perspective.', '中文既成为学习对象，也成为从另一种视角理解语言学习的方式。'],
  ['china.languageIntro', 'My interest in Chinese began before China became part of my academic path. Learning Chinese as a foreign language involved moving from beginner to advanced level through tones, characters, pronunciation, and cultural meaning. That experience continues to inform how I think about language learning and research.', 'Mon intérêt pour le chinois a commencé avant que la Chine ne fasse partie de mon parcours académique. Apprendre le chinois comme langue étrangère m’a conduit du niveau débutant vers un niveau avancé à travers les tons, les caractères, la prononciation et le sens culturel. Cette expérience continue de nourrir ma réflexion sur l’apprentissage des langues et la recherche.', '我对中文的兴趣早在中国成为我学术道路的一部分之前就开始了。作为外语学习中文，意味着从初级逐步走向高级，经历声调、汉字、发音和文化意义的学习。这段经历至今影响着我对语言学习和研究的思考。'],
  ['china.academicExperience', 'Academic Experience', 'Expérience académique', '学术经历'],
  ['china.wuhanShanghai', 'From Wuhan to Shanghai', 'De Wuhan à Shanghai', '从武汉到上海'],
  ['china.academicNote', 'A long-term academic trajectory shaped by Chinese language study and research.', 'Une trajectoire académique de long terme façonnée par l’étude et la recherche autour de la langue chinoise.', '由中文学习与研究塑造的长期学术轨迹。'],
  ['china.academicIntro', 'My connection with China includes an exchange year in Wuhan during undergraduate studies, advanced Chinese language learning, and a current PhD trajectory at Shanghai International Studies University. This path brings together language education, applied linguistics, and questions about AI-assisted learning.', 'Mon lien avec la Chine comprend une année d’échange à Wuhan pendant la licence, un apprentissage avancé du chinois et un parcours doctoral actuel à l’Université des études internationales de Shanghai. Ce parcours réunit l’éducation aux langues, la linguistique appliquée et les questions liées à l’apprentissage assisté par l’IA.', '我与中国的联系包括本科期间在武汉的交换学习、高级中文学习，以及目前在上海外国语大学的博士路径。这条路径结合了语言教育、应用语言学和 AI 辅助学习相关问题。'],
  ['china.researchEnvironment', 'Research Environment', 'Environnement de recherche', '研究环境'],
  ['china.higherEducation', 'Chinese higher education', 'Enseignement supérieur chinois', '中国高等教育'],
  ['china.researchNote', 'Research in China offers a different academic environment for multilingual and intercultural questions.', 'La recherche en Chine offre un environnement académique différent pour les questions multilingues et interculturelles.', '在中国开展研究为多语和跨文化问题提供了不同的学术环境。'],
  ['china.researchIntro', 'Studying and researching in China provides access to Chinese higher education, applied linguistics, language policy, and language education from a situated perspective. It also supports work on multilingual and intercultural research across different learning contexts.', 'Étudier et faire de la recherche en Chine permet d’aborder l’enseignement supérieur chinois, la linguistique appliquée, la politique linguistique et l’éducation aux langues depuis une perspective située. Cela soutient aussi les recherches multilingues et interculturelles dans différents contextes d’apprentissage.', '在中国学习和研究，可以从在地视角接触中国高等教育、应用语言学、语言政策和语言教育，也支持不同学习语境中的多语与跨文化研究。'],
  ['china.culturalPerspective', 'Cultural Perspective', 'Perspective culturelle', '文化视角'],
  ['china.beyondGrammar', 'Language beyond grammar', 'La langue au-delà de la grammaire', '超越语法的语言'],
  ['china.cultureNote', 'China helped frame language as culture, identity, communication, and education.', 'La Chine a aidé à penser la langue comme culture, identité, communication et éducation.', '中国帮助我将语言理解为文化、身份、交流和教育。'],
  ['china.field', 'China Field Exploration', 'Exploration de terrain en Chine', '中国实地探索'],
  ['china.fieldDesc', 'Travel across several regions offered an early view of China’s linguistic, cultural, and educational diversity.', 'Des voyages dans plusieurs régions ont offert une première vision de la diversité linguistique, culturelle et éducative de la Chine.', '在多个地区的旅行提供了对中国语言、文化和教育多样性的早期认识。'],
  ['china.wuhan', 'Wuhan Exchange', 'Échange à Wuhan', '武汉交换学习'],
  ['china.wuhanDesc', 'An undergraduate exchange year connected classroom learning with academic life in China.', 'Une année d’échange en licence a relié l’apprentissage en classe à la vie académique en Chine.', '本科交换年将课堂学习与中国的学术生活联系起来。'],
  ['china.languageLearning', 'Chinese Language Learning', 'Apprentissage du chinois', '中文学习'],
  ['china.languageLearningDesc', 'Advanced language study developed through tones, characters, pronunciation, and cultural meaning.', 'Un apprentissage avancé développé à travers les tons, les caractères, la prononciation et le sens culturel.', '通过声调、汉字、发音和文化意义发展出的高级语言学习。'],
  ['china.sisu', 'SISU PhD', 'Doctorat à SISU', '上外博士'],
  ['china.sisuDesc', 'Doctoral work at Shanghai International Studies University anchors the research trajectory.', 'Le doctorat à l’Université des études internationales de Shanghai constitue l’ancrage du parcours de recherche.', '上海外国语大学的博士研究奠定了研究轨迹。'],
  ['china.cross', 'Cross-Cultural Research', 'Recherche interculturelle', '跨文化研究'],
  ['china.crossDesc', 'The next step connects multilingual education, intercultural communication, and AI-assisted learning.', 'L’étape suivante relie l’éducation multilingue, la communication interculturelle et l’apprentissage assisté par l’IA.', '下一步连接多语教育、跨文化交流和 AI 辅助学习。'],
  ['china.shanghai', 'Shanghai, China', 'Shanghai, Chine', '中国上海'],
  ['china.academicResearch', 'Academic research', 'Recherche académique', '学术研究'],
  ['china.finalNote', 'A final research note connecting the China profile to doctoral work in Shanghai.', 'Une dernière note de recherche reliant le profil Chine au travail doctoral à Shanghai.', '将中国简介与上海博士研究相连接的最后研究说明。'],
  ['china.shanghaiWork', 'Academic work in Shanghai focused on language policy, language education, and international perspectives on multilingual learning.', 'Le travail académique à Shanghai porte sur la politique linguistique, l’éducation aux langues et les perspectives internationales sur l’apprentissage multilingue.', '在上海的学术工作聚焦于语言政策、语言教育以及多语学习的国际视角。'],
  ['uk.title', 'United Kingdom', 'Royaume-Uni', '英国'],
  ['uk.titleHtml', 'United<br>Kingdom', 'Royaume-Uni', '英国'],
  ['uk.pill', 'Research training, academic methodology, and Cambridge experience', 'Formation à la recherche, méthodologie académique et expérience à Cambridge', '研究训练、学术方法与剑桥经历'],
  ['uk.lead', 'The United Kingdom section focuses on research training at Cambridge and the development of an academic identity in second language education and applied linguistics.', 'La section Royaume-Uni porte sur la formation à la recherche à Cambridge et le développement d’une identité académique en éducation aux langues secondes et linguistique appliquée.', '英国部分聚焦于剑桥的研究训练，以及在第二语言教育和应用语言学中的学术身份发展。'],
  ['uk.cambridgeExperience', 'Cambridge Experience', 'Expérience à Cambridge', '剑桥经历'],
  ['uk.identity', 'Research identity', 'Identité de recherche', '研究身份'],
  ['uk.identityNote', 'Cambridge shaped a stronger foundation for research in second language education.', 'Cambridge a renforcé les bases de ma recherche en éducation aux langues secondes.', '剑桥为第二语言教育研究奠定了更坚实的基础。'],
  ['uk.identityIntro', 'My MPhil in Research in Second Language Education at the University of Cambridge helped me develop a stronger research identity in second language education and applied linguistics.', 'Mon MPhil en recherche en éducation aux langues secondes à l’Université de Cambridge m’a aidé à développer une identité de recherche plus solide en éducation aux langues secondes et linguistique appliquée.', '我在剑桥大学的第二语言教育研究哲学硕士经历，帮助我在第二语言教育和应用语言学中形成更强的研究身份。'],
  ['uk.training', 'Research Training', 'Formation à la recherche', '研究训练'],
  ['uk.methodology', 'Methodology and academic writing', 'Méthodologie et écriture académique', '方法论与学术写作'],
  ['uk.trainingNote', 'The UK experience strengthened the link between theory, method, and evidence.', 'L’expérience au Royaume-Uni a renforcé le lien entre théorie, méthode et données.', '英国经历强化了理论、方法和证据之间的联系。'],
  ['uk.trainingIntro', 'This training included research design, quantitative and qualitative methods, educational research, academic writing, dissertation work, and second language acquisition.', 'Cette formation comprenait la conception de recherche, les méthodes quantitatives et qualitatives, la recherche en éducation, l’écriture académique, le mémoire et l’acquisition des langues secondes.', '这项训练包括研究设计、定量与定性方法、教育研究、学术写作、论文工作和第二语言习得。'],
  ['uk.cambridgeProfile', 'Cambridge Language Sciences profile', 'Profil Cambridge Language Sciences', '剑桥语言科学个人主页'],
  ['uk.viewProfile', 'View profile >>>', 'Voir le profil >>>', '查看主页 >>>'],
  ['france.pill', 'Academic foundations, linguistic background, and early interest in China', 'Fondations académiques, arrière-plan linguistique et intérêt précoce pour la Chine', '学术基础、语言背景与早期中国兴趣'],
  ['france.lead', 'France represents the academic and linguistic foundation of my international trajectory, connecting French linguistic background with early training in Chinese studies and language learning.', 'La France représente la base académique et linguistique de ma trajectoire internationale, reliant mon arrière-plan linguistique français à une première formation en études chinoises et apprentissage des langues.', '法国代表了我国际轨迹中的学术与语言基础，将法语语言背景与中文研究和语言学习的早期训练联系起来。'],
  ['france.foundations', 'Academic Foundations', 'Fondations académiques', '学术基础'],
  ['france.paris', 'Paris and language studies', 'Paris et études de langues', '巴黎与语言研究'],
  ['france.foundationNote', 'The foundation of an academic path in languages, linguistics, and China-related studies.', 'La base d’un parcours académique en langues, linguistique et études liées à la Chine.', '语言、语言学和中国相关研究学术路径的基础。'],
  ['france.foundationIntro', 'My academic path began in France through undergraduate studies at Université Paris Cité, where Chinese studies and language learning became central to my intellectual development.', 'Mon parcours académique a commencé en France à travers des études de licence à Université Paris Cité, où les études chinoises et l’apprentissage des langues sont devenus centraux dans mon développement intellectuel.', '我的学术道路始于法国巴黎西岱大学的本科阶段，中文研究和语言学习在那里成为我智识发展的核心。'],
  ['france.linguisticBackground', 'Linguistic Background', 'Arrière-plan linguistique', '语言背景'],
  ['france.foundation', 'French as foundation', 'Le français comme fondation', '法语作为基础'],
  ['france.linguisticNote', 'French shaped later research interests in grammar, acquisition, and learning difficulties.', 'Le français a ensuite façonné mes intérêts de recherche sur la grammaire, l’acquisition et les difficultés d’apprentissage.', '法语塑造了后来关于语法、习得和学习困难的研究兴趣。'],
  ['france.linguisticIntro', 'French is my linguistic foundation. This background later shaped my research interests, especially French grammar, French gender acquisition, and the difficulties learners face when acquiring new language systems.', 'Le français est ma base linguistique. Cet arrière-plan a ensuite façonné mes intérêts de recherche, en particulier la grammaire française, l’acquisition du genre en français et les difficultés rencontrées par les apprenants face à de nouveaux systèmes linguistiques.', '法语是我的语言基础。这一背景后来塑造了我的研究兴趣，尤其是法语语法、法语性别习得以及学习者在习得新语言系统时面临的困难。']
];

const translations = { en: {}, fr: {}, zh: {} };
const sourceTextToKey = new Map();

translationEntries.forEach(([key, en, fr, zh]) => {
  translations.en[key] = en;
  translations.fr[key] = fr;
  translations.zh[key] = zh;
  sourceTextToKey.set(en.replace(/\s+/g, ' ').trim(), key);
});

sourceTextToKey.set("Master's", 'background.masters');
sourceTextToKey.set("Bachelor's", 'background.bachelors');
sourceTextToKey.set("Bachelor's - Foreign and Regional Languages, Literatures, and Civilizations (Chinese Language Studies)", 'background.baDegree');

const getElementText = (element) => {
  if (element.querySelector && element.querySelector('.flag')) {
    return Array.from(element.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  return element.textContent.replace(/\s+/g, ' ').trim();
};

const setElementText = (element, value) => {
  const hasChildren = element.children.length > 0;
  if (!hasChildren) {
    element.textContent = value;
    return;
  }

  const textNodes = Array.from(element.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
  if (!textNodes.length) {
    element.append(value);
    return;
  }

  textNodes[0].textContent = element.querySelector('.flag') ? ` ${value}` : value;
  textNodes.slice(1).forEach((node) => node.remove());
};

const hasOnlySafeInlineChildren = (element) => {
  return Array.from(element.children).every((child) => child.matches('.flag,.pill-dot,svg'));
};

const registerTranslatableElements = () => {
  document.querySelectorAll('.brand,.brand *,.brand-mark,.hero-logo,.home-hero h1').forEach((element) => {
    element.dataset.noTranslate = 'true';
  });

  const safeCopySelector = [
    '.nav-link',
    '.more-btn',
    '.drop-group-title',
    '.drop-item',
    '.hero .pill',
    '.hero .lead',
    '.hero .hero-note',
    '.hero .btn',
    'main h1:not(.home-hero h1)',
    'main h2',
    'main h3',
    'main p',
    'main .card-kicker',
    'main .focus-tags span',
    'main .software-tools-title',
    'main .software-tools-copy',
    'main .software-tools-link .inline-link',
    'main a',
    'main .pill',
    'main .btn',
    'footer span'
  ].join(',');

  document.querySelectorAll(safeCopySelector).forEach((element) => {
    if (
      element.dataset.i18n ||
      element.dataset.i18nHtml ||
      element.closest('[data-no-translate]') ||
      element.closest('.language-switcher') ||
      !hasOnlySafeInlineChildren(element)
    ) {
      return;
    }

    const key = sourceTextToKey.get(getElementText(element));
    if (key) element.dataset.i18n = key;
  });
};

const getCurrentLanguage = () => {
  const storedLanguage = localStorage.getItem('preferredLanguage');
  if (translations[storedLanguage]) return storedLanguage;
  const pageLanguage = document.documentElement.lang === 'zh-CN' ? 'zh' : document.documentElement.lang;
  return translations[pageLanguage] ? pageLanguage : 'en';
};

const updateDevNotesToggleLabel = (button, isOpen, language = getCurrentLanguage()) => {
  const label = button.querySelector('[data-dev-notes-label]');
  const arrow = button.querySelector('.scroll-arrow');
  const key = isOpen ? 'blogPost.devNotesToggleOpen' : 'blogPost.devNotesToggleClosed';
  const value = translations[language][key] || translations.en[key];

  if (label && value) {
    label.dataset.i18n = key;
    setElementText(label, value);
  }

  if (arrow) arrow.textContent = isOpen ? '↑' : '↓';
};

const applyLanguage = (language) => {
  const selectedLanguage = translations[language] ? language : 'en';
  document.documentElement.lang = selectedLanguage === 'zh' ? 'zh-CN' : selectedLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    if (element.closest('[data-no-translate]')) return;
    const key = element.dataset.i18n;
    const value = translations[selectedLanguage][key] || translations.en[key];
    if (value) setElementText(element, value);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    if (element.closest('[data-no-translate]')) return;
    const key = element.dataset.i18nHtml;
    const value = translations[selectedLanguage][key] || translations.en[key];
    if (value) element.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(';').forEach((item) => {
      const [attribute, key] = item.split(':');
      const value = translations[selectedLanguage][key] || translations.en[key];
      if (attribute && value) element.setAttribute(attribute, value);
    });
  });

  document.querySelectorAll('.language-switcher button').forEach((button) => {
    const isActive = button.dataset.lang === selectedLanguage;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  localStorage.setItem('preferredLanguage', selectedLanguage);

  document.querySelectorAll('.dev-notes-toggle').forEach((button) => {
    updateDevNotesToggleLabel(button, button.getAttribute('aria-expanded') === 'true', selectedLanguage);
  });
};

const createLanguageSwitcher = () => {
  if (document.querySelector('.language-switcher')) return;

  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  switcher.dataset.noTranslate = 'true';
  switcher.setAttribute('aria-label', 'Language selector');

  [
    ['fr', 'Français'],
    ['en', 'English'],
    ['zh', '中文']
  ].forEach(([language, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.lang = language;
    button.textContent = label;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => applyLanguage(language));
    switcher.appendChild(button);
  });

  document.body.prepend(switcher);
};

const initTranslations = () => {
  registerTranslatableElements();
  createLanguageSwitcher();
  applyLanguage(localStorage.getItem('preferredLanguage') || 'en');
};

const initDevNotesToggle = () => {
  document.querySelectorAll('.post-dev-notes').forEach((section) => {
    const button = section.querySelector('.dev-notes-toggle');
    const panel = section.querySelector('.post-dev-notes-panel');
    if (!button || !panel) return;

    const setOpen = (isOpen) => {
      panel.hidden = !isOpen;
      section.classList.toggle('is-open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
      updateDevNotesToggleLabel(button, isOpen);
    };

    setOpen(false);
    button.addEventListener('click', () => setOpen(panel.hidden));
  });
};

const createSiteBackground = () => {
  if (!document.body || document.querySelector('.site-background')) return;

  const background = document.createElement('div');
  background.className = 'site-background';
  background.setAttribute('aria-hidden', 'true');

  const wrap = document.createElement('div');
  wrap.className = 'site-background-parallax';

  for (let index = 0; index < 4; index += 1) {
    const blob = document.createElement('span');
    blob.className = 'site-aurora-blob';
    wrap.appendChild(blob);
  }

  background.appendChild(wrap);
  document.body.prepend(background);

  if (!motionQuery.matches) {
    let scrollNormTarget = 0;
    let scrollNorm = 0;
    const tParallax0 = performance.now();
    const syncScroll = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollNormTarget = window.scrollY / range;
    };
    window.addEventListener('scroll', syncScroll, { passive: true });
    syncScroll();

    const parallaxFrame = (now) => {
      const layer = background.querySelector('.site-background-parallax');
      if (layer) {
        scrollNorm += (scrollNormTarget - scrollNorm) * 0.07;
        const t = (now - tParallax0) / 1000;
        const billowX = Math.sin(t * 0.088) * 28 + Math.sin(t * 0.029 + 1.1) * 42;
        const billowY = Math.cos(t * 0.079) * 22 + Math.sin(t * 0.041 + 2.2) * 36;
        const scrollX = scrollNorm * 58;
        const scrollY = scrollNorm * 155;
        layer.style.transform = `translate3d(${billowX + scrollX}px, ${billowY + scrollY}px, 0)`;
      }
      requestAnimationFrame(parallaxFrame);
    };
    requestAnimationFrame(parallaxFrame);
  }
};

const createSiteCursorTube = () => {
  if (!document.body || document.querySelector('.site-cursor-aura')) return;

  const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (motionQuery.matches || !pointerQuery.matches) return;

  const homePaths = new Set(['', '/', '/index.html']);
  const isHomePage = homePaths.has(window.location.pathname) || window.location.pathname.endsWith('/index.html');
  const canvas = isHomePage ? document.createElement('canvas') : null;
  if (canvas) {
    canvas.className = 'site-cursor-tube-canvas';
    canvas.setAttribute('aria-hidden', 'true');
  }

  const aura = document.createElement('div');
  aura.className = 'site-cursor-aura';
  aura.setAttribute('aria-hidden', 'true');

  document.body.prepend(aura);
  if (canvas) document.body.prepend(canvas);

  const moduleUrl = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';
  const fallbackState = { destroy: null };
  const auraState = {
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    currentX: window.innerWidth / 2,
    currentY: window.innerHeight / 2,
    raf: 0,
    active: false
  };
  let tubeApp = null;
  let destroyed = false;

  const isHeroTubeArea = () => {
    if (!isHomePage) return false;
    const hero = document.querySelector('.home-hero, .hero');
    const threshold = hero ? Math.min(hero.offsetHeight * 0.76, window.innerHeight * 0.9) : window.innerHeight * 0.72;
    return window.scrollY < threshold;
  };

  const updateCursorLightingMode = () => {
    if (destroyed) return;
    const showTube = !!canvas && isHeroTubeArea();
    document.body.classList.toggle('cursor-tube-visible', showTube);
    document.body.classList.toggle('cursor-aura-visible', auraState.active && !showTube);
  };

  const moveAura = () => {
    auraState.currentX += (auraState.targetX - auraState.currentX) * 0.28;
    auraState.currentY += (auraState.targetY - auraState.currentY) * 0.28;
    aura.style.transform = `translate3d(${auraState.currentX - aura.offsetWidth / 2}px, ${auraState.currentY - aura.offsetHeight / 2}px, 0)`;

    if (Math.abs(auraState.targetX - auraState.currentX) > 0.2 || Math.abs(auraState.targetY - auraState.currentY) > 0.2) {
      auraState.raf = requestAnimationFrame(moveAura);
    } else {
      auraState.raf = 0;
    }
  };

  const handlePointerAura = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    auraState.targetX = event.clientX;
    auraState.targetY = event.clientY;
    auraState.active = true;
    updateCursorLightingMode();
    if (!auraState.raf && !document.hidden) auraState.raf = requestAnimationFrame(moveAura);
  };

  const handlePointerLeave = () => {
    auraState.active = false;
    document.body.classList.remove('cursor-aura-visible');
  };

  const startFallbackTube = () => {
    if (!canvas) return null;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return null;

    const maxAge = 300;
    const maxPoints = 12;
    const maxTrailDistance = 150;
    const minPointDistance = 9;
    const points = [];
    let animationFrame = 0;
    let pixelRatio = 1;

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const prunePoints = (now) => {
      while (points.length && now - points[0].time > maxAge) points.shift();
      while (points.length > maxPoints) points.shift();

      let distance = 0;
      for (let index = points.length - 1; index > 0; index -= 1) {
        distance += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
        if (distance > maxTrailDistance) {
          points.splice(0, index);
          break;
        }
      }
    };

    const addPoint = (x, y, now) => {
      const lastPoint = points[points.length - 1];
      if (lastPoint && Math.hypot(x - lastPoint.x, y - lastPoint.y) < minPointDistance) {
        lastPoint.x = x;
        lastPoint.y = y;
        lastPoint.time = now;
        return;
      }

      points.push({ x, y, time: now });
      prunePoints(now);
    };

    const drawLayer = (now, width, alpha, colorA, colorB) => {
      if (points.length < 2) return;

      context.lineCap = 'round';
      context.lineJoin = 'round';

      for (let index = 1; index < points.length; index += 1) {
        const p0 = points[index - 1];
        const p1 = points[index];
        const progress = index / (points.length - 1);
        const fade = Math.max(0, 1 - (now - p1.time) / maxAge);
        const strength = Math.pow(Math.min(progress, fade), 1.3);
        if (strength <= 0.025) continue;

        const gradient = context.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        gradient.addColorStop(0, colorA(alpha * strength * 0.72));
        gradient.addColorStop(1, colorB(alpha * strength));
        context.strokeStyle = gradient;
        context.lineWidth = width * (0.32 + strength * 0.68);
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.stroke();
      }
    };

    const render = (now) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      prunePoints(now);

      if (points.length > 1) {
        context.save();
        context.globalCompositeOperation = 'lighter';
        context.shadowBlur = 12;
        context.shadowColor = 'rgba(125, 211, 252, 0.18)';
        drawLayer(now, 13, 0.13, (a) => `rgba(76, 201, 255, ${a})`, (a) => `rgba(167, 139, 250, ${a})`);
        context.shadowBlur = 0;
        drawLayer(now, 5.2, 0.28, (a) => `rgba(125, 211, 252, ${a})`, (a) => `rgba(119, 141, 255, ${a})`);
        drawLayer(now, 1.7, 0.62, (a) => `rgba(241, 250, 255, ${a})`, (a) => `rgba(181, 230, 255, ${a})`);
        context.restore();
      }

      animationFrame = points.length ? requestAnimationFrame(render) : 0;
    };

    const requestRender = () => {
      if (!animationFrame && !document.hidden) animationFrame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      addPoint(event.clientX, event.clientY, performance.now());
      requestRender();
    };

    const clearTrail = () => {
      points.length = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        clearTrail();
      }
    };

    resizeCanvas();
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTrail();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  };

  const startReferenceTube = async () => {
    if (!canvas) return;
    try {
      const mod = await import(/* webpackIgnore: true */ moduleUrl);
      if (destroyed || !canvas.isConnected) return;

      const TubesCursorCtor = mod.default || mod;
      tubeApp = TubesCursorCtor(canvas, {
        tubes: {
          colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
          lights: {
            intensity: 160,
            colors: ['#e0f2fe', '#7dd3fc', '#8b5cf6', '#60a5fa']
          }
        }
      });

      canvas.dataset.cursorEngine = 'threejs-components';
    } catch (error) {
      if (destroyed || !canvas.isConnected) return;
      canvas.dataset.cursorEngine = 'canvas-fallback';
      fallbackState.destroy = startFallbackTube();
    }
  };

  const destroyTube = () => {
    destroyed = true;
    fallbackState.destroy?.();
    cancelAnimationFrame(auraState.raf);
    window.removeEventListener('pointermove', handlePointerAura);
    window.removeEventListener('mousemove', handlePointerAura);
    window.removeEventListener('pointerleave', handlePointerLeave);
    window.removeEventListener('scroll', updateCursorLightingMode);
    window.removeEventListener('resize', updateCursorLightingMode);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    try {
      tubeApp?.dispose?.();
    } catch {
      // The CDN cursor has different teardown support across versions.
    }
    document.body.classList.remove('cursor-tube-visible', 'cursor-aura-visible');
    canvas?.remove();
    aura.remove();
  };

  const handleCapabilityChange = () => {
    if (motionQuery.matches || !pointerQuery.matches) destroyTube();
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      auraState.active = false;
      cancelAnimationFrame(auraState.raf);
      auraState.raf = 0;
      document.body.classList.remove('cursor-aura-visible');
    }
  };

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', handleCapabilityChange);
    pointerQuery.addEventListener('change', handleCapabilityChange);
  } else {
    motionQuery.addListener(handleCapabilityChange);
    pointerQuery.addListener(handleCapabilityChange);
  }

  window.addEventListener('pointermove', handlePointerAura, { passive: true });
  window.addEventListener('mousemove', handlePointerAura, { passive: true });
  window.addEventListener('pointerleave', handlePointerLeave);
  window.addEventListener('scroll', updateCursorLightingMode, { passive: true });
  window.addEventListener('resize', updateCursorLightingMode);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  updateCursorLightingMode();
  if (canvas) startReferenceTube();
};

const createLanguageClouds = () => {
  const languages = [
    '中文',
    'Français',
    'English',
    '한국어',
    'العربية',
    'Español',
    'Deutsch',
    'Italiano',
    'Português',
    'Русский',
    '日本語',
    'Türkçe',
    'हिन्दी',
    'Tiếng Việt',
    'Bahasa Indonesia',
    'ไทย'
  ];
  const shuffledLanguages = [...languages];
  for (let index = shuffledLanguages.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledLanguages[index], shuffledLanguages[swapIndex]] = [shuffledLanguages[swapIndex], shuffledLanguages[index]];
  }
  const targets = document.querySelectorAll('.hero, .contact-panel');

  targets.forEach((target) => {
    if (target.querySelector('.language-cloud')) return;

    const cloud = document.createElement('div');
    cloud.className = 'language-cloud';
    cloud.setAttribute('aria-hidden', 'true');

    shuffledLanguages.forEach((language, index) => {
      const token = document.createElement('span');
      token.className = `lang-token token-${index + 1}`;
      token.textContent = language;
      token.style.animationDelay = `${-(Math.random() * 18).toFixed(2)}s`;
      cloud.appendChild(token);
    });

    target.prepend(cloud);
  });
};

const createShaderBackground = () => {
  if (motionQuery.matches || !document.body) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'shader-background';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: true,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance'
  });

  if (!gl) {
    canvas.remove();
    return;
  }

  const vertexSource = `
    attribute vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uScroll;

    float wave(float value) {
      return sin(value) * 0.5 + 0.5;
    }

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float ribbonVeil(float position, float width, float axis) {
      float d = abs(axis - position);
      return 1.0 - smoothstep(0.0, width, d);
    }

    float ribbonCore(float position, float sigma, float axis) {
      float d = axis - position;
      return exp(-(d * d) / max(sigma * sigma * 1.12, 1e-6));
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 uv = frag / uResolution.xy;
      vec2 field = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

      float scroll = clamp(uScroll, 0.0, 1.0);
      float scrollPhase = scroll * 6.2831853;
      float curtainBreath = sin(field.x * 1.05 + uTime * 0.052 + scrollPhase) * 0.034 * scroll;
      float curtainShear = sin(field.x * 0.62 + uTime * 0.031) * 0.018 * scroll;
      float fieldY = field.y + curtainBreath + curtainShear;

      float vignette = smoothstep(1.1, 0.15, length(field));
      float horizon = smoothstep(-0.72, -0.22, fieldY) * smoothstep(0.78, 0.17, fieldY);
      vec3 blue = vec3(0.48, 0.87, 1.0);
      vec3 cyan = vec3(0.38, 0.94, 0.99);
      vec3 ice = vec3(0.94, 0.99, 1.0);
      vec3 violet = vec3(0.66, 0.56, 0.99);

      vec3 color = vec3(0.0);
      float alpha = 0.0;

      for (int i = 0; i < 14; i++) {
        float index = float(i);
        float base = -0.58 + index * 0.086;
        float phase = index * 0.66 + scrollPhase * 0.35;
        float slow = sin(uTime * 0.019 + index * 0.31) * 0.012 * (1.0 + scroll);
        float curve = base + slow
          + sin(field.x * (2.05 + index * 0.105) + uTime * (0.072 + index * 0.0048) + phase) * 0.058
          + sin(field.x * (4.95 - index * 0.072) - uTime * 0.046 + phase * 1.05) * 0.019
          + sin(field.x * (7.4 + index * 0.04) + uTime * 0.038 + phase * 0.7) * 0.0085
          + sin(field.x * (13.2 + index * 0.055) + uTime * 0.027 + phase * 1.15) * 0.0038
          + scroll * 0.11 * sin(field.x * 1.55 + scrollPhase + uTime * 0.04);

        float veilW = 0.024 + wave(uTime * 0.11 + index) * 0.012;
        float sigma = 0.00122 + wave(uTime * 0.175 + index * 1.55) * 0.00095;

        float d = abs(fieldY - curve);
        float veil = ribbonVeil(curve, veilW, fieldY) * (0.02 + index * 0.0025);
        float core = ribbonCore(curve, sigma, fieldY);
        float coreAmp = (0.24 + index * 0.011) * core;
        float ridge = ribbonCore(curve + sin(field.x * 8.2 + phase) * 0.0088, sigma * 0.52, fieldY) * 0.12;
        float micro = 0.045 * exp(-(d * d) / (sigma * sigma * 6.2))
          * (0.5 + 0.5 * sin(field.x * 220.0 + uTime * 1.25 + index + scroll * 8.0));

        float band = (veil * 0.52 + coreAmp + ridge + micro) * horizon;
        vec3 bandColor = mix(cyan, violet, wave(index * 1.15 + uv.x * 2.05 + scroll * 0.4));
        bandColor = mix(bandColor, blue, smoothstep(0.0, 0.88, uv.y) * 0.28);
        bandColor = mix(bandColor, ice, clamp(core * 2.25, 0.0, 0.58));

        color += bandColor * band;
        alpha += (veil * 0.4 + coreAmp * 1.08 + ridge * 0.88 + micro * 0.62) * horizon;
      }

      float upperArc = ribbonVeil(0.34 + sin(field.x * 2.75 + uTime * 0.048 + scrollPhase) * 0.038, 0.011, fieldY) * 0.036;
      float lowerArc = ribbonVeil(-0.36 + sin(field.x * 3.35 - uTime * 0.042 + scrollPhase * 0.5) * 0.035, 0.0095, fieldY) * 0.026;

      color += mix(blue, violet, uv.x) * (upperArc + lowerArc) * vignette;
      alpha = clamp((alpha + upperArc + lowerArc) * vignette, 0.0, 0.76);

      vec2 gcoord = floor(frag * 0.85);
      float grain = hash(gcoord) - 0.5;
      float grain2 = hash(gcoord + vec2(31.7, 17.2)) - 0.5;
      color += vec3(grain * 0.007 + grain2 * 0.004);
      alpha = clamp(alpha + grain * 0.0025, 0.0, 0.8);

      gl_FragColor = vec4(color * vignette, alpha);
    }
  `;

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    canvas.remove();
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Shader link error:', gl.getProgramInfoLog(program));
    canvas.remove();
    return;
  }

  const positions = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1
  ]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'aPosition');
  const resolutionLocation = gl.getUniformLocation(program, 'uResolution');
  const timeLocation = gl.getUniformLocation(program, 'uTime');
  const scrollLocation = gl.getUniformLocation(program, 'uScroll');

  let animationFrame = 0;
  let startTime = performance.now();
  let scrollTarget = 0;
  let scrollSmooth = 0;

  const resizeCanvas = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 4);
    const width = Math.floor(window.innerWidth * pixelRatio);
    const height = Math.floor(window.innerHeight * pixelRatio);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const render = (now) => {
    resizeCanvas();
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollTarget = window.scrollY / maxScroll;
    scrollSmooth += (scrollTarget - scrollSmooth) * 0.06;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, (now - startTime) / 1000);
    if (scrollLocation !== null) gl.uniform1f(scrollLocation, scrollSmooth);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    const px = scrollSmooth * 36;
    const py = scrollSmooth * 88;
    canvas.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    animationFrame = requestAnimationFrame(render);
  };

  const stopShader = () => {
    cancelAnimationFrame(animationFrame);
    canvas.remove();
    window.removeEventListener('resize', resizeCanvas);
  };

  const handleMotionChange = (event) => {
    if (event.matches) stopShader();
  };

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', handleMotionChange);
  } else {
    motionQuery.addListener(handleMotionChange);
  }

  window.addEventListener('resize', resizeCanvas);
  animationFrame = requestAnimationFrame(render);
};

initTranslations();
initDevNotesToggle();

const isSoftwarePage = document.body?.classList.contains('software-page');
if (isSoftwarePage) {
  initSoftwareHero();
} else {
  createSiteBackground();
  createSiteCursorTube();
  createLanguageClouds();
  createShaderBackground();
}

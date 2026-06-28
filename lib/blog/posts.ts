export interface BlogPost {
  slug: string;
  title: string;
  category: "strategy" | "platform-guides" | "growth" | "comparisons";
  excerpt: string;
  publishedAt: string;
  author: string;
  body: string[]; // paragraphs, rendered with internal links inline via markdown-lite
}

export const CATEGORIES = [
  { id: "strategy", label: "Strategy" },
  { id: "platform-guides", label: "Platform guides" },
  { id: "growth", label: "Growth" },
  { id: "comparisons", label: "Comparisons" },
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cross-posting-without-looking-like-a-bot",
    title: "How to cross-post without looking like you're cross-posting",
    category: "strategy",
    excerpt:
      "The same caption on 7 platforms reads as lazy. Here's how to adapt one idea for each platform's actual reading context.",
    publishedAt: "2026-03-02",
    author: "Virello Team",
    body: [
      "TL;DR: Cross-posting fails when the caption ignores the platform. A 280-character punchy line works on X and dies on LinkedIn. A long structured post works on LinkedIn and gets buried on Threads. The fix isn't writing 7 different posts, it's writing one idea and adapting the delivery per platform.",
      "Most people who try cross-posting do one of two things wrong. Either they paste the identical text everywhere, which reads as low-effort the moment someone follows you on two platforms, or they give up and manually rewrite each version, which takes longer than just writing the post once would have.",
      "The actual skill here is separating the idea from the format. Your idea is the thing you want to say. The format is how that idea gets dressed for the room it's walking into. X wants the idea stripped to its sharpest line. LinkedIn wants context and a takeaway, with line breaks doing the pacing work that punctuation does on X. Instagram wants the idea paired with something to look at, and the caption supports the image rather than carrying the whole weight.",
      "A practical adaptation pass looks like this: write the core idea in plain language first, no platform in mind. Then for X, cut it to the sharpest single sentence plus maybe a follow-up line. For LinkedIn, expand with one concrete example and a closing question. For Threads, loosen the tone, this is the platform where a slightly unfinished thought performs better than a polished one.",
      "This is also where automatic caption adaptation earns its keep. A tool that just copies your text everywhere recreates the problem. A tool that actually checks each platform's character limit and trims intelligently, rather than just truncating mid-sentence, gets you most of the way to a post that doesn't read as copy-pasted, even before you do a manual pass.",
      "The platforms that require media, like TikTok and Instagram, force a different kind of discipline: you can't half-effort those, since no caption saves a post with no visual or video attached. Plan those two first if your content calendar includes them, since they're the most likely to get skipped when you're moving fast.",
      "If you're managing this across more than 2 or 3 platforms by hand, the math stops working past a certain volume. That's the actual case for a [cross-posting tool](/pricing): not because writing once is impossible manually, but because checking 7 platforms' formatting rules every single time is the part that burns time, not the writing itself.",
    ],
  },
  {
    slug: "best-time-to-post-2026",
    title: "Best time to post on social media in 2026, platform by platform",
    category: "growth",
    excerpt:
      "Generic 'best time to post' advice ignores that your audience's timezone and habits matter more than aggregate data. Here's how to actually figure out your windows.",
    publishedAt: "2026-03-10",
    author: "Virello Team",
    body: [
      "TL;DR: Aggregate 'best time to post' charts are a starting guess, not a rule. Your actual best time depends on where your specific audience lives and when they're scrolling, which you can only find from your own engagement history.",
      "Every year there's a new chart claiming Tuesday at 11am is the best time to post on Instagram. These charts aren't wrong exactly, they're just measuring an average across millions of accounts with wildly different audiences. If your audience is mostly in Lagos and the chart is built from US engagement data, you're optimizing for the wrong timezone entirely.",
      "The more useful approach is to treat published-time data as a starting hypothesis, then watch your own numbers. Most platforms show you when your specific followers are online, not when an average follower anywhere is online. Use that, not a blog post's chart.",
      "That said, a few patterns hold up across most platforms with decent consistency. Lunchtime and early evening, in the audience's local time, tend to outperform very early morning or late night slots, simply because more people are actively scrolling rather than just glancing at notifications. Weekday posting generally outperforms weekend posting for professional content like LinkedIn, while weekend posting can do better for lifestyle and entertainment content on Instagram and TikTok.",
      "The platform also changes the math. X rewards posting frequency more than most platforms, since the feed moves fast and a single post has a short effective lifespan. LinkedIn posts have a longer tail, sometimes still gaining traction a full day later, so posting less frequently but with more substance tends to work better there.",
      "If you're publishing the same idea to several platforms, you don't actually need to post everywhere at the exact same minute. Scheduling each platform's version for its own optimal window, even if that's a few hours apart, usually beats firing everything simultaneously. A [scheduling and cross-posting setup](/features) that lets you stagger by platform, rather than forcing one timestamp across all of them, handles this without extra manual work.",
      "The real takeaway: collect 3-4 weeks of your own data before trusting any chart, including this one.",
    ],
  },
  {
    slug: "instagram-caption-character-limit",
    title: "Instagram caption character limit in 2026 (and what actually gets cut off)",
    category: "platform-guides",
    excerpt:
      "Instagram's limit is more generous than people think, but the visible portion before 'more' is what actually matters for engagement.",
    publishedAt: "2026-03-14",
    author: "Virello Team",
    body: [
      "TL;DR: Instagram allows up to 2,200 characters in a caption, but only the first couple of lines show before the 'more' cutoff. Write your hook for that visible window, not the full limit.",
      "The 2,200 character ceiling rarely matters in practice. What actually matters is that Instagram truncates captions in the feed after roughly 125 characters, sometimes less depending on device and font size, before showing a 'more' link. Everything after that point is invisible unless someone taps through, and most people don't tap through.",
      "This means your first line is doing almost all the work. If the hook doesn't land in the visible portion, the rest of a beautifully written caption might as well not exist for most viewers. Front-load the point, save the elaboration for after the fold.",
      "Hashtags count against the same 2,200 character limit, and Instagram caps you at 30 hashtags per post regardless of length. In practice, using all 30 rarely helps and can read as spammy. A tighter set of 5 to 10 specific, relevant tags generally outperforms a wall of generic ones.",
      "Line breaks matter more on Instagram than people expect. A wall of text without breaks looks dense and gets skipped even within the visible character window. Short paragraphs, even one-line ones, make the caption feel readable at a glance.",
      "If you're adapting a longer post written for LinkedIn or a blog down to Instagram, the job isn't compression, it's rewriting. The first sentence needs to work completely on its own, since it's effectively the whole caption for most viewers. Tools that just truncate a longer caption at the character limit miss this, since a mechanically cut sentence rarely lands as a hook. Adapting the message instead of just trimming it is exactly the gap between [a real cross-posting tool](/features) and one that just copies and pastes the same text everywhere.",
    ],
  },
  {
    slug: "tiktok-vs-instagram-reels-2026",
    title: "TikTok vs Instagram Reels in 2026: where should your video actually go first",
    category: "platform-guides",
    excerpt:
      "Same video, different algorithms, different audience expectations. Here's how to decide where to post first when you only have time for one.",
    publishedAt: "2026-03-19",
    author: "Virello Team",
    body: [
      "TL;DR: TikTok rewards raw, fast hooks and rewards experimentation. Reels rewards a slightly more polished version of the same energy and benefits from an existing Instagram following. Post to both, but know which one to prioritize when you're short on time.",
      "Both platforms run on short vertical video with sound-on viewing as the default, and the overlap in what performs is real: a strong first 2 seconds, a clear payoff, and enough movement or change to hold attention. But the audiences behave differently in ways that change what 'good' looks like.",
      "TikTok's discovery algorithm leans harder into pure interest matching with less weight on your existing follower count. A brand new account with zero followers can go genuinely viral on TikTok in a way that's much rarer on Reels, where your existing audience and posting history carry more weight in what gets shown to whom.",
      "This means TikTok is the better platform for testing new content ideas and formats, since the algorithm gives unproven content a fair shot regardless of your history. Reels is the better platform for consistently reaching an audience you've already built, since your existing followers and their engagement patterns matter more there.",
      "Practically: if you have an established Instagram following and limited time, post to Reels first, since you have leverage there already. If you're starting from zero or testing a new content angle, TikTok gives you a more level playing field to find out if the idea works at all.",
      "The actual video file usually works on both platforms with no changes needed, vertical 9:16 video under a couple of minutes satisfies both. What needs to change is the caption and possibly the on-screen text pacing, since TikTok captions can be more casual and reference trends directly, while Reels captions tend to do slightly better with a touch more context since the audience often knows you already.",
      "Publishing to both from a single upload, rather than re-exporting and re-uploading manually twice, is one of the more mechanical time-savers in a creator's workflow. That's a core part of what [a 7-platform posting tool](/) is actually solving for.",
    ],
  },
  {
    slug: "linkedin-algorithm-2026",
    title: "What's actually working on the LinkedIn algorithm in 2026",
    category: "platform-guides",
    excerpt:
      "LinkedIn rewards dwell time and comments more than likes. Here's what that means for how you should structure a post.",
    publishedAt: "2026-03-25",
    author: "Virello Team",
    body: [
      "TL;DR: LinkedIn's feed favors posts that keep people reading and commenting, not posts that get a quick like and a scroll-past. Structure your posts to earn dwell time.",
      "LinkedIn has been fairly consistent about this for a few years now: a 'like' is the weakest engagement signal in their ranking, and a meaningful comment, especially one that gets a reply from the original poster, carries far more weight. This changes what a good LinkedIn post actually looks like compared to a good post on most other platforms.",
      "The structural pattern that tends to work: a hook line that creates a small information gap, several short paragraphs with deliberate line breaks that make the post feel like a quick read even when it's fairly long, and a closing line that invites a specific kind of response rather than a generic 'thoughts?'.",
      "Posting native video and native documents, rather than linking out to an external article, tends to outperform link posts, since LinkedIn's ranking has historically deprioritized posts that send people off-platform. If you're sharing a blog post or article, summarizing the core point directly in the LinkedIn post and linking in a comment, rather than the post body, is a common workaround.",
      "Posting frequency on LinkedIn works differently than on X or Threads. Because individual posts have a longer effective lifespan, sometimes still gaining views a full day or two later, posting once a day with real substance tends to outperform posting multiple times a day. The platform doesn't reward volume the way faster-moving feeds do.",
      "If LinkedIn is one of several platforms you're posting the same core idea to, it's usually the platform that needs the most rewriting, not just trimming. A punchy X-style line rarely works as-is on LinkedIn, it needs the context and structure added back in. This is the exact gap that purely character-limit-based [caption adaptation](/features) needs to account for, rather than just cutting text to fit.",
    ],
  },
  {
    slug: "social-media-burnout",
    title: "Social media posting burnout is real, here's the actual fix",
    category: "strategy",
    excerpt:
      "The problem usually isn't motivation, it's that manual cross-platform posting takes far longer than it should.",
    publishedAt: "2026-04-01",
    author: "Virello Team",
    body: [
      "TL;DR: A lot of 'content burnout' is actually workflow burnout. The idea generation isn't the exhausting part, the manual repetition across platforms is.",
      "There's a specific kind of fatigue that sets in for creators and small business owners managing social presence across several platforms: not a lack of ideas, but dread at the process of turning one idea into 5 or 6 differently-formatted posts, uploading each one separately, and checking that nothing got cut off or rejected for the wrong media type.",
      "This kind of burnout responds differently to motivation advice than creative burnout does. Telling someone to 'find their passion again' doesn't fix a workflow that takes 45 minutes to publish one idea across platforms. The fix is mechanical, not emotional: reduce the actual number of repetitive steps between having an idea and it being live everywhere.",
      "A useful diagnostic question: how much of your posting time is spent on the idea itself, versus reformatting and re-uploading the same idea? For most people managing more than 2 platforms manually, the reformatting time dwarfs the idea time. That ratio is the actual problem, and it's a solvable one.",
      "Batch writing helps somewhat, sitting down once a week to draft several posts rather than writing in the moment, but it doesn't solve the per-platform repetition, it just moves it. The repetition itself is what needs to shrink.",
      "This is the practical argument for [consolidating cross-posting into one compose flow](/) rather than logging into 5 different apps: not because any individual upload is hard, but because the cumulative weekly time cost of doing it manually is the actual source of the burnout, far more than the writing itself.",
    ],
  },
  {
    slug: "x-twitter-character-limit-threads",
    title: "X's character limit and when to use a thread instead of one post",
    category: "platform-guides",
    excerpt:
      "280 characters isn't always the wall it used to be, but knowing when to thread versus when to compress is still a real skill.",
    publishedAt: "2026-04-06",
    author: "Virello Team",
    body: [
      "TL;DR: The standard 280-character limit still governs most accounts and most practical posting. Threading helps when an idea genuinely needs sequential steps, not as a workaround for an idea that should just be shorter.",
      "The character limit conversation on X has gotten more complicated over the past couple of years, but for the overwhelming majority of accounts and use cases, 280 characters per post remains the practical ceiling worth planning around. Building your habits around that number, rather than edge cases, keeps your content working consistently.",
      "Threading exists for ideas that have real sequential structure, a list of steps, a story with a beginning and an end, an argument that builds point by point. The mistake is threading an idea that didn't need it, just because the first attempt didn't fit in one post. If you can cut the idea down to fit 280 characters without losing the point, that's usually the better post.",
      "A thread's first post does almost all the work for whether anyone reads further. It needs to work as a complete, compelling unit on its own, since that's the only part most people see in their feed before deciding to tap in. Burying your hook in post 2 or 3 of a thread is a common and costly mistake.",
      "When you're adapting a longer LinkedIn-style post down to X, the instinct is often to thread it. Sometimes that's right. But often the better move is finding the single sharpest sentence in the longer piece and posting just that, with the full version linked or referenced elsewhere. A thread isn't always the most efficient adaptation, it's just the most literal one.",
      "If you're publishing the same core idea across X and other platforms, [automatic per-platform adaptation](/features) that understands the difference between 'needs threading' and 'just needs trimming' saves real editing time compared to a blanket character-count truncation.",
    ],
  },
  {
    slug: "facebook-still-worth-it-2026",
    title: "Is Facebook still worth posting to in 2026?",
    category: "strategy",
    excerpt:
      "Organic reach on Facebook pages is famously low, but the platform still matters for specific audiences and use cases.",
    publishedAt: "2026-04-11",
    author: "Virello Team",
    body: [
      "TL;DR: Facebook page organic reach is genuinely low for most content types, but the platform still has real value for local business, community groups, and an older demographic that newer platforms underserve.",
      "It's become common to write off Facebook as a dead platform for organic content, and the data on page reach supports a lot of that skepticism. Brand pages routinely see single-digit percentage reach on posts relative to their follower count. That's a real constraint, not a myth.",
      "But the platform's value isn't evenly distributed across use cases. For local businesses, Facebook remains one of the most-used platforms for finding hours, location, reviews, and direct contact, especially among demographics that skew older than TikTok or Instagram's core user base. If your audience includes people over 45, Facebook is often still where they actually are.",
      "Facebook groups, as distinct from pages, retain meaningfully better organic reach for the content posted within them, since group content surfaces differently than page content in the algorithm. If community-building is part of your strategy, a group can outperform a page by a wide margin for the same content.",
      "Facebook also remains a meaningful surface for paid distribution even when organic reach is weak, since the ad targeting infrastructure is mature and the audience size is still enormous. Treating Facebook purely as an organic content platform misses where a lot of its remaining practical value actually sits.",
      "The pragmatic approach for most creators and small businesses: don't make Facebook your primary platform if it isn't already, but don't drop it entirely either, since the cost of including it in a [cross-posting routine](/pricing) you're already running for other platforms is close to zero extra effort once the post itself is written.",
    ],
  },
  {
    slug: "content-calendar-template-2026",
    title: "A content calendar structure that actually survives a busy month",
    category: "strategy",
    excerpt:
      "Most content calendar templates assume you have more planning time than you do. Here's a version built for realistic weeks.",
    publishedAt: "2026-04-17",
    author: "Virello Team",
    body: [
      "TL;DR: An overly detailed content calendar gets abandoned the first busy week. A simpler structure with built-in slack survives longer and produces more consistent output over a full quarter.",
      "Most content calendar templates online assume a level of advance planning that doesn't match how most creators and small teams actually operate. They ask you to fill in exact post copy weeks ahead, which works fine until something timely happens, or you simply don't have the bandwidth that week, and the whole calendar falls out of sync with reality.",
      "A more durable structure separates three layers: themes, not posts, planned a month out. Specific post ideas, planned a week out. And actual finished copy, written no more than 2-3 days before publishing. This keeps the long-range planning useful without requiring you to predict exact wording a month in advance.",
      "Building in deliberately empty slots, maybe one day a week with no planned theme, gives you room for timely or reactive content without breaking the rest of the calendar. A calendar with zero slack breaks the first time something urgent or interesting comes up that wasn't planned for.",
      "Batch-writing within the week-ahead layer, sitting down once to draft several posts rather than writing each one the day it's due, tends to produce better quality than writing under daily time pressure, while still leaving room to adjust based on what's actually happening that week.",
      "Once the copy is written, the remaining bottleneck for most people managing multiple platforms is the mechanical publishing step, adapting and uploading to each platform separately. Scheduling everything from [one compose flow](/dashboard) rather than logging into each platform individually is the part of the calendar that's worth automating first, since it's pure repetition with no creative value.",
    ],
  },
  {
    slug: "ai-generated-captions-still-need-editing",
    title: "AI-generated captions still need a human pass, here's why",
    category: "growth",
    excerpt:
      "AI caption tools are genuinely useful for a first draft, but publishing them unedited has a specific, recognizable tell.",
    publishedAt: "2026-04-23",
    author: "Virello Team",
    body: [
      "TL;DR: AI-generated captions are a solid starting point but tend to default to a generic, slightly over-explained tone that experienced social media users have started to recognize. A short human edit pass fixes most of it.",
      "AI caption generation has gotten genuinely useful over the past couple of years for getting past a blank text box, suggesting a structure, or generating a few angle options for the same idea quickly. That's real value, and treating these tools as worthless is its own kind of mistake.",
      "But there's a recognizable pattern in unedited AI output: a tendency toward slightly over-explaining the obvious, a particular rhythm of short declarative sentences followed by a summary line, and word choices that cluster around the same handful of intensifiers. Once you've seen the pattern a few times, it becomes easy to spot, and increasingly, audiences are spotting it too.",
      "The fix isn't avoiding AI-generated drafts, it's treating the output as exactly that: a draft. Reading it out loud once tends to catch the most obvious tells, sentences that no one would actually say conversationally get rewritten naturally just from that single pass.",
      "Cutting the first AI-generated sentence is often a good default move, since AI drafts frequently restate the topic before getting to the actual point, while a human writer usually starts closer to the point itself.",
      "Where AI caption tools are most useful is generating options, not a final answer. Asking for 3 different angles on the same idea and picking the one that sounds most like how you'd actually say it tends to produce a better result than asking for one caption and publishing it as-is. [Caption suggestions built into your posting workflow](/features) work best treated this way: as a fast first draft generator, not a replacement for a final read-through.",
    ],
  },
  {
    slug: "small-business-social-media-no-time",
    title: "Social media for small businesses that genuinely don't have time for it",
    category: "strategy",
    excerpt:
      "Most small business social media advice assumes you have a marketing person. Here's a realistic minimum that still works.",
    publishedAt: "2026-04-29",
    author: "Virello Team",
    body: [
      "TL;DR: A consistent, simple presence on 2-3 platforms beats an ambitious plan across 6 that gets abandoned after two weeks. Pick the minimum that's sustainable and protect it.",
      "Most social media advice aimed at small businesses is written by people who do social media as their full-time job, and it shows in the recommendations: post daily, engage with every comment within an hour, run a content calendar a month out, track analytics weekly. For an owner-operator running the actual business too, this is a recipe for starting strong and quietly stopping by week three.",
      "A more realistic starting point: pick the 2 platforms where your actual customers already are, not the platforms that feel exciting or trendy. For most local service businesses, that's often Instagram and Facebook, or Instagram and Google Business Profile content. For B2B, it's more often LinkedIn and possibly X.",
      "Commit to a frequency you can sustain even during your busiest week, not your best week. Twice a week, consistently, for six months produces more compounding value than daily posting for three weeks followed by silence. Consistency is the actual ranking factor here, far more than raw volume.",
      "Reusing the same core content across your chosen platforms, rather than creating platform-specific content from scratch each time, is the single biggest time-saver available to a small business without a marketing hire. A photo from the shop floor, paired with a short caption, can become a Facebook post, an Instagram post, and a quick update all from the same five minutes of effort, if the reformatting step is handled automatically rather than manually.",
      "This is precisely the gap [a cross-posting tool](/use-cases/small-business) is built to close for a business owner: not replacing the judgment of what to post, but removing the repetitive manual work of reformatting and re-uploading the same idea multiple times.",
    ],
  },
  {
    slug: "youtube-shorts-vs-long-form-2026",
    title: "YouTube Shorts vs long-form: should a small creator split focus in 2026",
    category: "platform-guides",
    excerpt:
      "Shorts and long-form videos serve different jobs in your channel's growth. Here's how to think about the split without spreading yourself too thin.",
    publishedAt: "2026-05-04",
    author: "Virello Team",
    body: [
      "TL;DR: Shorts are a discovery and reach tool. Long-form is a depth and retention tool. Most small creators benefit from leaning on Shorts early and shifting toward long-form once they have an audience worth deepening.",
      "YouTube's Shorts feed functions much more like TikTok's discovery algorithm than like the traditional YouTube recommendation engine: new viewers with no subscription history can be shown a Short, and a single video can reach far beyond your existing subscriber base if it performs well in the first few hours.",
      "Long-form video on YouTube works through a different mechanism, leaning more heavily on watch history, subscriber relationships, and search intent. A long-form video rarely explodes the way a Short can, but it tends to have a much longer effective lifespan, sometimes still generating views years after upload, especially for evergreen, search-driven topics.",
      "For a creator starting from zero subscribers, Shorts are usually the faster path to building initial audience, since the discovery mechanism doesn't require an existing relationship with viewers. Once there's a base audience, shifting effort toward long-form tends to build a more durable, monetizable channel, since long-form supports better ad revenue and deeper audience relationships.",
      "A practical middle path many creators land on: use Shorts as the discovery and top-of-funnel layer, clipping moments from longer content or creating short standalone hooks, while treating long-form as the destination for viewers who get pulled in. The Short doesn't need to carry the whole message, it needs to earn the click toward the fuller piece.",
      "If Shorts content is also being adapted for TikTok and Instagram Reels, which is increasingly common since the vertical video format and rough content style translate well across all three, the publishing step is where time gets wasted fastest, uploading the same file three separate times with three separate caption rewrites. [Publishing to all three from one upload](/) removes that specific friction without changing the creative decisions at all.",
    ],
  },
  {
    slug: "manual-bank-transfer-payments-nigeria-saas",
    title: "Why some Nigerian SaaS tools use bank transfer instead of cards, and what it means for you",
    category: "strategy",
    excerpt:
      "Card payment infrastructure in Nigeria has real friction that bank transfer sidesteps. Here's the honest tradeoff.",
    publishedAt: "2026-05-09",
    author: "Virello Team",
    body: [
      "TL;DR: Card decline rates and international payment friction make bank transfer a genuinely practical primary payment method for some Nigerian-built tools, not just a stopgap. It comes with a manual verification step that card payments don't have.",
      "International card payments routed through Nigerian banks have historically had higher decline and friction rates than card payments processed within markets with more mature card infrastructure. For a small SaaS business, a payment method with a high failure rate at checkout is a real cost, even before considering currency conversion fees.",
      "Bank transfer through services like Moniepoint or GTBank sidesteps a lot of that friction for customers already banking within Nigeria, since the transfer happens directly between accounts rather than through a card network with its own approval logic. The tradeoff is that it isn't instant and automatic the way a card charge is.",
      "What this means practically for a customer: after choosing a plan, you'll see direct account transfer details rather than a card form. After sending the transfer, you confirm it on your end, and the provider verifies the transfer manually before activating the plan. This usually takes a few hours rather than the instant activation a card payment provides.",
      "This is a real, honest tradeoff, not a workaround dressed up as a feature. The benefit is fewer failed payments and no card network fees passed on to the customer. The cost is a short delay between paying and activation, and it requires trusting the provider to actually verify and activate promptly.",
      "For [Virello's own billing](/pricing), this is exactly the model in place today: manual transfer via Moniepoint or GTBank, verified and activated within a few hours. As more automated options become viable in this market, that's a natural next layer to add, but starting from a payment method that already works reliably for the actual customer base is a reasonable place to start from.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(current: BlogPost, count = 3) {
  return BLOG_POSTS.filter((p) => p.slug !== current.slug && p.category === current.category).slice(
    0,
    count
  );
}

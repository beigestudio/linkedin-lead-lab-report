
import { Question } from "@/types/audit";

export const questions: Question[] = [
  {
    id: 1,
    question: "How often do you post on your personal LinkedIn profile?",
    options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
    feedback: {
      "Daily": "Impressive discipline! Daily posting builds top-of-mind presence fast. As a LinkedIn strategist, I see this separating the 1% who actually generate consistent leads. Key question: Does every post have a strategic lead-gen hook tailored to your ideal client's pain points?",
      "Weekly": "Good consistency foundation. But weekly without strategic hooks loses momentum in LinkedIn's algorithm. Most founders I audit post weekly but wonder why they're not getting client inquiries. The issue? Generic content without conversion-focused CTAs.",
      "Monthly": "This frequency won't build your personal brand or generate leads. LinkedIn rewards consistent creators. Most C-suite executives I work with started here and stayed invisible until we implemented a strategic posting schedule.",
      "Rarely": "Your competitors are posting while you're not - they're capturing your potential clients. This is exactly why 87% of founders struggle with LinkedIn lead generation. Visibility equals viability in today's market.",
      "Never": "You're essentially invisible to your ideal clients. LinkedIn is where your prospects are making buying decisions daily. Every day you don't post is revenue walking out the door to competitors who show up consistently."
    }
  },
  {
    id: 2,
    question: "Does your personal LinkedIn headline clearly communicate who you help and the specific outcome you deliver?",
    options: ["Yes, crystal clear", "Somewhat clear", "No, it's vague"],
    feedback: {
      "Yes, crystal clear": "Excellent! Your headline is your #1 conversion asset on LinkedIn. I hope it's outcome-driven, not just a job title. Pro tip from my audits: The best headlines I've crafted for C-suite clients focus on the transformation they provide, not their credentials.",
      "Somewhat clear": "You're losing high-value clients here. From auditing 500+ executive profiles, vague headlines are the #1 reason qualified prospects scroll past. Your headline needs to promise a clear, measurable benefit that makes your ideal client think 'That's exactly what I need.'",
      "No, it's vague": "This is a massive visibility blocker costing you clients daily. Generic headlines like 'CEO at Company X' tell prospects nothing about why they should care. I've seen headline optimizations alone increase profile views by 340% and double inbound inquiries."
    }
  },
  {
    id: 3,
    question: "How compelling is your About section? Does it tell a results-focused story that hooks your ideal client?",
    options: ["Highly compelling, results-focused", "Somewhat engaging, could be stronger", "More like a resume/bio, not client-focused"],
    feedback: {
      "Highly compelling, results-focused": "Perfect positioning! Make sure it ends with a direct call-to-action for calls or messages. The best About sections I've written for executives follow the problem-agitation-solution formula and end with clear next steps for prospects.",
      "Somewhat engaging, could be stronger": "You're missing emotional connection or clear positioning. Your About section should make prospects think 'This person understands my exact challenge.' Most executives I audit have About sections that talk about them, not their client's transformation.",
      "More like a resume/bio, not client-focused": "Nobody hires based on LinkedIn resumes. Your story must speak directly to client problems and position you as the definitive solution. I've seen About section rewrites increase discovery call bookings by 250% for executive clients."
    }
  },
  {
    id: 4,
    question: "How strong are your post hooks? Do they consistently stop your ideal clients from scrolling?",
    options: ["Always hook within 1-2 lines", "Sometimes hooks work", "Hooks rarely catch attention"],
    feedback: {
      "Always hook within 1-2 lines": "Excellent! Hooks are critical for LinkedIn's algorithm and engagement. The question is: Are your hooks specifically tailored to your ideal client's urgent pain points? Generic hooks get generic audiences - not qualified prospects.",
      "Sometimes hooks work": "Inconsistency kills momentum on LinkedIn. Every post needs a hook that speaks directly to your prospect's current challenge. Random hooks attract random people, not high-value clients ready to invest in solutions.",
      "Hooks rarely catch attention": "Without compelling hooks, your posts are invisible in the feed. This is exactly why your engagement is low and you're not generating qualified leads. Strong hooks are the difference between 50 views and 5,000 views."
    }
  },
  {
    id: 5,
    question: "Do your posts consistently include strategic calls-to-action that drive qualified prospects to take action?",
    options: ["Yes, every post has a strategic CTA", "Sometimes, not always", "Rarely or never"],
    feedback: {
      "Yes, every post has a strategic CTA": "Perfect! CTAs turn engagement into business conversations. The best executive accounts I manage have CTAs that feel natural and valuable, not salesy. Are yours driving the right type of prospects to reach out?",
      "Sometimes, not always": "You're missing conversion opportunities. Every piece of content should guide prospects toward a next step, whether that's a comment, DM, or call booking. Inconsistent CTAs mean inconsistent lead flow.",
      "Rarely or never": "Without CTAs, you're creating expensive content with zero ROI. You're educating your competitors' future clients. Every post should have a clear next step that moves prospects closer to working with you."
    }
  },
  {
    id: 6,
    question: "How targeted is your LinkedIn network? Are your connections qualified prospects who could become clients?",
    options: ["Highly targeted, handpicked prospects", "Somewhat targeted", "Not targeted at all"],
    feedback: {
      "Highly targeted, handpicked prospects": "Smart strategy! A focused network of qualified prospects is infinitely more valuable than random connections. Quality over quantity always wins for executive personal branding and lead generation.",
      "Somewhat targeted": "You could dramatically improve your connection strategy. Every connection should be a potential client, referral partner, or industry influencer. Random connections dilute your authority and waste your time.",
      "Not targeted at all": "Random networks hurt your authority and create noise in your feed. Strategic connection building with ideal prospects is how executives build valuable business relationships that convert to revenue."
    }
  },
  {
    id: 7,
    question: "How consistently do you engage meaningfully with your ideal prospects' content to build relationships?",
    options: ["Daily strategic engagement", "Weekly engagement", "Rarely engage", "Never engage"],
    feedback: {
      "Daily strategic engagement": "Excellent relationship-building habit! Strategic engagement builds trust and positions you as a peer, not a vendor. This is how the most successful executives I work with build their pipeline organically.",
      "Weekly engagement": "Decent foundation, but not enough frequency to build meaningful relationships with high-value prospects. LinkedIn relationships require consistent nurturing to convert into business conversations.",
      "Rarely engage": "Without genuine engagement, you're just broadcasting to strangers. The money is in the relationships, and relationships require consistent, valuable interactions with your ideal prospects.",
      "Never engage": "You're missing the core of LinkedIn's power - relationship building. Social selling isn't posting and hoping - it's strategic relationship nurturing that leads to trusted advisor status and inbound opportunities."
    }
  },
  {
    id: 8,
    question: "Are you consistently converting LinkedIn conversations into qualified discovery calls with ideal prospects?",
    options: ["Yes, regularly booking qualified calls", "Occasionally, but inconsistent", "No, conversations don't convert"],
    feedback: {
      "Yes, regularly booking qualified calls": "You're executing well! The key is scaling this process. Are you tracking which conversation starters and follow-up sequences have the highest conversion rates to qualified calls?",
      "Occasionally, but inconsistent": "Your outreach or follow-up process needs systematization. Small improvements in your conversation flow and call-booking process can easily double your discovery call rate with qualified prospects.",
      "No, conversations don't convert": "LinkedIn leads are there, but you need a proven system to convert conversations into calls. Most executives struggle here because they're too salesy too fast, or not strategic enough in their follow-up."
    }
  },
  {
    id: 9,
    question: "Do you systematically track LinkedIn metrics (reach, engagement, leads, calls booked) to optimize your personal brand strategy?",
    options: ["Yes, comprehensive tracking", "Sometimes track basic metrics", "No systematic tracking"],
    feedback: {
      "Yes, comprehensive tracking": "Data-driven approach! This separates elite personal brands from everyone else. The executives who track and optimize consistently see 3x better results than those who post and hope.",
      "Sometimes track basic metrics": "Partial tracking limits your optimization potential. Systematic metric tracking helps you double down on what works and eliminate what doesn't - crucial for executive time efficiency.",
      "No systematic tracking": "Without data, you're flying blind and wasting time on ineffective strategies. Tracking your LinkedIn ROI is essential for building a personal brand that actually generates qualified business opportunities."
    }
  }
];

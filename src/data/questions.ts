
import { Question } from "@/types/audit";

export const questions: Question[] = [
  {
    id: 1,
    question: "How often do you post on your personal LinkedIn profile?",
    options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
    feedback: {
      "Daily": "Excellent consistency! Daily posting builds strong thought leadership and keeps you visible to your network. The key is ensuring each post provides strategic value to your target audience while positioning you as an industry expert.",
      "Weekly": "Good foundation for building your professional brand. Weekly posting can be effective when each post is high-quality and strategically crafted. Consider increasing frequency gradually while maintaining content quality.",
      "Monthly": "This frequency limits your ability to build meaningful engagement with your target audience. Most successful executives find that more consistent posting helps maintain visibility and thought leadership in their industry.",
      "Rarely": "Inconsistent posting makes it challenging to build your personal brand and stay connected with your professional network. Regular, valuable content sharing is essential for LinkedIn success.",
      "Never": "You're missing significant opportunities to establish thought leadership and connect with potential clients or partners. Even modest, consistent posting can dramatically improve your professional visibility."
    }
  },
  {
    id: 2,
    question: "Does your personal LinkedIn headline clearly communicate who you help and the specific outcome you deliver?",
    options: ["Yes, crystal clear", "Somewhat clear", "No, it's vague"],
    feedback: {
      "Yes, crystal clear": "Excellent! A clear, outcome-focused headline is crucial for attracting the right audience. Ensure it speaks directly to your target market's needs and the transformation you provide.",
      "Somewhat clear": "There's room for optimization here. Your headline should immediately communicate the value you provide to your specific target audience. Consider refining it to be more outcome-focused and compelling.",
      "No, it's vague": "This is a critical area for improvement. Your headline is prime real estate for attracting your ideal connections. A clear, benefit-driven headline can significantly increase profile engagement and connection requests."
    }
  },
  {
    id: 3,
    question: "How compelling is your About section? Does it tell a results-focused story that hooks your ideal client?",
    options: ["Highly compelling, results-focused", "Somewhat engaging, could be stronger", "More like a resume/bio, not client-focused"],
    feedback: {
      "Highly compelling, results-focused": "Outstanding! A well-crafted About section that focuses on client outcomes rather than personal achievements is key to attracting quality connections and opportunities.",
      "Somewhat engaging, could be stronger": "Your About section has potential but could benefit from more strategic positioning. Focus on addressing your target audience's challenges and clearly articulating how you solve them.",
      "More like a resume/bio, not client-focused": "This is a common miss that significantly impacts your LinkedIn effectiveness. Transform your About section to speak directly to your ideal client's needs rather than listing your background."
    }
  },
  {
    id: 4,
    question: "How strong are your post hooks? Do they consistently stop your ideal clients from scrolling?",
    options: ["Always hook within 1-2 lines", "Sometimes hooks work", "Hooks rarely catch attention"],
    feedback: {
      "Always hook within 1-2 lines": "Excellent! Strong hooks are essential for cutting through LinkedIn's noise. The best hooks address specific pain points or offer intriguing insights that your target audience can't ignore.",
      "Sometimes hooks work": "Consistency in crafting compelling hooks will improve your content performance. Focus on opening lines that immediately speak to your target audience's current challenges or interests.",
      "Hooks rarely catch attention": "This significantly impacts your content's reach and engagement. Strong hooks are the difference between content that gets ignored and content that drives meaningful business conversations."
    }
  },
  {
    id: 5,
    question: "Do your posts consistently include strategic calls-to-action that drive qualified prospects to take action?",
    options: ["Yes, every post has a strategic CTA", "Sometimes, not always", "Rarely or never"],
    feedback: {
      "Yes, every post has a strategic CTA": "Perfect strategy! Well-crafted CTAs guide your audience toward meaningful next steps, whether that's engagement, connection, or business conversations.",
      "Sometimes, not always": "Consistency with strategic CTAs will improve your conversion from content to business conversations. Every piece of content should have a clear purpose and next step for your audience.",
      "Rarely or never": "You're missing opportunities to convert engagement into business relationships. Strategic CTAs help guide prospects through your relationship-building process."
    }
  },
  {
    id: 6,
    question: "How targeted is your LinkedIn network? Are your connections qualified prospects who could become clients?",
    options: ["Highly targeted, handpicked prospects", "Somewhat targeted", "Not targeted at all"],
    feedback: {
      "Highly targeted, handpicked prospects": "Excellent networking strategy! A curated network of qualified prospects and industry leaders provides much higher value than a large, unfocused network.",
      "Somewhat targeted": "There's opportunity to be more strategic with your connection building. Focus on connecting with ideal prospects, referral partners, and industry influencers who align with your business goals.",
      "Not targeted at all": "Strategic network building is crucial for LinkedIn success. A focused approach to connections will improve the quality of your feed content and business opportunities."
    }
  },
  {
    id: 7,
    question: "How consistently do you engage meaningfully with your ideal prospects' content to build relationships?",
    options: ["Daily strategic engagement", "Weekly engagement", "Rarely engage", "Never engage"],
    feedback: {
      "Daily strategic engagement": "Outstanding relationship-building approach! Consistent, valuable engagement builds trust and positions you as a peer rather than just another connection.",
      "Weekly engagement": "Good foundation, though more frequent engagement can accelerate relationship building. Strategic daily engagement often leads to stronger professional relationships.",
      "Rarely engage": "Regular engagement is essential for building meaningful professional relationships. Consider implementing a more systematic approach to engaging with your network's content.",
      "Never engage": "You're missing the core relationship-building aspect of LinkedIn. Authentic engagement is how trust and business relationships are built on the platform."
    }
  },
  {
    id: 8,
    question: "Are you consistently converting LinkedIn conversations into qualified discovery calls with ideal prospects?",
    options: ["Yes, regularly booking qualified calls", "Occasionally, but inconsistent", "No, conversations don't convert"],
    feedback: {
      "Yes, regularly booking qualified calls": "Excellent execution! Converting LinkedIn engagement into business conversations is the ultimate goal. Focus on scaling and systematizing your successful approach.",
      "Occasionally, but inconsistent": "There's opportunity to improve your conversion process. Consider refining your conversation approach and follow-up strategy to increase consistency.",
      "No, conversations don't convert": "This suggests your conversation strategy may need refinement. Focus on building genuine relationships before introducing business discussions."
    }
  },
  {
    id: 9,
    question: "Do you systematically track LinkedIn metrics (reach, engagement, leads, calls booked) to optimize your personal brand strategy?",
    options: ["Yes, comprehensive tracking", "Sometimes track basic metrics", "No systematic tracking"],
    feedback: {
      "Yes, comprehensive tracking": "Excellent data-driven approach! Systematic tracking enables continuous optimization and ensures your LinkedIn efforts deliver measurable business results.",
      "Sometimes track basic metrics": "Partial tracking is a good start. Comprehensive metrics tracking will help you optimize your strategy and improve your return on time invested.",
      "No systematic tracking": "Without tracking, it's difficult to optimize your approach or measure ROI. Consider implementing basic metrics tracking to improve your LinkedIn effectiveness."
    }
  }
];

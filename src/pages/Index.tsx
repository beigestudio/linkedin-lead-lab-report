import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, CheckCircle, Target, TrendingUp, Users, Calendar, User, Mail, Link, Briefcase, UserCheck, Star, Sparkles, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileData {
  name: string;
  email: string;
  linkedinProfile: string;
  whatDoYouDo: string;
  targetAudience: string;
  mainLinkedInGoal: string;
  headline: string;
  aboutSection: string;
  recentPosts: string;
}

interface Answer {
  question: string;
  answer: string;
  feedback: string;
}

interface HyperPersonalizedAnalysis {
  overallScore: number;
  profileAnalysis: string;
  questionInsights: string;
  personalizedRecommendations: string;
  actionPlan: string;
  strengths: string[];
  improvements: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    linkedinProfile: "",
    whatDoYouDo: "",
    targetAudience: "",
    mainLinkedInGoal: "",
    headline: "",
    aboutSection: "",
    recentPosts: ""
  });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [openTextAnswer, setOpenTextAnswer] = useState("");
  const [hyperPersonalizedAnalysis, setHyperPersonalizedAnalysis] = useState<HyperPersonalizedAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const questions = [
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

  const generateHyperPersonalizedAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('hyper-personalized-audit', {
        body: {
          profileData,
          answers,
          openTextAnswer
        }
      });

      if (error) {
        throw error;
      }

      setHyperPersonalizedAnalysis(data);
      setCurrentStep(14);
      
    } catch (error) {
      console.error('Hyper-personalized analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name || !profileData.email || !profileData.linkedinProfile || !profileData.whatDoYouDo || !profileData.targetAudience || !profileData.mainLinkedInGoal) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(2);
  };

  const handleProfileContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.headline.trim() || !profileData.aboutSection.trim()) {
      toast({
        title: "Missing profile content",
        description: "Please provide your headline and about section.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(3);
  };

  const handleAnswer = (questionIndex: number, answer: string) => {
    const question = questions[questionIndex];
    const feedback = question.feedback[answer as keyof typeof question.feedback];
    
    const newAnswer: Answer = {
      question: question.question,
      answer,
      feedback
    };

    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = newAnswer;
    setAnswers(updatedAnswers);

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setCurrentStep(questionIndex + 4);
      } else {
        setCurrentStep(12);
      }
    }, 2000);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!openTextAnswer.trim()) {
      toast({
        title: "Please answer the question",
        description: "Help us understand your biggest LinkedIn challenge.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep(13);
    generateHyperPersonalizedAnalysis();
  };

  const progressPercentage = ((currentStep) / 15) * 100;

  return (
    <div className="min-h-screen gradient-bg">
      {/* Mobile-optimized Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 relative">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <img 
                  src="/lovable-uploads/5715d19c-0a4c-40cc-b66b-2e705f807d4e.png" 
                  alt="Logo" 
                  className="h-12 sm:h-14 lg:h-16 w-auto animate-float"
                />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-light text-foreground mb-2 sm:mb-4 tracking-tight">
              LinkedIn Profile <span className="text-primary font-medium">Audit</span>
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Transform your personal LinkedIn presence into a client-generating machine with expert guidance
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 pb-8 sm:pb-16">
        {/* Mobile-optimized Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-6 sm:mb-12">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50">
              <Progress value={progressPercentage} className="h-2 sm:h-3 mb-3 sm:mb-4" />
              <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
                <span>Progress</span>
                <span className="font-medium">Step {Math.min(currentStep, 15)} of 15</span>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Step - Mobile Optimized */}
        {currentStep === 0 && (
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="pb-6 sm:pb-8 text-center px-4 sm:px-6">
              <div className="mx-auto mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <Target className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 leading-tight">
                Is Your Personal LinkedIn Profile 
                <span className="block text-primary font-medium">Actually Working?</span>
              </CardTitle>
              <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2">
                Most founders and C-suite executives post on LinkedIn but don't get qualified clients. 
                Let's discover why with a comprehensive, expert-level personal brand audit.
              </p>
            </CardHeader>
            <CardContent className="pt-0 px-4 sm:px-6">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-foreground mb-8 sm:mb-10 backdrop-blur-sm border border-primary/20">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-primary" />
                  <h3 className="text-xl sm:text-2xl font-medium">What You'll Discover</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Expert Analysis</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      Personalized feedback from a strategist who's audited 500+ executive profiles
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
                      <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Actionable Roadmap</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      Clear steps to start generating qualified leads from your profile today
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Personal Brand Focus</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      Strategies for executives to attract high-value prospects through personal branding
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button 
                  onClick={() => setCurrentStep(1)} 
                  size={isMobile ? "default" : "lg"}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation min-h-[48px]"
                >
                  Start My Free LinkedIn Audit
                  <ChevronRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
                  ✨ Takes 5 minutes • Get hyper-personalized expert feedback
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Basic Profile Info - Mobile Optimized */}
        {currentStep === 1 && (
          <Card className="max-w-3xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
              <div className="mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-light text-foreground mb-2 sm:mb-3">
                Let's Start With Your <span className="text-primary font-medium">Basic Information</span>
              </CardTitle>
              <p className="text-muted-foreground text-sm sm:text-lg">
                This helps us create a personalized audit experience
              </p>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleProfileSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Akshara"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Your Email
                    </label>
                    <Input
                      type="email"
                      placeholder="yourname@example.com"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                    <Link className="h-4 w-4 mr-2 text-primary" />
                    LinkedIn Profile URL
                  </label>
                  <Input
                    type="text"
                    placeholder="linkedin.com/in/yourname or www.linkedin.com/in/yourname"
                    value={profileData.linkedinProfile}
                    onChange={(e) => setProfileData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
                    className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      What do you do?
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Founder of a SaaS startup"
                      value={profileData.whatDoYouDo}
                      onChange={(e) => setProfileData(prev => ({ ...prev, whatDoYouDo: e.target.value }))}
                      className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                      <UserCheck className="h-4 w-4 mr-2 text-primary" />
                      Target Audience
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., CMOs, founders, coaches"
                      value={profileData.targetAudience}
                      onChange={(e) => setProfileData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                    <Star className="h-4 w-4 mr-2 text-primary" />
                    Main LinkedIn Goal
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Generate leads, Build authority"
                    value={profileData.mainLinkedInGoal}
                    onChange={(e) => setProfileData(prev => ({ ...prev, mainLinkedInGoal: e.target.value }))}
                    className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full h-14 sm:h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation"
                >
                  Continue to Profile Content
                  <ChevronRight className="ml-2 sm:ml-3 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Profile Content Collection - Mobile Optimized */}
        {currentStep === 2 && (
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
              <div className="mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-light text-foreground mb-2 sm:mb-3">
                Now Let's Analyze Your <span className="text-primary font-medium">Profile Content</span>
              </CardTitle>
              <p className="text-muted-foreground text-sm sm:text-lg">
                Copy and paste your current LinkedIn profile sections for hyper-personalized analysis
              </p>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleProfileContentSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <label className="block text-foreground mb-2 sm:mb-3 font-medium text-sm">
                    Your Current LinkedIn Headline
                  </label>
                  <Input
                    type="text"
                    placeholder="Copy your exact LinkedIn headline here..."
                    value={profileData.headline}
                    onChange={(e) => setProfileData(prev => ({ ...prev, headline: e.target.value }))}
                    className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    This appears directly under your name on LinkedIn
                  </p>
                </div>

                <div>
                  <label className="block text-foreground mb-2 sm:mb-3 font-medium text-sm">
                    Your Current About Section
                  </label>
                  <Textarea
                    placeholder="Copy your entire LinkedIn About section here..."
                    value={profileData.aboutSection}
                    onChange={(e) => setProfileData(prev => ({ ...prev, aboutSection: e.target.value }))}
                    className="min-h-32 sm:min-h-40 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none touch-manipulation"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    The full summary/about section from your LinkedIn profile
                  </p>
                </div>

                <div>
                  <label className="block text-foreground mb-2 sm:mb-3 font-medium text-sm">
                    Recent Posts (Optional but Recommended)
                  </label>
                  <Textarea
                    placeholder="Copy 1-2 of your recent LinkedIn posts here for content analysis..."
                    value={profileData.recentPosts}
                    onChange={(e) => setProfileData(prev => ({ ...prev, recentPosts: e.target.value }))}
                    className="min-h-24 sm:min-h-32 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none touch-manipulation"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    This helps us analyze your content style and engagement approach
                  </p>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full h-14 sm:h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation"
                >
                  Start Expert Assessment
                  <ChevronRight className="ml-2 sm:ml-3 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Questions 1-9 (Steps 3-11) - Mobile Optimized */}
        {currentStep >= 3 && currentStep <= 11 && (
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20">
                  Question {currentStep - 2} of 10
                </span>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {Math.round(((currentStep - 2) / 10) * 100)}% Complete
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 leading-tight">
                {questions[currentStep - 3].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                {questions[currentStep - 3].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-4 sm:p-6 text-left justify-start text-sm sm:text-lg hover:bg-primary/5 hover:border-primary/30 transition-all rounded-xl border-border/50 bg-background/30 backdrop-blur-sm touch-manipulation min-h-[56px]"
                    onClick={() => handleAnswer(currentStep - 3, option)}
                  >
                    <div className="flex items-center w-full">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 text-xs sm:text-sm font-medium text-primary border border-primary/20 flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-left leading-relaxed">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
              
              {answers[currentStep - 3] && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-xl sm:rounded-2xl border border-primary/20 backdrop-blur-sm">
                  <h4 className="font-semibold text-primary mb-2 sm:mb-3 flex items-center text-base sm:text-lg">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                    Expert Feedback
                  </h4>
                  <p className="text-foreground leading-relaxed text-sm sm:text-base">
                    {answers[currentStep - 3].feedback}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Question 10 - Final Challenge Question - Mobile Optimized */}
        {currentStep === 12 && (
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20">
                  Final Question
                </span>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  90% Complete
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 leading-tight">
                What's your biggest LinkedIn challenge right now when it comes to generating qualified leads for your business through your personal profile?
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleFinalSubmit}>
                <Textarea
                  placeholder="Describe your main challenge with LinkedIn personal brand lead generation..."
                  value={openTextAnswer}
                  onChange={(e) => setOpenTextAnswer(e.target.value)}
                  className="min-h-32 sm:min-h-40 text-sm sm:text-lg rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none touch-manipulation"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full mt-4 sm:mt-6 h-14 sm:h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation"
                >
                  Generate My Hyper-Personalized Audit
                  <ChevronRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 13: Analysis Loading - Mobile Optimized */}
        {currentStep === 13 && (
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardContent className="text-center py-12 sm:py-16 px-4 sm:px-6">
              <div className="mx-auto mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">
                Generating Your <span className="text-primary font-medium">Hyper-Personalized</span> Audit
              </h3>
              <p className="text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-8 px-2">
                Our AI is analyzing your profile content and all your responses to create a comprehensive, personalized audit report...
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-primary/20">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    Profile content analyzed
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    Responses processed
                  </div>
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Generating insights
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 14: Hyper-Personalized Results - Mobile Optimized */}
        {currentStep === 14 && hyperPersonalizedAnalysis && (
          <div className="space-y-6 sm:space-y-8">
            <Card className="max-w-6xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-2xl sm:text-4xl font-light mb-2 sm:mb-3 text-center">
                  Your Hyper-Personalized <span className="text-primary font-medium">LinkedIn Audit</span>
                </CardTitle>
                <div className="text-center">
                  <div className="inline-flex items-center bg-gradient-to-r from-primary/20 to-accent/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm border border-primary/20">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
                    <span className="text-xl sm:text-2xl font-bold text-primary">{hyperPersonalizedAnalysis.overallScore}/100</span>
                    <span className="ml-2 text-muted-foreground text-sm sm:text-base">Overall Score</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
                
                {/* Profile Analysis */}
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-border/30">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-primary">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                    Profile Analysis
                  </h3>
                  <div className="prose prose-foreground max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                      {hyperPersonalizedAnalysis.profileAnalysis}
                    </div>
                  </div>
                </div>

                {/* Strengths & Areas for Improvement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-green-500/20">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                      Your Strengths
                    </h3>
                    <ul className="space-y-2">
                      {hyperPersonalizedAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-foreground text-sm sm:text-base">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-orange-500/20">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center text-orange-600">
                      <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                      Priority Improvements
                    </h3>
                    <ul className="space-y-2">
                      {hyperPersonalizedAnalysis.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-foreground text-sm sm:text-base">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Question Insights */}
                <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-blue-500/20">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-blue-600">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                    Strategic Insights from Your Responses
                  </h3>
                  <div className="prose prose-foreground max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                      {hyperPersonalizedAnalysis.questionInsights}
                    </div>
                  </div>
                </div>

                {/* Personalized Recommendations */}
                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-purple-500/20">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-purple-600">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                    Hyper-Personalized Recommendations
                  </h3>
                  <div className="prose prose-foreground max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                      {hyperPersonalizedAnalysis.personalizedRecommendations}
                    </div>
                  </div>
                </div>

                {/* Action Plan */}
                <div className="bg-gradient-to-br from-primary/15 via-accent/10 to-primary/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-primary/30">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-primary">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                    Your 30-Day Action Plan
                  </h3>
                  <div className="prose prose-foreground max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                      {hyperPersonalizedAnalysis.actionPlan}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action - Mobile Optimized */}
            <Card className="max-w-5xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
              <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
                <CardTitle className="text-2xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 leading-tight">
                  Ready to Transform Your LinkedIn Into a 
                  <span className="block text-primary font-medium">Client-Generating Machine?</span>
                </CardTitle>
                <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2">
                  Based on your hyper-personalized audit, I can help you implement these strategies and 
                  start generating qualified leads within 30 days.
                </p>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-foreground mb-8 sm:mb-10 backdrop-blur-sm border border-primary/20">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-primary" />
                    <h3 className="text-xl sm:text-3xl font-medium">Complete LinkedIn Transformation</h3>
                  </div>
                  <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                    Get 1:1 implementation support, custom content templates, and a proven system 
                    that turns your LinkedIn profile into your #1 lead generation channel.
                  </p>
                </div>
                
                <div className="mb-8 sm:mb-10">
                  <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">Book Your Free <span className="text-primary font-medium">Strategy Call</span></h3>
                  <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
                    Let's discuss your specific LinkedIn challenges and create a custom implementation plan 
                    based on your audit results.
                  </p>
                  <Button 
                    size={isMobile ? "default" : "lg"}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-primary hover:from-green-700 hover:to-primary/90 text-white px-8 sm:px-16 py-6 sm:py-8 text-lg sm:text-xl font-medium rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation min-h-[56px]"
                    onClick={() => window.open('https://calendly.com/your-calendar-link', '_blank')}
                  >
                    <Calendar className="mr-3 sm:mr-4 h-6 w-6 sm:h-7 sm:w-7" />
                    Book My Free Strategy Call
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    Free 15-minute consultation
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    Custom strategy based on your audit
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    No-obligation session
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, CheckCircle, Target, TrendingUp, Users, Calendar, User, Mail, Link, Briefcase, UserCheck, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfileAnalysis {
  name: string;
  email: string;
  linkedinProfile: string;
  whatDoYouDo: string;
  targetAudience: string;
  mainLinkedInGoal: string;
  analysis: string;
}

interface Answer {
  question: string;
  answer: string;
  feedback: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    linkedinProfile: "",
    whatDoYouDo: "",
    targetAudience: "",
    mainLinkedInGoal: ""
  });
  const [profileAnalysis, setProfileAnalysis] = useState<ProfileAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [openTextAnswer, setOpenTextAnswer] = useState("");
  const { toast } = useToast();

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

  const analyzeLinkedInProfile = async () => {
    if (!profileData.name || !profileData.email || !profileData.linkedinProfile || !profileData.whatDoYouDo || !profileData.targetAudience || !profileData.mainLinkedInGoal) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-linkedin-profile', {
        body: {
          name: profileData.name,
          email: profileData.email,
          linkedinProfile: profileData.linkedinProfile,
          whatDoYouDo: profileData.whatDoYouDo,
          targetAudience: profileData.targetAudience,
          mainLinkedInGoal: profileData.mainLinkedInGoal
        }
      });

      if (error) {
        throw error;
      }

      setProfileAnalysis(data);
      setCurrentStep(2);
      
    } catch (error) {
      console.error('Profile analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "Please check your LinkedIn profile URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeLinkedInProfile();
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

    // Auto-advance to next question after a brief delay
    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setCurrentStep(questionIndex + 3);
      } else {
        setCurrentStep(12); // Go to final challenge question
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
    
    setCurrentStep(13); // Go to CTA
  };

  const progressPercentage = ((currentStep) / 13) * 100;

  return (
    <div className="min-h-screen gradient-bg">
      {/* Modern Header with Logo */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="container max-w-6xl mx-auto px-4 py-8 relative">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/lovable-uploads/5715d19c-0a4c-40cc-b66b-2e705f807d4e.png" 
                  alt="Logo" 
                  className="h-16 w-auto animate-float"
                />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-foreground mb-4 tracking-tight">
              LinkedIn Profile <span className="text-primary font-medium">Audit</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your personal LinkedIn presence into a client-generating machine with expert guidance
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 pb-16">
        {/* Modern Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-12">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
              <Progress value={progressPercentage} className="h-3 mb-4" />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Progress</span>
                <span className="font-medium">Step {Math.min(currentStep, 13)} of 13</span>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Step */}
        {currentStep === 0 && (
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="pb-8 text-center">
              <div className="mx-auto mb-8 p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl w-24 h-24 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <Target className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Is Your Personal LinkedIn Profile 
                <span className="block text-primary font-medium">Actually Working?</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Most founders and C-suite executives post on LinkedIn but don't get qualified clients. 
                Let's discover why with a comprehensive, expert-level personal brand audit.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-8 text-foreground mb-10 backdrop-blur-sm border border-primary/20">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 mr-3 text-primary" />
                  <h3 className="text-2xl font-medium">What You'll Discover</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-2xl p-4 mb-4 backdrop-blur-sm border border-primary/30">
                      <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">Expert Analysis</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Personalized feedback from a strategist who's audited 500+ executive profiles
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-2xl p-4 mb-4 backdrop-blur-sm border border-primary/30">
                      <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">Actionable Roadmap</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Clear steps to start generating qualified leads from your profile today
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-2xl p-4 mb-4 backdrop-blur-sm border border-primary/30">
                      <Users className="h-8 w-8 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">Personal Brand Focus</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Strategies for executives to attract high-value prospects through personal branding
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button 
                  onClick={() => setCurrentStep(1)} 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-6 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Start My Free LinkedIn Audit
                  <ChevronRight className="ml-3 h-6 w-6" />
                </Button>
                <p className="text-sm text-muted-foreground mt-6">
                  ✨ Takes 3 minutes • Get instant expert feedback
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Analysis Step */}
        {currentStep === 1 && (
          <Card className="max-w-3xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl w-20 h-20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-light text-foreground mb-3">
                Get Your Free <span className="text-primary font-medium">LinkedIn Audit</span>
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Discover what's blocking you from attracting high-quality clients
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground mb-3 font-medium flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Akshara"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-14 text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-foreground mb-3 font-medium flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Your Email
                    </label>
                    <Input
                      type="email"
                      placeholder="yourname@example.com"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-14 text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground mb-3 font-medium flex items-center text-sm">
                    <Link className="h-4 w-4 mr-2 text-primary" />
                    LinkedIn Profile URL
                  </label>
                  <Input
                    type="url"
                    placeholder="Paste your LinkedIn URL"
                    value={profileData.linkedinProfile}
                    onChange={(e) => setProfileData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
                    className="h-14 text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground mb-3 font-medium flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      What do you do?
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Founder of a SaaS startup"
                      value={profileData.whatDoYouDo}
                      onChange={(e) => setProfileData(prev => ({ ...prev, whatDoYouDo: e.target.value }))}
                      className="h-14 text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-3 font-medium flex items-center text-sm">
                      <UserCheck className="h-4 w-4 mr-2 text-primary" />
                      Target Audience
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., CMOs, founders, coaches"
                      value={profileData.targetAudience}
                      onChange={(e) => setProfileData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      className="h-14 text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground mb-3 font-medium flex items-center text-sm">
                    <Star className="h-4 w-4 mr-2 text-primary" />
                    Main LinkedIn Goal
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Generate leads, Build authority"
                    value={profileData.mainLinkedInGoal}
                    onChange={(e) => setProfileData(prev => ({ ...prev, mainLinkedInGoal: e.target.value }))}
                    className="h-14 text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isAnalyzing}
                  className="w-full h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-3"></div>
                      Analyzing Your Profile...
                    </>
                  ) : (
                    <>
                      Get My Free LinkedIn Audit
                      <ChevronRight className="ml-3 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Profile Analysis Results */}
        {currentStep === 2 && profileAnalysis && (
          <Card className="max-w-5xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="pb-6">
              <CardTitle className="text-4xl font-light mb-3">
                Your Personal LinkedIn <span className="text-primary font-medium">Brand Analysis</span>
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Expert feedback on {profileAnalysis.name}'s LinkedIn personal brand
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-2xl p-8 mb-8 backdrop-blur-sm border border-border/30">
                <div className="prose prose-foreground max-w-none">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg">
                    {profileAnalysis.analysis}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-8 text-lg">
                  Ready to take your personal LinkedIn brand to the next level? Let's dive deeper with our comprehensive audit.
                </p>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 px-10 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Continue to Detailed Audit
                  <ChevronRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions 1-9 */}
        {currentStep >= 3 && currentStep <= 11 && (
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  Question {currentStep - 2} of 10
                </span>
                <div className="text-sm text-muted-foreground">
                  {Math.round(((currentStep - 2) / 10) * 100)}% Complete
                </div>
              </div>
              <CardTitle className="text-2xl font-light mb-4">
                {questions[currentStep - 3].question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions[currentStep - 3].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-auto p-6 text-left justify-start text-lg hover:bg-primary/5 hover:border-primary/30 transition-all rounded-xl border-border/50 bg-background/30 backdrop-blur-sm"
                    onClick={() => handleAnswer(currentStep - 3, option)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-sm font-medium text-primary border border-primary/20">
                        {String.fromCharCode(65 + index)}
                      </div>
                      {option}
                    </div>
                  </Button>
                ))}
              </div>
              
              {/* Show feedback if answer is selected */}
              {answers[currentStep - 3] && (
                <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-2xl border border-primary/20 backdrop-blur-sm">
                  <h4 className="font-semibold text-primary mb-3 flex items-center text-lg">
                    <CheckCircle className="h-6 w-6 mr-3" />
                    Expert Feedback
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {answers[currentStep - 3].feedback}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Question 10 - Open Text */}
        {currentStep === 12 && (
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  Question 10 of 10
                </span>
                <div className="text-sm text-muted-foreground">
                  100% Complete
                </div>
              </div>
              <CardTitle className="text-2xl font-light mb-4">
                What's your biggest LinkedIn challenge right now when it comes to generating qualified leads for your business through your personal profile?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFinalSubmit}>
                <Textarea
                  placeholder="Describe your main challenge with LinkedIn personal brand lead generation..."
                  value={openTextAnswer}
                  onChange={(e) => setOpenTextAnswer(e.target.value)}
                  className="min-h-40 text-lg rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full mt-6 h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Complete My Personal Brand Audit
                  <ChevronRight className="ml-3 h-6 w-6" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Final CTA */}
        {currentStep === 13 && (
          <Card className="max-w-5xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-8 p-6 bg-gradient-to-br from-green-500/20 to-primary/20 rounded-3xl w-24 h-24 flex items-center justify-center backdrop-blur-sm animate-pulse border border-green-500/20">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
              <CardTitle className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Your Personal LinkedIn Brand Can Generate 
                <span className="block text-primary font-medium">So Much More Revenue</span>
              </CardTitle>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Based on your audit responses, I can see exactly where you're leaving qualified prospects on the table. 
                Your personal LinkedIn profile has massive untapped potential for generating high-value client conversations.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-10 text-foreground mb-10 backdrop-blur-sm border border-primary/20">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 mr-3 text-primary" />
                  <h3 className="text-3xl font-medium">Complete Personal Brand Transformation</h3>
                </div>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Get a comprehensive personal brand audit, custom strategy roadmap, and 1:1 implementation plan 
                  designed specifically for your business and ideal clients.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-primary/30">
                      <User className="h-10 w-10 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold text-xl mb-3">Profile Optimization</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Complete headline, About section, and visual brand overhaul for maximum client attraction
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-primary/30">
                      <TrendingUp className="h-10 w-10 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold text-xl mb-3">Content Strategy</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      30-day content calendar with proven hooks, stories, and CTAs that convert prospects to calls
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-primary/30">
                      <Target className="h-10 w-10 mx-auto text-primary" />
                    </div>
                    <h4 className="font-semibold text-xl mb-3">Lead Gen System</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Outreach templates, conversation frameworks, and follow-up sequences that book qualified discovery calls
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-3xl font-light mb-4">Book Your Free <span className="text-primary font-medium">Strategy Call</span></h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Let's discuss your specific LinkedIn personal branding challenges and create a custom plan 
                  to start generating qualified leads within 30 days.
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-primary hover:from-green-700 hover:to-primary/90 text-white px-16 py-8 text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  onClick={() => window.open('https://calendly.com/your-calendar-link', '_blank')}
                >
                  <Calendar className="mr-4 h-7 w-7" />
                  Book My Free Strategy Call
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Free 15-minute consultation
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Custom strategy discussion
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  No-obligation session
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;

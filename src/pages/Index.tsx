
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, CheckCircle, Target, TrendingUp, Users, Calendar, Key, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileAnalysis {
  name: string;
  email: string;
  linkedinProfile: string;
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
    openaiKey: ""
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
    if (!profileData.name || !profileData.email || !profileData.linkedinProfile || !profileData.openaiKey) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields including your OpenAI API key.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${profileData.openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert LinkedIn brand strategist who has audited 500+ executive profiles. Provide a detailed, personalized analysis of this LinkedIn profile focusing on personal branding for lead generation. Be specific, actionable, and direct. Focus on what's missing for client acquisition.`
            },
            {
              role: 'user',
              content: `Analyze this LinkedIn profile: ${profileData.linkedinProfile}. The user's name is ${profileData.name}. Provide expert feedback on their personal brand positioning, content strategy, and lead generation potential. Be specific about what's working and what needs immediate improvement for attracting high-value clients.`
            }
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze profile');
      }

      const data = await response.json();
      const analysis = data.choices[0].message.content;
      
      setProfileAnalysis({
        name: profileData.name,
        email: profileData.email,
        linkedinProfile: profileData.linkedinProfile,
        analysis
      });
      
      setCurrentStep(2);
      
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please check your API key and LinkedIn profile URL.",
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
    <div className="min-h-screen bg-black text-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img 
            src="/api/placeholder/200/80" 
            alt="LinkedIn Brand Strategist Logo" 
            className="mx-auto mb-4 h-20 object-contain"
          />
        </div>

        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8">
            <Progress value={progressPercentage} className="h-2 bg-gray-800" />
            <p className="text-sm text-gray-400 mt-2 text-center">
              Step {Math.min(currentStep, 13)} of 13
            </p>
          </div>
        )}

        {/* Welcome Step */}
        {currentStep === 0 && (
          <Card className="text-center border-gray-800 shadow-2xl bg-gray-900/80 backdrop-blur">
            <CardHeader className="pb-6">
              <div className="mx-auto mb-6 p-4 bg-blue-500/20 rounded-full w-20 h-20 flex items-center justify-center">
                <Target className="h-10 w-10 text-blue-400" />
              </div>
              <CardTitle className="text-4xl font-bold text-white mb-4">
                Is Your Personal LinkedIn Profile Actually Working To Get You Clients?
              </CardTitle>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Most founders and C-suite executives post on LinkedIn but don't get qualified clients. Let's find out why — with a comprehensive, expert-level LinkedIn personal brand audit.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
                <h3 className="text-2xl font-semibold mb-4">What You'll Get:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 mt-1 text-blue-200" />
                    <div>
                      <h4 className="font-semibold">Expert Analysis</h4>
                      <p className="text-blue-100 text-sm">Personalized feedback from a LinkedIn strategist who's audited 500+ executive profiles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-6 w-6 mt-1 text-blue-200" />
                    <div>
                      <h4 className="font-semibold">Actionable Roadmap</h4>
                      <p className="text-blue-100 text-sm">Clear steps to start generating qualified leads from your personal LinkedIn profile today</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 mt-1 text-blue-200" />
                    <div>
                      <h4 className="font-semibold">Personal Brand Focus</h4>
                      <p className="text-blue-100 text-sm">Strategies specifically for founders and executives to attract high-value prospects through personal branding</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setCurrentStep(1)} 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start My Free Personal LinkedIn Audit
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-400 mt-4">Takes 3 minutes • Get instant expert feedback</p>
            </CardContent>
          </Card>
        )}

        {/* Profile Analysis Step */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto border-gray-800 shadow-2xl bg-gray-900/80 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Get Your Personalized LinkedIn Personal Brand Analysis
              </CardTitle>
              <p className="text-gray-300 text-lg">
                Enter your details and LinkedIn profile URL for an AI-powered expert analysis of your personal brand.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Your Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-14 text-lg border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Business Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your business email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-14 text-lg border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">LinkedIn Profile URL</label>
                  <Input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={profileData.linkedinProfile}
                    onChange={(e) => setProfileData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
                    className="h-14 text-lg border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    OpenAI API Key (for profile analysis)
                  </label>
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={profileData.openaiKey}
                    onChange={(e) => setProfileData(prev => ({ ...prev, openaiKey: e.target.value }))}
                    className="h-12 border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Your API key is stored locally and used only for this analysis. 
                    <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                      Get your API key here <ExternalLink className="h-3 w-3 inline" />
                    </a>
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isAnalyzing}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl"
                >
                  {isAnalyzing ? "Analyzing Your Profile..." : "Analyze My LinkedIn Profile"}
                  {!isAnalyzing && <ChevronRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Profile Analysis Results */}
        {currentStep === 2 && profileAnalysis && (
          <Card className="max-w-4xl mx-auto border-gray-800 shadow-2xl bg-gray-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Your Personal LinkedIn Brand Analysis
              </CardTitle>
              <p className="text-gray-300 text-lg">
                Expert feedback on {profileAnalysis.name}'s LinkedIn personal brand
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 mb-6">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                    {profileAnalysis.analysis}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-300 mb-6">
                  Ready to take your personal LinkedIn brand to the next level? Let's dive deeper with our comprehensive audit.
                </p>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Continue to Detailed Audit
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions 1-9 */}
        {currentStep >= 3 && currentStep <= 11 && (
          <Card className="max-w-3xl mx-auto border-gray-800 shadow-2xl bg-gray-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Question {currentStep - 2} of 10
              </CardTitle>
              <p className="text-xl text-gray-300">
                {questions[currentStep - 3].question}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {questions[currentStep - 3].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full h-16 text-left justify-start text-lg border-gray-700 bg-gray-800 text-white hover:border-blue-500 hover:bg-blue-900/20 transition-all"
                    onClick={() => handleAnswer(currentStep - 3, option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              
              {/* Show feedback if answer is selected */}
              {answers[currentStep - 3] && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Expert Feedback:
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    {answers[currentStep - 3].feedback}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Question 10 - Open Text */}
        {currentStep === 12 && (
          <Card className="max-w-3xl mx-auto border-gray-800 shadow-2xl bg-gray-900/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Question 10 of 10
              </CardTitle>
              <p className="text-xl text-gray-300">
                What's your biggest LinkedIn challenge right now when it comes to generating qualified leads for your business through your personal profile?
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFinalSubmit}>
                <Textarea
                  placeholder="Describe your main challenge with LinkedIn personal brand lead generation..."
                  value={openTextAnswer}
                  onChange={(e) => setOpenTextAnswer(e.target.value)}
                  className="min-h-32 text-lg border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full mt-4 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl"
                >
                  Complete My Personal Brand Audit
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Final CTA */}
        {currentStep === 13 && (
          <Card className="max-w-4xl mx-auto border-gray-800 shadow-2xl bg-gray-900/80 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-6 p-4 bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <CardTitle className="text-4xl font-bold text-white mb-4">
                Your Personal LinkedIn Brand Can Generate So Much More Revenue
              </CardTitle>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Based on your audit responses, I can see exactly where you're leaving qualified prospects on the table. Your personal LinkedIn profile has massive untapped potential for generating high-value client conversations.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
                <h3 className="text-2xl font-bold mb-4">Ready For A Complete Personal LinkedIn Brand Transformation?</h3>
                <p className="text-xl text-blue-100 mb-6">
                  Get a comprehensive personal brand audit, custom strategy roadmap, and 1:1 implementation plan designed specifically for your business and ideal clients.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Personal Profile Optimization</h4>
                    <p className="text-blue-100">Complete headline, About section, and visual brand overhaul for maximum client attraction</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Personal Content Strategy</h4>
                    <p className="text-blue-100">30-day content calendar with proven hooks, stories, and CTAs that convert prospects to calls</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Personal Brand Lead Gen System</h4>
                    <p className="text-blue-100">Outreach templates, conversation frameworks, and follow-up sequences that book qualified discovery calls</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Book Your Free 15-Minute Discovery Call</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Let's discuss your specific LinkedIn personal branding challenges and create a custom plan to start generating qualified leads within 30 days.
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://calendly.com/your-calendar-link', '_blank')}
                >
                  <Calendar className="mr-3 h-6 w-6" />
                  Book My Free Strategy Call
                </Button>
              </div>
              
              <div className="text-sm text-gray-400 space-y-2">
                <p>✅ Free 15-minute consultation</p>
                <p>✅ Custom LinkedIn personal brand strategy discussion</p>
                <p>✅ No-obligation, pure value session</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;

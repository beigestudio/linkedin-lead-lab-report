
import { Resend } from "npm:resend@2.0.0";
import { ProfileData, AnalysisResponse } from './types.ts';

export const getScoreColor = (score: number): string => {
  if (score >= 80) return "#059669"; // green-700
  if (score >= 60) return "#d97706"; // yellow-700
  return "#ea580c"; // orange-700
};

export const getScoreDescription = (score: number): string => {
  if (score >= 80) return "Excellent Foundation";
  if (score >= 60) return "Good Potential";
  return "Significant Opportunity";
};

export const createEmailHtml = (
  profileData: ProfileData,
  analysisResult: AnalysisResponse,
  overallScore: number
): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Your LinkedIn Audit Results</title>
    <style>
      @media (prefers-color-scheme: dark) {
        .email-container { background-color: #ffffff !important; }
        .email-content { color: #1f2937 !important; }
      }
    </style>
  </head>
  <body class="email-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
    
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #1f2937; font-size: 28px; font-weight: 300; margin-bottom: 10px;">Your LinkedIn Audit Results</h1>
      <p style="color: #6b7280; font-size: 16px;">Professional analysis and strategic recommendations</p>
    </div>

    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
      <div style="display: inline-flex; align-items: center; background: white; border: 1px solid #d1d5db; border-radius: 50px; padding: 15px 25px; margin-bottom: 15px;">
        <span style="color: ${getScoreColor(overallScore)}; font-size: 24px; font-weight: bold; margin-right: 10px;">⭐</span>
        <span style="color: ${getScoreColor(overallScore)}; font-size: 24px; font-weight: bold;">${overallScore}/100</span>
      </div>
      <div style="color: ${getScoreColor(overallScore)}; font-size: 18px; font-weight: 600; margin-bottom: 5px;">${getScoreDescription(overallScore)}</div>
      <div style="color: #6b7280; font-size: 14px;">Current LinkedIn Performance</div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1e40af; font-size: 20px; font-weight: 600; margin-bottom: 15px; display: flex; align-items: center;">
        👤 Profile Analysis
      </h2>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
        <p style="margin: 0; line-height: 1.7; color: #1f2937;">${analysisResult.profileAnalysis}</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
      <div>
        <h3 style="color: #065f46; font-size: 18px; font-weight: 600; margin-bottom: 15px; display: flex; align-items: center;">
          ✅ Current Strengths
        </h3>
        <div style="background: #ecfdf5; border: 1px solid #d1fae5; border-radius: 8px; padding: 20px;">
          <ul style="margin: 0; padding-left: 20px;">
            ${analysisResult.strengths.map(strength => `<li style="margin-bottom: 8px; color: #065f46;">${strength}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div>
        <h3 style="color: #1e40af; font-size: 18px; font-weight: 600; margin-bottom: 15px; display: flex; align-items: center;">
          📈 Priority Improvements
        </h3>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px;">
          <ul style="margin: 0; padding-left: 20px;">
            ${analysisResult.improvements.map(improvement => `<li style="margin-bottom: 8px; color: #1e40af;">${improvement}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #7c3aed; font-size: 20px; font-weight: 600; margin-bottom: 15px; display: flex; align-items: center;">
        🎯 Strategic Insights
      </h2>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
        <p style="margin: 0; line-height: 1.7; color: #1f2937;">${analysisResult.questionInsights}</p>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="color: #1e40af; font-size: 20px; font-weight: 600; margin-bottom: 15px; display: flex; align-items: center;">
        ✨ Recommended Actions
      </h2>
      <div style="background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%); border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
        <p style="margin: 0; line-height: 1.7; color: #1f2937 !important;">${analysisResult.personalizedRecommendations}</p>
      </div>
    </div>

    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
      <h3 style="color: #1f2937; font-size: 22px; font-weight: 300; margin-bottom: 15px;">Ready to Implement Your Strategy?</h3>
      <p style="color: #6b7280; margin-bottom: 25px; line-height: 1.6;">Transform your LinkedIn presence with expert guidance and proven strategies tailored to your specific goals.</p>
      
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h4 style="color: #1f2937; font-size: 18px; font-weight: 600; margin-bottom: 10px;">✨ Professional LinkedIn Strategy Session</h4>
        <p style="color: #6b7280; margin-bottom: 0;">Get personalized implementation support and advanced strategies to accelerate your LinkedIn success.</p>
      </div>
      
      <a href="https://calendar.app.google/SWZoyjMHZZALNwqz7" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 20px;">
        ✨ Schedule Strategy Session →
      </a>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; font-size: 12px; color: #6b7280;">
        <div>✅ 15-minute consultation</div>
        <div>✅ Personalized strategy discussion</div>
        <div>✅ No commitment required</div>
      </div>
    </div>

    <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
      <p style="color: #6b7280;">Thank you for using our LinkedIn Audit tool!</p>
      <p style="margin: 0; color: #6b7280;">This analysis was generated specifically for ${profileData.name}</p>
    </div>

  </body>
  </html>
  `;
};

export const sendAuditEmail = async (
  resendApiKey: string,
  profileData: ProfileData,
  analysisResult: AnalysisResponse,
  overallScore: number
): Promise<void> => {
  if (!resendApiKey || !profileData.email) {
    return;
  }

  try {
    console.log('Sending audit report email to:', profileData.email);
    
    const resend = new Resend(resendApiKey);
    const emailHtml = createEmailHtml(profileData, analysisResult, overallScore);

    await resend.emails.send({
      from: 'LinkedIn Audit <hello@beigestudio.co>',
      to: [profileData.email],
      subject: `Your LinkedIn Audit Results - ${overallScore}/100 Score`,
      html: emailHtml,
    });

    console.log('Audit report email sent successfully');
  } catch (emailError) {
    console.error('Error sending email:', emailError);
    // Don't fail the entire request if email fails
  }
};

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client
// Note: In a real production app, keys should be proxied. For this demo, we assume process.env.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a Senior DevSecOps Consultant assisting an Industrial Automation Engineer (HMI/SCADA specialist) who is new to web CI/CD.
The user works for CXVII Tech Pty Ltd and is building a pipeline for an FOI (Freedom of Information) Case Management Tool.

Key Context from their RFI Response:
- Target: Australian Government (ISM PROTECTED level).
- Stack: React (Frontend), Azure App Service, PostgreSQL.
- Tools: GitHub Actions (CI/CD), Azure Bicep (Infrastructure), CodeQL/Trivy (Security).
- Goal: Build a secure pipeline without deep coding knowledge. 

Your Guidelines:
1. Explain concepts using Industrial Automation analogies where possible (e.g., "GitHub Actions is like a PLC logic sequence", "Runners are like field IO modules").
2. Keep answers actionable and specific to GitHub Actions and Azure.
3. When asked about compliance (ISM/OSCAL), simplify it. Focus on the "Evidence" (logs) rather than the XML schema.
4. Refer to the "foi-tool-sample" repo as the target for implementation.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster chat interactions
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = getChatSession();
    const result: GenerateContentResponse = await session.sendMessage({ message });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Consultant. Please check your API Key.";
  }
};
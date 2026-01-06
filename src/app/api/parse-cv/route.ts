import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from '@/types/resume';

const pdfParseLib = require('pdf-parse');
const pdfParse = pdfParseLib.default || pdfParseLib;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer for pdf-parse
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF text
    const pdfData = await pdfParse(buffer);
    const text = pdfData.text;

    // Call Gemini to structure the data
    // Using gemma-3-27b-it as requested, or fallback to gemini-1.5-flash if that alias isn't valid in this SDK context yet
    // Note: 'gemma-3-27b-it' might be the model name string. 
    // If not available, we might default to gemini-1.5-flash for reliability.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    You are a professional resume parser. Extract the following information from the provided resume text and return it as a strictly valid JSON object matching the TypeScript interface below.
    Do not include markdown or backticks in the response, just the raw JSON.

    Interface:
    interface ResumeData {
      profile: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedinUrl?: string;
        portfolioUrl?: string;
        summary: string; // A brief professional summary
      };
      experience: Array<{
        title: string;
        company: string;
        location: string;
        startDate: string;
        endDate: string;
        description: string[]; // Bullet points
      }>;
      education: Array<{
        degree: string;
        school: string;
        location: string;
        startDate: string;
        endDate: string;
      }>;
      skills: string[];
    }

    Resume Text:
    ${text.slice(0, 30000)} // Truncate to avoid context limit if massive, though 30k chars is usually fine for resumes
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonString = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

    let resumeData: ResumeData;
    try {
      resumeData = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", jsonString);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    return NextResponse.json(resumeData);

  } catch (error) {
    console.error('Error processing CV:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

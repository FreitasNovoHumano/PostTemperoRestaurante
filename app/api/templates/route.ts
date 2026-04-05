/**
 * 📦 API - Templates
 */

import { templateService } from "@/services/template.service";
import { NextResponse } from "next/server";

/**
 * GET → lista templates
 */
export async function GET() {
  const templates = await templateService.findAll();
  return NextResponse.json(templates);
}

/**
 * POST → cria template
 */
export async function POST(req: Request) {
  const body = await req.json();

  const template = await templateService.create(body);

  return NextResponse.json(template);
}
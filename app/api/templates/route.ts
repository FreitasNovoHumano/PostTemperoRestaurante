/**
 * 📦 API - Templates
 */

import { templateService } from "@/services/template.service";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET → lista templates
 */
export async function GET() {
  const templates = await templateService.findAll();
  return NextResponse.json(await prisma.template.findMany());
}

/**
 * POST → cria template
 */
export async function POST(req: Request) {
  const body = await req.json();

  const template = await templateService.create(body);

  //return NextResponse.json(template);
  return NextResponse.json(await prisma.template.create({ data: body }));
}


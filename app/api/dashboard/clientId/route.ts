/**
 * 🌐 API - Dashboard do Cliente
 */

import { NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard.service";

/**
 * 📊 GET → dados do dashboard
 */
export async function GET(_: Request, { params }: any) {

  const { clientId } = params;

  const summary = await dashboardService.getClientSummary(clientId);
  const posts = await dashboardService.getRecentPosts(clientId);

  return NextResponse.json({
    summary,
    posts,
  });
}
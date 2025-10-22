import { NextRequest, NextResponse } from "next/server";
import { getDashboardStats } from "@/modules/admin/server/dashboard/actions";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user?.isAdmin) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const stats = await getDashboardStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error("Dashboard stats API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard statistics" },
            { status: 500 }
        );
    }
}
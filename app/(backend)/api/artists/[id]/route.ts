import { prisma } from "@/lib/prisma";
import { NextRequest,NextResponse } from "next/server";

export async function PATCH(req:NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const body=await req.json()
        const {status}=body

        const updateArtist=await prisma.artist.update({
            where:{id},
            data:{
                status
            }
        })
        return NextResponse.json(updateArtist, { status: 200 });
    } catch (error) {
        console.error("Update failed:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
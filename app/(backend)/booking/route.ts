import { prisma } from "@/lib/prisma";
import { NextResponse,NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const body=await req.json()
    const {artistId,eventPlannerName,eventDate,eventType,budget,location}=body

    const booking=await prisma.bookingRequest.create({
        data:{
            artistId,eventPlannerName,eventDate:new Date(eventDate),eventType,budget,location,status:"pending"
        }
    })
    return NextResponse.json(booking,{status:200})
}

export async function GET() {
    const booking = await prisma.bookingRequest.findMany();
    return NextResponse.json(booking);
}
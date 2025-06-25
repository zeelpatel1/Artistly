import {prisma} from '@/lib/prisma'
import { NextRequest,NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, bio, category, languages, feeRange, location, profileImage } = body;

    try {
        const data=await prisma.artist.create({
            data:{
                name,bio,category,languages,feeRange,location,profileImage,status:"pending"
            }
        })
        return NextResponse.json(data,{status:200})   
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to create artists' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const artists = await prisma.artist.findMany();
        return NextResponse.json(artists, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
    }
}
import { db } from "@/configs/db";
import { WireframeToCodeTable } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

 export async function POST(req: NextRequest) {
    const { uid, imageUrl, model, description, createdBy } = await req.json();
    
    const result = await db.insert(WireframeToCodeTable).values({
        uid: uid,
        imageUrl: imageUrl,
        model: model,
        description: description,
        createdBy: createdBy
    }).returning({id: WireframeToCodeTable.id});
    return NextResponse.json(result); 
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const uid = searchParams?.get('uid');
    const email = searchParams?.get('email');
    if(uid){
    const result = await db.select().from(WireframeToCodeTable)
    .where(eq(WireframeToCodeTable.uid, uid));
    return NextResponse.json(result[0]);
}
else if (email) {
    const result = await db.select()
        .from(WireframeToCodeTable)
        .where(eq(WireframeToCodeTable.createdBy, email))
        .orderBy(desc(WireframeToCodeTable.id))
        ;
    return NextResponse.json(result);
}
  return NextResponse.json({error:'No record found'});
}

export async function PUT(req: NextRequest) {
    const { uid, codeResp } = await req.json();

    const result = await db.update(WireframeToCodeTable)
        .set({
            code: codeResp
        }).where(eq(WireframeToCodeTable.uid, uid))
        .returning({ uid: WireframeToCodeTable.uid })

    return NextResponse.json(result);

}
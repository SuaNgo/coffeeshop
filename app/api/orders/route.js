import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Order } from "@/model/Order";

export async function GET(request) {
  const check = await getServerSession(authOptions);
  if (!check) {
    return NextResponse.json("Not admin");
  } else {
    await mongooseConnect();
    return NextResponse.json(await Order.find());
  }
}

export async function DELETE(request) {
  await mongooseConnect();

  const url = new URL(request.url);
  if (url.searchParams.get("id")) {
    return NextResponse.json(
      await Order.deleteOne({ _id: url.searchParams.get("id") })
    );
  }
}

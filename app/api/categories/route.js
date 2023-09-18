import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/model/Category";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Handles POST requests to /api
export async function POST(request) {
  await mongooseConnect();
  const res = await request.json();
  const { name, parentCategory } = res;

  await Category.create({
    name,
    parentCategory: parentCategory || undefined,
  });

  return NextResponse.json(res);
}

export async function GET(request) {
  const check = await getServerSession(authOptions);
  if (!check) {
    return NextResponse.json("Not admin");
  } else {
    await mongooseConnect();
    const url = new URL(request.url);
    if (url.searchParams.get("id")) {
      return NextResponse.json(
        await Category.findById(url.searchParams.get("id"))
      );
    } else if (url.searchParams.has("product")) {
      return NextResponse.json(
        await Category.find({ parentCategory: { $exists: true } })
      );
    }
    return NextResponse.json(await Category.find().populate("parentCategory"));
  }
}

export async function PUT(request) {
  await mongooseConnect();
  const res = await request.json();

  const { name, parentCategory, _id } = res;

  return NextResponse.json(
    await Category.updateOne(
      { _id },
      { name, parentCategory: parentCategory || undefined }
    )
  );
}

export async function DELETE(request) {
  await mongooseConnect();
  const url = new URL(request.url);
  if (url.searchParams.get("id")) {
    return NextResponse.json(
      await Category.deleteOne({ _id: url.searchParams.get("id") })
    );
  }
}

import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/model/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Handles POST requests to /api
export async function POST(request) {
  await mongooseConnect();

  const res = await request.json();

  const { username, password, role } = res;

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    username,
    password: hashedPassword,
    role,
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
        await Admin.findById(url.searchParams.get("id"))
      );
    }

    return NextResponse.json(await Admin.find());
  }
}

export async function PUT(request) {
  await mongooseConnect();
  const res = await request.json();
  const { username, password, role, _id } = res;
  const hashedPassword = await bcrypt.hash(password, 10);

  return NextResponse.json(
    await Admin.updateOne({ _id }, { username, password: hashedPassword, role })
  );
}

export async function DELETE(request) {
  await mongooseConnect();
  const url = new URL(request.url);
  if (url.searchParams.get("id")) {
    return NextResponse.json(
      await Admin.deleteOne({ _id: url.searchParams.get("id") })
    );
  }
}

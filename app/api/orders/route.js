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
    const url = new URL(request.url);
    if (url.searchParams.get("id")) {
      return NextResponse.json(
        await Order.findById(url.searchParams.get("id"))
      );
    }

    return NextResponse.json(await Order.find());
  }
}

export async function PUT(request) {
  await mongooseConnect();

  const res = await request.json();

  const {
    _id,
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    status,
    employee,
  } = res;

  return NextResponse.json(
    await Order.updateOne(
      { _id },
      {
        line_items,
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        status,
        employee,
      }
    )
  );
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

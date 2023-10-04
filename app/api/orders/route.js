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
    } else if (url.searchParams.has("idOrder")) {
      return NextResponse.json(await Order.find({ status: "paid-delivered" }));
    } else if (url.searchParams.has("idOrderDelivering")) {
      return NextResponse.json(await Order.find({ status: "paid-delivering" }));
    } else if (url.searchParams.has("idOrderRef")) {
      return NextResponse.json(await Order.find({ status: "paid-refunded" }));
    } else if (url.searchParams.has("idOrderWait")) {
      return NextResponse.json(await Order.find({ status: "paid-refund" }));
    } else if (url.searchParams.has("idNew")) {
      return NextResponse.json(
        await Order.find({
          createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        })
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

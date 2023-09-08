import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Handles POST requests to /api
export async function POST(request) {
  await mongooseConnect();
  const check = await getServerSession(authOptions);
  if (check) {
    const res = await request.json();

    const { product, category, description, price, images, properties } = res;

    await Product.create({
      product,
      category,
      description,
      price,
      images,
      properties,
    });

    return NextResponse.json(res);
  }

  return NextResponse.redirect(new URL("/", request.url));
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
        await Product.findById(url.searchParams.get("id"))
      );
    }

    return NextResponse.json(await Product.find());
  }
}

export async function PUT(request) {
  await mongooseConnect();

  const res = await request.json();

  const { product, category, description, price, properties, images, _id } =
    res;

  return NextResponse.json(
    await Product.updateOne(
      { _id },
      {
        product,
        category,
        description,
        price,
        properties,
        images,
      }
    )
  );
}

export async function DELETE(request) {
  await mongooseConnect();

  const url = new URL(request.url);
  if (url.searchParams.get("id")) {
    return NextResponse.json(
      await Product.deleteOne({ _id: url.searchParams.get("id") })
    );
  }
}

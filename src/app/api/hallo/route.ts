import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    return new NextResponse(JSON.stringify("hallo wolrd"), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
};

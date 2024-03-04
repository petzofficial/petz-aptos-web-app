// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const tokenUrl = searchParams.get("tokenUrl");

    const { data } = await axios.get(tokenUrl as string);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};

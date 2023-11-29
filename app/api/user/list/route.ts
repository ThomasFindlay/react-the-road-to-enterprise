import { NextResponse } from "next/server";

const users = [
  {
    id: 1,
    name: "Thomas",
    email: "thomas@gmail.com",
  },
  {
    id: 2,
    name: "Max",
    email: "max@gmail.com",
  },
  {
    id: 3,
    name: "Zoe",
    email: "zoe@gmail.com",
  },
];

export async function GET(request: Request) {
  return NextResponse.json({ users });
}

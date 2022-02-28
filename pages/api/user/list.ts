import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../types/user";

const users: User[] = [
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof users>
) {
  res.status(200).json(users);
}

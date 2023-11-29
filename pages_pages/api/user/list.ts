import { NextApiRequest, NextApiResponse } from "next";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof users>
) {
  return res.status(200).json(users);
}

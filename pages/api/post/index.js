import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../utils/connectMongoDb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  const updateDocument = {
    $set: {
       body,
    },
 };

  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ timestamp: -1 })
        .toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const post = await db
        .collection("posts")
        .insertOne({ ...body, timestamp: new Timestamp() });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "UPDATE") {
    try {
      await collection("posts").updateOne({_id: new ObjectId(body.id)}, body);
      res.status(200).json({ message: "The post has been updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

import { connectToDatabase } from "../../../utils/connectMongoDb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "The post has been deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      await db.collection("posts").updateOne({_id: new ObjectId(id)}, {$set: { ...body }});
      res.status(200).json({ message: "The post has been updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

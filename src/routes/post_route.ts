import express from "express";
const router = express.Router();
import postsController from "../controllers/post_controller";

router.get("/", postsController.getAll.bind(postsController));

router.get("/:id", postsController.getById.bind(postsController));

router.post("/", postsController.createItem.bind(postsController));

router.delete("/:id", postsController.deleteItem.bind(postsController));

export default router;

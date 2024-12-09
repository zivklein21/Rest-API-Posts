import express, {Request, Response} from "express";
const router = express.Router();
import postsController from "../controllers/post_controller.js";

router.post("/newPost",(req: Request, res: Response) => {
    postsController.newPost(req, res);
});

router.get("/post/:id",(req:Request, res:Response) => {
    postsController.getPostById(req, res);
});

router.get("/allPosts",(req: Request, res: Response) => { 
    postsController.getAllPosts(req, res);
});

router.get("/post", (req: Request, res: Response) => {
    postsController.getPostBySender(req, res);
});

router.put("/post/:id/content", (req:Request, res:Response) => {
    postsController.updatePostContent(req, res);
});

export default router;
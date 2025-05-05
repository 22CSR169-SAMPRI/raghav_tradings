import express from "express";
import { saveCart, clearCart, getCart, saveOrderAndClearCart, getAllOrders, deleteOrder} from "../controllers/cartController.js";

const router = express.Router();

router.get("/orders", getAllOrders);
router.delete("/orders/:orderId", deleteOrder);

router.post("/save", saveCart);
router.post("/clear", clearCart);
router.post("/save-order-and-clear", saveOrderAndClearCart);
router.get("/:userId", getCart);



export default router;
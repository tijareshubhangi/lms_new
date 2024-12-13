import express from "express";
import PaymentController from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/generate-qr", PaymentController.generateQR);
router.post("/verify-payment", PaymentController.verifyPayment);

export default router;

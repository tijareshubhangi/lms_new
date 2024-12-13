import QRCode from "qrcode";

class PaymentController {
  static generateQR = async (req, res) => {
    const { user, amount } = req.body;

    try {
      const qrData = `Payment Request:\nUser: ${user}\nAmount: INR ${amount}`;
      const qrCode = await QRCode.toDataURL(qrData, { errorCorrectionLevel: "H" });
      return res.status(200).json({ qrCode });
    } catch (error) {
      console.error("Error generating QR code:", error);
      return res.status(500).json({ error: "Failed to generate QR code" });
    }
  };

  static verifyPayment = async (req, res) => {
    try {
      // Simulated verification logic
      return res.status(200).json({ message: "Payment Successful" });
    } catch (error) {
      console.error("Error verifying payment:", error);
      return res.status(500).json({ error: "Payment verification failed" });
    }
  };
}

export default PaymentController;

import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        console.log("Sending verification email to", email);
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Verification Code",
            react: VerificationEmail({username, otp:verifyCode}),
          });
          console.log("Email sent successfully", result)
        return {
            success: true,
            message: "Verification email sent successfully"
        };
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false,
            message: "Error sending verification email"
        };
    }
}


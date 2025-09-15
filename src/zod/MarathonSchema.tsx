import { z } from "zod";

// Zod Schema
export const marathonSchema = z
  .object({
    fname: z
      .string()
      .min(3, { message: "First name must have at least 3 letters" }),
    lname: z.string().min(5, "Last name must have at least 5 letters"),
    plan: z.enum(["funrun", "mini", "half", "full"], {
      message: "Select a plan",
    }),
    gender: z.enum(["male", "female"], { message: "Select gender" }),
    agree: z.boolean().default(false),
    email: z.email(),
    haveCoupon: z.boolean().default(false),
    couponCode: z.string().optional(),

    password:z // ไปเพิ่ม password,comfirmpassword ใน lib, store, zod, MarathonModol
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .max(12, { message: "Password must not exceed 12 characters" }),
    confirmpassword:z // ไปเพิ่ม password,comfirmpassword ใน lib, store, zod, MarathonModol
      .string()


  })
  .refine(
    (data) => {
      if (!data.haveCoupon) return true; //ไม่ได้มีคูปอง ในกรณีนี้ validation ผ่านทันที (return true) เพราะไม่จำเป็นต้องตรวจ couponCode
      return data.couponCode?.trim() === "CMU2025"; // ตรงกับ CMU2025
      //couponCode ไม่เป็น undefined (?.)
      //ตัดช่องว่างหัวท้ายออก (trim())

      //กรณี ไม่มี ? couponCode.trim()
      //ถ้า couponCode เป็น undefined → จะ throw error (Cannot read properties of undefined)
      //กรณี data.couponCode?.trim()
      //ถ้า couponCode เป็น null หรือ undefined → จะไม่เรียก .trim() และ return undefined ทันที
    },
    {
      message: "Invalid coupon code", //ข้อความ error ที่จะแสดงเมื่อ return false
      path: ["couponCode"], // error นี้ควรผูกกับ field ไหน(couponCode)
    }
  )
  .refine(
    (data) => {
      if (!data.password) return true; 
      return data.confirmpassword?.trim() === data.password?.trim(); 
    },
    {
      message: "Password does not match", 
      path: ["confirmpassword"], 
    }
  )
  ;
export type MarathonForm = z.infer<typeof marathonSchema>;

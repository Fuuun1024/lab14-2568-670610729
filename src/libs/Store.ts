import { type MarathonForm } from "../zod/MarathonSchema";
interface MarathonFormState {
  fname: string;
  lname: string;
  plan: "funrun" | "mini" | "half" | "full";
  gender: "male" | "female";
  email: string;
  //fix this
  password: string;
  confirmpassword: string;
  total: number;
  haveCoupon: boolean;
  couponCode: string;

  // Setters
  setFname: (v: string) => void;
  setLname: (v: string) => void;
  setPlan: (v: MarathonForm["plan"]) => void;
  setGender: (v: MarathonForm["gender"]) => void;
  setEmail: (v: string) => void;
  //fix this
  setPassword: (v: string) => void;
  setConfirmpassword: (v: string) => void;
  setHaveCoupon: (v: boolean)=> void;
  setCouponCode: (v: string)=> void;


  // Function ชื่อ discountCupon คำนวณ total ตรงนี้
  discountCupon:()=> void;
  reset: () => void;
}
export type { MarathonFormState }
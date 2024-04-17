const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" }),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(8, { message: "The  password should have atleast 8 characters" })
    .max(50, { message: "The password can only be upto 50 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be of 3 characters" })
    .max(100, { message: "Username can only be of atmost 100 characters" })
    .refine(
      (value) => {
        // Use a regular expression to check if there are more than one space between words
        const moreThanOneSpace = /\s{2,}/.test(value);
        return !moreThanOneSpace;
      },
      {
        message:
          "Username should not contain more than one space between words",
      }
    ),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(/^\+91\d{10}$/, {
      message: "Phone number must start with +91 and be followed by 10 digits",
    }),
});

module.exports = { signupSchema, loginSchema };

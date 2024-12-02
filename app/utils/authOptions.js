import User from "@/lib/database/models/UserSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDatabase } from "@/lib/database";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        contact: { label: "contact", type: "text", placeholder: "testuser@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        const contact = credentials?.contact;
        const password = credentials?.password;

        await connectDatabase();
        const user = await User.findOne({ contact });
        if (user.disabled === true) {
          throw new Error("Your account has been disabled. Please contact support.");
        }
        // Check if the user exists and the password is correct
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (!passwordOk) {
          throw new Error("Invalid credentional.");
        }
        if (passwordOk) {
          // Filter out sensitive fields (like password, createdAt, updatedAt) before returning the user
          const { _id, firstName, lastName, contact, role } = user;
          return { _id, firstName, lastName, contact, role }; // Return only the required fields
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add custom fields from user object to the token
      if (user) {
        token._id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.contact = user.contact;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields from token to the session object
      if (token) {
        session.user._id = token._id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.contact = token.contact;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages:{
    signIn: "/login", 
    error: "/login",
  }
};

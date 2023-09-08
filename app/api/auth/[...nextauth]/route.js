import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/model/Admin";
import bcrypt from "bcrypt";
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // secret: process.env.AUTH_SECRET,
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await mongooseConnect();
        const user = await Admin.findOne({
          username: credentials?.username,
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: async ({ token, user, session }) => {
      if (user) {
        return { ...token, id: user.id, name: user.username };
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

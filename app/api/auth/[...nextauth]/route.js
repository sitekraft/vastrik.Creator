import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" } // 'creator' or 'admin'
      },
      async authorize(credentials, req) {
        await dbConnect();
        
        // Find user
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          // If no user found, and it's for testing, we can create one dynamically
          // Or just throw an error. For this prototype, we'll return an error.
          throw new Error('No user found with this email');
        }
        
        // Check if role matches if provided
        if (credentials.role && user.role !== credentials.role) {
           throw new Error('Unauthorized role');
        }
        
        // Verify password
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordMatch) {
          throw new Error('Invalid password');
        }
        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/', // Using homepage for creator login currently
    error: '/', // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

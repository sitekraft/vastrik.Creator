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
        let user = await User.findOne({ email: credentials.email });
        
        // Auto-seed admin if trying to login and doesn't exist
        if (!user && credentials.email === 'vastrik.support@gmail.com' && credentials.role === 'admin') {
           const hashedPassword = await bcrypt.hash('owner@vastrik.com', 10);
           user = new User({
             name: 'Vastrik Admin',
             email: 'vastrik.support@gmail.com',
             password: hashedPassword,
             role: 'admin'
           });
           await user.save();
        }

        if (!user) {
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

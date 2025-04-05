import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from '@/lib/supabase';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          console.log('Starting signIn callback for user:', user.email);
          
          // Check if user exists in Supabase
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single();

          if (fetchError) {
            console.error('Error checking user existence:', fetchError);
            // If it's not a "no rows" error, log it but continue
            if (fetchError.code !== 'PGRST116') {
              console.error('Unexpected error checking user:', fetchError);
            }
          }

          // If user doesn't exist, create them
          if (!existingUser) {
            console.log('Creating new user in Supabase:', user.email);
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert([
                {
                  email: user.email,
                  name: user.name,
                  image: user.image,
                  created_at: new Date().toISOString(),
                }
              ])
              .select()
              .single();

            if (insertError) {
              console.error('Error creating user in Supabase:', insertError);
              console.error('Error details:', {
                code: insertError.code,
                message: insertError.message,
                details: insertError.details,
                hint: insertError.hint
              });
            } else {
              console.log('Successfully created user:', newUser);
            }
          } else {
            console.log('User already exists:', existingUser);
          }

          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          if (error instanceof Error) {
            console.error('Error details:', {
              message: error.message,
              stack: error.stack
            });
          }
          return true;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST }; 
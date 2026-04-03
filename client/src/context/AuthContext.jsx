import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOut as fbSignOut } from '../config/firebaseConfig';
import { supabase } from '../config/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);   // Supabase user row
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setAuthError(null);
      if (fbUser) {
        setFirebaseUser(fbUser);
        await loadProfile(fbUser.uid, fbUser.email);
      } else {
        setFirebaseUser(null);
        setProfile(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // Fetch user profile + role from Supabase
  const loadProfile = async (uid, email) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('firebase_uid', uid)
        .single();

      if (error || !data) {
        // User signed in with Google but has no Supabase record (not provisioned by admin)
        setProfile(null);
        setAuthError('no_user_record');
      } else {
        setProfile(data);
      }
    } catch (e) {
      setProfile(null);
      setAuthError('fetch_error');
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in — role passed to route the user after login
  const loginWithGoogle = async () => {
    setAuthError(null);
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const fbUser = result.user;
      setFirebaseUser(fbUser);
      await loadProfile(fbUser.uid, fbUser.email);
    } catch (err) {
      setAuthError('google_sign_in_failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    await fbSignOut();
    setFirebaseUser(null);
    setProfile(null);
  };

  // Refresh profile from Supabase (after admin updates info)
  const refreshProfile = async () => {
    if (firebaseUser) {
      await loadProfile(firebaseUser.uid, firebaseUser.email);
    }
  };

  // Get Firebase ID token for API calls
  const getIdToken = async () => {
    if (firebaseUser) {
      return firebaseUser.getIdToken();
    }
    return null;
  };

  const value = {
    firebaseUser,
    user: profile,
    role: profile?.role || null,
    loading,
    authError,
    loginWithGoogle,
    logout,
    refreshProfile,
    getIdToken,
    isAdmin: profile?.role === 'admin',
    isGuard: profile?.role === 'guard',
    isResident: profile?.role === 'resident',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default AuthContext;

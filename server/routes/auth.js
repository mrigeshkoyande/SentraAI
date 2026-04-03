const express = require('express');
const router = express.Router();
const { verifyToken, supabaseAdmin } = require('../middleware/auth');

/**
 * POST /api/auth/profile
 * Called after Google sign-in to sync firebase_uid with Supabase user record.
 * If the email exists without a firebase_uid (admin pre-provisioned), it links them.
 */
router.post('/profile', verifyToken, async (req, res) => {
  const { uid, email } = req.firebaseUser;

  // Try to find by firebase_uid first
  let { data: user } = await supabaseAdmin.from('users').select('*').eq('firebase_uid', uid).single();
  if (user) return res.json({ user });

  // Try to find by email (pre-provisioned by admin with PENDING_ uid)
  const { data: byEmail } = await supabaseAdmin.from('users').select('*').eq('email', email).single();
  if (byEmail) {
    // Link the real firebase_uid
    const { data: updated } = await supabaseAdmin.from('users')
      .update({ firebase_uid: uid, avatar_url: req.body.photoURL || null, updated_at: new Date().toISOString() })
      .eq('id', byEmail.id).select().single();
    return res.json({ user: updated });
  }

  // No record at all
  return res.status(403).json({ error: 'Account not provisioned. Contact your administrator.' });
});

// GET /api/auth/me — returns the calling user's full profile
router.get('/me', verifyToken, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

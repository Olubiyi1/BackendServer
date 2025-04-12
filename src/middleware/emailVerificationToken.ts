import crypto from "crypto"

export const tokenMiddleware = {
  // Generate a verification token and attach to request object
  generateToken: (req: any, res: any, next: any) => {
    try {
      // Generate a random 32-byte hex string
      const verificationToken = crypto.randomBytes(32).toString('hex');
      
      // Attach the token to the request object for use in subsequent middleware/route handlers
      req.verificationToken = verificationToken;
      
      next();
    } 
    catch(error) {
      console.error('Error generating verification token:', error);
      res.status(500).json({ error: 'Failed to generate verification token' });
    }
  }, // <-- Missing comma was here
  
  // Verify a token from request
  verifyToken: (req: any, res: any, next: any) => {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }
    
    req.validatedToken = token;
    next();
  }
}
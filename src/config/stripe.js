import Stripe from 'stripe';
import config from './env.js';

const stripe=new Stripe(config.STRIPE_SECRET_KEY);
console.log("Secret Key:", config.STRIPE_SECRET_KEY);
console.log("Publishable Key:", config.STRIPE_PUBLISHABLE_KEY);

export default stripe;
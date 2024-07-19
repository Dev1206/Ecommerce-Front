import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_e787239aa8c4c9a17c58d18320f44ef5fd117be943d9dd5a7f85b40a0b5af816";

export default async function handler(req,res){

    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        const orderId = data.metadata.Order_id;
        const paid = data.payment_status === 'paid';
        if(orderId && paid) {
            await Order.findByIdAndUpdate(orderId,{
                paid:true,})
        }
        console.log(data);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok');
}

export const config ={
    api: {
      bodyParser : false,
    },
}

// tempt-reform-nicer-catchy - key
// acct_1Pe0UuRpccNK1uhS - account id
// whsec_e787239aa8c4c9a17c58d18320f44ef5fd117be943d9dd5a7f85b40a0b5af816 - webhook signing secret
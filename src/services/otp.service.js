import emailQueue from "../queues/email.queue.js";

const sendOTP=async(phone)=>{
    const otp=Math.floor(100000 + Math.random() * 900000);
    await emailQueue.add('send-otp',{
        phone, otp
    },{
        priority:1
    })
;
return {
    success:true,
    otp
}
}
export {sendOTP};
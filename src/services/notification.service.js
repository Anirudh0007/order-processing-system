import NotFoundError from "../errors/NotFoundError.js";
import Notification from "../models/notification.model.js";

const createNotification=async(userId,notificationData)=>{
    const notification=await Notification.create({
        user: userId,
        ...notificationData
    })

    return notification;
}

const getNotifications=async(userId)=>{
    const notifications=await Notification.find({
        user:userId
    }).sort({
        createdAt: -1
    });

    return notifications;
}

const markAsRead=async(notificationId, user)=>{

    const notification=await Notification.findById(
        notificationId
    );
    if(!notification)
    {
        throw new NotFoundError(
            "Notification not found"
        );
    }
    if (notification.user.toString() !== user.id) {
        throw new ForbiddenError(
            "You are not authorized to access this notification"
        );
    }
    notification.isRead=true;
    await notification.save();
    return notification;
}

const markAllAsRead=async(userId)=>{
    await Notification.updateMany({
        user:userId,
        isRead:false
    },{
        $set:{
            isRead:true
        }
    })
    return;
}

export {markAsRead, markAllAsRead, createNotification, getNotifications}
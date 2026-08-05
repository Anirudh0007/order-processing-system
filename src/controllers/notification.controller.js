import { createNotification, getNotifications, markAllAsRead, markAsRead } from "../services/notification.service.js";


const createNotificationController=async(req,res,next)=>{
     try {

        const notification = await createNotification(
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification
        });

} catch(error)
{
    next(error);
}
}
const getNotificationsController=async(req,res,next)=>{
    try {
        
        const notifications=await getNotifications(
            req.user.id
        )
        return res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            data:notifications
        })

    } catch (error) {
        next(error);
    }
} 

const markAsReadController=async(req, res, next)=>{
    try {
        const notification=await markAsRead(
            req.params.notificationId,
            req.user
        )
         return res.status(200).json({

            success: true,

            message: "Notification marked as read",

            data: notification

        });

        
    } catch (error) {
        next(error);
    }
}

const markAllAsReadController=async(req,res,next)=>{
    try {
        await markAllAsRead(req.user.id);
        return res.status(200).json({
            success:true,
            message:"All notifications marked as read"
        })
        
    } catch (error) {
        next(error);
    }
}

export {markAsReadController, markAllAsReadController}
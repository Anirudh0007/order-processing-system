import express from "express";

import authenticate from "../middleware/authenticate.middleware.js";
import validateNotification from "../middleware/validateNotification.middleware.js";

import {

    createNotificationController,

    getNotificationsController,

    markAsReadController,

    markAllAsReadController

} from "../controllers/notification.controller.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    validateNotification,
    createNotificationController
);

router.get(
    "/",
    authenticate,
    getNotificationsController
);

router.patch(
    "/:notificationId/read",
    authenticate,
    markAsReadController
);

router.patch(
    "/read-all",
    authenticate,
    markAllAsReadController
);

export default router;
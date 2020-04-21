import { Navigation } from '../types/common';
import { donateURL, feedBackURL } from '../data/metadata';

export const TemplateQuickReplies = {
    reset: {
        content_type: "text",
        title: "Reset",
        payload: "RESET",
        image_url: "https://i.ibb.co/4WgYnhV/reset.png"
    },
    cancel: {
        content_type: "text",
        title: "Cancel",
        payload: "CANCEL",
        image_url: "https://i.ibb.co/yyJ1GvY/cancel.png"
    },
    yes: {
        content_type: "text",
        title: "Yes",
        payload: "YES",
        image_url: "https://i.ibb.co/yyJ1GvY/cancel.png"
    },
};

export function NavigationQuickReply(navigationItems: Navigation) {
    return [
        ...navigationItems.map((item) => {
            return {
                content_type: "text",
                title: item.title,
                payload: item.code,
                image_url: item.img
            }
        }),
        TemplateQuickReplies.cancel
    ];
}

export const DonateButton = {
    type: "web_url",
    url: donateURL,
    title: "💰 Donate Me"
};

export const FeedBackButton = {
    type: "web_url",
    url: feedBackURL,
    title: "📝 Feedback"
};


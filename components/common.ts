import { NavigationItemView, NavigationMessageOptions } from '../types/types';
import { donateURL, feedBackURL } from '../data/metadata';

export const TemplateQuickReplies = {
    reset: {
        content_type: "text",
        title: "Reset",
        image_url: "https://i.ibb.co/4WgYnhV/reset.png"
    },
    cancel: {
        content_type: "text",
        title: "Cancel",
        image_url: "https://i.ibb.co/yyJ1GvY/cancel.png"
    },
    yes: {
        content_type: "text",
        title: "Yes",
        image_url: "https://i.ibb.co/yyJ1GvY/cancel.png"
    },
    no: {
        content_type: "text",
        title: "No",
        image_url: "https://i.ibb.co/yyJ1GvY/cancel.png"
    },
};

const defaultNavigationMessageOptions:NavigationMessageOptions = {
    cancel: false,
    reset: false
}
export function NavigationQuickReply(navigationItems: NavigationItemView[], options:NavigationMessageOptions =defaultNavigationMessageOptions) {
    return [
        ...navigationItems.map((item) => {
            return {
                content_type: "text",
                title: item.title,
                image_url: item.img
            }
        }),
        ...options.reset? [TemplateQuickReplies.reset]:[],
        ...options.cancel? [TemplateQuickReplies.cancel]:[],
    ];
}

export const DonateButton = {
    type: "web_url",
    url: donateURL,
    title: "💰 Donate Me",
    webview_height_ratio: "full",
    messenger_extensions: "true",
};

export const FeedBackButton = {
    type: "web_url",
    url: feedBackURL,
    title: "📝 Feedback",
};


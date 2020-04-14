import { Navigation } from '../types/common';

export function NavigationQuickReply(navigationItems: Navigation) {
    return navigationItems.map((item) => {
        return {
            content_type: "text",
            title: item.title,
            payload: item.code,
            image_url: item.img
        };
    })
}
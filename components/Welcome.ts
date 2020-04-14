import metadata from '../data/metadata';

export function welcomeMsg(user) {
    return [
        {
            "title": metadata.title,
            "image_url": metadata.logoUrl,
            "subtitle": metadata.introduction(user.first_name),
            "default_action": {
                "type": "web_url",
                "url": metadata.domain,
                "messenger_extensions": true,
                "webview_height_ratio": "TALL"
            },
            buttons: [
                {
                    "type": "postback",
                    "title": "Get Started",
                    "payload": "OPEN_MENU"
                }
            ]
        }
    ]
}
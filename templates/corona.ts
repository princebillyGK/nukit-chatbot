export const CoronaStatMsg = (data) => {
    console.log(data);
    return `*গত ২৪ ঘণ্টায় আক্রান্ত:* ${data["Confirmed_Cases_in_Last_24_Hour"]}\n*গত ২৪ ঘণ্টায় সুস্থ:* ${data["Recovery_in_Last_24_Hour"]}\n*গত ২৪ ঘণ্টায় মৃত্যু:* ${data["Death_in_Last_24_Hour"]}\n*মোট আক্রান্ত:* ${data["Cumulative_Confirmed_Cases"]}\n*মোট সুস্থ:* ${data["Cumulative_Recovery"]}\n*মোট মৃত্যু:* ${data["Cumulative_Death"]}\n------------------\n_সর্বশেষ আপডেট - ${data["Date"]}_\n`;
}

export const CoronaHelpline = {
            text: 'Corona Helplines',
            buttons: [
                {
                    "type": "phone_number",
                    "title": "আইইডিসিআর",
                    "payload": "+88010655"
                },
                {
                    "type": "phone_number",
                    "title": "বিশেষজ্ঞ হেলথ লাইন",
                    "payload": "+8809611677777"
                },
                {
                    "type": "phone_number",
                    "title": "ন্যাশনাল কল সেন্টার",
                    "payload": "+880333"
                },
            ]
        }
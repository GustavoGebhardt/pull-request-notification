require('dotenv').config()

async function sendMessage(text: string){
    const webhookUrl = process.env.WEBHOOK_DISCORD!;
    const message = {
    content: text
    };

    await fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
    })
}

export default sendMessage;
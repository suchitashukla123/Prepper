import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const askAI = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("No message found");
        }

        const response = await axios.post(
            process.env.OPEN_ROUTER_URL,
            {
                model: process.env.OPEN_ROUTER_MODEL,
                messages: messages
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPEN_ROUTER_APIKEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;

        if (typeof content !== 'string' || !content.trim()) {
            throw new Error("Empty or invalid content from OpenRouter API");
        }

        return content;

    } catch (error) {
        console.error(
            "Error in askAI:",
            error.response?.data || error.message
        );

        throw error;
    }
};

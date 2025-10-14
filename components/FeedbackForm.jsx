import React, { useState } from "react";
import { resolve } from "styled-jsx/css";

export default function FeedbackForm() {
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false)
    const [showCreateMenu, setShowCreateMenu] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsSending(true);
        await sendMessage(text);
        setIsSending(false);
        setIsSent(true);
        setText(" ")
        if (isSent) {
            return <h1 className="mt-30">Thanks for feedback1</h1>
        }

    }

    return (
        <div>
            <button title="Feedback " onClick={() => setShowCreateMenu(!showCreateMenu)}>
                <span>+</span>
            </button>

            {showCreateMenu && (
            <form onSubmit={handleSubmit}>
                <h1>What's your experience with The Cyclopedia</h1>
                <textarea
                    disabled={isSending}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button
                    disabled={isSending}
                    type="submit"
                >
                    send
                </button>
                {isSending && <p>sending...</p>}
            </form>
            )}

        </div>
        
    )
}

function sendMessage(text) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000)
    })
}
const form = document.getElementById("chatForm");
const input = document.getElementById("promptInput");
const btn = document.getElementById("submitBtn");
const chat = document.getElementById("chat");

const bubble = (text, type) => {
    const el = document.createElement("div");

    el.className =
        type === "user"
            ? "bg-black text-green-400 border border-green-500 px-3 py-2 max-w-[80%]"
            : "bg-[#220000] text-green-300 border border-red-700 px-3 py-2 max-w-[80%]";

    el.textContent = text;

    const wrapper = document.createElement("div");
    wrapper.className = "flex " + (type === "user" ? "justify-end" : "justify-start");
    wrapper.appendChild(el);

    chat.appendChild(wrapper);
    chat.scrollTop = chat.scrollHeight;

    return el;
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = input.value.trim();
    if (!message) return;

    bubble(message, "user")
    input.value = "";

    btn.disabled = true;
    input.disabled = true;
    btn.textContent = "Bezig...";

    const loading = bubble("Even denken...", "bot");

    try {
        const response = await fetch("api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        loading.textContent = "";

        const responseText = document.createElement("p");
        responseText.textContent = data.message || "Geen antwoord.";

        const tokenText = document.createElement("p");
        tokenText.textContent = `Tokens: ${data.tokens ?? 0}`;
        tokenText.className = "text-xs opacity-70 mt-2";

        loading.appendChild(responseText);
        loading.appendChild(tokenText);

        console.log(data.message);
        console.log(data.tokens);
    } catch {
        loading.textContent = "Error bij server.";
    }

    btn.disabled = false;
    input.disabled = false;
    btn.textContent = "Verstuur";
    input.focus();
});

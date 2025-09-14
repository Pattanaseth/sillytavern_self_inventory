// Entry point for your extension
(async function () {
    const MODULE_NAME = "my_inventory";

    // Register the slash command /inventory
    const ctx = window.getContext?.(); // Get SillyTavern context
    if (!ctx) return console.error("SillyTavern context not found!");

    ctx.registerSlashCommand({
        name: "inventory",
        description: "Show your inventory items",
        arguments: [],
        run: async (args, context) => {
            // Example inventory data
            const inventory = [
                { name: "Sword", quantity: 1 },
                { name: "Shield", quantity: 1 },
                { name: "Health Potion", quantity: 5 },
            ];

            // Format message
            const messageText = inventory
                .map(item => `${item.name} x${item.quantity}`)
                .join("\n");

            // Add message to chat
            context.addOneMessage({
                id: context.uuidv4(),
                type: "message",
                text: messageText,
                sender: "system",
                timestamp: Date.now(),
            });

            return true; // Command executed successfully
        }
    });

    console.log("[Inventory] /inventory command registered.");
})();

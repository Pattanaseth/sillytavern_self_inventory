(async function() {
    const MODULE_NAME = "my_inventory";

    // Wait until getContext() exists
    function getCtx() {
        if (window.getContext) return window.getContext();
        return null;
    }

    function waitForCtx() {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                const ctx = getCtx();
                if (ctx) {
                    clearInterval(interval);
                    resolve(ctx);
                }
            }, 100);
        });
    }

    const ctx = await waitForCtx();

    // Register the /inventory command
    ctx.registerSlashCommand({
        name: "inventory",
        description: "Show your inventory items",
        arguments: [],
        run: async (args, context) => {
            // Example inventory
            const inventory = [
                { name: "Sword", quantity: 1 },
                { name: "Shield", quantity: 1 },
                { name: "Health Potion", quantity: 5 },
            ];

            const messageText = inventory
                .map(item => `${item.name} x${item.quantity}`)
                .join("\n");

            // Add system message to chat
            context.addOneMessage({
                id: context.uuidv4(),
                type: "message",
                text: messageText,
                sender: "system",
                timestamp: Date.now(),
            });

            return true;
        }
    });

    console.log("[Inventory] /inventory command successfully registered!");
})();

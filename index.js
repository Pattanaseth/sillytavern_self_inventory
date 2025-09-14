jQuery(async function () {
    await addDiceRollButton(); // You can keep or remove this if you don't want dice UI

    registerFunctionTools(); // Optional, can keep if you still want dice tool support

    // Register /inventory instead of /roll
    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'inventory', // changed from 'roll'
        aliases: ['inv'],  // optional alias
        callback: async (args, value, context) => {
            // Example inventory
            const inventory = [
                { name: "Sword", quantity: 1 },
                { name: "Shield", quantity: 1 },
                { name: "Health Potion", quantity: 5 },
            ];

            const messageText = inventory
                .map(item => `${item.name} x${item.quantity}`)
                .join("\n");

            // Send system message
            const ctx = SillyTavern.getContext();
            ctx.addOneMessage({
                id: ctx.uuidv4(),
                type: "message",
                text: messageText,
                sender: "system",
                timestamp: Date.now(),
            });

            return messageText; // returns for slash command processing
        },
        helpString: 'Show your inventory items.',
        returns: 'inventory list',
        namedArgumentList: [],   // no special arguments
        unnamedArgumentList: [],
    }));

    console.log('[Inventory] /inventory command registered!');
});

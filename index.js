import { SlashCommand } from "../../../slash-commands/SlashCommand.js";
import fs from "fs";
import path from "path";

const MODULE_NAME = "inventory";
const dataFile = path.join(process.cwd(), "extensions", MODULE_NAME, "inventory_data.json");

let data = {
    slots: {
        head: "Empty",
        neck: "Empty",
        torso: "Empty",
        legs: "Empty",
        leftHand: "Empty",
        rightHand: "Empty"
    }
};

function loadData() {
    try {
        if (fs.existsSync(dataFile)) {
            data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
        } else {
            saveData();
        }
    } catch (err) {
        console.error(`[${MODULE_NAME}] Failed to load data:`, err);
    }
}

function saveData() {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`[${MODULE_NAME}] Failed to save data:`, err);
    }
}

function createPopup() {
    loadData();

    const overlay = document.createElement("div");
    overlay.className = "inventory-overlay";
    overlay.addEventListener("click", () => document.body.removeChild(overlay));

    const window = document.createElement("div");
    window.className = "inventory-window";
    window.addEventListener("click", e => e.stopPropagation());

    const title = document.createElement("h2");
    title.innerText = "Inventory";
    window.appendChild(title);

    const list = document.createElement("div");
    list.className = "inventory-list";

    for (const slot of Object.keys(data.slots)) {
        const row = document.createElement("div");
        row.className = "inventory-slot";

        const label = document.createElement("span");
        label.innerText = slot;

        const input = document.createElement("input");
        input.value = data.slots[slot];
        input.addEventListener("input", () => {
            data.slots[slot] = input.value;
            saveData();
        });

        row.append(label, input);
        list.appendChild(row);
    }

    window.appendChild(list);
    overlay.appendChild(window);
    document.body.appendChild(overlay);
}

SlashCommand.register(
    MODULE_NAME,
    "/inventory",
    "Open your inventory window",
    () => {
        createPopup();
        return "Opening Inventory...";
    }
);

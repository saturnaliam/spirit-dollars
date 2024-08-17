if (Deno.args.length < 1) {
    console.error("argument must be provided!");
    Deno.exit(-1);
}

const kv = await Deno.openKv("db/spirit.db");

function addUser(id: string, balance: number) {
    kv.set(["users", id], { id: id, balance: balance, debts: [] })
    console.log(`added user ${id} with balance $${balance}`);
}
async function getUsers() {
    const users = kv.list({ prefix: ["users"] });

    for await (const user of users) {
        console.log(user.value);
    }
}

function removeUser(id: string) {
    kv.delete(["users", id]);
}

const args = Deno.args;

if (args[0] == "a") {
    if (args.length != 3) { 
        console.error("usage: a [id] [balance]");
        Deno.exit(-1);
    }

    addUser(args[1], Number(args[2]));
} else if (args[0] == "g") {
    getUsers();
} else if (args[0] == "r") {
    removeUser(args[1]);
}
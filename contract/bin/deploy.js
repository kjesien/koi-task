const fs = require("fs");
const Arweave = require("arweave");
const smartweave = require("smartweave");
const path = require("path");

require("dotenv").config();

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
});

const walletPath = process.env.WALLET_LOCATION;
if (!walletPath) throw new Error("WALLET_LOCATION not specified in .env");

const contract = process.argv[2];
if (!contract) throw new Error("Contract name not specified");

const wallet = JSON.parse(fs.readFileSync(path.normalize(walletPath)));

const src = fs.readFileSync(`dist/${contract}.js`);
const state = fs.readFileSync(`src/init_state.json`);

console.log("-----------------");

async function deploy() {
  const id = await smartweave.createContract(
    arweave,
    wallet,
    src.toString(),
    state.toString(),
    "100000000"
  );

  console.log(
    `Deployed ${contract} Contract with ID ${id}. Click to view: https://arweave.net/tx/${id}`
  );
  fs.writeFileSync("dist/Transaction.json", JSON.stringify({ id }));
}

(async () => await deploy())();

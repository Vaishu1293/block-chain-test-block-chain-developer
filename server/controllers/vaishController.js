const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const sendToken = require("../utils/sendToken");

const { NftMetadata } = require("../models/NFTMetadataModel");
const { Web3 } = require("web3");
// Import Moralis
const Moralis = require("moralis").default;
// Import the EvmChain dataType
const { EvmChain } = require("@moralisweb3/common-evm-utils");


// // Web3 instance connected to Infura (Sepolia testnet) 
// const web3 = new Web3.providers.HttpProvider(process.env.INFURA_SEPI_URL)
// const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
// web3.eth.accounts.wallet.add(account);
// web3.eth.defaultAccount;

const provider = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/fd581decbce1466882eb8604654c7e4f')
const web3 = new Web3(provider);
const account = web3.eth.accounts.privateKeyToAccount('0x3bc88885a8f211b26a3bf0602a99d7a4db903501a7b8e5789d5dd80d77e4d244');
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount;

const startMoralis = async () => {
  try {
    await Moralis.start({
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjU5MzdiMzY3LTUxZmItNDlkYS1iYjY0LWRiZWY5NjdlNWE4ZSIsIm9yZ0lkIjoiNDExMzc0IiwidXNlcklkIjoiNDIyNzUxIiwidHlwZUlkIjoiYWY1YTQ3ZmItNDczOS00ODZiLTg2MWQtM2MzOWY4YmViZjA4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjg2Njc0NTYsImV4cCI6NDg4NDQyNzQ1Nn0.Gc2_wTDh-peAufFNsTrb4WScIk3qc6zbWRqZA_-xmJg'
    //   apiKey: process.env.MORALIS_API_KEY,
      // Other configuration if needed
    });
    console.log("Moralis started successfully!");
  } catch (error) {
    console.error("Error starting Moralis:", error);
  }
};

// Call the async function
startMoralis();


exports.getNFTMetaData = asyncErrorHandler(async (req, res) => {
  // Get address and tokenId from req.body
  const { address, tokenId } = req.body;

  // Validate inputs
  if (!address || !tokenId) {
    return res.status(400).json({ error: "Address and tokenId are required." });
  }

  // Validate address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: "Invalid contract address format." });
  }

  // Define the chain (adjust if you're using a different network)
  const chain = EvmChain.ETHEREUM; // Change to EvmChain.SEPOLIA if using Sepolia testnet

  // Fetch NFT metadata from Moralis
  const response = await Moralis.EvmApi.nft.getNFTMetadata({
    address,
    chain,
    tokenId,
  });

  // Extract data from response
  const data = response.toJSON();

  // Parse the 'metadata' field from JSON string to an object
  let metadata = data.metadata;
  if (typeof metadata === "string") {
    metadata = JSON.parse(metadata);
  }

  // Prepare data for saving
  const nftData = {
    amount: data.amount,
    tokenId: tokenId,
    contractAddress: address,
    contractType: data.contract_type,
    ownerOf: data.owner_of,
    lastMetadataSync: data.last_metadata_sync
      ? new Date(data.last_metadata_sync)
      : null,
    lastTokenUriSync: data.last_token_uri_sync
      ? new Date(data.last_token_uri_sync)
      : null,
    metadata: metadata,
    blockNumber: data.block_number,
    blockNumberMinted: data.block_number_minted,
    name: data.name,
    symbol: data.symbol,
    tokenHash: data.token_hash,
    tokenUri: data.token_uri,
    minterAddress: data.minter_address,
    rarityRank: data.rarity_rank,
    rarityPercentage: data.rarity_percentage,
    rarityLabel: data.rarity_label,
    verifiedCollection: data.verified_collection,
    possibleSpam: data.possible_spam,
    collectionLogo: data.collection_logo,
    collectionBannerImage: data.collection_banner_image,
    floorPrice: data.floor_price,
    floorPriceUsd: data.floor_price_usd,
    floorPriceCurrency: data.floor_price_currency,
  };

  // Save to MongoDB
  const nftMetadata = new NftMetadata(nftData);
  await nftMetadata.save();

  // Generate and send token with the metadata
  const user = { id: nftMetadata.ownerOf }; // Assuming 'ownerOf' is treated as the user ID
  sendToken(user, 200, res); // Use the sendToken utility for sending the response with a token
});

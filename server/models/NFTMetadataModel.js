// models/NftMetadata.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const NftMetadataSchema = new Schema(
  {
    amount: {
      type: String,
    },
    tokenId: {
      type: String,
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    contractType: {
      type: String,
    },
    ownerOf: {
      type: String,
    },
    lastMetadataSync: {
      type: Date,
    },
    lastTokenUriSync: {
      type: Date,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    blockNumber: {
      type: String,
    },
    blockNumberMinted: {
      type: String,
    },
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
    tokenHash: {
      type: String,
    },
    tokenUri: {
      type: String,
    },
    minterAddress: {
      type: String,
    },
    rarityRank: {
      type: Number,
    },
    rarityPercentage: {
      type: Number,
    },
    rarityLabel: {
      type: String,
    },
    verifiedCollection: {
      type: Boolean,
    },
    possibleSpam: {
      type: Boolean,
    },
    collectionLogo: {
      type: String,
    },
    collectionBannerImage: {
      type: String,
    },
    floorPrice: {
      type: Number,
    },
    floorPriceUsd: {
      type: Number,
    },
    floorPriceCurrency: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NftMetadata", NftMetadataSchema);

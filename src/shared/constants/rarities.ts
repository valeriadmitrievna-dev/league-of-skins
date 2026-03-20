export const RARITIES = {
  kEpic: {
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/epic.png",
    price: {
      type: 'RP',
      value: '1350'
    },
    color: '#3CAAFF',
  },
  kMythic: {
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/mythic.png",
    price: {
      type: 'ME',
      value: '125-150'
    },
    color: '#C15AFF',
  },
  kLegendary: {
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/legendary.png",
    price: {
      type: 'RP',
      value: '1820'
    },
    color: '#E64B4B',
  },
  kTranscendent: {
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/transcendent.png",
  },
  kUltimate: {
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/ultimate.png",
    price: {
      type: 'RP',
      value: '3250'
    },
    color: '#F67733',
  },
  kExalted: {
    icon: "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/rarity-gem-icons/exalted.png",
  },
} as {
  [rarity: string]: {
    icon: string;
    price?: { type: 'RP' | 'ME', value: string; };
    color?: string;
  }
};

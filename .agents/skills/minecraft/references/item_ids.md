# Minecraft Common Survival Items & Block Reference

This streamlined reference lists the **most frequently encountered gameplay items** for low-latency AI co-pilot execution (~1.2s response times).

---

## Ores & Minerals (22 items)

| Item / Block ID | Display Name | Mineable? | Equippable? | Usable? | Target Aritone Command |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `coal_ore` | Coal Ore | Yes | No | No | `#mine coal_ore <qty>` |
| `deepslate_coal_ore` | Deepslate Coal Ore | Yes | No | No | `#mine deepslate_coal_ore <qty>` |
| `coal` | Coal | No | No | No | `#dropitematplayer coal <qty> <player>` |
| `iron_ore` | Iron Ore | Yes | No | No | `#mine iron_ore <qty>` |
| `deepslate_iron_ore` | Deepslate Iron Ore | Yes | No | No | `#mine deepslate_iron_ore <qty>` |
| `raw_iron` | Raw Iron | No | No | No | `#inventorylookup raw_iron` |
| `iron_ingot` | Iron Ingot | No | No | No | `#dropitematplayer iron_ingot <qty> <player>` |
| `gold_ore` | Gold Ore | Yes | No | No | `#mine gold_ore <qty>` |
| `gold_ingot` | Gold Ingot | No | No | No | `#dropitematplayer gold_ingot <qty> <player>` |
| `copper_ore` | Copper Ore | Yes | No | No | `#mine copper_ore <qty>` |
| `copper_ingot` | Copper Ingot | No | No | No | `#inventorylookup copper_ingot` |
| `diamond_ore` | Diamond Ore | Yes | No | No | `#mine diamond_ore <qty>` |
| `deepslate_diamond_ore` | Deepslate Diamond Ore | Yes | No | No | `#mine deepslate_diamond_ore <qty>` |
| `diamond` | Diamond | No | No | No | `#dropitematplayer diamond <qty> <player>` |
| `emerald_ore` | Emerald Ore | Yes | No | No | `#mine emerald_ore <qty>` |
| `emerald` | Emerald | No | No | No | `#dropitematplayer emerald <qty> <player>` |
| `lapis_ore` | Lapis Ore | Yes | No | No | `#mine lapis_ore <qty>` |
| `lapis_lazuli` | Lapis Lazuli | No | No | No | `#inventorylookup lapis_lazuli` |
| `redstone_ore` | Redstone Ore | Yes | No | No | `#mine redstone_ore <qty>` |
| `redstone` | Redstone Dust | No | No | No | `#inventorylookup redstone` |
| `ancient_debris` | Ancient Debris | Yes | No | No | `#mine ancient_debris <qty>` |
| `netherite_ingot` | Netherite Ingot | No | No | No | `#inventorylookup netherite_ingot` |

## Wood & Vegetation (13 items)

| Item / Block ID | Display Name | Mineable? | Equippable? | Usable? | Target Aritone Command |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `oak_log` | Oak Log | Yes | No | No | `#mine oak_log <qty>` |
| `spruce_log` | Spruce Log | Yes | No | No | `#mine spruce_log <qty>` |
| `birch_log` | Birch Log | Yes | No | No | `#mine birch_log <qty>` |
| `jungle_log` | Jungle Log | Yes | No | No | `#mine jungle_log <qty>` |
| `acacia_log` | Acacia Log | Yes | No | No | `#mine acacia_log <qty>` |
| `dark_oak_log` | Dark Oak Log | Yes | No | No | `#mine dark_oak_log <qty>` |
| `oak_planks` | Oak Planks | Yes | No | No | `#mine oak_planks <qty>` |
| `spruce_planks` | Spruce Planks | Yes | No | No | `#mine spruce_planks <qty>` |
| `stick` | Stick | No | No | No | `#inventorylookup stick` |
| `crafting_table` | Crafting Table | Yes | No | No | `#lookatblock crafting_table` |
| `furnace` | Furnace | Yes | No | No | `#lookatblock furnace` |
| `chest` | Chest | Yes | No | No | `#lookatblock chest` |
| `barrel` | Barrel | Yes | No | No | `#lookatblock barrel` |

## Stone & Terrain (9 items)

| Item / Block ID | Display Name | Mineable? | Equippable? | Usable? | Target Aritone Command |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `stone` | Stone | Yes | No | No | `#mine stone <qty>` |
| `cobblestone` | Cobblestone | Yes | No | No | `#mine cobblestone <qty>` |
| `deepslate` | Deepslate | Yes | No | No | `#mine deepslate <qty>` |
| `dirt` | Dirt | Yes | No | No | `#mine dirt <qty>` |
| `grass_block` | Grass Block | Yes | No | No | `#mine grass_block <qty>` |
| `sand` | Sand | Yes | No | No | `#mine sand <qty>` |
| `gravel` | Gravel | Yes | No | No | `#mine gravel <qty>` |
| `obsidian` | Obsidian | Yes | No | No | `#mine obsidian <qty>` |
| `glass` | Glass | Yes | No | No | `#mine glass <qty>` |

## Food & Potions (9 items)

| Item / Block ID | Display Name | Mineable? | Equippable? | Usable? | Target Aritone Command |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `golden_apple` | Golden Apple | No | No | Yes | `#useitem golden_apple` |
| `cooked_beef` | Steak | No | No | Yes | `#useitem cooked_beef` |
| `cooked_porkchop` | Cooked Porkchop | No | No | Yes | `#useitem cooked_porkchop` |
| `cooked_chicken` | Cooked Chicken | No | No | Yes | `#useitem cooked_chicken` |
| `cooked_salmon` | Cooked Salmon | No | No | Yes | `#useitem cooked_salmon` |
| `bread` | Bread | No | No | Yes | `#useitem bread` |
| `golden_carrot` | Golden Carrot | No | No | Yes | `#useitem golden_carrot` |
| `potion` | Potion | No | No | Yes | `#useitem potion` |
| `milk_bucket` | Milk Bucket | No | No | Yes | `#useitem milk_bucket` |

## Armor & Equipment (11 items)

| Item / Block ID | Display Name | Mineable? | Equippable? | Usable? | Target Aritone Command |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `diamond_helmet` | Diamond Helmet | No | Yes | No | `#wearitem diamond_helmet` |
| `diamond_chestplate` | Diamond Chestplate | No | Yes | No | `#wearitem diamond_chestplate` |
| `diamond_leggings` | Diamond Leggings | No | Yes | No | `#wearitem diamond_leggings` |
| `diamond_boots` | Diamond Boots | No | Yes | No | `#wearitem diamond_boots` |
| `iron_helmet` | Iron Helmet | No | Yes | No | `#wearitem iron_helmet` |
| `iron_chestplate` | Iron Chestplate | No | Yes | No | `#wearitem iron_chestplate` |
| `iron_leggings` | Iron Leggings | No | Yes | No | `#wearitem iron_leggings` |
| `iron_boots` | Iron Boots | No | Yes | No | `#wearitem iron_boots` |
| `netherite_chestplate` | Netherite Chestplate | No | Yes | No | `#wearitem netherite_chestplate` |
| `elytra` | Elytra | No | Yes | No | `#wearitem elytra` |
| `shield` | Shield | No | Yes | No | `#wearitem shield` |

## Tools & Weapons (8 items)

| Item / Block ID | Display Name | Mineable? | Equippable? | Usable? | Target Aritone Command |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `diamond_pickaxe` | Diamond Pickaxe | No | No | Yes | `#inventorylookup diamond_pickaxe` |
| `iron_pickaxe` | Iron Pickaxe | No | No | Yes | `#inventorylookup iron_pickaxe` |
| `diamond_axe` | Diamond Axe | No | No | Yes | `#inventorylookup diamond_axe` |
| `iron_axe` | Iron Axe | No | No | Yes | `#inventorylookup iron_axe` |
| `diamond_sword` | Diamond Sword | No | No | Yes | `#inventorylookup diamond_sword` |
| `iron_sword` | Iron Sword | No | No | Yes | `#inventorylookup iron_sword` |
| `bow` | Bow | No | No | Yes | `#useitem bow` |
| `arrow` | Arrow | No | No | No | `#inventorylookup arrow` |

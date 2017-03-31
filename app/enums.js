function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}
// Enums
define("socket", 0);

define("INVALID_Team", -1);
define("Team0", 0);
define("Team1", 1);
define("Team2", 2);
define("Team3", 3);
define("Observer", 4);

define("GS_InPlay", 0);
define("GS_Win", 1);
define("GS_Lose", 2);
define("GS_Observe", 3);

define("PT_Player", 10);
define("PT_Computer", 11);
define("PT_Observer", 12);
// LoseType
define("LT_LoseMain", 0);
define("LT_Leaves", 1);

define("NW", 0);
define("NE", 1);
define("SW", 2);
define("SE", 3);

// Client State
define("MultiPlayerMenu", 8);
define("GameRoom", 9);
define("InGame", 12);

// Client Status
define("Ready", 50);
define("NotReady", 51);

// Color
define('Black', 0x00)
define('Red', 0xFF9999)
define('Blue', 0x9999FF)
define('Teal', 0x99f9f9)
define('Purple', 0xf999f9)
define('Brown', 0x91580F)
define('Orange', 0xf8a700)
define('DarkOrange', 0xf78b00)
define('LightGreen', 0x58dc00)
define('DarkGreen', 0x287b00)
define('Lime', 0xa8f07a)
define('Aqua', 0x4ae8c4)
define('LightBlue', 0x3b88eb)
define('DarkPurple', 0x3824aa)
define('Burlywood', 0xdeb887)






// Character Types
define('Hut', 0)
define('Cow', 1)
define('CowMage', 2)
define('Tower', 3)
define('Slime', 4)


// Upgrade Types
define('Invalid', -1)
define('Attack', 0)
define('Defense', 1)
define('Speed', 2)




// SVG Paths for Input Lines (Phase 1)
export const INPUT_PATHS = {
    topLeft: "M 180 120 C 250 120, 230 180, 300 180",
    botLeft: "M 180 240 C 250 240, 230 180, 300 180",
    topRight: "M 420 120 C 350 120, 370 180, 300 180",
    botRight: "M 420 240 C 350 240, 370 180, 300 180",
};

// SVG Paths for Output Connector Lines (Phase 2/3)
// Adjusted for new Card Position (Right-2) and Straight Middle Line
export const OUTPUT_PATHS = {
    top: "M 120 180 C 170 180, 180 60, 225 60",
    mid: "M 120 180 C 150 179, 195 181, 225 180", // Straight Line (Subtle Curve)
    bot: "M 120 180 C 170 180, 180 300, 225 300",
};

// Physics Configurations (Springs)
export const SPRING_CONFIG = {
    brainShift: { type: "spring", stiffness: 55, damping: 13, mass: 1.2 },
    cardAppear: { type: "spring", stiffness: 70, damping: 14 },
    iconSuck: { type: "spring", stiffness: 50, damping: 10 },
    upsellStart: { type: "spring", stiffness: 100, damping: 20 },
} as const;

// Animation Durations
export const DURATIONS = {
    reset: 0,
    breathing: 4,
    lineDraw: 1.2,
    particleFlow: 0.8,
    absorb: 0.5,
    shift: 1.2, // Brain movement
    chatBubble: 0.5,
};

// Delays
export const DELAYS = {
    particleStart: 0.5,
    thinking: 1.2,
    chatStagger: 0.15,
};

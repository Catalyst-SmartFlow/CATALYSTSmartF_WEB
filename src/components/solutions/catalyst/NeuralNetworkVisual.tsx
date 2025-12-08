"use client";

import React, { useEffect, useState, useMemo } from "react";
import { m as motion } from "framer-motion";

// Minimalist & Proportional Neural Network
const NeuralNetworkVisual = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Proportional Grid System
    // We use a symmetric 3-layer structure: Input(3) -> Hidden(4) -> Output(3)
    const { viewBox, layers, nodeRadius } = useMemo(() => {
        if (isMobile) {
            // Mobile Layout - Shifted UP to avoid text overlap
            // Card is ~300px high. Text is at bottom. Network should be in top 60%.
            return {
                viewBox: "0 0 140 140", // Slightly wider/taller canvas
                nodeRadius: 4, // Larger nodes for mobile
                layers: [
                    // Compressed vertically and shifted up
                    { x: 30, nodes: [20, 45, 70] },    // Layer 1
                    { x: 70, nodes: [15, 35, 55, 75] }, // Layer 2 (Center)
                    { x: 110, nodes: [20, 45, 70] }    // Layer 3
                ]
            };
        }
        // Desktop Layout - Wide & Centered
        return {
            viewBox: "0 0 200 100",
            nodeRadius: 3,
            layers: [
                { x: 40, nodes: [20, 40, 60] },
                { x: 100, nodes: [10, 30, 50, 70] },
                { x: 160, nodes: [20, 40, 60] }
            ]
        };
    }, [isMobile]);

    // Generate Nodes with unique IDs
    const nodes = useMemo(() => layers.flatMap((layer, layerIdx) =>
        layer.nodes.map((y, nodeIdx) => ({
            id: `l${layerIdx}-n${nodeIdx}`,
            layer: layerIdx,
            x: layer.x,
            y: y
        }))
    ), [layers]);

    // Generate Connections (Fully connected between adjacent layers)
    const connections = useMemo(() => {
        const conns: { id: string; start: typeof nodes[0]; end: typeof nodes[0] }[] = [];
        for (let l = 0; l < layers.length - 1; l++) {
            const currentLayerNodes = nodes.filter(n => n.layer === l);
            const nextLayerNodes = nodes.filter(n => n.layer === l + 1);

            currentLayerNodes.forEach(startNode => {
                nextLayerNodes.forEach(endNode => {
                    conns.push({
                        id: `${startNode.id}-${endNode.id}`,
                        start: startNode,
                        end: endNode
                    });
                });
            });
        }
        return conns;
    }, [nodes, layers]);

    // Background Particles - Reduced count for performance
    const particles = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        x: Math.random() * (isMobile ? 140 : 200),
        y: Math.random() * (isMobile ? 140 : 100),
        r: Math.random() * 1 + 0.5,
        duration: Math.random() * 10 + 10,
    })), [isMobile]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden">

            <svg className="w-full h-full" viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
                <defs>
                    {/* Clean Gradient for lines */}
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.05)" />
                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.5)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.05)" />
                    </linearGradient>
                </defs>

                {/* Background Particles (Noise) */}
                {particles.map((p) => (
                    <motion.circle
                        key={`p-${p.id}`}
                        cx={p.x}
                        cy={p.y}
                        r={p.r}
                        fill="#A855F7"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            y: [p.y, p.y - 10], // Float up slightly
                            x: [p.x, p.x + (Math.random() * 10 - 5)]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                        style={{ willChange: "opacity, transform" }}
                    />
                ))}

                {/* Network Group with Entrance Animation */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ willChange: "opacity, transform" }}
                >
                    {/* Connections - Minimalist Lines */}
                    {connections.map((conn, i) => (
                        <React.Fragment key={conn.id}>
                            {/* Static faint line for structure */}
                            <line
                                x1={conn.start.x}
                                y1={conn.start.y}
                                x2={conn.end.x}
                                y2={conn.end.y}
                                stroke="rgba(255,255,255,0.03)"
                                strokeWidth="0.5"
                            />

                            {/* Active Pulse Line */}
                            <motion.line
                                x1={conn.start.x}
                                y1={conn.start.y}
                                x2={conn.end.x}
                                y2={conn.end.y}
                                stroke="url(#line-gradient)"
                                strokeWidth="0.5"
                                initial={{ strokeOpacity: 0 }}
                                animate={{
                                    strokeOpacity: [0, 0.8, 0],
                                }}
                                transition={{
                                    duration: 3, // Slower, more elegant
                                    repeat: Infinity,
                                    delay: (conn.start.layer * 0.8) + (Math.random() * 0.5), // More organic delay
                                    ease: "easeInOut"
                                }}
                                style={{ willChange: "stroke-opacity" }}
                            />

                            {/* Traveling Data Packet (Dot) */}
                            <motion.circle
                                r="0.8"
                                fill="#A855F7"
                                opacity="0.9"
                            >
                                <animateMotion
                                    dur="3s" // Slower travel
                                    begin={`${(conn.start.layer * 0.8)}s`}
                                    repeatCount="indefinite"
                                    path={`M ${conn.start.x} ${conn.start.y} L ${conn.end.x} ${conn.end.y}`}
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0;1;0"
                                    dur="3s"
                                    begin={`${(conn.start.layer * 0.8)}s`}
                                    repeatCount="indefinite"
                                />
                            </motion.circle>
                        </React.Fragment>
                    ))}

                    {/* Nodes - Clean Circles */}
                    {nodes.map((node) => (
                        <motion.g key={node.id}>
                            {/* Outer Ring */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={nodeRadius}
                                fill="#050505"
                                stroke="rgba(168, 85, 247, 0.3)"
                                strokeWidth="0.5"
                            />
                            {/* Inner Core */}
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={nodeRadius / 2}
                                fill="#A855F7"
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: node.layer * 0.8, // Sync with connections
                                    ease: "easeInOut"
                                }}
                                style={{ willChange: "opacity, transform" }}
                            />
                        </motion.g>
                    ))}
                </motion.g>
            </svg>
        </div>
    );
};

export default NeuralNetworkVisual;

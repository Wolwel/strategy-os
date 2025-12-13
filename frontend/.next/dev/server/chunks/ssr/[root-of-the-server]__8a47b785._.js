module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/text-animate.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextAnimate",
    ()=>TextAnimate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const staggerTimings = {
    text: 0.06,
    word: 0.05,
    character: 0.03,
    line: 0.06
};
const defaultContainerVariants = {
    hidden: {
        opacity: 1
    },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0,
            staggerChildren: 0.05
        }
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};
const defaultItemVariants = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
};
const defaultItemAnimationVariants = {
    fadeIn: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                opacity: 0,
                y: 20
            },
            show: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.3
                }
            },
            exit: {
                opacity: 0,
                y: 20,
                transition: {
                    duration: 0.3
                }
            }
        }
    },
    blurIn: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                opacity: 0,
                filter: "blur(10px)"
            },
            show: {
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                    duration: 0.3
                }
            },
            exit: {
                opacity: 0,
                filter: "blur(10px)",
                transition: {
                    duration: 0.3
                }
            }
        }
    },
    blurInUp: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                opacity: 0,
                filter: "blur(10px)",
                y: 20
            },
            show: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                    y: {
                        duration: 0.3
                    },
                    opacity: {
                        duration: 0.4
                    },
                    filter: {
                        duration: 0.3
                    }
                }
            },
            exit: {
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
                transition: {
                    y: {
                        duration: 0.3
                    },
                    opacity: {
                        duration: 0.4
                    },
                    filter: {
                        duration: 0.3
                    }
                }
            }
        }
    },
    blurInDown: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                opacity: 0,
                filter: "blur(10px)",
                y: -20
            },
            show: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                    y: {
                        duration: 0.3
                    },
                    opacity: {
                        duration: 0.4
                    },
                    filter: {
                        duration: 0.3
                    }
                }
            }
        }
    },
    slideUp: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                y: 20,
                opacity: 0
            },
            show: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.3
                }
            },
            exit: {
                y: -20,
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            }
        }
    },
    slideDown: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                y: -20,
                opacity: 0
            },
            show: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.3
                }
            },
            exit: {
                y: 20,
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            }
        }
    },
    slideLeft: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                x: 20,
                opacity: 0
            },
            show: {
                x: 0,
                opacity: 1,
                transition: {
                    duration: 0.3
                }
            },
            exit: {
                x: -20,
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            }
        }
    },
    slideRight: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                x: -20,
                opacity: 0
            },
            show: {
                x: 0,
                opacity: 1,
                transition: {
                    duration: 0.3
                }
            },
            exit: {
                x: 20,
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            }
        }
    },
    scaleUp: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                scale: 0.5,
                opacity: 0
            },
            show: {
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 0.3,
                    scale: {
                        type: "spring",
                        damping: 15,
                        stiffness: 300
                    }
                }
            },
            exit: {
                scale: 0.5,
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            }
        }
    },
    scaleDown: {
        container: defaultContainerVariants,
        item: {
            hidden: {
                scale: 1.5,
                opacity: 0
            },
            show: {
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 0.3,
                    scale: {
                        type: "spring",
                        damping: 15,
                        stiffness: 300
                    }
                }
            },
            exit: {
                scale: 1.5,
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            }
        }
    }
};
const TextAnimateBase = ({ children, delay = 0, duration = 0.3, variants, className, segmentClassName, as: Component = "p", startOnView = true, once = false, by = "word", animation = "fadeIn", accessible = true, ...props })=>{
    const MotionComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].create(Component);
    let segments = [];
    switch(by){
        case "word":
            segments = children.split(/(\s+)/);
            break;
        case "character":
            segments = children.split("");
            break;
        case "line":
            segments = children.split("\n");
            break;
        case "text":
        default:
            segments = [
                children
            ];
            break;
    }
    const finalVariants = variants ? {
        container: {
            hidden: {
                opacity: 0
            },
            show: {
                opacity: 1,
                transition: {
                    opacity: {
                        duration: 0.01,
                        delay
                    },
                    delayChildren: delay,
                    staggerChildren: duration / segments.length
                }
            },
            exit: {
                opacity: 0,
                transition: {
                    staggerChildren: duration / segments.length,
                    staggerDirection: -1
                }
            }
        },
        item: variants
    } : animation ? {
        container: {
            ...defaultItemAnimationVariants[animation].container,
            show: {
                ...defaultItemAnimationVariants[animation].container.show,
                transition: {
                    delayChildren: delay,
                    staggerChildren: duration / segments.length
                }
            },
            exit: {
                ...defaultItemAnimationVariants[animation].container.exit,
                transition: {
                    staggerChildren: duration / segments.length,
                    staggerDirection: -1
                }
            }
        },
        item: defaultItemAnimationVariants[animation].item
    } : {
        container: defaultContainerVariants,
        item: defaultItemVariants
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "popLayout",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionComponent, {
            variants: finalVariants.container,
            initial: "hidden",
            whileInView: startOnView ? "show" : undefined,
            animate: startOnView ? undefined : "show",
            exit: "exit",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("whitespace-pre-wrap", className),
            viewport: {
                once
            },
            "aria-label": accessible ? children : undefined,
            ...props,
            children: [
                accessible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/text-animate.tsx",
                    lineNumber: 397,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0)),
                segments.map((segment, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                        variants: finalVariants.item,
                        custom: i * staggerTimings[by],
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(by === "line" ? "block" : "inline-block whitespace-pre", by === "character" && "", segmentClassName),
                        "aria-hidden": accessible ? true : undefined,
                        children: segment
                    }, `${by}-${segment}-${i}`, false, {
                        fileName: "[project]/components/ui/text-animate.tsx",
                        lineNumber: 399,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/text-animate.tsx",
            lineNumber: 386,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/text-animate.tsx",
        lineNumber: 385,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const TextAnimate = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(TextAnimateBase);
}),
"[project]/components/landing/hero-title.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroTitle",
    ()=>HeroTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$text$2d$animate$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/text-animate.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function HeroTitle() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
        className: "text-pretty text-4xl font-semibold tracking-tight sm:text-5xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$text$2d$animate$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextAnimate"], {
                animation: "blurInUp",
                by: "character",
                once: true,
                as: "span",
                children: "Інтелектуальний бізнес-консультант,"
            }, void 0, false, {
                fileName: "[project]/components/landing/hero-title.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$text$2d$animate$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextAnimate"], {
                animation: "blurInUp",
                by: "character",
                once: true,
                as: "span",
                className: "text-muted-foreground",
                children: "який думає як команда"
            }, void 0, false, {
                fileName: "[project]/components/landing/hero-title.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/landing/hero-title.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/landing/section-reveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionReveal",
    ()=>SectionReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function SectionReveal({ children, className, delay = 0, duration = 0.45, y = 14 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(className),
        initial: {
            opacity: 0,
            y
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            amount: 0.25
        },
        transition: {
            duration,
            delay,
            ease: "easeOut"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/landing/section-reveal.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8a47b785._.js.map
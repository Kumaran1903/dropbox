(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_components_Dropbox_564a817d._.js", {

"[project]/src/components/Dropbox/Dropbox.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "btn": "Dropbox-module__yByLYW__btn",
  "disabled": "Dropbox-module__yByLYW__disabled",
  "dropzone": "Dropbox-module__yByLYW__dropzone",
  "message": "Dropbox-module__yByLYW__message",
});
}}),
"[project]/src/components/Dropbox/Dropbox.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Dropbox": (()=>Dropbox)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-dropzone/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-dropzone/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dropbox$2f$Dropbox$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Dropbox/Dropbox.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const Dropbox = ({ session })=>{
    _s();
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Dropbox.useCallback[onDrop]": async (acceptedFiles)=>{
            if (acceptedFiles.length === 0 || uploading) return; // Prevent upload if already uploading
            setUploading(true);
            setMessage("Uploading...");
            const file = acceptedFiles[0];
            const userId = session?.user?.id || session?.user?.email; // Use user ID or email as folder name
            try {
                // ✅ Request presigned URL from backend API with userId
                const response = await fetch("/api/upload-url", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId,
                        fileName: file.name,
                        fileType: file.type
                    })
                });
                if (!response.ok) {
                    throw new Error(`Failed to get upload URL: ${await response.text()}`);
                }
                const { uploadUrl } = await response.json();
                // ✅ Upload file to AWS S3
                const uploadResponse = await fetch(uploadUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type
                    }
                });
                if (uploadResponse.ok) {
                    setMessage("✅ File uploaded successfully!");
                } else {
                    throw new Error("Upload to S3 failed");
                }
            } catch (error) {
                console.error("Upload Error:", error);
                setMessage("❌ Upload failed. Try again.");
            } finally{
                setUploading(false);
                // Hide the message after 2 seconds
                setTimeout({
                    "Dropbox.useCallback[onDrop]": ()=>{
                        setMessage("");
                    }
                }["Dropbox.useCallback[onDrop]"], 2000);
            }
        }
    }["Dropbox.useCallback[onDrop]"], [
        uploading,
        session
    ]); // Prevents re-triggering while uploading
    const { getRootProps, getInputProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDropzone"])({
        onDrop,
        multiple: false,
        disabled: uploading
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: session?.user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ...getRootProps(),
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dropbox$2f$Dropbox$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dropzone} ${uploading ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dropbox$2f$Dropbox$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].disabled : ""}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ...getInputProps(),
                            disabled: uploading
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dropbox/Dropbox.js",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: uploading ? "Uploading..." : "Drag & drop a file here, or click to select one"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dropbox/Dropbox.js",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Dropbox/Dropbox.js",
                    lineNumber: 76,
                    columnNumber: 11
                }, this),
                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dropbox$2f$Dropbox$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].message,
                    children: message
                }, void 0, false, {
                    fileName: "[project]/src/components/Dropbox/Dropbox.js",
                    lineNumber: 87,
                    columnNumber: 23
                }, this),
                " "
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dropbox$2f$Dropbox$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn,
            href: "/login",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Sign up for free"
                }, void 0, false, {
                    fileName: "[project]/src/components/Dropbox/Dropbox.js",
                    lineNumber: 92,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/right_arrow.png",
                    height: 25,
                    width: 25,
                    alt: "arrow"
                }, void 0, false, {
                    fileName: "[project]/src/components/Dropbox/Dropbox.js",
                    lineNumber: 93,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Dropbox/Dropbox.js",
            lineNumber: 91,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Dropbox/Dropbox.js",
        lineNumber: 73,
        columnNumber: 5
    }, this);
};
_s(Dropbox, "DoH09W/EqYbmCOWMmLKJ9gG+zhA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDropzone"]
    ];
});
_c = Dropbox;
var _c;
__turbopack_context__.k.register(_c, "Dropbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_Dropbox_564a817d._.js.map
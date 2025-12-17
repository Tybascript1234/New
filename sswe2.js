/**
 * ZAI Painter Tool - A self-contained, non-intrusive drawing tool.
 * Encapsulated to prevent conflicts with host websites.
 * Version: 1.0
 */
(function() {
    'use strict';

    // 1. CONFIGURATION & UNIQUE NAMESPACE
    const PREFIX = 'z-painter-app-';
    const CONTAINER_ID = PREFIX + 'container';

    // 2. STYLES (Scoped with PREFIX)
    const styles = `
        /* Scoped to prevent body styling conflicts */
        #${CONTAINER_ID} * {
            touch-action: manipulation;
            box-sizing: border-box;
        }
        
        #${CONTAINER_ID} {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            margin: 0;
            padding: 0;
            font-size: 14px;
            font-family: Arial, sans-serif;
            -webkit-tap-highlight-color: transparent;
            pointer-events: none; /* Allow interaction with the page behind */
            z-index: 999999;
        }
        
        #${CONTAINER_ID} > * {
            pointer-events: auto; /* Re-enable interaction for tool elements */
        }
        
        #${CONTAINER_ID} a {
            color: #000;
            text-decoration: none;
        }
        
        .${PREFIX}toolbar {
            user-select: none;
            -webkit-user-select: none;
        }
        
        .${PREFIX}open-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .${PREFIX}open-btn button {
            width: 50px;
            height: 50px;
            border: none;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .${PREFIX}open-btn button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .${PREFIX}toolbar-wrapper {
            z-index: 1000;
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            margin: auto;
            display: none;
            margin-top: 20px;
            justify-content: center;
            width: 100%;
            max-width: 600px;
        }
        
        .${PREFIX}toolbar-main {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            margin: 16px;
        }
        
        .${PREFIX}color-palette {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding: 8px 0;
            background: rgba(0, 0, 0, 0.02);
        }
        
        .${PREFIX}color-palette::-webkit-scrollbar {
            display: none;
        }
        
        .${PREFIX}color-palette div {
            display: flex;
            align-items: center;
            margin: auto;
            width: max-content;
            padding: 0 8px;
        }
        
        .${PREFIX}color-palette div button {
            transition: all 0.2s;
            padding: 16px;
            margin: 0 4px;
            border-radius: 50%;
            border: none;
            outline: none;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            min-width: 24px;
            min-height: 24px;
            flex-shrink: 0;
        }
        
        .${PREFIX}ionicon {
            height: 22px;
            width: 22px;
            opacity: 0.8;
            pointer-events: none;
        }
        
        .${PREFIX}action-bar {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .${PREFIX}control-btn {
            outline-color: #0f6cf8;
            background: transparent;
            border: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0 2px;
            font-size: 15px;
            color: #252525;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .${PREFIX}control-btn:hover {
            background: rgba(0, 0, 0, 0.05);
        }
        
        .${PREFIX}control-btn:active {
            background: rgba(0, 0, 0, 0.1);
            transform: scale(0.95);
        }
        
        .${PREFIX}options-menu {
            opacity: 0;
            transition: all 0.2s ease;
            position: absolute;
            overflow: hidden;
            height: 0;
            width: 0;
            display: flex;
            bottom: 50px;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border-radius: 12px;
            padding: 0;
            z-index: 40;
            align-items: center;
            flex-wrap: wrap;
            max-width: 300px;
        }
        
        #${CONTAINER_ID} .${PREFIX}options-menu.active {
            height: max-content;
            opacity: 1;
            background-color: white;
            width: auto;
            padding: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .${PREFIX}overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 999;
            display: none;
        }
        
        .${PREFIX}mobile-only {
            display: none;
        }
        
        .${PREFIX}toolbar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .${PREFIX}header-actions {
            display: flex;
            align-items: center;
        }
        
        .${PREFIX}color-preview {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 8px;
            border: 2px solid rgba(0, 0, 0, 0.1);
        }
        
        .${PREFIX}size-preview {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: currentColor;
            margin-left: 8px;
            position: relative;
        }
        
        .${PREFIX}size-preview::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
        
        select.${PREFIX}control-btn {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            padding: 0 8px;
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            text-align: center;
            font-size: 14px;
        }
        
        #${PREFIX}canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            touch-action: none;
            display: none;
        }
        
        #${PREFIX}drawing-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            touch-action: none;
        }
        
        @media screen and (max-width: 768px) {
            .${PREFIX}mobile-only {
                display: flex;
            }
            #${CONTAINER_ID} .${PREFIX}options-menu {
                transition: none;
            }
            .${PREFIX}toolbar-wrapper {
                z-index: 1000;
                position: fixed;
                left: 50%;
                bottom: 0;
                top: auto;
                transform: translateX(-50%);
                margin: auto;
                display: none;
                margin-top: 20px;
                justify-content: center;
                width: 100%;
                max-width: 600px;
            }
                
            .${PREFIX}toolbar-main {
                width: 100%;
                margin: 0;
                border-radius: 16px 16px 0 0;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                padding-bottom: 57px;
            }
                
            #${CONTAINER_ID} .${PREFIX}options-menu.active {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                right: 0;
                height: 100%;
                max-width: 100%;
                border-radius: 16px 16px 0 0;
                box-shadow: none;
                justify-content: space-around;
                border: none;
            }
                
            .${PREFIX}color-palette div {
                padding: 0 16px;
            }
                
            .${PREFIX}color-palette div button {
                padding: 20px;
                margin: 0 6px;
            }
            #${CONTAINER_ID} .${PREFIX}action-bar {
                display: none;
            }
        }
        
        /* Animation for buttons */
        @keyframes ${PREFIX}buttonClick {
            0% { transform: scale(1); }
            50% { transform: scale(0.9); }
            100% { transform: scale(1); }
        }
        
        .${PREFIX}button-click {
            animation: ${PREFIX}buttonClick 0.3s ease;
        }
    `;

    // 3. CORE APPLICATION LOGIC
    let canvas, ctx, isDrawing = false;
    let currentColor = '#000000';
    let currentLineWidth = 4;
    let lastX = 0, lastY = 0;
    let drawingHistory = [];
    let historyIndex = -1;
    let boxVisible = false;
    let undoInterval, redoInterval;

    const elements = {};

    // Function to inject styles into the document head
    function injectStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.id = PREFIX + 'styles';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // Function to create all DOM elements
    function createAppElements() {
        // Main container
        const container = document.createElement('div');
        container.id = CONTAINER_ID;

        // Open button
        const openBtn = document.createElement('div');
        openBtn.className = `${PREFIX}open-btn ${PREFIX}toolbar`;
        openBtn.innerHTML = `
            <button class="${PREFIX}control-btn" title="Open Painter (Ctrl+B)">
                <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                    <path d="M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
                    <circle cx="144" cy="208" r="32"/>
                    <circle cx="152" cy="311" r="32"/>
                    <circle cx="224" cy="144" r="32"/>
                    <circle cx="256" cy="367" r="48"/>
                    <circle cx="328" cy="144" r="32"/>
                </svg>
            </button>
        `;
        elements.openBtn = openBtn;

        // Canvas container
        const canvasContainer = document.createElement('div');
        canvasContainer.id = PREFIX + 'canvas-container';
        canvasContainer.innerHTML = `<canvas id="${PREFIX}drawing-canvas"></canvas>`;
        elements.canvasContainer = canvasContainer;

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = PREFIX + 'overlay';
        overlay.style.zIndex = '998';
        elements.overlay = overlay;

        // Main toolbar wrapper
        const toolbarWrapper = document.createElement('div');
        toolbarWrapper.className = `${PREFIX}toolbar-wrapper ${PREFIX}box`;
        toolbarWrapper.id = PREFIX + 'box';
        
        // Toolbar main content
        const toolbarMain = document.createElement('div');
        toolbarMain.className = PREFIX + 'toolbar-main';

        // Toolbar header
        const toolbarHeader = document.createElement('div');
        toolbarHeader.className = PREFIX + 'toolbar-header';
        toolbarHeader.innerHTML = `
            <div class="${PREFIX}header-actions">
                <button class="${PREFIX}control-btn" id="${PREFIX}menu-toggle-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                        <circle cx="256" cy="256" r="48"/>
                        <circle cx="256" cy="416" r="48"/>
                        <circle cx="256" cy="96" r="48"/>
                    </svg>
                </button>
                <div class="${PREFIX}color-preview" id="${PREFIX}color-preview" style="background: #000;"></div>
                <div class="${PREFIX}size-preview" id="${PREFIX}size-preview" style="transform: scale(0.3);"></div>
            </div>
            <div class="${PREFIX}options-menu ${PREFIX}toolbar" id="${PREFIX}options-menu">
                <button class="${PREFIX}control-btn ${PREFIX}mobile-only" id="${PREFIX}menu-close-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/>
                    </svg>
                </button>
                <button class="${PREFIX}control-btn" id="${PREFIX}clear-btn" title="Clear">
                    <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                        <path d="M400 148l-21.12-24.57A191.43 191.43 0 00240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 00181.07-128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
                        <path d="M464 97.42V208a16 16 0 01-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"/>
                    </svg>
                </button>
                <button class="${PREFIX}control-btn" id="${PREFIX}download-btn" title="Download">
                    <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512"><path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                </button>
                <select class="${PREFIX}control-btn" id="${PREFIX}brush-size-select" title="Brush Size">
                    <option value="2">2</option>
                    <option value="4" selected>4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                </select>
                <button class="${PREFIX}control-btn ${PREFIX}mobile-only" id="${PREFIX}undo-btn-mobile" title="Undo">
                    <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/>
                    </svg>
                </button>
                <button class="${PREFIX}control-btn ${PREFIX}mobile-only" id="${PREFIX}redo-btn-mobile" title="Redo">
                    <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/>
                    </svg>
                </button>
            </div>
            <button class="${PREFIX}control-btn" id="${PREFIX}close-btn" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"/>
                </svg>
            </button>
        `;
        
        // Color palette
        const colorPalette = document.createElement('div');
        colorPalette.className = PREFIX + 'color-palette';
        colorPalette.id = PREFIX + 'colors-container';
        colorPalette.innerHTML = `
            <div>
                <button data-color="#000000" style="background: #000000;" title="Black"></button>
                <button data-color="#f12020" style="background: #f12020;" title="Red"></button>
                <button data-color="#0faef8" style="background: #0faef8;" title="Blue"></button>
                <button data-color="#11fd87" style="background: #11fd87;" title="Green"></button>
                <button data-color="#b642fa" style="background: #b642fa;" title="Purple"></button>
                <button data-color="#11f3f3" style="background: #11f3f3;" title="Cyan"></button>
                <button data-color="#ffc011" style="background: #ffc011;" title="Yellow"></button>
                <button data-color="#f262ff" style="background: #f262ff;" title="Pink"></button>
                <button data-color="#e7ff14" style="background: #e7ff14;" title="Lime"></button>
                <button data-color="#ffffff" style="background: #ffffff; border: 1px solid #ccc;" title="White"></button>
            </div>
        `;

        // Action bar (for desktop)
        const actionBar = document.createElement('div');
        actionBar.className = PREFIX + 'action-bar';
        actionBar.innerHTML = `
            <button class="${PREFIX}control-btn" id="${PREFIX}undo-btn" title="Undo">
                <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/>
                </svg>
            </button>
            <button class="${PREFIX}control-btn" id="${PREFIX}redo-btn" title="Redo">
                <svg xmlns="http://www.w3.org/2000/svg" class="${PREFIX}ionicon" viewBox="0 0 512 512">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/>
                </svg>
            </button>
        `;

        // Assemble the structure
        toolbarMain.appendChild(toolbarHeader);
        toolbarMain.appendChild(colorPalette);
        toolbarMain.appendChild(actionBar);
        toolbarWrapper.appendChild(toolbarMain);

        container.appendChild(openBtn);
        container.appendChild(canvasContainer);
        container.appendChild(overlay);
        container.appendChild(toolbarWrapper);
        
        document.body.appendChild(container);

        // Store element references
        elements.canvas = document.getElementById(PREFIX + 'drawing-canvas');
        elements.menuToggleBtn = document.getElementById(PREFIX + 'menu-toggle-btn');
        elements.menuCloseBtn = document.getElementById(PREFIX + 'menu-close-btn');
        elements.optionsMenu = document.getElementById(PREFIX + 'options-menu');
        elements.closeBtn = document.getElementById(PREFIX + 'close-btn');
        elements.colorPreview = document.getElementById(PREFIX + 'color-preview');
        elements.sizePreview = document.getElementById(PREFIX + 'size-preview');
        elements.brushSizeSelect = document.getElementById(PREFIX + 'brush-size-select');
        elements.clearBtn = document.getElementById(PREFIX + 'clear-btn');
        elements.downloadBtn = document.getElementById(PREFIX + 'download-btn');
        elements.undoBtn = document.getElementById(PREFIX + 'undo-btn');
        elements.redoBtn = document.getElementById(PREFIX + 'redo-btn');
        elements.undoBtnMobile = document.getElementById(PREFIX + 'undo-btn-mobile');
        elements.redoBtnMobile = document.getElementById(PREFIX + 'redo-btn-mobile');
        elements.colorButtons = colorPalette.querySelectorAll('button[data-color]');
        elements.box = toolbarWrapper;
    }

    // Function to set up event listeners
    function setupEventListeners() {
        // Canvas events
        elements.canvas.addEventListener('mousedown', startDrawing);
        elements.canvas.addEventListener('mousemove', draw);
        elements.canvas.addEventListener('mouseup', stopDrawing);
        elements.canvas.addEventListener('mouseout', stopDrawing);
        
        elements.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startDrawing(e);
        });
        
        elements.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            draw(e);
        });
        
        elements.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            stopDrawing();
        });

        // Toolbar events
        elements.openBtn.addEventListener('click', toggleBox);
        elements.closeBtn.addEventListener('click', closeBox);
        elements.overlay.addEventListener('click', closeBox);
        elements.menuToggleBtn.addEventListener('click', toggleMenu);
        elements.menuCloseBtn.addEventListener('click', toggleMenu);

        elements.clearBtn.addEventListener('click', clearDrawing);
        elements.downloadBtn.addEventListener('click', downloadCanvas);
        elements.brushSizeSelect.addEventListener('change', (e) => setLineWidth(e.target.value));

        // Undo/Redo events
        elements.undoBtn.addEventListener('mousedown', startUndo);
        elements.undoBtn.addEventListener('mouseup', stopUndo);
        elements.undoBtn.addEventListener('touchstart', startUndo);
        elements.undoBtn.addEventListener('touchend', stopUndo);

        elements.redoBtn.addEventListener('mousedown', startRedo);
        elements.redoBtn.addEventListener('mouseup', stopRedo);
        elements.redoBtn.addEventListener('touchstart', startRedo);
        elements.redoBtn.addEventListener('touchend', stopRedo);

        elements.undoBtnMobile.addEventListener('mousedown', startUndo);
        elements.undoBtnMobile.addEventListener('mouseup', stopUndo);
        elements.undoBtnMobile.addEventListener('touchstart', startUndo);
        elements.undoBtnMobile.addEventListener('touchend', stopUndo);

        elements.redoBtnMobile.addEventListener('mousedown', startRedo);
        elements.redoBtnMobile.addEventListener('mouseup', stopRedo);
        elements.redoBtnMobile.addEventListener('touchstart', startRedo);
        elements.redoBtnMobile.addEventListener('touchend', stopRedo);

        // Color palette events
        elements.colorButtons.forEach(button => {
            button.addEventListener('click', () => {
                setColor(button.dataset.color, button);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); }
            if (e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); }
            if (e.ctrlKey && e.key.toLowerCase() === 'b') { e.preventDefault(); toggleBox(); }
            if (e.key === 'Escape') { closeBox(); }
        });

        // Window resize
        window.addEventListener('resize', resizeCanvas);
    }

    // --- Drawing Logic Functions ---

    function resizeCanvas() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        elements.canvas.width = width * devicePixelRatio;
        elements.canvas.height = height * devicePixelRatio;
        
        elements.canvas.style.width = width + 'px';
        elements.canvas.style.height = height + 'px';
        
        ctx.scale(devicePixelRatio, devicePixelRatio);
        
        redrawCanvas();
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
        if (drawingHistory.length > 0 && historyIndex >= 0) {
            ctx.putImageData(drawingHistory[historyIndex], 0, 0);
        }
    }

    function saveState() {
        if (historyIndex < drawingHistory.length - 1) {
            drawingHistory = drawingHistory.slice(0, historyIndex + 1);
        }
        if (drawingHistory.length >= 50) {
            drawingHistory.shift();
            historyIndex--;
        }
        const imageData = ctx.getImageData(0, 0, elements.canvas.width, elements.canvas.height);
        drawingHistory.push(imageData);
        historyIndex++;
    }

    function startDrawing(e) {
        if (!boxVisible) return;
        isDrawing = true;
        const pos = getPosition(e);
        lastX = pos.x;
        lastY = pos.y;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentLineWidth;
        
        saveState();
    }

    function draw(e) {
        if (!isDrawing || !boxVisible) return;
        
        const pos = getPosition(e);
        const x = pos.x;
        const y = pos.y;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    }

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
            saveState();
        }
    }

    function getPosition(e) {
        const rect = elements.canvas.getBoundingClientRect();
        const scaleX = elements.canvas.width / rect.width;
        const scaleY = elements.canvas.height / rect.height;
        
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: (clientX - rect.left) * scaleX / (window.devicePixelRatio || 1),
            y: (clientY - rect.top) * scaleY / (window.devicePixelRatio || 1)
        };
    }

    function setColor(color, button) {
        currentColor = color;
        elements.colorPreview.style.backgroundColor = color;
        if (button) {
            button.classList.add(PREFIX + 'button-click');
            setTimeout(() => button.classList.remove(PREFIX + 'button-click'), 300);
        }
    }

    function setLineWidth(width) {
        currentLineWidth = parseInt(width, 10);
        elements.sizePreview.style.transform = `scale(${currentLineWidth / 12})`;
    }

    function clearDrawing() {
        ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
        drawingHistory = [];
        historyIndex = -1;
        saveState();
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            redrawCanvas();
            return true;
        }
        return false;
    }

    function redo() {
        if (historyIndex < drawingHistory.length - 1) {
            historyIndex++;
            redrawCanvas();
            return true;
        }
        return false;
    }

    function startUndo() { undo(); undoInterval = setInterval(undo, 100); }
    function stopUndo() { clearInterval(undoInterval); }
    function startRedo() { redo(); redoInterval = setInterval(redo, 100); }
    function stopRedo() { clearInterval(redoInterval); }

    function downloadCanvas() {
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = elements.canvas.toDataURL('image/png');
        link.click();
    }

    // --- UI Control Functions ---
    
    function toggleMenu() {
        elements.optionsMenu.classList.toggle('active');
    }

    function toggleBox() {
        if (elements.box.style.display === 'none' || !elements.box.style.display) {
            elements.box.style.display = 'flex';
            elements.overlay.style.display = 'block';
            elements.openBtn.style.display = 'none';
            elements.canvasContainer.style.display = 'block';
            boxVisible = true;
        } else {
            closeBox();
        }
    }

    function closeBox() {
        elements.box.style.display = 'none';
        elements.overlay.style.display = 'none';
        elements.openBtn.style.display = 'flex';
        elements.canvasContainer.style.display = 'none';
        elements.optionsMenu.classList.remove('active');
        boxVisible = false;
        clearDrawing();
    }

    // --- INITIALIZATION ---
    function init() {
        injectStyles();
        createAppElements();
        
        ctx = elements.canvas.getContext('2d');
        
        setupEventListeners();
        resizeCanvas();
        setLineWidth(currentLineWidth);
        setColor(currentColor);
        saveState(); // Save initial blank state
    }

    // Start the application when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

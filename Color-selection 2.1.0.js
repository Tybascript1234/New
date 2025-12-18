(function() {
    // إنشاء معرف فريد لمنع التداخل مع العناصر الأخرى في الصفحة
    const uniqueId = 'painter-tool-' + Math.random().toString(36).substr(2, 9);
    
    // إنشاء جميع عناصر HTML داخل JavaScript
    const createPainterTool = function() {
        // إنشاء عنصر div رئيسي لتطبيق الرسم
        const painterApp = document.createElement('div');
        painterApp.id = uniqueId;
        
        // إضافة HTML كامل داخل العنصر
        painterApp.innerHTML = `
            <style>
                #${uniqueId} * {
                    touch-action: manipulation;
                    box-sizing: border-box;
                }
                
                #${uniqueId} {
                    width: 100%;
                    height: 100vh;
                    margin: 0;
                    padding: 0;
                    font-size: 14px;
                    font-family: Arial, sans-serif;
                    -webkit-tap-highlight-color: transparent;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 999999;
                    pointer-events: none;
                }
                
                #${uniqueId} a {
                    color: #000;
                    text-decoration: none;
                }
                
                #${uniqueId} .painter-toolbar {
                    user-select: none;
                    -webkit-user-select: none;
                }
                
                #${uniqueId} .painter-open-btn {
                    position: fixed;
                    top: 0;
                    right: 0;
                    margin: 16px;
                    z-index: 1000;
                    pointer-events: auto;
                }
                
                #${uniqueId} .painter-open-btn button {
                    width: 40px;
                    height: 40px;
                    border: none;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: auto;
                }
                
                #${uniqueId} .painter-main-container {
                    z-index: 1000;
                    position: fixed;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    margin: auto;
                    display: none;
                    margin-top: 20px;
                    justify-content: center;
                    width: max-content;
                    // max-width: 600px;
                    pointer-events: auto;
                }
                
                #${uniqueId} .painter-toolbox {
                    display: flex;
                    flex-direction: column;
                    background-color: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    margin: 16px;
                }
                
                #${uniqueId} .painter-colors-section {
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    padding: 8px 0;
                    background: rgba(0, 0, 0, 0.02);
                }
                
                #${uniqueId} .painter-colors-section::-webkit-scrollbar {
                    display: none;
                }
                
                #${uniqueId} .painter-colors-wrapper {
                    display: flex;
                    align-items: center;
                    margin: auto;
                    width: max-content;
                    padding: 0 8px;
                }
                
                #${uniqueId} .painter-color-btn {
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
                    pointer-events: auto;
                }
                
                #${uniqueId} .painter-icon {
                    height: 22px;
                    width: 22px;
                    opacity: 0.8;
                    pointer-events: none;
                }
                
                #${uniqueId} .painter-actions-bottom {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px;
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                }
                
                #${uniqueId} .painter-action-btn {
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
                    pointer-events: auto;
                }
                
                #${uniqueId} .painter-action-btn:hover {
                    background: rgba(0, 0, 0, 0.05);
                }
                
                #${uniqueId} .painter-action-btn:active {
                    background: rgba(0, 0, 0, 0.1);
                    transform: scale(0.95);
                }
                
                #${uniqueId} .painter-extended-menu {
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
                
                #${uniqueId} .painter-extended-menu.active {
                    height: max-content;
                    opacity: 1;
                    background-color: white;
                    width: auto;
                    padding: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                
                #${uniqueId} .painter-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    // background: rgba(0, 0, 0, 0.3);
                    z-index: -1;
                    display: none;
                    pointer-events: auto;
                }
                
                #${uniqueId} .painter-mobile-only {
                    display: none;
                }
                
                #${uniqueId} .painter-toolbox-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 12px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }
                
                #${uniqueId} .painter-toolbox-actions {
                    display: flex;
                    align-items: center;
                }
                
                #${uniqueId} .painter-color-preview {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-right: 8px;
                    border: 2px solid rgba(0, 0, 0, 0.1);
                }
                
                #${uniqueId} .painter-size-preview {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: currentColor;
                    margin-left: 8px;
                    position: relative;
                }
                
                #${uniqueId} .painter-size-preview::after {
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
                
                #${uniqueId} select.painter-action-btn {
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
                
                #${uniqueId} .painter-canvas-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    touch-action: none;
                    display: none;
                    pointer-events: auto;
                }
                
                #${uniqueId} .painter-drawing-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    touch-action: none;
                }
                
                @media screen and (max-width: 768px) {
                    #${uniqueId} .painter-mobile-only {
                        display: flex;
                    }
                    
                    #${uniqueId} .painter-extended-menu {
                        transition: none;
                    }
                    
                    #${uniqueId} .painter-main-container {
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
                    
                    #${uniqueId} .painter-toolbox {
                        width: 100%;
                        margin: 0;
                        border-radius: 16px 16px 0 0;
                        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                        padding-bottom: 57px;
                    }
                    
                    #${uniqueId} .painter-extended-menu.active {
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
                    
                    #${uniqueId} .painter-colors-wrapper {
                        padding: 0 16px;
                    }
                    
                    #${uniqueId} .painter-color-btn {
                        padding: 20px;
                        margin: 0 6px;
                    }
                    
                    #${uniqueId} .painter-actions-bottom {
                        display: none;
                    }
                }
                
                #${uniqueId} .painter-brand {
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    pointer-events: none;
                }
                
                /* Animation for buttons */
                @keyframes painterButtonClick {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                
                #${uniqueId} .painter-button-click {
                    animation: painterButtonClick 0.3s ease;
                }
            </style>
            
            <div class="painter-open-btn painter-toolbar" id="${uniqueId}-showBtn">
                <button class="painter-action-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                        <path d="M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
                        <circle cx="144" cy="208" r="32"/>
                        <circle cx="152" cy="311" r="32"/>
                        <circle cx="224" cy="144" r="32"/>
                        <circle cx="256" cy="367" r="48"/>
                        <circle cx="328" cy="144" r="32"/>
                    </svg>
                </button>
            </div>
            
            <div class="painter-canvas-container" id="${uniqueId}-canvas-container">
                <canvas class="painter-drawing-canvas" id="${uniqueId}-drawing-canvas"></canvas>
            </div>
            
            <div class="painter-overlay" id="${uniqueId}-overlay"></div>
            
            <div class="painter-main-container painter-toolbar" id="${uniqueId}-box">
                <div class="painter-toolbox">
                    <div class="painter-toolbox-header">
                        <div class="painter-toolbox-actions">
                            <button onclick="painterToggleMenu('${uniqueId}')" class="painter-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                    <circle cx="256" cy="256" r="48"/>
                                    <circle cx="256" cy="416" r="48"/>
                                    <circle cx="256" cy="96" r="48"/>
                                </svg>
                            </button>
                            
                            <div class="painter-color-preview" id="${uniqueId}-colorPreview" style="background: #000;"></div>
                            <div class="painter-size-preview" id="${uniqueId}-sizePreview" style="transform: scale(0.3);"></div>
                        </div>
                        
                        <div class="painter-extended-menu painter-toolbar" id="${uniqueId}-menu">
                            <button class="painter-action-btn painter-mobile-only" onclick="painterToggleMenu('${uniqueId}')">
                                <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/>
                                </svg>
                            </button>
                            <button onclick="painterClearDrawing('${uniqueId}')" class="painter-action-btn" title="Clear">
                                <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                    <path d="M400 148l-21.12-24.57A191.43 191.43 0 00240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 00181.07-128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
                                    <path d="M464 97.42V208a16 16 0 01-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"/>
                                </svg>
                            </button>
                            <button class="painter-action-btn" id="${uniqueId}-downloadBtn" title="Download">
                                <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512"><path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                            </button>
                            <select class="painter-action-btn" onchange="painterSetLineWidth('${uniqueId}', this.value)" title="Brush Size">
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
                            <button class="painter-action-btn painter-mobile-only" onmousedown="painterStartUndo('${uniqueId}')" onmouseup="painterStopUndo('${uniqueId}')" ontouchstart="painterStartUndo('${uniqueId}')" ontouchend="painterStopUndo('${uniqueId}')" title="Undo">
                                <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/>
                                </svg>
                            </button>
                            <button class="painter-action-btn painter-mobile-only" onmousedown="painterStartRedo('${uniqueId}')" onmouseup="painterStopRedo('${uniqueId}')" ontouchstart="painterStartRedo('${uniqueId}')" ontouchend="painterStopRedo('${uniqueId}')" title="Redo">
                                <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/>
                                </svg>
                            </button>
                        </div>
                        
                        <button class="painter-action-btn" title="Close" onclick="painterCloseBox('${uniqueId}')" id="${uniqueId}-closeBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="painter-colors-section" id="${uniqueId}-colorsContainer">
                        <div class="painter-colors-wrapper">
                            <button onclick="painterSetColor('${uniqueId}', '#000000', this)" class="painter-color-btn" style="background: #000000;" title="Black"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#f12020', this)" class="painter-color-btn" style="background: #f12020;" title="Red"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#0faef8', this)" class="painter-color-btn" style="background: #0faef8;" title="Blue"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#11fd87', this)" class="painter-color-btn" style="background: #11fd87;" title="Green"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#b642fa', this)" class="painter-color-btn" style="background: #b642fa;" title="Purple"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#11f3f3', this)" class="painter-color-btn" style="background: #11f3f3;" title="Cyan"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#ffc011', this)" class="painter-color-btn" style="background: #ffc011;" title="Yellow"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#f262ff', this)" class="painter-color-btn" style="background: #f262ff;" title="Pink"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#e7ff14', this)" class="painter-color-btn" style="background: #e7ff14;" title="Lime"></button>
                            <button onclick="painterSetColor('${uniqueId}', '#ffffff', this)" class="painter-color-btn" style="background: #ffffff; border: 1px solid #ccc;" title="White"></button>
                        </div>
                    </div>
                    
                    <div class="painter-actions-bottom">
                        <button class="painter-action-btn" onmousedown="painterStartUndo('${uniqueId}')" onmouseup="painterStopUndo('${uniqueId}')" ontouchstart="painterStartUndo('${uniqueId}')" ontouchend="painterStopUndo('${uniqueId}')" title="Undo">
                            <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/>
                            </svg>
                        </button>
                        <button class="painter-action-btn" onmousedown="painterStartRedo('${uniqueId}')" onmouseup="painterStopRedo('${uniqueId}')" ontouchstart="painterStartRedo('${uniqueId}')" ontouchend="painterStopRedo('${uniqueId}')" title="Redo">
                            <svg xmlns="http://www.w3.org/2000/svg" class="painter-icon" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة العنصر إلى body
        document.body.appendChild(painterApp);
        
        // تهيئة متغيرات حالة الرسم
        const state = {
            isDrawing: false,
            currentColor: '#000000',
            currentLineWidth: 4,
            lastX: 0,
            lastY: 0,
            drawingHistory: [],
            historyIndex: -1,
            boxVisible: false,
            undoInterval: null,
            redoInterval: null
        };
        
        // الحصول على عناصر DOM
        const canvas = document.getElementById(`${uniqueId}-drawing-canvas`);
        const ctx = canvas.getContext('2d');
        const canvasContainer = document.getElementById(`${uniqueId}-canvas-container`);
        const colorsContainer = document.getElementById(`${uniqueId}-colorsContainer`);
        
        // تهيئة حجم canvas
        function resizeCanvas() {
            const devicePixelRatio = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            canvas.width = width * devicePixelRatio;
            canvas.height = height * devicePixelRatio;
            
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            ctx.scale(devicePixelRatio, devicePixelRatio);
            
            redrawCanvas();
        }
        
        // إعادة رسم canvas من التاريخ
        function redrawCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (state.drawingHistory.length > 0 && state.historyIndex >= 0) {
                ctx.putImageData(state.drawingHistory[state.historyIndex], 0, 0);
            }
        }
        
        // حفظ حالة canvas الحالية إلى التاريخ
        function saveState() {
            // إزالة أي حالات بعد الفهرس الحالي (لإعادة التنفيذ)
            if (state.historyIndex < state.drawingHistory.length - 1) {
                state.drawingHistory = state.drawingHistory.slice(0, state.historyIndex + 1);
            }
            
            // الحد من التاريخ إلى 50 حالة لمنع مشاكل الذاكرة
            if (state.drawingHistory.length >= 50) {
                state.drawingHistory.shift();
                state.historyIndex--;
            }
            
            // حفظ الحالة الحالية
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            state.drawingHistory.push(imageData);
            state.historyIndex++;
        }
        
        // بدء الرسم
        function startDrawing(e) {
            if (!state.boxVisible) return;
            
            state.isDrawing = true;
            const pos = getPosition(e);
            state.lastX = pos.x;
            state.lastY = pos.y;
            
            // بدء مسار جديد
            ctx.beginPath();
            ctx.moveTo(state.lastX, state.lastY);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = state.currentColor;
            ctx.lineWidth = state.currentLineWidth;
            
            // حفظ الحالة الأولية
            saveState();
        }
        
        // الرسم
        function draw(e) {
            if (!state.isDrawing || !state.boxVisible) return;
            
            const pos = getPosition(e);
            const x = pos.x;
            const y = pos.y;
            
            // رسم خط سلس
            ctx.lineTo(x, y);
            ctx.stroke();
            
            state.lastX = x;
            state.lastY = y;
        }
        
        // إيقاف الرسم
        function stopDrawing() {
            if (state.isDrawing) {
                state.isDrawing = false;
                ctx.closePath();
                // حفظ الحالة النهائية
                saveState();
            }
        }
        
        // الحصول على الموضع من الحدث (ماوس أو لمس)
        function getPosition(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            let clientX, clientY;
            
            if (e.touches) {
                // حدث اللمس
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                // حدث الماوس
                clientX = e.clientX;
                clientY = e.clientY;
            }
            
            return {
                x: (clientX - rect.left) * scaleX / (window.devicePixelRatio || 1),
                y: (clientY - rect.top) * scaleY / (window.devicePixelRatio || 1)
            };
        }
        
        // تعيين لون الرسم
        function setColor(color, button) {
            state.currentColor = color;
            document.getElementById(`${uniqueId}-colorPreview`).style.backgroundColor = color;
            
            // إضافة تأثير النقر على الزر
            if (button) {
                button.classList.add('painter-button-click');
                setTimeout(() => {
                    button.classList.remove('painter-button-click');
                }, 300);
            }
        }
        
        // تعيين عرض الخط
        function setLineWidth(width) {
            state.currentLineWidth = parseInt(width, 10);
            document.getElementById(`${uniqueId}-sizePreview`).style.transform = `scale(${state.currentLineWidth / 12})`;
        }
        
        // مسح canvas
        function clearDrawing() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            state.drawingHistory = [];
            state.historyIndex = -1;
            saveState();
        }
        
        // التراجع عن الإجراء الأخير
        function undo() {
            if (state.historyIndex > 0) {
                state.historyIndex--;
                redrawCanvas();
                return true;
            }
            return false;
        }
        
        // إعادة الإجراء الملغى
        function redo() {
            if (state.historyIndex < state.drawingHistory.length - 1) {
                state.historyIndex++;
                redrawCanvas();
                return true;
            }
            return false;
        }
        
        // التراجع المستمر
        function startUndo() {
            undo();
            state.undoInterval = setInterval(undo, 100);
        }
        
        function stopUndo() {
            clearInterval(state.undoInterval);
        }
        
        // الإعادة المستمرة
        function startRedo() {
            redo();
            state.redoInterval = setInterval(redo, 100);
        }
        
        function stopRedo() {
            clearInterval(state.redoInterval);
        }
        
        // تنزيل canvas كصورة
        function downloadCanvas() {
            const link = document.createElement('a');
            link.download = 'drawing.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
        
        // وظائف تبديل شريط الأدوات
        function toggleMenu() {
            const menu = document.getElementById(`${uniqueId}-menu`);
            menu.classList.toggle("active");
        }
        
        function toggleBox() {
            const box = document.getElementById(`${uniqueId}-box`);
            const overlay = document.getElementById(`${uniqueId}-overlay`);
            const showBtn = document.getElementById(`${uniqueId}-showBtn`);
            
            if (box.style.display === 'none' || box.style.display === '') {
                box.style.display = 'flex';
                overlay.style.display = 'block';
                showBtn.style.display = 'none';
                canvasContainer.style.display = 'block';
                state.boxVisible = true;
            } else {
                box.style.display = 'none';
                overlay.style.display = 'none';
                showBtn.style.display = 'flex';
                canvasContainer.style.display = 'none';
                state.boxVisible = false;
                // مسح الرسم عند إخفاء الصندوق
                clearDrawing();
            }
        }
        
        function closeBox() {
            const box = document.getElementById(`${uniqueId}-box`);
            const overlay = document.getElementById(`${uniqueId}-overlay`);
            const showBtn = document.getElementById(`${uniqueId}-showBtn`);
            const menu = document.getElementById(`${uniqueId}-menu`);
            
            box.style.display = 'none';
            overlay.style.display = 'none';
            showBtn.style.display = 'flex';
            canvasContainer.style.display = 'none';
            menu.classList.remove("active");
            state.boxVisible = false;
            // مسح الرسم عند إغلاق الصندوق
            clearDrawing();
        }
        
        // تفعيل التمرير الأفقي للألوان على أجهزة اللمس
        let isScrolling = false;
        let startX = 0;
        let scrollLeft = 0;
        
        colorsContainer.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - colorsContainer.offsetLeft;
            scrollLeft = colorsContainer.scrollLeft;
        });
        
        colorsContainer.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - colorsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            colorsContainer.scrollLeft = scrollLeft - walk;
        });
        
        colorsContainer.addEventListener('touchend', () => {
            isScrolling = false;
        });
        
        // مستمعي الأحداث
        function initEventListeners() {
            // أحداث canvas
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
            
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startDrawing(e);
            });
            
            canvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
                draw(e);
            });
            
            canvas.addEventListener('touchend', (e) => {
                e.preventDefault();
                stopDrawing();
            });
            
            // أحداث شريط الأدوات
            document.getElementById(`${uniqueId}-showBtn`).addEventListener('click', toggleBox);
            document.getElementById(`${uniqueId}-closeBtn`).addEventListener('click', closeBox);
            document.getElementById(`${uniqueId}-overlay`).addEventListener('click', closeBox);
            
            document.getElementById(`${uniqueId}-downloadBtn`).addEventListener('click', downloadCanvas);
            
            // اختصارات لوحة المفاتيح
            document.addEventListener('keydown', (e) => {
                // Ctrl+Z للتراجع
                if (e.ctrlKey && e.key === 'z') {
                    e.preventDefault();
                    undo();
                }
                
                // Ctrl+Y للإعادة
                if (e.ctrlKey && e.key === 'y') {
                    e.preventDefault();
                    redo();
                }
                
                // Ctrl+B لتبديل شريط الأدوات
                if (e.ctrlKey && e.key.toLowerCase() === 'b') {
                    e.preventDefault();
                    toggleBox();
                }
                
                // Escape لإغلاق شريط الأدوات
                if (e.key === 'Escape') {
                    closeBox();
                }
            });
            
            // تغيير حجم النافذة
            window.addEventListener('resize', () => {
                resizeCanvas();
            });
        }
        
        // تهيئة
        function init() {
            resizeCanvas();
            initEventListeners();
            setLineWidth(state.currentLineWidth); // تهيئة معاينة الحجم
            setColor(state.currentColor); // تهيئة معاينة اللون
        }
        
        // بدء التطبيق
        init();
        
        // جعل الوظائف متاحة عالمياً
        window[`painterSetColor_${uniqueId}`] = setColor;
        window[`painterSetLineWidth_${uniqueId}`] = setLineWidth;
        window[`painterClearDrawing_${uniqueId}`] = clearDrawing;
        window[`painterStartUndo_${uniqueId}`] = startUndo;
        window[`painterStopUndo_${uniqueId}`] = stopUndo;
        window[`painterStartRedo_${uniqueId}`] = startRedo;
        window[`painterStopRedo_${uniqueId}`] = stopRedo;
        window[`painterToggleMenu_${uniqueId}`] = toggleMenu;
        window[`painterCloseBox_${uniqueId}`] = closeBox;
        
        // وظائف واجهة بسيطة
        return {
            open: toggleBox,
            close: closeBox,
            clear: clearDrawing,
            setColor: setColor,
            setLineWidth: setLineWidth
        };
    };
    
    // إنشاء واجهة API عالمية
    if (!window.PainterTool) {
        window.PainterTool = {};
    }
    
    // إنشاء أداة الرسم
    const painterInstance = createPainterTool();
    
    // جعل الوظائف متاحة عبر المعرف الفريد
    window.PainterTool[uniqueId] = painterInstance;
    
    // وظائف عامة تستخدم المعرف
    window.painterSetColor = function(id, color, button) {
        if (window[`painterSetColor_${id}`]) {
            window[`painterSetColor_${id}`](color, button);
        }
    };
    
    window.painterSetLineWidth = function(id, width) {
        if (window[`painterSetLineWidth_${id}`]) {
            window[`painterSetLineWidth_${id}`](width);
        }
    };
    
    window.painterClearDrawing = function(id) {
        if (window[`painterClearDrawing_${id}`]) {
            window[`painterClearDrawing_${id}`]();
        }
    };
    
    window.painterStartUndo = function(id) {
        if (window[`painterStartUndo_${id}`]) {
            window[`painterStartUndo_${id}`]();
        }
    };
    
    window.painterStopUndo = function(id) {
        if (window[`painterStopUndo_${id}`]) {
            window[`painterStopUndo_${id}`]();
        }
    };
    
    window.painterStartRedo = function(id) {
        if (window[`painterStartRedo_${id}`]) {
            window[`painterStartRedo_${id}`]();
        }
    };
    
    window.painterStopRedo = function(id) {
        if (window[`painterStopRedo_${id}`]) {
            window[`painterStopRedo_${id}`]();
        }
    };
    
    window.painterToggleMenu = function(id) {
        if (window[`painterToggleMenu_${id}`]) {
            window[`painterToggleMenu_${id}`]();
        }
    };
    
    window.painterCloseBox = function(id) {
        if (window[`painterCloseBox_${id}`]) {
            window[`painterCloseBox_${id}`]();
        }
    };
})();

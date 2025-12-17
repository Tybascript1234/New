(function() {
    // إنشاء ستايل طويل ومعقد لمنع أي تعارض
    const style = document.createElement('style');
    style.id = 'eyadPainterToolStyle_987654321';
    style.textContent = `
        *{touch-action:manipulation;box-sizing:border-box}body{width:100%;height:100vh;margin:0;padding:0;font-size:14px;font-family:Arial,sans-serif;-webkit-tap-highlight-color:transparent}a{color:#000;text-decoration:none}.eyadToolbar_001{user-select:none;-webkit-user-select:none}.eyadOpenBtn_002{position:fixed;top:0;right:0;margin:16px;z-index:100000}.eyadOpenBtn_002 button{width:40px;height:40px;border:none;background:rgba(255,255,255,.9);border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,.2);cursor:pointer;display:flex;align-items:center;justify-content:center}.eyadMainBox_003{z-index:100000;position:fixed;top:0;left:50%;transform:translateX(-50%);margin:auto;display:none;margin-top:20px;justify-content:center;width:100%;max-width:600px}.eyadContainer_004{display:flex;flex-direction:column;background-color:#fff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.15);overflow:hidden;margin:16px}.eyadToolbarTop_005{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.05)}.eyadToolbarActions_006{display:flex;align-items:center}.eyadColorPreview_007{width:24px;height:24px;border-radius:50%;margin-right:8px;border:2px solid rgba(0,0,0,.1)}.eyadSizePreview_008{width:24px;height:24px;border-radius:50%;background:currentColor;margin-left:8px;position:relative}.eyadSizePreview_008::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;border-radius:50%;border:1px solid rgba(0,0,0,.2)}.eyadMenu_009{opacity:0;transition:all .2s ease;position:absolute;overflow:hidden;height:0;width:0;display:flex;bottom:50px;background:white;box-shadow:0 4px 12px rgba(0,0,0,.15);border-radius:12px;padding:0;z-index:40;align-items:center;flex-wrap:wrap;max-width:300px}.eyadMenu_009.active{height:max-content;opacity:1;background-color:white;width:auto;padding:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);border:1px solid rgba(0,0,0,.1)}.eyadOverlay_010{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3);z-index:999;display:none}.eyadColors_011{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:8px 0;background:rgba(0,0,0,.02);display:flex}.eyadColors_011::-webkit-scrollbar{display:none}.eyadColors_011 div{display:flex;align-items:center;margin:auto;width:max-content;padding:0 8px}.eyadColors_011 div button{transition:all .2s;padding:16px;margin:0 4px;border-radius:50%;border:none;outline:none;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.1);min-width:24px;min-height:24px;flex-shrink:0}.eyadClickBtn_012{outline-color:#0f6cf8;background:transparent;border:none;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;margin:0 2px;font-size:15px;color:#252525;cursor:pointer;transition:all .2s}.eyadClickBtn_012:hover{background:rgba(0,0,0,.05)}.eyadClickBtn_012:active{background:rgba(0,0,0,.1);transform:scale(.95)}.eyadCanvasContainer_013{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;touch-action:none;display:none}.eyadCanvas_014{position:absolute;top:0;left:0;width:100%;height:100%;touch-action:none}@keyframes eyadButtonClick_015{0%{transform:scale(1)}50%{transform:scale(.9)}100%{transform:scale(1)}}.eyadButtonClick_016{animation:eyadButtonClick_015 .3s ease}
    `;
    document.head.appendChild(style);

    // إنشاء الهيكلية HTML
    const openBtn = document.createElement('div');
    openBtn.id = 'eyadShowBtn_1001';
    openBtn.className = 'eyadOpenBtn_002 eyadToolbar_001';
    openBtn.title = 'Ctrl + B';
    openBtn.innerHTML = `<button class="eyadClickBtn_012">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <path d="M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
            <circle cx="144" cy="208" r="32"/>
            <circle cx="152" cy="311" r="32"/>
            <circle cx="224" cy="144" r="32"/>
            <circle cx="256" cy="367" r="48"/>
            <circle cx="328" cy="144" r="32"/>
        </svg>
    </button>`;

    const canvasContainer = document.createElement('div');
    canvasContainer.id = 'eyadCanvasContainer_013';
    canvasContainer.className = 'eyadCanvasContainer_013';
    canvasContainer.innerHTML = `<canvas id="eyadCanvas_014" class="eyadCanvas_014"></canvas>`;

    const overlay = document.createElement('div');
    overlay.id = 'eyadOverlay_010';
    overlay.className = 'eyadOverlay_010';

    const mainBox = document.createElement('div');
    mainBox.id = 'eyadMainBox_003';
    mainBox.className = 'eyadMainBox_003';
    mainBox.style.display = 'none';
    mainBox.innerHTML = `
        <div class="eyadContainer_004">
            <div class="eyadToolbarTop_005">
                <div class="eyadToolbarActions_006">
                    <button onclick="eyadToggleMenu()" class="eyadClickBtn_012">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                            <circle cx="256" cy="256" r="48"/>
                            <circle cx="256" cy="416" r="48"/>
                            <circle cx="256" cy="96" r="48"/>
                        </svg>
                    </button>
                    <div class="eyadColorPreview_007" id="eyadColorPreview_007" style="background:#000"></div>
                    <div class="eyadSizePreview_008" id="eyadSizePreview_008" style="transform:scale(.3)"></div>
                </div>
                <div class="eyadMenu_009" id="eyadMenu_009"></div>
                <button class="eyadClickBtn_012" onclick="eyadCloseBox()">Close</button>
            </div>
            <div class="eyadColors_011" id="eyadColors_011"><div></div></div>
        </div>
    `;

    document.body.appendChild(openBtn);
    document.body.appendChild(canvasContainer);
    document.body.appendChild(overlay);
    document.body.appendChild(mainBox);

    // تحميل المكتبات المطلوبة
    const ioniconsScript = document.createElement('script');
    ioniconsScript.type = 'module';
    ioniconsScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    document.head.appendChild(ioniconsScript);

    const html2canvasScript = document.createElement('script');
    html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    document.head.appendChild(html2canvasScript);

    // جميع الوظائف والـJS للرسم
    const script = document.createElement('script');
    script.textContent = `
        const canvas = document.getElementById('eyadCanvas_014');
        const ctx = canvas.getContext('2d');
        let isDrawing=false,curColor='#000',curLineWidth=4,lastX=0,lastY=0,drawingHistory=[],historyIndex=-1,boxVisible=false;
        const canvasContainer=document.getElementById('eyadCanvasContainer_013');

        function resizeCanvas(){const dpr=window.devicePixelRatio||1,w=window.innerWidth,h=window.innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.scale(dpr,dpr);redrawCanvas()}
        function redrawCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height);if(drawingHistory.length>0&&historyIndex>=0){ctx.putImageData(drawingHistory[historyIndex],0,0)}}
        function saveState(){if(historyIndex<drawingHistory.length-1){drawingHistory=drawingHistory.slice(0,historyIndex+1)}if(drawingHistory.length>=50){drawingHistory.shift();historyIndex--}drawingHistory.push(ctx.getImageData(0,0,canvas.width,canvas.height));historyIndex++}
        function getPosition(e){const rect=canvas.getBoundingClientRect(),scaleX=canvas.width/rect.width,scaleY=canvas.height/rect.height;let clientX,clientY;if(e.touches){clientX=e.touches[0].clientX;clientY=e.touches[0].clientY}else{clientX=e.clientX;clientY=e.clientY}return {x:(clientX-rect.left)*scaleX/(window.devicePixelRatio||1),y:(clientY-rect.top)*scaleY/(window.devicePixelRatio||1)}}
        function startDrawing(e){if(!boxVisible)return;isDrawing=true;const pos=getPosition(e);lastX=pos.x;lastY=pos.y;ctx.beginPath();ctx.moveTo(lastX,lastY);ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=curColor;ctx.lineWidth=curLineWidth;saveState()}
        function draw(e){if(!isDrawing||!boxVisible)return;const pos=getPosition(e);ctx.lineTo(pos.x,pos.y);ctx.stroke();lastX=pos.x;lastY=pos.y}
        function stopDrawing(){if(isDrawing){isDrawing=false;ctx.closePath();saveState()}}
        function setColor(color){curColor=color;document.getElementById('eyadColorPreview_007').style.backgroundColor=color}
        function setLineWidth(width){curLineWidth=parseInt(width,10);document.getElementById('eyadSizePreview_008').style.transform='scale('+curLineWidth/12+')'}
        function clearDrawing(){ctx.clearRect(0,0,canvas.width,canvas.height);drawingHistory=[];historyIndex=-1;saveState()}
        function undo(){if(historyIndex>0){historyIndex--;redrawCanvas();return true}return false}
        function redo(){if(historyIndex<drawingHistory.length-1){historyIndex++;redrawCanvas();return true}return false}
        let undoInterval,redoInterval;
        function startUndo(){undo();undoInterval=setInterval(undo,100)}
        function stopUndo(){clearInterval(undoInterval)}
        function startRedo(){redo();redoInterval=setInterval(redo,100)}
        function stopRedo(){clearInterval(redoInterval)}
        function downloadCanvas(){const link=document.createElement('a');link.download='drawing.png';link.href=canvas.toDataURL('image/png');link.click()}
        function eyadToggleMenu(){document.getElementById('eyadMenu_009').classList.toggle('active')}
        function eyadToggleBox(){if(mainBox.style.display==='none'||mainBox.style.display===''){mainBox.style.display='flex';overlay.style.display='block';openBtn.style.display='none';canvasContainer.style.display='block';boxVisible=true}else{mainBox.style.display='none';overlay.style.display='none';openBtn.style.display='flex';canvasContainer.style.display='none';boxVisible=false;clearDrawing()}}
        function eyadCloseBox(){mainBox.style.display='none';overlay.style.display='none';openBtn.style.display='flex';canvasContainer.style.display='none';document.getElementById('eyadMenu_009').classList.remove('active');boxVisible=false;clearDrawing()}

        function init(){resizeCanvas();canvas.addEventListener('mousedown',startDrawing);canvas.addEventListener('mousemove',draw);canvas.addEventListener('mouseup',stopDrawing);canvas.addEventListener('mouseout',stopDrawing);
        canvas.addEventListener('touchstart',e=>{e.preventDefault();startDrawing(e)});
        canvas.addEventListener('touchmove',e=>{e.preventDefault();draw(e)});
        canvas.addEventListener('touchend',e=>{e.preventDefault();stopDrawing()});
        openBtn.addEventListener('click',eyadToggleBox);
        overlay.addEventListener('click',eyadCloseBox);
        window.addEventListener('resize',resizeCanvas);
        setLineWidth(curLineWidth);setColor(curColor);}

        init();
    `;
    document.body.appendChild(script);
})();

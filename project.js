/**
 * ADET 211 Project Documentation Dynamic Controller
 * Handles query parameter routing, project tab transitions, and prescribed report rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const docProjectNo = document.getElementById('docProjectNo');
    const docProjectTitle = document.getElementById('docProjectTitle');
    const componentsTableBody = document.getElementById('componentsTableBody');
    const docIdeStatus = document.getElementById('docIdeStatus');
    const successfulOutputGallery = document.getElementById('successfulOutputGallery');
    const hardwareSetupGallery = document.getElementById('hardwareSetupGallery');
    const tinkercadBreadboardBox = document.getElementById('tinkercadBreadboardBox');
    const tinkercadCircuitBox = document.getElementById('tinkercadCircuitBox');
    const sourceCodeBlock = document.getElementById('sourceCodeBlock');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const copyBtnText = document.getElementById('copyBtnText');
    const logAccomplish = document.getElementById('logAccomplish');
    const logChallenges = document.getElementById('logChallenges');
    const logSolution = document.getElementById('logSolution');
    const logImprovements = document.getElementById('logImprovements');
    const evalSubmissionTag = document.getElementById('evalSubmissionTag');

    // Lightbox modal elements
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    // Get current project ID from URL or default to "1"
    const getInitialProjectId = () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        return (id && ADET_PROJECTS[id]) ? id : '1';
    };

    // Open image in modal lightbox
    const openImageModal = (src, caption) => {
        if (!imageModal || !modalImg) return;
        modalImg.src = src;
        modalCaption.textContent = caption || '';
        imageModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeImageModal = () => {
        if (!imageModal) return;
        imageModal.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeImageModal);
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImageModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('open')) {
            closeImageModal();
        }
    });

    // Render Schematic PDF onto Canvas using PDF.js
    const renderSchematicPdf = (pdfUrl, caption) => {
        const canvas = document.getElementById('schematicPdfCanvas');
        const loading = document.getElementById('schematicLoading');
        if (!canvas) return;

        if (window.pdfjsLib) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

            pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
                return pdf.getPage(1);
            }).then(page => {
                const viewport = page.getViewport({ scale: 2.2 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext('2d');
                return page.render({
                    canvasContext: ctx,
                    viewport: viewport
                }).promise;
            }).then(() => {
                if (loading) loading.style.display = 'none';
                canvas.style.display = 'block';

                // Allow clicking canvas to enlarge in image modal
                canvas.addEventListener('click', () => {
                    try {
                        const dataUrl = canvas.toDataURL('image/png');
                        openImageModal(dataUrl, caption || 'Official Tinkercad Schematic Circuit Diagram');
                    } catch (e) {
                        window.open(pdfUrl, '_blank');
                    }
                });
            }).catch(err => {
                console.warn('PDF.js rendering note:', err);
                if (loading) loading.style.display = 'none';
            });
        } else {
            if (loading) loading.style.display = 'none';
        }
    };

    // Render Project Documentation Content
    const renderProject = (id) => {
        const data = ADET_PROJECTS[id];
        if (!data) return;

        // Update active tab buttons
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-id') === id) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Page Title
        document.title = `${data.projectNo}: ${data.projectTitle} | ADET 211`;

        // Update Prescribed Header
        if (docProjectNo) docProjectNo.textContent = data.projectNo;
        if (docProjectTitle) docProjectTitle.textContent = data.projectTitle;

        // PART A: Required Components Table
        if (componentsTableBody) {
            componentsTableBody.innerHTML = '';
            data.components.forEach(comp => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight: 700; color: var(--color-white);">${comp.qty}</td>
                    <td>${comp.item}</td>
                `;
                componentsTableBody.appendChild(tr);
            });
        }

        // PART B: Successful Output
        if (docIdeStatus) {
            docIdeStatus.innerHTML = `
                <span class="ide-dot"></span>
                <span>${data.successfulOutput.ideStatus}</span>
            `;
        }

        if (successfulOutputGallery) {
            successfulOutputGallery.innerHTML = '';

            if (data.successfulOutput.isSimulatedOnly && data.successfulOutput.terminalOutput) {
                // Render Virtual Simulation Serial Monitor Console for Project 3
                const terminal = document.createElement('div');
                terminal.className = 'simulated-terminal-box';
                terminal.innerHTML = `
                    <div class="terminal-header">
                        <div class="terminal-dots">
                            <span class="t-dot"></span>
                            <span class="t-dot"></span>
                            <span class="t-dot"></span>
                        </div>
                        <span>COM3 Serial Telemetry Stream [9600 baud] &bull; Simulation Testbed</span>
                    </div>
                    <div class="terminal-body">
                        ${data.successfulOutput.terminalOutput.map(line => `<div class="terminal-line success">&gt; ${line}</div>`).join('')}
                    </div>
                `;
                successfulOutputGallery.appendChild(terminal);

                const desc = document.createElement('p');
                desc.style.color = 'var(--color-light-gray-2)';
                desc.style.fontSize = '0.9rem';
                desc.style.lineHeight = '1.5';
                desc.textContent = data.successfulOutput.description;
                successfulOutputGallery.appendChild(desc);
            } else if (data.successfulOutput.images && data.successfulOutput.images.length > 0) {
                data.successfulOutput.images.forEach(img => {
                    const item = document.createElement('div');
                    item.className = 'media-item';
                    item.innerHTML = `
                        <img src="${img.src}" alt="${img.caption}" loading="lazy">
                        <p class="media-caption">${img.caption}</p>
                    `;
                    item.addEventListener('click', () => openImageModal(img.src, img.caption));
                    successfulOutputGallery.appendChild(item);
                });
            }
        }

        // PART C: Actual Hardware Setup
        if (hardwareSetupGallery) {
            hardwareSetupGallery.innerHTML = '';

            if (data.hardwareSetup.isSimulatedOnly) {
                // Render Description & Reason Notice Card for Project 3 (Single Image Documentation)
                const noticeCard = document.createElement('div');
                noticeCard.className = 'hardware-notice-card';
                noticeCard.innerHTML = `
                    <div class="notice-header">
                        <span class="notice-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="16" x2="12" y2="12"/>
                                <line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                            ${data.hardwareSetup.title}
                        </span>
                        <span class="notice-badge">${data.hardwareSetup.statusBadge}</span>
                    </div>
                    <div class="notice-body">
                        <div class="notice-item">
                            <strong>Description</strong>
                            <p>${data.hardwareSetup.description}</p>
                        </div>
                        <div class="notice-item">
                            <strong>Reason for Single-Image Documentation</strong>
                            <p>${data.hardwareSetup.reason}</p>
                        </div>
                        <div class="notice-item notice-milestone">
                            <strong>Upcoming Hardware Bench Milestone</strong>
                            <p>${data.hardwareSetup.milestone}</p>
                        </div>
                    </div>
                `;
                hardwareSetupGallery.appendChild(noticeCard);
            } else if (data.hardwareSetup.photos && data.hardwareSetup.photos.length > 0) {
                data.hardwareSetup.photos.forEach(photo => {
                    const item = document.createElement('div');
                    item.className = 'media-item';
                    item.innerHTML = `
                        <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
                        <p class="media-caption">${photo.caption}</p>
                    `;
                    item.addEventListener('click', () => openImageModal(photo.src, photo.caption));
                    hardwareSetupGallery.appendChild(item);
                });

                // Guideline Note regarding 2nd student proof photograph
                const pendingBox = document.createElement('div');
                pendingBox.className = 'pending-photo-box';
                pendingBox.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                    </svg>
                    <span><strong>Prescribed Part C Requirement:</strong> Photo 1 (Assembled Circuit) verified above. Photo 2 (Student with assembled workstation) will be bound during final physical submission.</span>
                `;
                hardwareSetupGallery.appendChild(pendingBox);
            }
        }

        // PART D: Tinkercad Breadboard Layout (Primary Image for each project)
        if (tinkercadBreadboardBox) {
            tinkercadBreadboardBox.innerHTML = `
                <img src="${data.tinkercadBreadboard.src}" alt="${data.tinkercadBreadboard.caption}">
                <p class="media-caption" style="margin-top: 0.5rem;">${data.tinkercadBreadboard.caption}</p>
            `;
            const img = tinkercadBreadboardBox.querySelector('img');
            if (img) {
                img.addEventListener('click', () => openImageModal(data.tinkercadBreadboard.src, data.tinkercadBreadboard.caption));
            }
        }

        // PART E: Tinkercad Circuit Diagram (Schematic)
        if (tinkercadCircuitBox) {
            let html = '';

            if (data.tinkercadCircuit.pdf) {
                html = `
                    <div class="schematic-container">
                        <div class="schematic-header-bar">
                            <div class="schematic-title-group">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                    <path d="M7 7h10v10H7z"/>
                                    <path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>
                                </svg>
                                <strong>${data.tinkercadCircuit.title || 'Official Tinkercad Schematic Diagram'}</strong>
                                <span class="schematic-badge">Sheet 1/1 &bull; Schematic</span>
                            </div>
                            <a href="${data.tinkercadCircuit.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                Open Original PDF
                            </a>
                        </div>

                        <!-- Rendered High-Resolution Schematic Canvas -->
                        <div class="schematic-canvas-card" title="Click to view full-size schematic in lightbox">
                            <div class="schematic-loading" id="schematicLoading">
                                <div class="loading-spinner"></div>
                                <span>Rendering high-resolution schematic circuit vector...</span>
                            </div>
                            <canvas id="schematicPdfCanvas" class="schematic-pdf-canvas"></canvas>
                        </div>

                        <!-- Embedded Interactive PDF Frame -->
                        <div class="schematic-frame-wrapper">
                            <iframe src="${data.tinkercadCircuit.pdf}#view=FitH" class="schematic-pdf-iframe" title="Schematic PDF Viewer"></iframe>
                        </div>

                        <p class="media-caption">${data.tinkercadCircuit.caption}</p>
                    </div>
                `;
            } else {
                html = `
                    <div class="hardware-notice-card" style="margin: 0;">
                        <div class="notice-header">
                            <span class="notice-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="16" x2="12" y2="12"/>
                                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                                </svg>
                                Schematic Diagram Documentation Status
                            </span>
                            <span class="notice-badge">Model Synchronized</span>
                        </div>
                        <div class="notice-body">
                            <div class="notice-item">
                                <strong>Tinkercad Schematic Netlist</strong>
                                <p>The schematic wiring netlist for Project 03 is directly mapped inside the Tinkercad simulation workspace. The formal standalone PDF schematic export sheet (Sheet 1/1) will be finalized and embedded alongside the Week 11 Midterms physical verification.</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            tinkercadCircuitBox.innerHTML = html;

            // Trigger PDF.js render if PDF is present
            if (data.tinkercadCircuit.pdf) {
                renderSchematicPdf(data.tinkercadCircuit.pdf, data.tinkercadCircuit.caption);
            }
        }

        // PART F: Arduino Source Code
        if (sourceCodeBlock) {
            sourceCodeBlock.textContent = data.sourceCode;
        }

        // PART G: Developer's Log
        if (logAccomplish) logAccomplish.textContent = data.developerLog.accomplishment;
        if (logChallenges) logChallenges.textContent = data.developerLog.challenges;
        if (logSolution) logSolution.textContent = data.developerLog.solution;
        if (logImprovements) logImprovements.textContent = data.developerLog.improvements;

        // PART H: Evaluation Status
        if (evalSubmissionTag) {
            evalSubmissionTag.textContent = `${data.weekSubmission} &bull; Part H Signed Sheet Pending Verification`;
        }
    };

    // Attach tab button click handlers
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (id && ADET_PROJECTS[id]) {
                // Update URL parameter without reload
                const url = new URL(window.location);
                url.searchParams.set('id', id);
                window.history.pushState({ id }, '', url);

                renderProject(id);

                // Smooth scroll to top of document container
                const doc = document.getElementById('docContainer');
                if (doc) {
                    const topPos = doc.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: topPos, behavior: 'smooth' });
                }
            }
        });
    });

    // Handle browser Back/Forward navigation
    window.addEventListener('popstate', (e) => {
        const id = (e.state && e.state.id) ? e.state.id : getInitialProjectId();
        renderProject(id);
    });

    // Copy Code functionality
    if (copyCodeBtn && sourceCodeBlock) {
        copyCodeBtn.addEventListener('click', () => {
            const codeText = sourceCodeBlock.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                if (copyBtnText) copyBtnText.textContent = 'Copied!';
                copyCodeBtn.classList.add('btn-primary');
                copyCodeBtn.classList.remove('btn-secondary');

                setTimeout(() => {
                    if (copyBtnText) copyBtnText.textContent = 'Copy Code';
                    copyCodeBtn.classList.remove('btn-primary');
                    copyCodeBtn.classList.add('btn-secondary');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
            });
        });
    }

    // Initial render based on URL param
    const initialId = getInitialProjectId();
    renderProject(initialId);
});

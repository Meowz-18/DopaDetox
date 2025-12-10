import React, { useRef, useEffect } from 'react';

export const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = window.innerWidth < 768 ? 50 : 120; // More particles
        const connectionDistance = 200; // Longer connections
        const mouseDistance = 300; // Larger mouse radius

        // Mouse state
        const mouse = { x: -1000, y: -1000, click: false };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            baseX: number;
            baseY: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 1.5; // Faster movement
                this.vy = (Math.random() - 0.5) * 1.5;
                this.size = Math.random() * 3 + 2; // Larger particles
                this.color = Math.random() > 0.5
                    ? 'rgba(52, 211, 153, 0.8)' // Bright Emerald
                    : 'rgba(167, 139, 250, 0.8)'; // Bright Violet
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse Interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Strong repulsion on click, gentle attraction on hover
                if (mouse.click && distance < 400) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (400 - distance) / 400;
                    const directionX = forceDirectionX * force * 50; // STRONG Push
                    const directionY = forceDirectionY * force * 50;
                    this.x -= directionX;
                    this.y -= directionY;
                } else if (distance < mouseDistance) {
                    // Gentle attraction
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 2;
                    const directionY = forceDirectionY * force * 2;
                    this.x += directionX;
                    this.y += directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const init = () => {
            particles.length = 0;
            const count = window.innerWidth < 768 ? 50 : 120;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Connections First (Background)
            // Optimization: Single loop for update and separating draw could change order, 
            // but nested loop for connections is expensive.

            // Update & Draw
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Check neighbors for connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - distance / connectionDistance;
                        ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.4})`; // Visible slate lines
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Mouse connections
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(52, 211, 153, ${1 - dist / mouseDistance})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            // Reset click frame
            if (mouse.click) mouse.click = false;

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseDown = () => {
            mouse.click = true;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 1 }} // Full opacity
        />
    );
};

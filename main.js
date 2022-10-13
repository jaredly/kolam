/*
so I'm making an svg, right?
downloadable and such?
don't really need too many bells and knobs and whistles
*/

const size = 35; // mm
const bit = 3; // diameter
const margin = bit * 1.1;

const circle = (x, y, r) =>
    `M${x - r},${y}A${r} ${r} 0 1 0 ${x + r},${y}A${r} ${r} 0 1 0 ${
        x - r
    },${y}z`;

const rect = (x, y, w, h) =>
    `M${x},${y}L${x + w},${y}L${x + w},${y + h}L${x},${y + h}z`;

const rad = bit / 2;

const lw = 0.2;

const edge = `rgba(0,0,0,0.2)`;

const square = (x, y) => `
<g>
<path d="${rect(x, y, size, size)}" fill=none stroke=red stroke-width=${lw} />
<path d="${rect(
    x - rad,
    y - rad,
    size / 2 + rad,
    size / 2 + rad,
)}" fill=none stroke="${edge}" stroke-width=${bit} />
<path d="${rect(
    x + size / 2,
    y + size / 2,
    size / 2 + rad,
    size / 2 + rad,
)}" fill=none stroke="${edge}" stroke-width=${bit} />
<path d="${circle(x, y, bit / 2)}" fill=none stroke=green stroke-width=${lw} />
<path d="${circle(
    x + size,
    y + size,
    bit / 2,
)}" fill=none stroke=green stroke-width=${lw} />
</g>
`;

const round = (x, y) => `
<g>
<path d="${rect(x, y, size, size)}" fill=none stroke=red stroke-width=${lw} />
<path d="M${x - rad},${y - rad} L${x + size / 2},${y - rad} l0,${rad} A${
    size / 2
} ${size / 2} 0 0 1 ${x} ${
    y + size / 2
} l${-rad},0z" fill=none stroke="${edge}" stroke-width=${bit} />
<path d="M${x + size + rad},${y + size + rad} L${x + size / 2},${
    y + size + rad
} l0,${-rad} A${size / 2} ${size / 2} 0 0 1 ${x + size} ${
    y + size / 2
} l${rad},0z" fill=none stroke="${edge}" stroke-width=${bit} />
<path d="${circle(x, y, bit / 2)}" fill=none stroke=green stroke-width=${lw} />
<path d="${circle(
    x + size,
    y + size,
    bit / 2,
)}" fill=none stroke=green stroke-width=${lw} />
</g>
`;

const style = 'round';
const fns = { round, square };

const rows = 1;
const cols = 4;

const items = [];
for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
        items.push(
            fns[style](
                margin + (margin + size) * x,
                margin + (margin + size) * y,
            ),
        );
    }
}

const fullw = (margin + size) * cols + margin;
const fullh = (margin + size) * rows + margin;
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fullw} ${fullh}" width="${fullw}mm" height="${fullh}mm" style="border: 1px solid magenta">
${items.join('\n')}
</svg>
`;
// ${fns[style](margin, margin)}
// ${fns[style](size + margin * 2, margin)}
// ${fns[style](margin, size + margin * 2)}
// ${fns[style](size + margin * 2, size + margin * 2)}

document.body.innerHTML = svg;
const link = document.createElement('a');
const blob = new Blob([svg], { type: 'image/svg+xml' });
link.href = URL.createObjectURL(blob);
link.download = `kolam-${size}-${bit}-${style}.svg`;
document.body.append(link);
link.textContent = `Download ${link.download} (${fullw.toFixed(
    1,
)}mm x ${fullh.toFixed(1)}mm)`;
link.style.display = 'block';

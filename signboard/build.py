W,H=6000,3700
INK="#14161C"; BLUE="#2563EB"; LB="#7C9CF6"; GREY="#5B6270"
F="Archivo, Arial, 'Liberation Sans', Helvetica, sans-serif"
def mark(x,y,s):
    k=s/160
    return f'''<g id="logo-mark" transform="translate({x},{y}) scale({k})">
<rect x="8" y="8" width="144" height="144" rx="28" fill="{INK}"/>
<polygon points="42,80 118,46 118,68 42,102" fill="{BLUE}"/>
<polygon points="42,80 118,114 118,92 42,58" fill="{LB}"/></g>'''
def icon(kind,cx,cy):
    # 560x400 icon area centred at cx,cy ; stroke vector illustrations
    x,y=cx-280*1.3,cy-190*1.3
    s=f'<g transform="translate({x},{y}) scale(1.3)" fill="none" stroke="{INK}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round">'
    if kind=="shutter":
        s+=f'<rect x="40" y="20" width="480" height="40" fill="{INK}"/>'
        for i in range(8): s+=f'<rect x="60" y="{80+i*38}" width="440" height="30" rx="4" stroke="{INK}"/>'
        s+=f'<line x1="40" y1="20" x2="40" y2="380"/><line x1="520" y1="20" x2="520" y2="380"/>'
        s+=f'<rect x="60" y="{80+7*38}" width="440" height="30" rx="4" fill="{BLUE}" stroke="{BLUE}"/>'
    if kind=="gate":
        s+=f'<line x1="20" y1="360" x2="540" y2="360" stroke-width="18"/><rect x="40" y="90" width="12" height="270" fill="{INK}"/>'
        s+=f'<rect x="120" y="120" width="400" height="200" rx="8"/><line x1="120" y1="230" x2="520" y2="230"/>'
        for i in range(1,8): s+=f'<line x1="{120+i*50}" y1="120" x2="{120+i*50}" y2="320"/>'
        s+=f'<path d="M120 345 L520 345" stroke="{BLUE}" stroke-width="16"/>'
    if kind=="door":
        s+=f'<rect x="60" y="20" width="440" height="350" rx="6"/><rect x="60" y="20" width="440" height="60" fill="{INK}"/>'
        s+=f'<rect x="130" y="110" width="300" height="140" rx="6" stroke="{BLUE}"/>'
        s+=f'<line x1="130" y1="180" x2="430" y2="180" stroke="{BLUE}"/>'
        s+=f'<line x1="60" y1="290" x2="500" y2="290"/><line x1="60" y1="330" x2="500" y2="330"/>'
    if kind=="barrier":
        s+=f'<rect x="40" y="170" width="110" height="200" rx="8" fill="{INK}"/><circle cx="95" cy="230" r="14" fill="#fff" stroke="#fff"/>'
        s+=f'<rect x="150" y="160" width="390" height="46" rx="6"/>'
        for i in range(4): s+=f'<polygon points="{190+i*88},160 {240+i*88},160 {208+i*88},206 {158+i*88},206" fill="{BLUE}" stroke="{BLUE}"/>'
        s+=f'<line x1="20" y1="372" x2="540" y2="372" stroke-width="12"/>'
    return s+'</g>'
els=[]
els.append(f'<rect width="{W}" height="{H}" fill="#fff"/>')
els.append(f'<rect x="60" y="60" width="{W-120}" height="{H-120}" fill="none" stroke="{INK}" stroke-width="28"/>')
els.append(f'<rect x="60" y="60" width="{W-120}" height="44" fill="{BLUE}"/>')
# header: mark + name, centred group
els.append(mark(560,250,820))
els.append(f'<text id="name-main" x="1500" y="840" font-family="{F}" font-weight="800" font-size="640" letter-spacing="14" fill="{INK}">STANDARD</text>')
els.append(f'<text id="name-legal" x="1520" y="1120" font-family="{F}" font-weight="700" font-size="215" letter-spacing="12" fill="{BLUE}">AUTOMATIC SOLUTIONS PVT. LTD.</text>')
els.append(f'<rect x="300" y="1290" width="{W-600}" height="10" fill="{INK}"/><rect x="300" y="1290" width="900" height="10" fill="{BLUE}"/>')
# products
cols=[("shutter","ROLLING SHUTTERS"),("gate","AUTOMATIC GATES"),("door","INDUSTRIAL DOORS"),("barrier","VEHICLE BARRIERS")]
cw=(W-600)/4
for i,(k,t) in enumerate(cols):
    cx=300+cw*i+cw/2
    els.append(icon(k,cx,1625))
    els.append(f'<text x="{cx}" y="2060" text-anchor="middle" font-family="{F}" font-weight="800" font-size="104" letter-spacing="4" fill="{INK}">{t}</text>')
    if i: els.append(f'<rect x="{300+cw*i-4}" y="1400" width="8" height="700" fill="#D9DCE2"/>')
# bottom band
els.append(f'<rect x="74" y="2220" width="{W-148}" height="{H-104-2220-40}" fill="{INK}"/>'.replace(f'{H-104-2220-40}',str(H-60-14-2220)))
els.append(f'<rect x="74" y="2220" width="{W-148}" height="16" fill="{BLUE}"/>')
els.append(f'<text x="300" y="2430" font-family="{F}" font-weight="700" font-size="76" letter-spacing="10" fill="{LB}">FACTORY ADDRESS</text>')
addr=["Shed No. 1, Amba Mata Mandir Road, Opposite Ramleela Niwas,","Near Ohmicontrols Pvt. Ltd., Dhangarwasti, Dhayari,","Pune, Maharashtra – 411041."]
for i,l in enumerate(addr):
    els.append(f'<text id="addr{i+1}" x="300" y="{2610+i*170}" font-family="{F}" font-weight="600" font-size="150" fill="#fff">{l}</text>')
els.append(f'<rect x="300" y="3170" width="{W-600}" height="6" fill="#3B4A6B"/>')
els.append(f'<text x="300" y="3300" font-family="{F}" font-weight="700" font-size="76" letter-spacing="10" fill="{LB}">GSTIN</text>')
els.append(f'<text id="gstin" x="300" y="3445" font-family="{F}" font-weight="800" font-size="150" letter-spacing="6" fill="#fff">27ABBCS9027Q1ZN</text>')
els.append(f'<text x="3250" y="3300" font-family="{F}" font-weight="700" font-size="76" letter-spacing="10" fill="{LB}">WEBSITE</text>')
els.append(f'<text id="website" x="3250" y="3445" font-family="{F}" font-weight="800" font-size="150" fill="#fff">www.standardautomations.in</text>')
svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="60in" height="37in" viewBox="0 0 {W} {H}">\n'+"\n".join(els)+'\n</svg>\n'
open("board.svg","w").write(svg)
open("board.html","w").write(f'<!doctype html><meta charset=utf-8><style>@page{{size:60in 37in;margin:0}}html,body{{margin:0}}svg{{display:block}}</style>{svg}')

from pathlib import Path
import re
import html
import json

from reportlab.pdfgen import canvas
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
    Table, TableStyle, XPreformatted, HRFlowable, KeepTogether,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path('E:/portfolio')
SOURCE = ROOT / 'output/java-spring-interview-notes/technical-notes.md'
OUTPUT = ROOT / 'output/pdf/java-spring-interview-notes.pdf'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
QA = ROOT / 'tmp/pdfs'
QA.mkdir(parents=True, exist_ok=True)

for name, file in [('Body','arial.ttf'),('BodyBold','arialbd.ttf'),('BodyItalic','ariali.ttf'),
                   ('BodyBoldItalic','arialbi.ttf'),('Code','consola.ttf'),('CodeBold','consolab.ttf')]:
    pdfmetrics.registerFont(TTFont(name, 'C:/Windows/Fonts/' + file))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='BodyBold', italic='BodyItalic', boldItalic='BodyBoldItalic')
pdfmetrics.registerFontFamily('Code', normal='Code', bold='CodeBold', italic='Code', boldItalic='CodeBold')

PAGE_W, PAGE_H = A4
MARGIN = 45
WIDTH = PAGE_W - 2*MARGIN
INK = colors.HexColor('#172537')
BLUE = colors.HexColor('#254b83')
MUTED = colors.HexColor('#53657a')

def style(name, **kw):
    defaults = dict(fontName='Body',fontSize=10.2,leading=14.2,textColor=INK,
                    spaceAfter=7,allowWidows=0,allowOrphans=0,splitLongWords=1)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

styles = {
    'body': style('body'),
    'title': style('title',fontName='BodyBold',fontSize=28,leading=33,spaceAfter=20),
    'h1': style('h1',fontName='BodyBold',fontSize=22,leading=27,textColor=BLUE,spaceAfter=16,keepWithNext=1),
    'h2': style('h2',fontName='BodyBold',fontSize=15,leading=19,spaceBefore=14,spaceAfter=8,keepWithNext=1),
    'h3': style('h3',fontName='BodyBold',fontSize=11.5,leading=15.5,spaceBefore=10,spaceAfter=6,keepWithNext=1),
    'list': style('list',leftIndent=15,firstLineIndent=-12,spaceAfter=5),
    'cell': style('cell',fontSize=8.6,leading=11.7,spaceAfter=0),
    'headcell': style('headcell',fontName='BodyBold',fontSize=8.7,leading=11.7,textColor=colors.white,spaceAfter=0),
    'code': style('code',fontName='Code',fontSize=7.9,leading=10.7,spaceBefore=5,spaceAfter=10,
                  backColor=colors.HexColor('#f2f5f9'),borderColor=colors.HexColor('#dbe3ed'),
                  borderWidth=0.4,borderPadding=8),
    'eyebrow': style('eyebrow',fontName='BodyBold',fontSize=9,leading=13,textColor=MUTED,spaceAfter=13),
}

def clean(text):
    return text.replace('\u2014',' - ').replace('\u2013','-').replace('\u2011','-').replace('\u2010','-')

def inline(text):
    # Protect code first, so characters such as < and * retain literal meaning.
    segments = re.split(r'(`[^`\n]+`)', clean(text))
    result = []
    for segment in segments:
        if segment.startswith('`') and segment.endswith('`'):
            result.append('<font name="Code" size="9">' + html.escape(segment[1:-1]) + '</font>')
            continue
        segment = html.escape(segment, quote=False)
        segment = re.sub(r'\[([^\]]+)\]\(([^)]+)\)',
            lambda m: '<link href="' + html.escape(html.unescape(m[2]), quote=True) + '" color="#254b83">' + m[1] + '</link>', segment)
        segment = re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',segment)
        segment = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)',r'<i>\1</i>',segment)
        result.append(segment)
    return ''.join(result)

def slug(text):
    return re.sub(r'[^\w\s-]', '', text.lower()).replace(' ', '-')

class StudyDoc(BaseDocTemplate):
    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and hasattr(flowable, 'bookmark'):
            name, label, level = flowable.bookmark
            self.canv.bookmarkPage(name)
            if level == 0:
                self.canv.addOutlineEntry(label, name, level=0, closed=False)
                self.notify('TOCEntry', (0, label, self.page, name))

def decorate(c, doc):
    c.saveState()
    c.setStrokeColor(colors.HexColor('#d8e0eb'))
    c.line(MARGIN, PAGE_H-33, PAGE_W-MARGIN, PAGE_H-33)
    c.setFont('Body',8)
    c.setFillColor(MUTED)
    c.drawString(MARGIN, PAGE_H-25, 'JAVA / SPRING BOOT | TECHNICAL NOTES')
    c.drawRightString(PAGE_W-MARGIN, 24, str(doc.page))
    c.drawString(MARGIN,24,'Interview preparation + practical implementation')
    c.restoreState()

doc = StudyDoc(str(OUTPUT),pagesize=A4,leftMargin=MARGIN,rightMargin=MARGIN,
               topMargin=49,bottomMargin=42,title='Java / Spring Boot Technical Notes and Interview Preparation',
               author='Technical Study Guide',pageCompression=1)
frame = Frame(MARGIN,42,WIDTH,PAGE_H-91,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0,id='normal')
doc.addPageTemplates(PageTemplate(id='main',frames=[frame],onPage=decorate))

story = []
table_count = code_count = 0
def heading(text, level):
    if level == 1 and text.startswith(('Topic ', 'Final Comparison')):
        story.append(PageBreak())
    key = 'h'+str(min(level,3))
    p = Paragraph(inline(text),styles[key])
    p.bookmark = (slug(text),clean(text),0 if level==1 else 1)
    story.append(p)

def table(lines):
    global table_count
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip().strip('|').split('|')]
        if all(re.fullmatch(r':?-+:?',cell) for cell in cells):
            continue
        rows.append(cells)
    n = len(rows[0])
    if any(len(row)!=n for row in rows):
        raise ValueError('Inconsistent table: ' + str(rows[:2]))
    fractions = {2:[.30,.70],3:[.22,.39,.39],4:[.17,.27,.27,.29]}.get(n,[1/n]*n)
    if rows[0][0] in ['Category','Prefix','Annotation','Assertion'] and n==3:
        fractions=[.21,.38,.41]
    data = [[Paragraph(inline(cell),styles['headcell' if i==0 else 'cell'])
             for cell in row] for i,row in enumerate(rows)]
    t = Table(data,colWidths=[WIDTH*x for x in fractions],repeatRows=1,hAlign='LEFT',splitByRow=1)
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),BLUE),
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#f4f7fb')]),
        ('LINEBELOW',(0,0),(-1,0),.6,BLUE),
        ('LINEBELOW',(0,1),(-1,-1),.35,colors.HexColor('#dce4ef')),
        ('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),
        ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),
    ]))
    story.extend([Spacer(1,4),t,Spacer(1,10)])
    table_count += 1

def wrap_code(line, max_width):
    if pdfmetrics.stringWidth(line,'Code',7.9)<=max_width:
        return [line]
    out=[]
    indent=len(line)-len(line.lstrip())
    prefix=' ' * min(indent+4,20)
    while pdfmetrics.stringWidth(line,'Code',7.9)>max_width:
        limit=1
        while limit<len(line) and pdfmetrics.stringWidth(line[:limit+1],'Code',7.9)<=max_width:
            limit+=1
        # Line wrapping is presentation only: prefer boundaries over a token split.
        cut=line.rfind(' ',len(prefix)+8,limit)
        if cut<0: cut=limit
        out.append(line[:cut])
        line=prefix+line[cut:].lstrip()
    out.append(line)
    return out

def code(lines):
    global code_count
    cooked=[]
    for line in lines:
        cooked.extend(wrap_code(clean(line).replace('\t','    '),WIDTH-20))
    story.append(XPreformatted(html.escape('\n'.join(cooked)),styles['code']))
    code_count += 1

lines=SOURCE.read_text(encoding='utf8').splitlines()
i=0
while i<len(lines):
    line=lines[i]
    if not line.strip():
        i+=1; continue
    if line.startswith('```'):
        block=[];i+=1
        while i<len(lines) and not lines[i].startswith('```'):
            block.append(lines[i]);i+=1
        code(block);i+=1;continue
    if line.startswith('|'):
        block=[]
        while i<len(lines) and lines[i].startswith('|'):
            block.append(lines[i]);i+=1
        table(block);continue
    match=re.match(r'^(#{1,3}) (.+)$',line)
    if match:
        level=len(match[1]);text=match[2]
        if i==0:
            story.append(Spacer(1,27))
            story.append(Paragraph('COMPLETE STUDY GUIDE',styles['eyebrow']))
            story.append(Paragraph(inline(text),styles['title']))
        elif text=='Contents':
            story.append(Paragraph('Contents',styles['h2']))
            toc=TableOfContents()
            toc.levelStyles=[style('toc',fontSize=11,leading=19,leftIndent=0,firstLineIndent=0,spaceAfter=7)]
            story.append(toc)
            i+=1
            while i<len(lines) and (not lines[i].strip() or re.match(r'^\d+\. \[',lines[i])):
                i+=1
            continue
        else: heading(text,level)
        i+=1;continue
    if line.strip()=='---':
        story.append(Spacer(1,4))
        i+=1;continue
    if re.match(r'^(?:- |\d+\. )',line):
        story.append(Paragraph(inline(line),styles['list']))
        i+=1;continue
    paragraph=[line];i+=1
    while i<len(lines) and lines[i].strip() and not re.match(r'^(?:#{1,3} |```|\||- |\d+\. |---$)',lines[i]):
        paragraph.append(lines[i]);i+=1
    story.append(Paragraph(inline(' '.join(paragraph)),styles['body']))

# Keep each short interview-memory section together, rather than leaving its
# final one or two statements stranded on the following page.
grouped=[]
j=0
while j<len(story):
    item=story[j]
    if isinstance(item,Paragraph) and item.getPlainText()=='Remember This for Interviews':
        section=[item];j+=1
        while j<len(story) and not isinstance(story[j],PageBreak):
            if isinstance(story[j],Paragraph) and hasattr(story[j],'bookmark'):
                break
            section.append(story[j]);j+=1
        grouped.append(KeepTogether(section))
    else:
        grouped.append(item);j+=1
doc.multiBuild(grouped)
report={'pdf':str(OUTPUT),'source':str(SOURCE),'codeBlocks':code_count,'tables':table_count,'bytes':OUTPUT.stat().st_size}
(QA/'build-summary.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(report,indent=2))

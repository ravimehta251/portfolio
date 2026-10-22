from pathlib import Path
import re, json
import pdfplumber
from pypdf import PdfReader

root=Path('E:/portfolio')
pdf=root/'output/pdf/java-spring-interview-notes.pdf'
source=(root/'output/java-spring-interview-notes/technical-notes.md').read_text(encoding='utf8')
def normalize(s):
    s=s.replace('\u2014',' - ').replace('\u2013','-').replace('\u2011','-').replace('`','')
    return re.sub(r'\s+',' ',s).strip()
with pdfplumber.open(pdf) as document:
    text=normalize('\n'.join(page.extract_text() or '' for page in document.pages))
    violations=[]
    for i,page in enumerate(document.pages):
        for char in page.chars:
            if char['x0']<43 or char['x1']>554 or char['top']<15 or char['bottom']>825:
                violations.append((i+1,char['text']))
    questions=re.findall(r'^\d+\. \*\*(.+?)\*\*',source,re.M)
    missing=[question for question in questions if normalize(question) not in text]
    page_count=len(document.pages)
reader=PdfReader(pdf)
result={'pages':page_count,'interviewQuestionsExpected':len(questions),
        'missingQuestions':missing,'outsidePageBounds':violations,
        'bookmarkedChapters':len(reader.outline),
        'linkAnnotations':sum(len(page.get('/Annots',[])) for page in reader.pages)}
if missing or violations or len(questions)!=125:
    raise RuntimeError(json.dumps(result,indent=2))
(root/'tmp/pdfs/verification.json').write_text(json.dumps(result,indent=2),encoding='utf8')
print(json.dumps(result,indent=2))

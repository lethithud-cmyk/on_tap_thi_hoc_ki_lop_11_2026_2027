(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let state=STORE.load();
if(!state.profile||typeof state.profile!=='object')state.profile={name:'',className:''};
let currentQuiz=null, timerId=null;
const LEVELS=['Nhận biết','Thông hiểu','Vận dụng'];
// Ma trận luyện tập/thi thử tham khảo của website.
// Mỗi đề 30 câu: 12 Nhận biết, 9 Thông hiểu, 9 Vận dụng.
const FINAL_BLUEPRINT={
  1:{'Nhận biết':2,'Thông hiểu':1,'Vận dụng':1},
  2:{'Nhận biết':1,'Thông hiểu':1,'Vận dụng':1},
  3:{'Nhận biết':1,'Thông hiểu':1,'Vận dụng':0},
  4:{'Nhận biết':2,'Thông hiểu':2,'Vận dụng':1},
  5:{'Nhận biết':1,'Thông hiểu':1,'Vận dụng':0},
  6:{'Nhận biết':2,'Thông hiểu':2,'Vận dụng':3},
  7:{'Nhận biết':3,'Thông hiểu':1,'Vận dụng':3}
};
const topicById=id=>TOPICS.find(t=>t.id===id);
const lessonById=id=>LESSONS.find(l=>l.id===id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function csvCell(v){return `"${String(v??'').replace(/"/g,'""')}"`;}
function safeFilePart(s){return String(s||'hoc-sinh').trim().replace(/[^\p{L}\p{N}._-]+/gu,'-').replace(/^-+|-+$/g,'')||'hoc-sinh';}
function downloadText(filename,text,type='text/plain;charset=utf-8'){
 const blob=new Blob(['\ufeff'+text],{type});
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');
 a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),500);
}
function learningSummary(){
 const acc=state.attempted?Math.round(state.correct/state.attempted*100):0;
 const best=state.examHistory.length?Math.max(...state.examHistory.map(h=>Number(h.point)||0)):0;
 const latest=state.examHistory[0];
 return {
   name:state.profile?.name||'',
   className:state.profile?.className||'',
   completed:state.completedLessons.length,
   lessons:LESSONS.length,
   attempted:state.attempted,
   correct:state.correct,
   accuracy:acc,
   wrong:state.wrongIds.length,
   examCount:state.examHistory.length,
   best:best.toFixed(1),
   latest:latest?`${latest.point}/10 (${latest.score}/${latest.total})`:'Chưa thi'
 };
}
function exportLearningCSV(){
 const s=learningSummary();
 const rows=[
   ['BÁO CÁO HỌC TẬP TIN HỌC 11'],
   ['Họ và tên',s.name],
   ['Lớp',s.className],
   ['Ngày xuất',new Date().toLocaleString('vi-VN')],
   [],
   ['TỔNG QUAN'],
   ['Bài đã đánh dấu hoàn thành',s.completed],
   ['Tổng số bài',s.lessons],
   ['Câu đã làm',s.attempted],
   ['Câu đúng',s.correct],
   ['Độ chính xác (%)',s.accuracy],
   ['Câu đang cần ôn lại',s.wrong],
   ['Số lần thi thử',s.examCount],
   ['Điểm thi thử cao nhất',s.best],
   [],
   ['LỊCH SỬ THI THỬ'],
   ['Thời gian','Chế độ','Điểm /10','Số câu đúng','Tổng câu']
 ];
 state.examHistory.forEach(h=>rows.push([
   new Date(h.date).toLocaleString('vi-VN'),
   h.title||'Thi thử',
   h.point,
   h.score,
   h.total
 ]));
 const csv=rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
 const stem=safeFilePart(`${s.className||'lop'}-${s.name||'hoc-sinh'}-tin11`);
 downloadText(`${stem}-bao-cao.csv`,csv,'text/csv;charset=utf-8');
}
async function copyLearningSummary(){
 const s=learningSummary();
 const text=[
   `BÁO CÁO HỌC TẬP TIN HỌC 11`,
   `Họ tên: ${s.name||'(chưa nhập)'}`,
   `Lớp: ${s.className||'(chưa nhập)'}`,
   `Bài hoàn thành: ${s.completed}/${s.lessons}`,
   `Câu đã làm: ${s.attempted}`,
   `Câu đúng: ${s.correct}`,
   `Độ chính xác: ${s.accuracy}%`,
   `Câu cần ôn: ${s.wrong}`,
   `Số lần thi thử: ${s.examCount}`,
   `Điểm cao nhất: ${s.best}/10`,
   `Lần thi gần nhất: ${s.latest}`
 ].join('\n');
 try{
   await navigator.clipboard.writeText(text);
   alert('Đã sao chép tóm tắt kết quả.');
 }catch(e){
   prompt('Sao chép nội dung dưới đây:',text);
 }
}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function blueprintTotal(multiplier=1){
 return Object.values(FINAL_BLUEPRINT).reduce((sum,row)=>sum+LEVELS.reduce((s,l)=>s+(row[l]||0)*multiplier,0),0);
}
function pickByBlueprint(multiplier=1){
 const picked=[];
 TOPICS.forEach(t=>{
   const used=new Set();
   LEVELS.forEach(level=>{
     const need=(FINAL_BLUEPRINT[t.id]?.[level]||0)*multiplier;
     const pool=shuffle(QUESTIONS.filter(q=>q.topicId===t.id&&q.level===level&&!used.has(q.id)));
     pool.slice(0,need).forEach(q=>{picked.push(q);used.add(q.id);});
   });
 });
 return shuffle(picked);
}
function startFinalReview(multiplier=1){
 const items=pickByBlueprint(multiplier);
 startQuiz(items,{mode:'practice',title:`Ôn tập cuối kì II · ${items.length} câu`});
}
function startLevelReview(level){
 const pool=shuffle(QUESTIONS.filter(q=>q.level===level)).slice(0,30);
 startQuiz(pool,{mode:'practice',title:`Ôn theo mức độ · ${level}`});
}
function renderFinalReview(){
 const rows=TOPICS.map(t=>{
   const b=FINAL_BLUEPRINT[t.id];
   const total=LEVELS.reduce((s,l)=>s+(b[l]||0),0);
   return `<tr><td><strong>Chủ đề ${t.id}</strong><br><small>${esc(t.name)}</small></td><td>${total}</td><td>${b['Nhận biết']||0}</td><td>${b['Thông hiểu']||0}</td><td>${b['Vận dụng']||0}</td></tr>`;
 }).join('');
 $('#finalReviewContent').innerHTML=`
 <div class="section-head"><div><span class="eyebrow">ÔN TẬP CUỐI KÌ II</span><h2>Ôn có định hướng · Thi thử theo ma trận</h2><p>Ngân hàng 860 câu được khai thác theo chủ đề và mức độ, không lấy ngẫu nhiên đều toàn bộ 31 bài.</p></div></div>
 <div class="review-mode-grid">
   <article class="review-mode-card"><div class="review-icon">⚡</div><span class="eyebrow">ÔN NHANH</span><h3>30 câu trọng tâm</h3><p>Đúng ma trận thi thử, có phản hồi và giải thích ngay sau từng câu.</p><button class="btn primary" id="review30Btn">Bắt đầu 30 câu</button></article>
   <article class="review-mode-card"><div class="review-icon">📚</div><span class="eyebrow">ÔN TỔNG HỢP</span><h3>60 câu bao phủ rộng</h3><p>Gấp đôi ma trận 30 câu để tăng độ bao phủ nhưng vẫn giữ đúng tỉ lệ chủ đề và mức độ.</p><button class="btn primary" id="review60Btn">Bắt đầu 60 câu</button></article>
   <article class="review-mode-card"><div class="review-icon">⏱️</div><span class="eyebrow">THI THỬ</span><h3>30 câu · 45 phút</h3><p>Không hiện đáp án khi đang làm; được đổi phương án trước khi nộp bài.</p><button class="btn primary" id="reviewExamBtn">Tạo đề thi thử</button></article>
 </div>
 <section class="panel">
   <div class="section-head"><div><h3>🎯 Ôn theo mức độ nhận thức</h3><p>Mỗi lượt lấy ngẫu nhiên 30 câu trong toàn ngân hàng.</p></div></div>
   <div class="level-actions">
     <button class="btn ghost" data-level-review="Nhận biết">Nhận biết · 30 câu</button>
     <button class="btn ghost" data-level-review="Thông hiểu">Thông hiểu · 30 câu</button>
     <button class="btn ghost" data-level-review="Vận dụng">Vận dụng · 30 câu</button>
   </div>
 </section>
 <section class="panel">
   <div class="section-head"><div><h3>📊 Ma trận 30 câu của website</h3><p>12 Nhận biết · 9 Thông hiểu · 9 Vận dụng. Chủ đề thực hành CSDL và chỉnh sửa ảnh/video được tăng trọng số.</p></div><span class="matrix-total">${blueprintTotal()} câu</span></div>
   <div class="table-wrap"><table><thead><tr><th>Chủ đề</th><th>Tổng</th><th>Nhận biết</th><th>Thông hiểu</th><th>Vận dụng</th></tr></thead><tbody>${rows}<tr class="matrix-sum"><td><strong>Tổng</strong></td><td><strong>30</strong></td><td><strong>12</strong></td><td><strong>9</strong></td><td><strong>9</strong></td></tr></tbody></table></div>
   <p class="matrix-note">Lưu ý: đây là ma trận luyện tập tham khảo được thiết kế cho website. Khi có ma trận/đặc tả chính thức của nhà trường, có thể thay các con số mà không cần sửa ngân hàng câu hỏi.</p>
 </section>`;
 $('#review30Btn').onclick=()=>startFinalReview(1);
 $('#review60Btn').onclick=()=>startFinalReview(2);
 $('#reviewExamBtn').onclick=startExam;
 $$('[data-level-review]').forEach(b=>b.onclick=()=>startLevelReview(b.dataset.levelReview));
}
function save(){STORE.save(state); renderStats();}
function navigate(view, payload){$$('.view').forEach(v=>v.classList.remove('active')); const el=$(`#view-${view}`); if(el) el.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); if(payload){ if(view==='lesson')renderLesson(payload); if(view==='topic')renderTopic(payload); } closeMenu();}
function closeMenu(){$('#navLinks').classList.remove('open');}
function renderStats(){
 const pct=Math.round((state.completedLessons.length/LESSONS.length)*100);
 $('#statTopics').textContent=TOPICS.length; $('#statLessons').textContent=LESSONS.length; $('#statQuestions').textContent=QUESTIONS.length; $('#statProgress').textContent=pct+'%';
 $('#progressBar').style.width=pct+'%'; $('#progressText').textContent=`${state.completedLessons.length}/${LESSONS.length} bài đã đánh dấu hoàn thành`;
 const acc=state.attempted?Math.round(state.correct/state.attempted*100):0;
 const pd=$('#progressDetails'); if(pd) pd.innerHTML=`<div class="metric"><b>${state.attempted}</b><span>Câu đã làm</span></div><div class="metric"><b>${state.correct}</b><span>Câu đúng</span></div><div class="metric"><b>${acc}%</b><span>Độ chính xác</span></div><div class="metric"><b>${state.wrongIds.length}</b><span>Câu cần ôn</span></div>`;
}
function renderTopics(){
 $('#topicGrid').innerHTML=TOPICS.map(t=>{const done=t.lessons.filter(id=>state.completedLessons.includes(id)).length; const p=Math.round(done/t.lessons.length*100);return `<article class="topic-card"><div class="topic-icon">${t.icon}</div><div><span class="eyebrow">CHỦ ĐỀ ${t.id}</span><h3>${esc(t.name)}</h3><p>${t.lessons.length} bài học · ${done}/${t.lessons.length} hoàn thành</p><div class="mini-progress"><span style="width:${p}%"></span></div><button class="btn ghost" data-topic="${t.id}">Ôn tập ngay →</button></div></article>`}).join('');
 $$('[data-topic]').forEach(b=>b.onclick=()=>navigate('topic',+b.dataset.topic));
}
function renderTopic(id){const t=topicById(id); $('#topicDetail').innerHTML=`<div class="section-head"><div><span class="eyebrow">CHỦ ĐỀ ${t.id}</span><h2>${esc(t.name)}</h2></div><button class="btn primary" id="topicPracticeBtn">Luyện 20 câu</button></div><div class="lesson-grid">${t.lessons.map(lid=>{const l=lessonById(lid);const qn=QUESTIONS.filter(q=>q.lessonId===lid).length;return `<button class="lesson-card ${state.completedLessons.includes(lid)?'done':''}" data-lesson="${lid}"><span>Bài ${lid}</span><strong>${esc(l.title)}</strong><small>${qn} câu · ${state.completedLessons.includes(lid)?'✓ Đã học':'Chưa đánh dấu'}</small></button>`}).join('')}</div>`;
 $$('[data-lesson]', $('#topicDetail')).forEach(b=>b.onclick=()=>navigate('lesson',+b.dataset.lesson)); $('#topicPracticeBtn').onclick=()=>startTopicQuiz(id);
}
function renderLesson(id){const l=lessonById(id),t=topicById(l.topic); const q=QUESTIONS.filter(x=>x.lessonId===id); const cards=q.slice(0,5); $('#lessonDetail').innerHTML=`<button class="text-btn" id="backTopic">← ${esc(t.name)}</button><div class="lesson-hero"><span class="eyebrow">CHỦ ĐỀ ${t.id} · BÀI ${l.id}</span><h2>${esc(l.title)}</h2><p>Kiến thức được biên soạn bám theo SGK Tin học 11 – Kết nối tri thức với cuộc sống.</p><button class="btn ${state.completedLessons.includes(id)?'ghost':'primary'}" id="completeLesson">${state.completedLessons.includes(id)?'✓ Đã hoàn thành':'Đánh dấu đã học'}</button></div><div class="content-grid"><section class="panel"><h3>📌 Kiến thức trọng tâm</h3><ul class="key-list">${l.summary.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="remember"><b>Cần nhớ</b><span>Ôn khái niệm → hiểu vai trò → luyện câu hỏi → xem lại câu sai.</span></div></section><section class="panel"><h3>🧠 Flashcard ghi nhớ nhanh</h3><div class="flashcard" id="flashcard"><div class="flash-inner"><div class="flash-front"><small>CÂU HỎI</small><strong id="flashQ"></strong></div><div class="flash-back"><small>GỢI Ý / ĐÁP ÁN</small><strong id="flashA"></strong></div></div></div><div class="flash-controls"><button class="btn ghost" id="prevCard">← Trước</button><button class="btn primary" id="flipCard">Lật thẻ</button><button class="btn ghost" id="nextCard">Sau →</button></div></section></div><section class="panel"><div class="section-head"><div><h3>✍️ Luyện tập nhanh</h3><p>${q.length} câu hỏi · có giải thích ngay sau mỗi câu</p></div><button class="btn primary" id="lessonQuizBtn">Bắt đầu luyện</button></div></section>`;
 $('#backTopic').onclick=()=>navigate('topic',l.topic); $('#completeLesson').onclick=()=>{if(!state.completedLessons.includes(id))state.completedLessons.push(id);else state.completedLessons=state.completedLessons.filter(x=>x!==id);save();renderLesson(id);renderTopics();}; $('#lessonQuizBtn').onclick=()=>startQuiz(shuffle(q),{mode:'practice',title:`Bài ${id}. ${l.title}`});
 let ci=0; function showCard(){const c=cards[ci];$('#flashQ').textContent=c.question;$('#flashA').textContent=c.options[c.correctAnswer];$('#flashcard').classList.remove('flipped');} showCard(); $('#flipCard').onclick=()=>$('#flashcard').classList.toggle('flipped'); $('#prevCard').onclick=()=>{ci=(ci-1+cards.length)%cards.length;showCard();}; $('#nextCard').onclick=()=>{ci=(ci+1)%cards.length;showCard();};
}
function startTopicQuiz(topicId){const pool=QUESTIONS.filter(q=>q.topicId===topicId);startQuiz(shuffle(pool).slice(0,Math.min(20,pool.length)),{mode:'practice',title:`Luyện tập Chủ đề ${topicId}`});}
function startExam(){const final=pickByBlueprint(1);startQuiz(final,{mode:'exam',title:'Thi thử cuối kì II · 30 câu',seconds:45*60,blueprint:'final'});}
function startQuiz(items,opts){clearInterval(timerId);currentQuiz={items,index:0,answers:{},score:0,opts,start:Date.now(),submitted:false}; navigate('quiz'); renderQuiz(); if(opts.mode==='exam'){startTimer(opts.seconds);} }
function startTimer(sec){function tick(){const elapsed=Math.floor((Date.now()-currentQuiz.start)/1000),left=Math.max(0,sec-elapsed),m=String(Math.floor(left/60)).padStart(2,'0'),s=String(left%60).padStart(2,'0');$('#quizTimer').textContent=`⏱ ${m}:${s}`;if(left<=0){clearInterval(timerId);submitQuiz();}} tick(); timerId=setInterval(tick,1000);}
function renderQuiz(){const cq=currentQuiz,q=cq.items[cq.index],exam=cq.opts.mode==='exam'; $('#quizTitle').textContent=cq.opts.title; $('#quizCounter').textContent=`Câu ${cq.index+1}/${cq.items.length}`; $('#quizTimer').style.display=exam?'inline-flex':'none'; $('#quizProgress').style.width=`${((cq.index+1)/cq.items.length)*100}%`; const answered=cq.answers[q.id]; $('#quizBody').innerHTML=`<div class="quiz-meta"><span>${esc(q.lesson)}</span><span>${esc(q.level)}</span></div><h2>${esc(q.question)}</h2><div class="options">${q.options.map((o,i)=>`<button class="option ${answered!==undefined&&i===answered?'selected':''}" data-opt="${i}" ${answered!==undefined&&!exam?'disabled':''}><b>${String.fromCharCode(65+i)}</b><span>${esc(o)}</span></button>`).join('')}</div><div id="feedback"></div><div class="quiz-actions"><button class="btn ghost" id="prevQ" ${cq.index===0?'disabled':''}>← Câu trước</button>${cq.index===cq.items.length-1?'<button class="btn primary" id="submitQuizBtn">Nộp bài</button>':'<button class="btn primary" id="nextQ">Câu tiếp →</button>'}</div>`;
 if(answered!==undefined&&!exam)showFeedback(q,answered); $$('.option').forEach(b=>b.onclick=()=>answerQuestion(q,+b.dataset.opt)); $('#prevQ').onclick=()=>{cq.index--;renderQuiz();}; if($('#nextQ'))$('#nextQ').onclick=()=>{cq.index++;renderQuiz();}; if($('#submitQuizBtn'))$('#submitQuizBtn').onclick=submitQuiz;
}
function answerQuestion(q,choice){
 const cq=currentQuiz;
 const exam=cq.opts.mode==='exam';
 if(!exam&&cq.answers[q.id]!==undefined)return;
 cq.answers[q.id]=choice;
 if(exam){renderQuiz();return;}
 const correct=choice===q.correctAnswer;
 if(correct)cq.score++;
 state.attempted++;
 if(correct){state.correct++;state.wrongIds=state.wrongIds.filter(id=>id!==q.id);}
 else if(!state.wrongIds.includes(q.id))state.wrongIds.push(q.id);
 save();
 renderQuiz();
}
function showFeedback(q,choice){const ok=choice===q.correctAnswer; $('#feedback').innerHTML=`<div class="feedback ${ok?'ok':'bad'}"><b>${ok?'✅ Chính xác!':'❌ Chưa chính xác.'}</b><p><strong>Đáp án đúng:</strong> ${esc(q.options[q.correctAnswer])}</p><p>💡 ${esc(q.explanation)}</p></div>`;}
function submitQuiz(){
 clearInterval(timerId);
 const cq=currentQuiz;
 if(!cq||cq.submitted)return;
 cq.submitted=true;
 const total=cq.items.length,answered=Object.keys(cq.answers).length;
 let score=0;
 const byTopic={},byLevel={};
 cq.items.forEach(q=>{
   const ok=cq.answers[q.id]===q.correctAnswer;
   if(ok)score++;
   byTopic[q.topic]??={right:0,total:0};
   byTopic[q.topic].total++;
   if(ok)byTopic[q.topic].right++;
   byLevel[q.level]??={right:0,total:0};
   byLevel[q.level].total++;
   if(ok)byLevel[q.level].right++;
 });
 const pct=Math.round(score/total*100),point=(score/total*10).toFixed(1);
 if(cq.opts.mode==='exam'){
   cq.items.forEach(q=>{
     const a=cq.answers[q.id];
     if(a===undefined)return;
     const ok=a===q.correctAnswer;
     state.attempted++;
     if(ok){state.correct++;state.wrongIds=state.wrongIds.filter(id=>id!==q.id);}
     else if(!state.wrongIds.includes(q.id))state.wrongIds.push(q.id);
   });
   state.examHistory.unshift({
     date:new Date().toISOString(),score,total,point,
     title:cq.opts.title,
     levels:Object.fromEntries(Object.entries(byLevel).map(([k,v])=>[k,{...v}]))
   });
   state.examHistory=state.examHistory.slice(0,10);
   save();
 }
 navigate('results');
 $('#resultContent').innerHTML=`
 <div class="result-hero"><div class="score-ring" style="--p:${pct}"><div><strong>${point}</strong><span>/10</span></div></div><div><span class="eyebrow">KẾT QUẢ ÔN TẬP</span><h2>${score}/${total} câu đúng · ${pct}%</h2><p>Đã trả lời ${answered}/${total} câu. ${pct>=80?'🟢 Đã nắm khá vững.':pct>=60?'🟡 Cần ôn thêm một số phần.':'🔴 Nên quay lại các bài còn yếu.'}</p></div></div>
 <div class="analysis-grid">
   <div class="panel"><h3>Phân tích theo chủ đề</h3><div class="table-wrap"><table><thead><tr><th>Chủ đề</th><th>Đúng</th><th>Tổng</th><th>Tỉ lệ</th></tr></thead><tbody>${Object.entries(byTopic).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v.right}</td><td>${v.total}</td><td>${Math.round(v.right/v.total*100)}%</td></tr>`).join('')}</tbody></table></div></div>
   <div class="panel"><h3>Phân tích theo mức độ</h3><div class="table-wrap"><table><thead><tr><th>Mức độ</th><th>Đúng</th><th>Tổng</th><th>Tỉ lệ</th></tr></thead><tbody>${LEVELS.filter(k=>byLevel[k]).map(k=>{const v=byLevel[k];return `<tr><td>${esc(k)}</td><td>${v.right}</td><td>${v.total}</td><td>${Math.round(v.right/v.total*100)}%</td></tr>`}).join('')}</tbody></table></div></div>
 </div>
 <div class="result-actions"><button class="btn primary" id="reviewAnswers">Xem đáp án</button><button class="btn ghost" id="retryQuiz">Làm lại</button><button class="btn ghost" id="newExam">Tạo đề thi thử mới</button><button class="btn ghost" id="backFinalReview">Ôn cuối kì</button></div><div id="answerReview"></div>`;
 $('#reviewAnswers').onclick=()=>renderAnswerReview(cq);
 $('#retryQuiz').onclick=()=>startQuiz(shuffle(cq.items),{...cq.opts});
 $('#newExam').onclick=startExam;
 $('#backFinalReview').onclick=()=>{renderFinalReview();navigate('final-review');};
}
function renderAnswerReview(cq){$('#answerReview').innerHTML=cq.items.map((q,i)=>{const a=cq.answers[q.id];const ok=a===q.correctAnswer;return `<article class="review-item ${ok?'ok':'bad'}"><b>Câu ${i+1}. ${esc(q.question)}</b><p>Bạn chọn: ${a===undefined?'Chưa trả lời':esc(q.options[a])}</p><p>Đáp án: <strong>${esc(q.options[q.correctAnswer])}</strong></p><small>💡 ${esc(q.explanation)}</small></article>`}).join('');}

function renderGuide(){
 const p=state.profile||{name:'',className:''};
 const s=learningSummary();
 $('#guideContent').innerHTML=`
 <div class="section-head"><div><span class="eyebrow">HƯỚNG DẪN & MINH CHỨNG</span><h2>Triển khai cho học sinh và lưu bằng chứng học tập</h2><p>Website chạy tĩnh; dữ liệu mặc định lưu bằng localStorage trên chính trình duyệt đang sử dụng.</p></div></div>
 <div class="guide-grid">
   <section class="panel">
     <h3>👤 Hồ sơ học sinh</h3>
     <p class="muted">Thông tin này chỉ được lưu trên thiết bị để gắn vào báo cáo CSV. Không gửi tự động đi đâu.</p>
     <label class="field-label">Họ và tên</label>
     <input class="text-input" id="profileName" placeholder="Ví dụ: Nguyễn Văn A" value="${esc(p.name||'')}">
     <label class="field-label">Lớp</label>
     <input class="text-input" id="profileClass" placeholder="Ví dụ: 11A1" value="${esc(p.className||'')}">
     <div class="form-actions"><button class="btn primary" id="saveProfileBtn">Lưu hồ sơ</button></div>
   </section>
   <section class="panel">
     <h3>📄 Xuất minh chứng cá nhân</h3>
     <div class="evidence-metrics">
       <div><b>${s.completed}/${s.lessons}</b><span>Bài hoàn thành</span></div>
       <div><b>${s.attempted}</b><span>Câu đã làm</span></div>
       <div><b>${s.accuracy}%</b><span>Độ chính xác</span></div>
       <div><b>${s.examCount}</b><span>Lần thi thử</span></div>
     </div>
     <p class="muted">Học sinh có thể tải một tệp CSV sau mỗi đợt học hoặc thi thử để nộp cho giáo viên làm minh chứng.</p>
     <div class="form-actions"><button class="btn primary" id="exportCsvBtn">Tải báo cáo CSV</button><button class="btn ghost" id="copySummaryBtn">Sao chép tóm tắt</button></div>
   </section>
 </div>
 <div class="guide-grid">
   <section class="panel">
     <h3>🎓 Quy trình dành cho học sinh</h3>
     <ol class="step-list">
       <li>Nhập họ tên và lớp trong mục này.</li>
       <li>Ôn theo từng bài/chủ đề; đánh dấu bài đã học.</li>
       <li>Làm Ôn cuối kì 30 hoặc 60 câu.</li>
       <li>Làm ít nhất một đề Thi thử 30 câu – 45 phút.</li>
       <li>Vào Câu sai để ôn lại các câu chưa đúng.</li>
       <li>Cuối đợt, quay lại đây và tải Báo cáo CSV.</li>
     </ol>
   </section>
   <section class="panel">
     <h3>🧑‍🏫 Gợi ý thu minh chứng cho sáng kiến</h3>
     <ol class="step-list">
       <li>Khảo sát/kiểm tra đầu vào trước khi triển khai.</li>
       <li>Cho học sinh sử dụng website trong khoảng thời gian xác định.</li>
       <li>Yêu cầu học sinh nộp báo cáo CSV ở các mốc đã quy định.</li>
       <li>Tổ chức bài kiểm tra/khảo sát sau tác động với cùng nhóm chỉ số.</li>
       <li>Đối chiếu trước – sau: tỉ lệ hoàn thành, độ chính xác, điểm thi thử và kết quả kiểm tra.</li>
     </ol>
     <p class="notice">Để tổng hợp tập trung cho cả lớp, nên dùng thêm Google Form/SHub hoặc một công cụ thu bài; website tĩnh này không tự gửi dữ liệu học sinh về giáo viên.</p>
   </section>
 </div>
 <section class="panel">
   <h3>🌐 Đưa website lên Internet</h3>
   <p>Có thể triển khai miễn phí bằng GitHub Pages hoặc Netlify. Trong gói website đã có tệp <b>DEPLOY_GUIDE.md</b> hướng dẫn từng bước.</p>
   <p class="muted">Khi đăng Internet, hãy tải toàn bộ nội dung bên trong thư mục website, bảo đảm <code>index.html</code>, <code>css/</code> và <code>js/</code> nằm đúng cấu trúc.</p>
 </section>`;
 $('#saveProfileBtn').onclick=()=>{
   state.profile={
     name:$('#profileName').value.trim(),
     className:$('#profileClass').value.trim()
   };
   save();
   renderGuide();
   alert('Đã lưu hồ sơ trên thiết bị này.');
 };
 $('#exportCsvBtn').onclick=exportLearningCSV;
 $('#copySummaryBtn').onclick=copyLearningSummary;
}
function renderWrong(){const list=QUESTIONS.filter(q=>state.wrongIds.includes(q.id)); $('#wrongContent').innerHTML=list.length?`<div class="section-head"><div><h2>Câu hỏi tôi thường sai</h2><p>${list.length} câu đang chờ ôn lại</p></div><button class="btn primary" id="wrongQuiz">Ôn lại tất cả</button></div><div class="wrong-list">${list.map(q=>`<article><span>${esc(q.lesson)}</span><b>${esc(q.question)}</b><small>${esc(q.explanation)}</small></article>`).join('')}</div>`:`<div class="empty"><div>🎉</div><h2>Chưa có câu sai cần ôn</h2><p>Các câu trả lời sai sẽ tự động xuất hiện ở đây.</p></div>`; if($('#wrongQuiz'))$('#wrongQuiz').onclick=()=>startQuiz(shuffle(list),{mode:'practice',title:'Ôn lại câu sai'});}
function renderProgress(){const hist=state.examHistory; $('#progressContent').innerHTML=`<div class="section-head"><div><h2>Tiến độ học tập</h2><p>Dữ liệu được lưu trên trình duyệt của thiết bị này.</p></div><button class="btn danger" id="resetProgress">Đặt lại tiến độ</button></div><div id="progressDetails" class="metrics"></div><div class="panel"><h3>Lịch sử thi thử</h3>${hist.length?`<div class="table-wrap"><table><thead><tr><th>Thời gian</th><th>Chế độ</th><th>Điểm</th><th>Kết quả</th></tr></thead><tbody>${hist.map(h=>`<tr><td>${new Date(h.date).toLocaleString('vi-VN')}</td><td>${esc(h.title||'Thi thử')}</td><td>${h.point}/10</td><td>${h.score}/${h.total}</td></tr>`).join('')}</tbody></table></div>`:'<p>Chưa có lần thi thử nào.</p>'}</div>`; renderStats(); $('#resetProgress').onclick=()=>{if(confirm('Bạn có chắc muốn xoá toàn bộ tiến độ, câu sai và lịch sử thi thử?')){state=STORE.reset();applyTheme();renderTopics();renderProgress();renderStats();}};}
function searchLessons(term){term=term.trim().toLowerCase(); if(!term){$('#searchResults').innerHTML='';return;} const found=LESSONS.filter(l=>('bài '+l.id+' '+l.title+' '+l.summary.join(' ')).toLowerCase().includes(term)); $('#searchResults').innerHTML=found.length?found.map(l=>`<button data-search-lesson="${l.id}"><b>Bài ${l.id}. ${esc(l.title)}</b><small>${esc(l.summary[0])}</small></button>`).join(''):'<div class="no-result">Không tìm thấy bài/kiến thức phù hợp.</div>'; $$('[data-search-lesson]').forEach(b=>b.onclick=()=>{navigate('lesson',+b.dataset.searchLesson);$('#searchResults').innerHTML='';$('#searchInput').value='';});}
function applyTheme(){document.documentElement.dataset.theme=state.theme||'light';$('#themeBtn').textContent=state.theme==='dark'?'☀️':'🌙';}
function init(){renderTopics();renderStats();applyTheme();
 $$('[data-nav]').forEach(a=>a.onclick=e=>{e.preventDefault();const v=a.dataset.nav;if(v==='wrong'){renderWrong();navigate('wrong');}else if(v==='progress'){renderProgress();navigate('progress');}else if(v==='guide'){renderGuide();navigate('guide');}else if(v==='exam'){startExam();}else if(v==='final-review'){renderFinalReview();navigate('final-review');}else if(['topics','lessons','flashcards','practice'].includes(v)){navigate('topics');}else navigate(v);});
 $('#startBtn').onclick=()=>{renderFinalReview();navigate('final-review');};$('#examBtn').onclick=startExam;$('#examBtn2').onclick=startExam;$('#finalReviewBtnHome').onclick=()=>{renderFinalReview();navigate('final-review');};$('#wrongBtn').onclick=()=>{renderWrong();navigate('wrong');};$('#menuBtn').onclick=()=>$('#navLinks').classList.toggle('open');$('#themeBtn').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';save();applyTheme();};$('#searchInput').addEventListener('input',e=>searchLessons(e.target.value));
}
document.addEventListener('DOMContentLoaded',init);
})();

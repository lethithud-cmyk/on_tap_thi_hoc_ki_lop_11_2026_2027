(()=>{
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const letters=['A','B','C','D'];
  const MASTERY=80, DEVELOPING=60, RECOVERY_TARGET=2;
  let grade=Number(localStorage.getItem('review_active_grade'))||0;
  let course=null,state=null,profile=STORE.loadProfile(),quiz=null,timerHandle=null;

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const topicBy=id=>course.topics.find(t=>t.id===Number(id));
  const lessonBy=id=>course.lessons.find(l=>l.id===Number(id));
  const questionsForLesson=id=>course.questions.filter(q=>q.lessonId===Number(id));
  const questionsForTopic=id=>course.questions.filter(q=>q.topicId===Number(id));

  function selectGrade(g){
    grade=Number(g);course=COURSES[grade];if(!course)return;
    localStorage.setItem('review_active_grade',grade);state=STORE.load(grade);
    applyTheme();renderShell();hideCourseGate();showStudentGate(false);show('home');
  }
  function showCourseGate(){const x=$('#courseGate');x.classList.add('show');x.setAttribute('aria-hidden','false');document.body.classList.add('gate-open');}
  function hideCourseGate(){const x=$('#courseGate');x.classList.remove('show');x.setAttribute('aria-hidden','true');document.body.classList.remove('gate-open');}
  function showStudentGate(force=false){
    if(!course)return;const missing=!profile.name.trim()||!profile.className.trim(),x=$('#studentGate');
    if(!force&&!missing){x.classList.remove('show');x.setAttribute('aria-hidden','true');document.body.classList.remove('gate-open');updateStudentBadge();return;}
    $('#gateName').value=profile.name||'';$('#gateClass').value=profile.className||'';$('#gateCode').value=profile.studentCode||'';$('#gateError').textContent='';
    x.classList.add('show');x.setAttribute('aria-hidden','false');document.body.classList.add('gate-open');
  }
  function saveProfile(){
    const name=$('#gateName').value.trim(),className=$('#gateClass').value.trim(),studentCode=$('#gateCode').value.trim();
    if(!name||!className){$('#gateError').textContent='Vui lòng nhập đầy đủ Họ và tên và Lớp.';return;}
    profile={name,className,studentCode};STORE.saveProfile(profile);showStudentGate(false);renderShell();
  }
  function updateStudentBadge(){const b=$('#studentBadge');b.textContent=profile.name&&profile.className?`👤 ${profile.name} · ${profile.className}`:'👤 Chưa nhập thông tin';}
  function save(){STORE.save(grade,state);renderStats();renderHomeInsights();}
  function applyTheme(){document.documentElement.dataset.theme=state?.theme==='dark'?'dark':'light';if($('#themeBtn'))$('#themeBtn').textContent=state?.theme==='dark'?'☀️':'🌙';}

  function lessonStat(id){return state.lessonStats?.[id]||null;}
  function lessonStatus(id){
    const s=lessonStat(id);
    if(s&&Number.isFinite(s.bestPct)){
      if(s.bestPct>=MASTERY)return {key:'master',label:'Thành thạo',icon:'✓',pct:s.bestPct};
      if(s.bestPct>=DEVELOPING)return {key:'learning',label:'Đang củng cố',icon:'↗',pct:s.bestPct};
      return {key:'weak',label:'Cần ôn lại',icon:'!',pct:s.bestPct};
    }
    if(state.completedLessons.includes(Number(id)))return {key:'legacy',label:'Đã học trước v12',icon:'•',pct:null};
    return {key:'new',label:'Chưa đánh giá',icon:'○',pct:null};
  }
  function masteredLessons(){return course.lessons.filter(l=>lessonStatus(l.id).key==='master').length;}
  function overallAccuracy(){return state.attempted?Math.round(state.correct/state.attempted*100):0;}
  function levelPerformance(){
    return course.levels.map(level=>{const x=state.levelStats?.[level]||{right:0,total:0};return {level,right:x.right||0,total:x.total||0,pct:x.total?Math.round(x.right/x.total*100):null};});
  }
  function weakLevel(){
    const rows=levelPerformance().filter(x=>x.total>=2&&x.pct!==null);
    return rows.length?[...rows].sort((a,b)=>a.pct-b.pct)[0]:null;
  }
  function strongLevel(){
    const rows=levelPerformance().filter(x=>x.total>=2&&x.pct!==null);
    return rows.length?[...rows].sort((a,b)=>b.pct-a.pct)[0]:null;
  }
  function wrongCountForLesson(id){return course.questions.filter(q=>q.lessonId===Number(id)&&state.wrongIds.includes(q.id)).length;}
  function recommendedLesson(){
    const tried=course.lessons.map(l=>({l,s:lessonStatus(l.id),wrong:wrongCountForLesson(l.id)})).filter(x=>x.s.key!=='master');
    if(!tried.length)return course.lessons[0]||null;
    tried.sort((a,b)=>{
      const ap=a.s.pct===null?75:a.s.pct,bp=b.s.pct===null?75:b.s.pct;
      if(a.wrong!==b.wrong)return b.wrong-a.wrong;
      if(ap!==bp)return ap-bp;
      return a.l.id-b.l.id;
    });
    return tried[0].l;
  }
  function masteryLabel(){
    const acc=overallAccuracy(),m=masteredLessons();
    if(!state.attempted)return {text:'Chưa có dữ liệu',cls:'neutral'};
    if(acc>=85&&m>=Math.max(2,Math.floor(course.lessons.length*.25)))return {text:'Tiến bộ tốt',cls:'master'};
    if(acc>=65)return {text:'Đang tiến bộ',cls:'learning'};
    return {text:'Cần củng cố',cls:'weak'};
  }

  function renderShell(){
    $('#courseBadge').textContent=grade;$('#brandTitle').textContent=`TIN HỌC ${grade}`;$('#brandSub').textContent='Học theo năng lực';
    $('#heroEyebrow').textContent=`TIN HỌC ${grade} · KẾT NỐI TRI THỨC VỚI CUỘC SỐNG`;
    $('#heroTitle').innerHTML=`ÔN TẬP TIN HỌC ${grade}<br><span class="gradient">HỌC ĐÚNG PHẦN CẦN HỌC</span>`;
    $('#heroText').textContent=`${course.topics.length} chủ đề · ${course.lessons.length} bài học · ${course.questions.length} câu hỏi. Website phân tích kết quả để gợi ý nội dung cần củng cố.`;
    $('#courseNote').textContent=course.note||'';$('#footerCourse').textContent=`Website ôn tập Tin học ${grade}`;
    $('#topicHeading').textContent=`${course.topics.length} chủ đề · ${course.lessons.length} bài học`;
    $('#lessonHeading').textContent=`Tin học ${grade} · ${course.lessons.length} bài học`;
    renderCourseCards();renderStats();renderHomeInsights();renderTopics();renderLessonsAll();renderPractice();renderFlashcards();renderGuide();updateStudentBadge();
  }
  function renderCourseCards(){
    const root=$('#homeCourseCards');
    root.innerHTML=[10,11].map(g=>{const c=COURSES[g];return `<button class="course-mini ${g===grade?'active':''}" data-switch="${g}"><span class="big">${g}</span><span><h3>${c.name}</h3><p>${c.topics.length} chủ đề · ${c.lessons.length} bài · ${c.questions.length} câu</p></span></button>`}).join('');
    root.querySelectorAll('[data-switch]').forEach(b=>b.onclick=()=>selectGrade(b.dataset.switch));
  }
  function renderStats(){
    if(!course||!state)return;
    const mastered=masteredLessons(),pct=Math.round(mastered/course.lessons.length*100),acc=overallAccuracy(),label=masteryLabel();
    $('#statMastered').textContent=mastered;$('#statAttempted').textContent=state.attempted;$('#statAccuracy').textContent=acc+'%';$('#statProgress').textContent=pct+'%';
    $('#progressText').textContent=`${mastered}/${course.lessons.length} bài thành thạo`;$('#progressBar').style.width=pct+'%';
    const badge=$('#masteryBadge');badge.textContent=label.text;badge.className=`mastery-badge ${label.cls}`;
  }
  function renderHomeInsights(){
    if(!course||!state)return;
    const root=$('#homeInsights'),rec=recommendedLesson(),weak=weakLevel(),strong=strongLevel(),hasPre=state.diagnosticHistory.some(x=>x.phase==='pre');
    $('#homeGreeting').innerHTML=profile.name?`<b>Xin chào ${esc(profile.name)} 👋</b><span>${esc(profile.className)} · Khối ${grade}</span>`:'';
    const recStatus=rec?lessonStatus(rec.id):null;
    root.innerHTML=`
      <article class="insight-card recommendation"><span class="insight-icon">🧭</span><div><small>GỢI Ý TIẾP THEO</small><h3>${rec?`Bài ${rec.id}. ${esc(rec.title)}`:'Bắt đầu một bài học'}</h3><p>${recStatus&&recStatus.key==='weak'?'Kết quả hiện tại còn dưới 60%. Hãy luyện lại để củng cố.':recStatus&&recStatus.key==='learning'?'Em đang ở mức 60–79%. Chỉ cần thêm một bước để đạt thành thạo.':'Website chọn bài phù hợp dựa trên tiến độ và câu sai.'}</p>${rec?`<button class="text-btn" data-home-lesson="${rec.id}">Mở bài →</button>`:''}</div></article>
      <article class="insight-card"><span class="insight-icon">📊</span><div><small>PHÂN TÍCH MỨC ĐỘ</small><h3>${weak?`${esc(weak.level)}: ${weak.pct}%`:'Chưa đủ dữ liệu'}</h3><p>${weak?`Đây là mức độ cần ưu tiên củng cố.${strong?` Mức mạnh nhất hiện tại: ${esc(strong.level)} (${strong.pct}%).`:''}`:'Làm đánh giá nhanh hoặc luyện tập để website nhận diện điểm mạnh – điểm cần cải thiện.'}</p><button class="text-btn" id="homeAdaptiveLink">Luyện theo gợi ý →</button></div></article>
      <article class="insight-card diagnostic"><span class="insight-icon">🎯</span><div><small>ĐÁNH GIÁ NĂNG LỰC</small><h3>${hasPre?'Đánh giá lại sau ôn tập':'Thiết lập đường cơ sở'}</h3><p>${hasPre?'15 câu · 15 phút để so sánh với lần đánh giá đầu vào và thấy mức tiến bộ.':`15 câu · 15 phút, phân bố theo ${course.levels.map(x=>esc(x)).join(' – ')}, dùng làm minh chứng trước khi ôn tập.`}</p><button class="text-btn" id="homeDiagnosticLink">${hasPre?'Đánh giá lại →':'Đánh giá đầu vào →'}</button></div></article>`;
    root.querySelectorAll('[data-home-lesson]').forEach(b=>b.onclick=()=>openLesson(+b.dataset.homeLesson));
    $('#homeAdaptiveLink').onclick=startAdaptive;$('#homeDiagnosticLink').onclick=startDiagnostic;
  }
  function show(name){
    $$('.view').forEach(v=>v.classList.remove('active'));const v=$(`#view-${name}`);if(v)v.classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});$('#navLinks').classList.remove('open');$('#moreMenu')?.classList.remove('open');
  }

  function renderTopics(){
    const root=$('#topicGrid');
    root.innerHTML=course.topics.map(t=>{const qs=questionsForTopic(t.id).length,ls=t.lessons.map(lessonBy).filter(Boolean),master=ls.filter(l=>lessonStatus(l.id).key==='master').length;
      return `<article class="topic-card"><div class="topic-icon">${t.icon}</div><div><span class="eyebrow">CHỦ ĐỀ ${t.id}</span><h3>${esc(t.name)}</h3><p>${ls.length} bài · ${qs} câu hỏi · ${master}/${ls.length} bài thành thạo</p><div class="mini-progress"><span style="width:${ls.length?Math.round(master/ls.length*100):0}%"></span></div><button class="btn primary" data-topic="${t.id}">Mở chủ đề</button> <button class="btn ghost" data-topicquiz="${t.id}">Luyện 20 câu</button></div></article>`}).join('');
    root.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>openTopic(+b.dataset.topic));
    root.querySelectorAll('[data-topicquiz]').forEach(b=>b.onclick=()=>startQuiz(pickQuestions(questionsForTopic(+b.dataset.topicquiz),20),{mode:'topic',title:`Luyện Chủ đề ${b.dataset.topicquiz}`,timer:0}));
  }
  function renderLessonsAll(){const root=$('#lessonGridAll');root.innerHTML=course.lessons.map(l=>lessonCard(l)).join('');bindLessonCards(root);}
  function lessonCard(l){
    const qn=questionsForLesson(l.id).length,s=lessonStatus(l.id),score=s.pct===null?'':` · Tốt nhất ${s.pct}%`;
    return `<button class="lesson-card status-${s.key}" data-lesson="${l.id}"><div class="lesson-card-top"><span>BÀI ${l.id}</span><em class="status-pill ${s.key}">${s.icon} ${s.label}</em></div><strong>${esc(l.title)}</strong><small>${qn} câu hỏi${score}</small></button>`;
  }
  function bindLessonCards(root){root.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>openLesson(+b.dataset.lesson));}
  function openTopic(id){
    const t=topicBy(id),ls=t.lessons.map(lessonBy).filter(Boolean);
    $('#topicDetail').innerHTML=`<button class="text-btn" id="backTopics">← Chủ đề</button><div class="lesson-hero"><span class="eyebrow">CHỦ ĐỀ ${t.id}</span><h2>${esc(t.name)}</h2><p>${ls.length} bài · ${questionsForTopic(id).length} câu hỏi</p><button class="btn primary" id="topicQuizBtn">Luyện 20 câu chủ đề</button></div><div class="lesson-grid">${ls.map(lessonCard).join('')}</div>`;
    $('#backTopics').onclick=()=>show('topics');$('#topicQuizBtn').onclick=()=>startQuiz(pickQuestions(questionsForTopic(id),20),{mode:'topic',title:`Chủ đề ${id} – ${t.name}`,timer:0});bindLessonCards($('#topicDetail'));show('topic');
  }
  function levelCounts(qs){return course.levels.map(l=>[l,qs.filter(q=>q.level===l).length]);}
  function openLesson(id){
    const l=lessonBy(id),qs=questionsForLesson(id),status=lessonStatus(id),cards=l.summary.map((s,i)=>`<div class="remember"><b>${i+1}. Kiến thức trọng tâm</b><span>${esc(s)}</span></div>`).join('');
    $('#lessonDetail').innerHTML=`<button class="text-btn" id="backLessons">← Danh sách bài</button><div class="lesson-hero lesson-hero-v12"><div><span class="eyebrow">BÀI ${l.id} · CHỦ ĐỀ ${l.topic}</span><h2>${esc(l.title)}</h2><p>${esc(topicBy(l.topic).name)}</p></div><div class="lesson-status-box ${status.key}"><small>TRẠNG THÁI</small><b>${status.icon} ${status.label}</b><span>${status.pct===null?'Hãy làm bài luyện để xác định mức độ.':`Điểm tốt nhất: ${status.pct}%`}</span></div><div class="question-counts">${levelCounts(qs).map(x=>`<span>${x[0]}: ${x[1]}</span>`).join('')}</div><div class="lesson-quiz-actions"><button class="btn primary" id="lessonQuiz">Luyện 10 câu</button><button class="btn ghost" id="lessonAll">Luyện toàn bộ ${qs.length} câu</button>${status.key!=='master'?'<span class="mastery-hint">Mục tiêu thành thạo: ≥80%</span>':'<span class="mastery-hint success">✓ Đã đạt ngưỡng thành thạo</span>'}</div></div><div class="content-grid"><div class="panel"><h3>Kiến thức cần nhớ</h3><div style="display:grid;gap:10px">${cards}</div></div><div class="panel"><h3>Flashcard nhanh</h3><div class="flashcard" id="singleFlash"><div class="flash-inner"><div class="flash-front"><small>BÀI ${l.id}</small><strong>${esc(l.title)}</strong><span>Nhấp để lật</span></div><div class="flash-back"><small>GỢI NHỚ</small><strong>${esc(l.summary[0])}</strong></div></div></div></div></div>`;
    $('#backLessons').onclick=()=>show('lessons');
    $('#lessonQuiz').onclick=()=>startQuiz(pickQuestions(qs,10),{mode:'lesson',title:`Bài ${l.id} – ${l.title}`,lessonId:id,timer:0});
    $('#lessonAll').onclick=()=>startQuiz(shuffle(qs),{mode:'lesson-all',title:`Bài ${l.id} – Toàn bộ câu hỏi`,lessonId:id,timer:0});
    $('#singleFlash').onclick=e=>e.currentTarget.classList.toggle('flipped');show('lesson');
  }

  function renderFlashcards(){
    const cards=course.lessons.flatMap(l=>l.summary.map((s,i)=>({l,s,i})));let idx=0;const root=$('#flashContent');
    function paint(){const x=cards[idx];root.innerHTML=`<div class="section-head"><div><span class="eyebrow">FLASHCARD · ${idx+1}/${cards.length}</span><h2>Bài ${x.l.id}. ${esc(x.l.title)}</h2></div></div><div class="panel"><div class="flashcard" id="globalFlash"><div class="flash-inner"><div class="flash-front"><small>NHẤP ĐỂ LẬT</small><strong>${esc(x.l.title)}</strong></div><div class="flash-back"><small>GỢI NHỚ ${x.i+1}</small><strong>${esc(x.s)}</strong></div></div></div><div class="flash-controls"><button class="btn ghost" id="flashPrev">← Trước</button><button class="btn primary" id="flashNext">Sau →</button></div></div>`;$('#globalFlash').onclick=e=>e.currentTarget.classList.toggle('flipped');$('#flashPrev').onclick=()=>{idx=(idx-1+cards.length)%cards.length;paint()};$('#flashNext').onclick=()=>{idx=(idx+1)%cards.length;paint()};}
    paint();
  }

  function renderPractice(){
    const root=$('#practiceContent'),hasPre=state.diagnosticHistory.some(x=>x.phase==='pre');
    root.innerHTML=`<div class="section-head"><div><span class="eyebrow">LUYỆN TẬP CÁ NHÂN HOÁ</span><h2>Chọn cách luyện Tin học ${grade}</h2><p>Ưu tiên luyện đúng phần còn yếu thay vì làm lại toàn bộ một cách ngẫu nhiên.</p></div></div><div class="practice-grid v12-practice"><article class="practice-card featured"><div class="review-icon">✨</div><h3>Luyện theo gợi ý</h3><p>Website ưu tiên câu sai, mức độ còn yếu và bài chưa thành thạo.</p><button class="btn primary" id="adaptive10">Luyện 10 câu phù hợp</button></article><article class="practice-card"><div class="review-icon">🎯</div><h3>${hasPre?'Đánh giá lại':'Đánh giá đầu vào'}</h3><p>15 câu · 15 phút · phân bố theo ${course.levels.map(x=>esc(x)).join(' – ')} để theo dõi tiến bộ.</p><button class="btn primary" id="practiceDiagnostic">Bắt đầu</button></article><article class="practice-card"><div class="review-icon">🧩</div><h3>Câu cần củng cố</h3><p>Câu sai chỉ rời sổ sau khi trả lời đúng lại ${RECOVERY_TARGET} lần.</p><button class="btn primary" id="practiceWrong">Mở sổ câu cần ôn</button></article><article class="practice-card"><div class="review-icon">🎲</div><h3>Luyện ngẫu nhiên</h3><p>20 câu từ toàn bộ chương trình.</p><button class="btn ghost" id="random20">Bắt đầu</button></article><article class="practice-card"><div class="review-icon">⏱</div><h3>Thi thử</h3><p>30 câu · 45 phút · xem đáp án sau khi nộp.</p><button class="btn ghost" id="practiceExam">Thi thử ngay</button></article></div><div class="panel"><h3>Luyện theo mức độ</h3><div class="level-actions">${course.levels.map(l=>`<button class="btn ghost" data-p-level="${esc(l)}">${esc(l)}</button>`).join('')}</div></div><div class="panel"><h3>Luyện theo chủ đề</h3><div class="level-actions">${course.topics.map(t=>`<button class="btn ghost" data-p-topic="${t.id}">Chủ đề ${t.id}</button>`).join('')}</div></div>`;
    $('#adaptive10').onclick=startAdaptive;$('#practiceDiagnostic').onclick=startDiagnostic;$('#random20').onclick=()=>startQuiz(pickQuestions(course.questions,20),{mode:'practice',title:`Luyện ngẫu nhiên Tin ${grade}`,timer:0});$('#practiceWrong').onclick=renderWrong;$('#practiceExam').onclick=startExam;
    root.querySelectorAll('[data-p-topic]').forEach(b=>b.onclick=()=>startQuiz(pickQuestions(questionsForTopic(+b.dataset.pTopic),20),{mode:'topic',title:`Luyện Chủ đề ${b.dataset.pTopic}`,timer:0}));
    root.querySelectorAll('[data-p-level]').forEach(b=>{b.onclick=()=>{const level=b.dataset.pLevel,pool=course.questions.filter(q=>q.level===level);startQuiz(pickQuestions(pool,15),{mode:'level',title:`Luyện mức ${level}`,timer:0,targetLevel:level});};});
  }
  function pickQuestions(pool,n){return shuffle(pool).slice(0,Math.min(n,pool.length));}
  function balancedQuestions(n=15){
    const out=[],base=Math.floor(n/course.levels.length),extra=n%course.levels.length;
    course.levels.forEach((level,i)=>out.push(...pickQuestions(course.questions.filter(q=>q.level===level),base+(i<extra?1:0))));
    if(out.length<n){const used=new Set(out.map(q=>q.id));out.push(...pickQuestions(course.questions.filter(q=>!used.has(q.id)),n-out.length));}
    return shuffle(out).slice(0,n);
  }
  function adaptiveQuestions(n=10){
    const picked=[],used=new Set(),push=q=>{if(q&&!used.has(q.id)&&picked.length<n){used.add(q.id);picked.push(q);}};
    shuffle(course.questions.filter(q=>state.wrongIds.includes(q.id))).forEach(push);
    const weak=weakLevel();if(weak)shuffle(course.questions.filter(q=>q.level===weak.level)).forEach(push);
    const rec=recommendedLesson();if(rec)shuffle(questionsForLesson(rec.id)).forEach(push);
    shuffle(course.questions).forEach(push);return picked.slice(0,n);
  }
  function startAdaptive(){startQuiz(adaptiveQuestions(10),{mode:'adaptive',title:'Luyện theo gợi ý cá nhân',timer:0});}
  function startDiagnostic(){
    if(!profile.name||!profile.className){showStudentGate(true);return;}
    const hasPre=state.diagnosticHistory.some(x=>x.phase==='pre'),phase=hasPre?'post':'pre';
    startQuiz(balancedQuestions(15),{mode:`diagnostic-${phase}`,diagnosticPhase:phase,title:hasPre?'Đánh giá lại năng lực':'Đánh giá đầu vào',timer:15*60});
  }
  function startExam(){startQuiz(pickQuestions(course.questions,course.examQuestions),{mode:'exam',title:`Thi thử Tin học ${grade} – 30 câu`,timer:course.examMinutes*60});}

  function startQuiz(qs,opts){
    if(!profile.name||!profile.className){showStudentGate(true);return;}if(!qs.length)return;
    clearInterval(timerHandle);
    quiz={qs:[...qs],opts,index:0,answers:{},start:Date.now(),remaining:opts.timer||0,deadline:opts.timer?Date.now()+opts.timer*1000:0,submitted:false};
    $('#quizTitle').textContent=opts.title;$('#quizStudent').textContent=`${profile.name} · ${profile.className} · Khối ${grade}`;renderQuestion();
    updateTimerBadge();
    if(opts.timer){timerHandle=setInterval(()=>{quiz.remaining=Math.max(0,Math.ceil((quiz.deadline-Date.now())/1000));updateTimerBadge();if(quiz.remaining<=0){clearInterval(timerHandle);finishQuiz('timeout');}},1000);}
    show('quiz');
  }
  function fmtTime(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
  function updateTimerBadge(){
    const el=$('#quizTimer');if(!quiz?.opts?.timer){el.hidden=true;el.classList.remove('timer-warning','timer-urgent');return;}
    el.hidden=false;el.textContent=`⏳ ${fmtTime(quiz.remaining)}`;el.classList.toggle('timer-warning',quiz.remaining<=300&&quiz.remaining>60);el.classList.toggle('timer-urgent',quiz.remaining<=60);
  }
  function answeredCount(){return quiz.qs.reduce((n,q)=>n+(quiz.answers[q.id]!==undefined?1:0),0);}
  function unansweredIndexes(){return quiz.qs.map((q,i)=>quiz.answers[q.id]===undefined?i:-1).filter(i=>i>=0);}
  function questionNavigator(){
    return `<div class="question-navigator"><div class="question-nav-head"><span><b>Điều hướng câu hỏi</b></span><small>✓ Đã chọn · Bấm số để xem lại</small></div><div class="question-nav-grid">${quiz.qs.map((q,i)=>`<button type="button" class="question-nav-btn ${quiz.answers[q.id]!==undefined?'answered':''} ${i===quiz.index?'current':''}" data-qnav="${i}" aria-label="Đi đến câu ${i+1}">${i+1}</button>`).join('')}</div></div>`;
  }
  function renderQuestion(){
    const q=quiz.qs[quiz.index],sel=quiz.answers[q.id],answered=answeredCount(),remaining=quiz.qs.length-answered;
    $('#quizCounter').textContent=`Câu ${quiz.index+1}/${quiz.qs.length} · Đã làm ${answered} · Còn ${remaining}`;$('#quizProgress').style.width=(answered/quiz.qs.length*100)+'%';
    $('#quizBody').innerHTML=`<div class="quiz-meta"><span>${esc(q.level)}</span><span>Bài ${q.lessonId}</span><span>Chủ đề ${q.topicId}</span></div><h2>${esc(q.question)}</h2><p class="answer-hint">Chọn một phương án. Em có thể đổi đáp án bất cứ lúc nào trước khi nộp bài.</p><div class="options">${q.options.map((o,i)=>`<button class="option ${sel===i?'selected':''}" data-option="${i}"><b>${letters[i]}</b><span>${esc(o)}</span></button>`).join('')}</div>${questionNavigator()}<div class="quiz-actions"><button class="btn ghost" id="prevQ" ${quiz.index===0?'disabled':''}>← Trước</button><div class="quiz-action-right">${quiz.index<quiz.qs.length-1?'<button class="btn primary" id="nextQ">Tiếp →</button>':''}<button class="btn submit-quiz" id="finishQ">Nộp bài</button></div></div>`;
    $('#quizBody').querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>{quiz.answers[q.id]=+b.dataset.option;renderQuestion();});
    $('#quizBody').querySelectorAll('[data-qnav]').forEach(b=>b.onclick=()=>{quiz.index=+b.dataset.qnav;renderQuestion();window.scrollTo({top:0,behavior:'smooth'});});
    $('#prevQ').onclick=()=>{quiz.index--;renderQuestion()};if($('#nextQ'))$('#nextQ').onclick=()=>{quiz.index++;renderQuestion()};$('#finishQ').onclick=requestFinish;
  }
  function requestFinish(){
    const missing=unansweredIndexes();if(!missing.length){finishQuiz('manual');return;}
    openSubmitGate(missing);
  }
  function openSubmitGate(missing){
    const gate=$('#submitGate');$('#submitGateCount').textContent=`Bạn còn ${missing.length}/${quiz.qs.length} câu chưa trả lời.`;
    $('#submitGateList').textContent=`Câu chưa trả lời: ${missing.map(i=>i+1).join(', ')}.`;
    gate.classList.add('show');gate.setAttribute('aria-hidden','false');document.body.classList.add('gate-open');
    $('#submitContinue').onclick=()=>{closeSubmitGate();quiz.index=missing[0];renderQuestion();setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),30);};
    $('#submitAnyway').onclick=()=>{closeSubmitGate();finishQuiz('manual');};
  }
  function closeSubmitGate(){const gate=$('#submitGate');gate.classList.remove('show');gate.setAttribute('aria-hidden','true');document.body.classList.remove('gate-open');}

  function updateWrongRecovery(q,answeredCorrectly,wasAnswered){
    if(!wasAnswered)return;
    const r=state.wrongRecovery[q.id]||{wrongCount:0,recoveryStreak:0};
    if(answeredCorrectly){
      if(state.wrongIds.includes(q.id)){
        r.recoveryStreak=(r.recoveryStreak||0)+1;
        if(r.recoveryStreak>=RECOVERY_TARGET)state.wrongIds=state.wrongIds.filter(id=>id!==q.id);
      }
    }else{
      r.wrongCount=(r.wrongCount||0)+1;r.recoveryStreak=0;
      if(!state.wrongIds.includes(q.id))state.wrongIds.push(q.id);
    }
    state.wrongRecovery[q.id]=r;
  }
  function updateLevelStats(byLevel){
    state.levelStats=state.levelStats||{};
    Object.entries(byLevel).forEach(([level,x])=>{const cur=state.levelStats[level]||{right:0,total:0};cur.right+=x.right;cur.total+=x.total;state.levelStats[level]=cur;});
  }
  function updateLessonMastery(lessonId,pct,correct,total,byLevel){
    if(!lessonId)return;state.lessonStats=state.lessonStats||{};const prev=state.lessonStats[lessonId]||{attempts:0,bestPct:0,lastPct:0};
    const next={...prev,attempts:(prev.attempts||0)+1,lastPct:pct,bestPct:Math.max(prev.bestPct||0,pct),lastCorrect:correct,lastTotal:total,lastDate:new Date().toISOString(),lastByLevel:byLevel};
    state.lessonStats[lessonId]=next;
    if(next.bestPct>=MASTERY){if(!state.completedLessons.includes(Number(lessonId)))state.completedLessons.push(Number(lessonId));}
  }
  function diagnosticRecord(phase,pct,point,correct,total,byLevel){
    const levels={};Object.entries(byLevel).forEach(([k,v])=>levels[k]={right:v.right,total:v.total,pct:v.total?Math.round(v.right/v.total*100):0});
    state.diagnosticHistory.unshift({phase,date:new Date().toISOString(),pct,point:Number(point),correct,total,levels});
    state.diagnosticHistory=state.diagnosticHistory.slice(0,10);
  }
  function scoreClass(pct){return pct>=MASTERY?'master':pct>=DEVELOPING?'learning':'weak';}
  function resultRecommendation(byLevel,byLesson){
    const levels=Object.entries(byLevel).map(([level,x])=>({level,...x,pct:x.total?Math.round(x.right/x.total*100):0})).sort((a,b)=>a.pct-b.pct);
    const weakest=levels[0]||null;
    const lessonRows=Object.entries(byLesson).map(([id,x])=>({id:Number(id),...x,pct:x.total?Math.round(x.right/x.total*100):0})).sort((a,b)=>a.pct-b.pct);
    const weakLesson=lessonRows[0]?lessonBy(lessonRows[0].id):recommendedLesson();
    return {weakest,weakLesson};
  }

  function finishQuiz(reason='manual'){
    if(quiz.submitted)return;quiz.submitted=true;clearInterval(timerHandle);closeSubmitGate();
    let correct=0,answered=0,byLevel={},byTopic={},byLesson={};
    quiz.qs.forEach(q=>{
      const a=quiz.answers[q.id],wasAnswered=a!==undefined,ok=a===q.correctAnswer;if(wasAnswered)answered++;if(ok)correct++;
      if(!byLevel[q.level])byLevel[q.level]={right:0,total:0};byLevel[q.level].total++;if(ok)byLevel[q.level].right++;
      if(!byTopic[q.topicId])byTopic[q.topicId]={right:0,total:0};byTopic[q.topicId].total++;if(ok)byTopic[q.topicId].right++;
      if(!byLesson[q.lessonId])byLesson[q.lessonId]={right:0,total:0};byLesson[q.lessonId].total++;if(ok)byLesson[q.lessonId].right++;
      if(wasAnswered){state.attempted++;if(ok)state.correct++;updateWrongRecovery(q,ok,wasAnswered);}
    });
    const total=quiz.qs.length,pct=Math.round(correct/total*100),point=(correct/total*10).toFixed(1);
    updateLevelStats(byLevel);
    if(quiz.opts.lessonId)updateLessonMastery(quiz.opts.lessonId,pct,correct,total,byLevel);
    if(quiz.opts.diagnosticPhase)diagnosticRecord(quiz.opts.diagnosticPhase,pct,point,correct,total,byLevel);
    const hist={date:new Date().toISOString(),title:quiz.opts.title,point:Number(point),score:correct,total};if(quiz.opts.mode==='exam'){state.examHistory.unshift(hist);state.examHistory=state.examHistory.slice(0,20);}
    save();renderLessonsAll();renderTopics();renderPractice();

    const rec=resultRecommendation(byLevel,byLesson),weakest=rec.weakest,strongest=Object.entries(byLevel).map(([level,x])=>({level,...x,pct:x.total?Math.round(x.right/x.total*100):0})).sort((a,b)=>b.pct-a.pct)[0];
    const lessonResult=quiz.opts.lessonId?lessonStatus(quiz.opts.lessonId):null;
    const analysisCards=course.levels.map(l=>{const x=byLevel[l]||{right:0,total:0},lp=x.total?Math.round(x.right/x.total*100):0;return `<div class="level-analysis ${scoreClass(lp)}"><div><b>${esc(l)}</b><span>${x.right}/${x.total}</span></div><div class="level-track"><span style="width:${lp}%"></span></div><small>${lp}% · ${lp>=MASTERY?'Làm tốt':lp>=DEVELOPING?'Đang củng cố':'Cần ưu tiên ôn'}</small></div>`}).join('');
    const diagnosticNote=quiz.opts.diagnosticPhase?`<div class="evidence-note"><b>${quiz.opts.diagnosticPhase==='pre'?'📍 Đã ghi nhận đánh giá đầu vào':'📈 Đã ghi nhận đánh giá sau ôn tập'}</b><span>Kết quả này được lưu để so sánh tiến bộ trong mục Tiến độ.</span></div>`:'';
    const timeoutNote=reason==='timeout'?`<div class="evidence-note timeout-note"><b>⏰ Hết thời gian</b><span>Hệ thống đã tự động nộp bài khi đồng hồ về 00:00.</span></div>`:'';
    const review=quiz.qs.map((q,i)=>{const a=quiz.answers[q.id],ok=a===q.correctAnswer;return `<article class="review-item ${ok?'ok':'bad'}"><b>Câu ${i+1}: ${esc(q.question)}</b><p>Em chọn: ${a===undefined?'Chưa trả lời':letters[a]+'. '+esc(q.options[a])}</p><p>Đáp án: <strong>${letters[q.correctAnswer]}. ${esc(q.options[q.correctAnswer])}</strong></p><small>${esc(q.explanation)}</small></article>`}).join('');
    $('#resultContent').innerHTML=`
      <div class="result-hero v12-result"><div class="score-ring" style="--p:${pct}"><div><strong>${point}</strong><span>/10</span></div></div><div class="result-summary"><span class="eyebrow">KẾT QUẢ · TIN HỌC ${grade}</span><h2>${correct}/${total} câu đúng · ${pct}%</h2><p>${esc(profile.name)} · ${esc(profile.className)} · đã trả lời ${answered}/${total} câu.</p>${lessonResult?`<div class="result-status ${lessonResult.key}"><b>${lessonResult.icon} ${lessonResult.label}</b><span>${lessonResult.pct}% · Mục tiêu thành thạo ≥${MASTERY}%</span></div>`:''}${diagnosticNote}${timeoutNote}<div id="resultSyncStatus" class="sync-status">Chuẩn bị gửi kết quả...</div><div class="result-actions"><button class="btn primary" id="adaptiveAfter">✨ Luyện phần cần củng cố</button><button class="btn ghost" id="retryBtn">Làm lại</button><button class="btn ghost" id="homeAfter">Trang chủ</button></div></div></div>
      <div class="analysis-grid-v12"><div class="panel"><span class="eyebrow">PHÂN TÍCH THEO MỨC ĐỘ</span><h3>Điểm mạnh – điểm cần cải thiện</h3><div class="level-analysis-list">${analysisCards}</div></div><div class="panel recommendation-panel"><span class="eyebrow">GỢI Ý CÁ NHÂN</span><h3>${weakest?`Ưu tiên: ${esc(weakest.level)}`:'Tiếp tục luyện tập'}</h3><p>${weakest?`Mức ${esc(weakest.level)} đạt ${weakest.pct}%. ${weakest.pct<DEVELOPING?'Nên luyện lại ngay để củng cố nền tảng.':'Chỉ cần luyện thêm để đạt ngưỡng thành thạo.'}`:'Hãy tiếp tục tích luỹ dữ liệu học tập.'}</p>${rec.weakLesson?`<div class="recommend-lesson"><small>BÀI NÊN ÔN TIẾP</small><b>Bài ${rec.weakLesson.id}. ${esc(rec.weakLesson.title)}</b><button class="text-btn" data-result-lesson="${rec.weakLesson.id}">Mở bài →</button></div>`:''}${strongest?`<p class="positive-note">✓ Điểm mạnh hiện tại: <b>${esc(strongest.level)} (${strongest.pct}%)</b></p>`:''}</div></div>
      <div class="panel"><h3>Đáp án và giải thích</h3>${review}</div>`;
    $('#retryBtn').onclick=()=>startQuiz(pickQuestions(quiz.qs,quiz.qs.length),quiz.opts);$('#homeAfter').onclick=()=>show('home');$('#adaptiveAfter').onclick=startAdaptive;
    $('#resultContent').querySelectorAll('[data-result-lesson]').forEach(b=>b.onclick=()=>openLesson(+b.dataset.resultLesson));show('results');
    sendResult(resultPayload(correct,total,point,pct,answered,byTopic,byLevel,weakest,lessonResult));
  }

  function appConfig(){return window.APP_CONFIG||{}}
  function endpoint(){return String(appConfig().RESULTS_ENDPOINT||'').trim()}
  function configured(){return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(endpoint())}
  function deviceId(){let x=localStorage.getItem('tin_review_device_id');if(!x){x=(crypto.randomUUID?crypto.randomUUID():`dev-${Date.now()}-${Math.random()}`);localStorage.setItem('tin_review_device_id',x)}return x}
  function resultPayload(correct,total,point,pct,answered,byTopic,byLevel,weakest,lessonResult){
    const lv=n=>byLevel[n]||{right:0,total:0};return {studentName:profile.name,className:profile.className,studentCode:profile.studentCode,grade:String(grade),sessionType:quiz.opts.mode,quizTitle:quiz.opts.title,score10:point,correct,total,percent:pct,answered,durationSeconds:Math.max(0,Math.round((Date.now()-quiz.start)/1000)),nbCorrect:lv('Nhận biết').right,nbTotal:lv('Nhận biết').total,thCorrect:lv('Thông hiểu').right,thTotal:lv('Thông hiểu').total,vdCorrect:lv('Vận dụng').right,vdTotal:lv('Vận dụng').total,vdcCorrect:lv('Vận dụng cao').right,vdcTotal:lv('Vận dụng cao').total,topicSummary:JSON.stringify(byTopic),learningStatus:lessonResult?.label||'',weakestLevel:weakest?.level||'',diagnosticPhase:quiz.opts.diagnosticPhase||'',attemptId:(crypto.randomUUID?crypto.randomUUID():`att-${Date.now()}`),deviceId:deviceId(),submittedAt:new Date().toISOString(),pageUrl:location.href,userAgent:navigator.userAgent};
  }
  function sendResult(payload){
    const status=$('#resultSyncStatus');if(!configured()){if(status)status.innerHTML='⚠️ <strong>Chưa kết nối Google Sheet.</strong> Kết quả vẫn lưu trên thiết bị.';return;}
    const form=document.createElement('form');form.method='POST';form.action=endpoint();form.target='resultSink';form.style.display='none';const input=document.createElement('input');input.type='hidden';input.name='payload';input.value=JSON.stringify(payload);form.appendChild(input);document.body.appendChild(form);form.submit();form.remove();if(status)status.innerHTML='📤 Đã gửi yêu cầu ghi kết quả về Google Sheets.';
  }

  function renderWrong(){
    const qs=course.questions.filter(q=>state.wrongIds.includes(q.id));
    $('#wrongContent').innerHTML=`<div class="section-head"><div><span class="eyebrow">SỔ CÂU CẦN CỦNG CỐ</span><h2>${qs.length} câu đang được theo dõi</h2><p>Để tránh “đúng một lần rồi quên”, mỗi câu chỉ rời sổ sau khi em trả lời đúng lại ${RECOVERY_TARGET} lần.</p></div>${qs.length?'<button class="btn primary" id="wrongQuiz">Luyện các câu cần ôn</button>':''}</div>${qs.length?`<div class="wrong-list">${qs.map(q=>{const r=state.wrongRecovery[q.id]||{wrongCount:1,recoveryStreak:0};return `<article><span>${esc(q.lesson)} · ${esc(q.level)}</span><b>${esc(q.question)}</b><div class="recovery"><span>Phục hồi: ${Math.min(r.recoveryStreak||0,RECOVERY_TARGET)}/${RECOVERY_TARGET}</span><div><i style="width:${Math.min(100,(r.recoveryStreak||0)/RECOVERY_TARGET*100)}%"></i></div></div><small>Đáp án đúng: ${letters[q.correctAnswer]}. ${esc(q.options[q.correctAnswer])}</small></article>`}).join('')}</div>`:'<div class="empty"><div>🎉</div><h3>Không còn câu cần củng cố</h3><p>Những câu sai sẽ xuất hiện lại ở đây nếu có.</p></div>'}`;
    if($('#wrongQuiz'))$('#wrongQuiz').onclick=()=>startQuiz(shuffle(qs),{mode:'wrong',title:'Ôn câu cần củng cố',timer:0});show('wrong');
  }

  function diagnosticComparison(){
    const pre=[...state.diagnosticHistory].reverse().find(x=>x.phase==='pre'),post=state.diagnosticHistory.find(x=>x.phase==='post');
    if(!pre)return `<div class="empty compact"><div>🎯</div><h3>Chưa có đánh giá đầu vào</h3><p>Thực hiện 15 câu để tạo đường cơ sở cho minh chứng tiến bộ.</p><button class="btn primary" id="progressDiagnostic">Đánh giá đầu vào</button></div>`;
    if(!post)return `<div class="diagnostic-compare"><div><small>ĐẦU VÀO</small><b>${pre.pct}%</b><span>${pre.correct}/${pre.total} câu</span></div><div class="compare-arrow">→</div><div><small>SAU ÔN TẬP</small><b>--</b><span>Chưa đánh giá lại</span></div></div><button class="btn primary" id="progressDiagnostic">Đánh giá lại</button>`;
    const delta=post.pct-pre.pct;return `<div class="diagnostic-compare"><div><small>ĐẦU VÀO</small><b>${pre.pct}%</b><span>${pre.correct}/${pre.total} câu</span></div><div class="compare-arrow">${delta>=0?'↗':'↘'} <strong>${delta>=0?'+':''}${delta}%</strong></div><div><small>SAU ÔN TẬP</small><b>${post.pct}%</b><span>${post.correct}/${post.total} câu</span></div></div><button class="btn ghost" id="progressDiagnostic">Đánh giá lại lần nữa</button>`;
  }
  function renderProgress(){
    const acc=overallAccuracy(),best=state.examHistory.length?Math.max(...state.examHistory.map(x=>x.point)):0,mastered=masteredLessons(),levels=levelPerformance();
    const levelHtml=levels.map(x=>`<div class="progress-level"><div><b>${esc(x.level)}</b><span>${x.pct===null?'Chưa có dữ liệu':x.pct+'%'}</span></div><div class="level-track"><span class="${x.pct===null?'neutral':scoreClass(x.pct)}" style="width:${x.pct||0}%"></span></div><small>${x.total?`${x.right}/${x.total} câu đúng`:'Hãy làm luyện tập để ghi nhận dữ liệu.'}</small></div>`).join('');
    const badges=[
      {ok:state.attempted>=20,icon:'🚀',name:'Khởi động',desc:'Làm ít nhất 20 câu'},
      {ok:mastered>=5,icon:'🏅',name:'Bền bỉ',desc:'Thành thạo ít nhất 5 bài'},
      {ok:state.wrongIds.length===0&&state.attempted>=30,icon:'🧹',name:'Xử lí câu sai',desc:'Không còn câu cần củng cố'},
      {ok:best>=8,icon:'⭐',name:'Thi thử tốt',desc:'Đạt từ 8,0 điểm thi thử'}
    ];
    $('#progressContent').innerHTML=`<div class="section-head"><div><span class="eyebrow">HỒ SƠ NĂNG LỰC · TIN ${grade}</span><h2>${esc(profile.name||'Học sinh')}</h2><p>${esc(profile.className||'Chưa nhập lớp')} · Theo dõi mức thành thạo thay vì chỉ đếm lượt làm.</p></div></div><div class="metrics"><div class="metric"><b>${mastered}/${course.lessons.length}</b><span>Bài thành thạo</span></div><div class="metric"><b>${state.attempted}</b><span>Câu đã làm</span></div><div class="metric"><b>${acc}%</b><span>Độ chính xác</span></div><div class="metric"><b>${best.toFixed(1)}</b><span>Điểm thi thử cao nhất</span></div></div><div class="progress-layout"><div class="panel"><span class="eyebrow">BẢN ĐỒ NĂNG LỰC</span><h3>Theo mức độ nhận thức</h3>${levelHtml}</div><div class="panel"><span class="eyebrow">MINH CHỨNG TRƯỚC – SAU</span><h3>Đánh giá năng lực</h3>${diagnosticComparison()}</div></div><div class="panel"><span class="eyebrow">BẢN ĐỒ BÀI HỌC</span><h3>Trạng thái từng bài</h3><div class="lesson-grid compact-lessons">${course.lessons.map(lessonCard).join('')}</div></div><div class="panel"><span class="eyebrow">ĐỘNG LỰC HỌC TẬP</span><h3>Huy hiệu</h3><div class="badge-grid">${badges.map(b=>`<div class="learning-badge ${b.ok?'earned':''}"><span>${b.icon}</span><div><b>${b.name}</b><small>${b.desc}</small></div></div>`).join('')}</div></div><div class="danger-zone"><b>Đặt lại tiến độ Tin học ${grade}</b><p class="muted">Không xoá thông tin họ tên, chỉ xoá tiến độ/câu cần ôn/lịch sử của khối hiện tại.</p><button class="btn danger" id="resetProgress">Đặt lại tiến độ</button></div>`;
    bindLessonCards($('#progressContent'));if($('#progressDiagnostic'))$('#progressDiagnostic').onclick=startDiagnostic;
    $('#resetProgress').onclick=()=>{if(confirm('Đặt lại toàn bộ tiến độ khối '+grade+'?')){state=STORE.reset(grade);applyTheme();renderShell();renderProgress();}};show('progress');
  }

  function renderGuide(){
    const root=$('#guideContent');root.innerHTML=`<div class="section-head"><div><span class="eyebrow">HƯỚNG DẪN · PHIÊN BẢN v12</span><h2>Học theo năng lực và dữ liệu học tập</h2></div></div><div class="guide-grid"><div class="panel"><h3>Dành cho học sinh</h3><ol class="step-list"><li>Chọn Tin 10/Tin 11 và nhập Họ tên, Lớp.</li><li>Nếu mới bắt đầu, làm <b>Đánh giá đầu vào 15 câu trong 15 phút</b> theo các mức độ có trong khối đang học.</li><li>Học theo Bài hoặc bấm <b>Luyện theo gợi ý</b> để website ưu tiên phần còn yếu.</li><li>Mỗi bài có ba trạng thái: <b>Thành thạo ≥80%</b>, <b>Đang củng cố 60–79%</b>, <b>Cần ôn &lt;60%</b>.</li><li>Câu sai chỉ được xoá khỏi sổ sau khi trả lời đúng lại ${RECOVERY_TARGET} lần.</li><li>Sau một giai đoạn ôn tập, làm <b>Đánh giá lại 15 câu trong 15 phút</b> để xem mức tiến bộ.</li><li>Trong mọi bài trắc nghiệm, có thể đổi đáp án trước khi nộp; đúng/sai và giải thích chỉ hiển thị sau khi nộp. <b>Thi thử 30 câu có 45 phút</b>.</li></ol></div><div class="panel"><h3>Dành cho giáo viên</h3><p>Phiên bản v12 giữ nguyên cơ chế gửi kết quả về Google Sheets, đồng thời bổ sung logic <b>thành thạo – cá nhân hoá – đánh giá trước/sau</b> để phục vụ minh chứng sáng kiến.</p><p class="notice">Website chính vẫn dùng URL Apps Script đang hoạt động. Các trường dữ liệu cũ không bị thay đổi.</p><p>${esc(course.note||'')}</p><p><a href="teacher-dashboard.html" target="_blank" rel="noopener">Mở Dashboard giáo viên (tùy chọn) →</a></p></div></div>`;
  }

  function search(q){
    q=q.trim().toLowerCase();const root=$('#searchResults');if(!q){root.innerHTML='';return;}
    const ls=course.lessons.filter(l=>(`${l.id} ${l.title} ${l.summary.join(' ')}`).toLowerCase().includes(q)).slice(0,8);
    root.innerHTML=ls.length?ls.map(l=>`<button data-search-lesson="${l.id}"><b>Bài ${l.id}. ${esc(l.title)}</b><small>${esc(topicBy(l.topic).name)}</small></button>`).join(''):'<div class="no-result">Không tìm thấy bài phù hợp.</div>';
    root.querySelectorAll('[data-search-lesson]').forEach(b=>b.onclick=()=>{root.innerHTML='';$('#searchInput').value='';openLesson(+b.dataset.searchLesson)});
  }

  function handleNav(n){if(n==='wrong')renderWrong();else if(n==='progress')renderProgress();else if(n==='exam')startExam();else show(n);}
  function bind(){
    $$('#navLinks [data-nav]').forEach(a=>a.onclick=e=>{e.preventDefault();handleNav(a.dataset.nav)});
    $('#menuBtn').onclick=()=>$('#navLinks').classList.toggle('open');
    $('#moreBtn').onclick=e=>{e.stopPropagation();$('#moreMenu').classList.toggle('open');$('#moreBtn').setAttribute('aria-expanded',$('#moreMenu').classList.contains('open')?'true':'false');};
    document.addEventListener('click',e=>{if(!e.target.closest('.more-nav'))$('#moreMenu')?.classList.remove('open');});
    $('#themeBtn').onclick=()=>{if(!state)return;state.theme=state.theme==='dark'?'light':'dark';save();applyTheme()};$('#studentBadge').onclick=()=>showStudentGate(true);$('#gateSaveBtn').onclick=saveProfile;
    $('#courseBadge').onclick=showCourseGate;$('#switchCourseBtn').onclick=showCourseGate;$$('.course-choice').forEach(b=>b.onclick=()=>selectGrade(b.dataset.grade));
    $('#startBtn').onclick=()=>show('lessons');$('#adaptiveBtn').onclick=startAdaptive;$('#examBtn').onclick=startExam;$('#diagnosticBtn').onclick=startDiagnostic;$('#wrongBtn').onclick=renderWrong;$('#searchInput').addEventListener('input',e=>search(e.target.value));
  }
  bind();if(grade&&COURSES[grade])selectGrade(grade);else showCourseGate();
})();

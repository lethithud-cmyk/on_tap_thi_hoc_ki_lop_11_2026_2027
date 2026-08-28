(function(){
  const topics=(window.TOPICS||[]).map(x=>({...x}));
  const lessons=(window.LESSONS||[]).map(x=>({...x,summary:[...(x.summary||[])]}));
  const questions=(window.QUESTIONS||[]).map(q=>({...q,id:`11-${q.id}`}));
  window.COURSE11={grade:11,name:'TIN HỌC 11',subtitle:'Kết nối tri thức với cuộc sống',topics,lessons,questions,levels:['Nhận biết','Thông hiểu','Vận dụng','Vận dụng cao'],examMinutes:45,examQuestions:30,note:'Ngân hàng Tin học 11 đã chuẩn hóa 992 câu với 4 mức Nhận biết, Thông hiểu, Vận dụng và Vận dụng cao.'};
  delete window.TOPICS; delete window.LESSONS; delete window.QUESTIONS;
})();

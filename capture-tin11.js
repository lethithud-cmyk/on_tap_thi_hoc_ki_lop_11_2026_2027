(function(){
  const topics=(window.TOPICS||[]).map(x=>({...x}));
  const lessons=(window.LESSONS||[]).map(x=>({...x,summary:[...(x.summary||[])]}));
  const questions=(window.QUESTIONS||[]).map(q=>({...q,id:`11-${q.id}`}));
  window.COURSE11={grade:11,name:'TIN HỌC 11',subtitle:'Kết nối tri thức với cuộc sống',topics,lessons,questions,levels:['Nhận biết','Thông hiểu','Vận dụng'],examMinutes:45,examQuestions:30,note:'Ngân hàng Tin học 11 đã được biên soạn và kiểm tra ở phiên bản trước.'};
  delete window.TOPICS; delete window.LESSONS; delete window.QUESTIONS;
})();
